"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = exports.getByName = exports.getById = exports.dateParser = exports.dateChecker = exports.arrayChecker = exports.getGenres = exports.msg = exports.msgs = void 0;
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
const axios_1 = __importDefault(require("axios"));
const sequelize_1 = require("sequelize");
const { API_KEY } = process.env, GAMES_AT_DATE = 586489; //586489 is amount of games in External_Api to Date (21/7/21)
// const { API_KEY, games_ext_api_count } = process.env
const { Genre, Videogame } = require("./db.js");
// export const msgs_en: Messages = { }
// export const msgs_es: Messages_es = {
exports.msgs = {
    invalid: "el ID introducido no existe.",
    notFound: "ID No Encontrado.",
    incorrect: "Los datos enviados son incorrectos. Por favor, revíselos.",
    empty: "Introduca los Datos Requeridos.",
    gettingByName: "Error al obtener la lista de juegos. Intente nuevamente o contacte al soporte técnico."
};
const msg = (r, lang) => { var _a; return ({ msg: (_a = Object.getOwnPropertyDescriptor(exports.msgs, r)) === null || _a === void 0 ? void 0 : _a.value }); };
exports.msg = msg;
function getGenres() {
    return __awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .get(`https://api.rawg.io/api/genres?key=${API_KEY}`, { responseType: 'json' })
            .then(({ data }) => data.results)
            .then(genres => genres.map(({ name = String }) => ({ name: name !== null && name !== void 0 ? name : "desconocido" })))
            //!geting names of genre from array of genres
            .then((genreNames) => __awaiter(this, void 0, void 0, function* () { return yield Genre.bulkCreate(genreNames); }));
        //!create all genres in db
    });
}
exports.getGenres = getGenres;
function getGames() {
    return __awaiter(this, void 0, void 0, function* () {
        let ref = undefined;
        axios_1.default
            .get(`https://api.rawg.io/api/games?key=${API_KEY}`, { responseType: 'json' })
            .then(({ data }) => ((ref = data.results) && data.results))
            .then();
    });
}
function arrayChecker(arr) {
    return !(Array.isArray(arr) && arr.length &&
        arr.every((str) => typeof (str) === "string" && str.length > 1 && str.length < 30));
}
exports.arrayChecker = arrayChecker;
function dateChecker(str) {
    return (str.length >= 10 &&
        Number.isNaN(Date.parse(str)));
}
exports.dateChecker = dateChecker;
function dateParser(str) {
    return str.length >= 10 &&
        !Number.isNaN(Date.parse(str))
        ? new Date(str)
            .toUTCString() //transforming format to "yyyy-mm-ddThh-min-sc.mscZ"
            .slice(5, 16) //extracting only y-m-d
        : false;
}
exports.dateParser = dateParser;
function transformGameRecived(game) {
    const LIST = [
        'background_image', 'background_image_additional', 'name', 'name_original', 'alternative_names', 'genres', 'description', 'description_raw', 'released updated', 'rating', 'rating_top', 'ratings', 'platform'
    ];
    return Object.fromEntries(Object
        .entries(game)
        .filter((prop) => LIST.includes(prop[0])));
}
function getById(id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return id > 1000000
            ? (_a = yield Videogame.findOne({
                where: { id },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: {
                    model: Genre,
                    attributes: ['name', "id"],
                    through: {
                        attributes: []
                    }
                }
            })) !== null && _a !== void 0 ? _a : exports.msg("notFound")
            : id < GAMES_AT_DATE && id > 0
                ? yield axios_1.default
                    .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`, { responseType: 'json' })
                    .then(({ data }) => data.hasOwnProperty("detail")
                    ? exports.msg("invalid")
                    : transformGameRecived(data)).catch(error => {
                    console.log(exports.msg("invalid"));
                    return ({
                        error: error.message,
                        msg: exports.msg("invalid").msg
                    });
                })
                : exports.msg("invalid");
    });
}
exports.getById = getById;
function getByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { rows: locals } = yield Videogame.findAndCountAll({
                limit: 15,
                where: name.length
                    ? {
                        name: { [sequelize_1.Op.iLike]: `%${name}%` }
                    }
                    : {},
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: {
                    model: Genre,
                    attributes: { include: ["name", "id"] },
                    through: { attributes: [] }
                }
            }).catch((e) => { throw { err: e, inLocal: true }; }), external = yield axios_1.default
                .get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`, { responseType: "json" })
                .then(({ data }) => data.results.slice(0, 14))
                .catch((e) => { throw { err: e, inExt: true }; });
            return { l: locals, e: external };
        }
        catch (err) {
            console.log(err);
            return {
                msg: exports.msg("gettingByName"),
                error: new Error(err.ert).message
            };
        }
    });
}
exports.getByName = getByName;
function createGame(props, genres) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, releaseDate, rating, platform } = props, GENRES = [];
        // try {
        const [VIDEOGAME, VGCreated] = yield Videogame.findOrCreate({
            where: { name },
            defaults: {
                name,
                description,
                platform,
                releaseDate: dateParser(releaseDate) ? new Date(releaseDate) : null,
                rating: (_a = parseFloat(rating)) !== null && _a !== void 0 ? _a : null
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: {
                model: Genre,
                attributes: ['name', "id"],
                through: {
                    attributes: []
                }
            }
        }).catch((e) => { throw e; });
        if (!VGCreated)
            return { created: VGCreated, game: VIDEOGAME };
        genres.forEach((genre) => {
            GENRES.push(Genre
                .findOrCreate({
                where: { name: genre },
                defaults: { name: genre },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
            })
                .then((findedOrCreated) => __awaiter(this, void 0, void 0, function* () {
                yield VIDEOGAME.addGenre(findedOrCreated[0]);
                let ts = findedOrCreated[0].dataValues;
                delete ts.createdAt;
                delete ts.updatedAt;
                console.log(ts);
                return ts;
            }))
                .catch((err) => { throw err; }));
        });
        return yield Promise.all(GENRES)
            .then((r) => {
            let vgToSend = Object.assign(Object.assign({}, VIDEOGAME.dataValues), { genres: r !== null && r !== void 0 ? r : null, created: VGCreated });
            delete vgToSend.createdAt;
            delete vgToSend.updatedAt;
            return vgToSend;
        })
            .catch((e) => { throw e; });
    });
}
exports.createGame = createGame;
//!?!?!traeme la copa MESSI
