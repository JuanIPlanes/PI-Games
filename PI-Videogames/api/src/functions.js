"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.createGame = exports.getByName = exports.getById = exports.dateParser = exports.dateChecker = exports.arrayChecker = exports.getGames = exports.getGenres = exports.msg = exports.msgs = void 0;
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
var axios_1 = require("axios");
var sequelize_1 = require("sequelize");
var API_KEY = process.env.API_KEY, GAMES_AT_DATE = 586489; //586489 is amount of games in External_Api to Date (21/7/21)
// const { API_KEY, games_ext_api_count } = process.env
var _a = require("./db.js"), Genre = _a.Genre, Videogame = _a.Videogame;
// export const msgs_en: Messages = { }
// export const msgs_es: Messages_es = {
exports.msgs = {
    invalid: "el ID introducido no existe.",
    notFound: "ID No Encontrado.",
    incorrect: "Los datos enviados son incorrectos. Por favor, revíselos.",
    empty: "Introduca los Datos Requeridos.",
    gettingByName: "Error al obtener la lista de juegos. Intente nuevamente o contacte al soporte técnico."
};
var msg = function (r, lang) { var _a; return ({ msg: (_a = Object.getOwnPropertyDescriptor(exports.msgs, r)) === null || _a === void 0 ? void 0 : _a.value }); };
exports.msg = msg;
function getGenres() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            axios_1["default"]
                .get("https://api.rawg.io/api/genres?key=" + API_KEY, { responseType: 'json' })
                .then(function (_a) {
                var data = _a.data;
                return data.results;
            })
                .then(function (genres) { return genres.map(function (_a) {
                var _b = _a.name, name = _b === void 0 ? String : _b;
                return ({ name: name !== null && name !== void 0 ? name : "desconocido" });
            }); })
                //!geting names of genre from array of genres
                .then(function (genreNames) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Genre.bulkCreate(genreNames)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
            return [2 /*return*/];
        });
    });
}
exports.getGenres = getGenres;
var Order = {
    DESC: [-1, 0, 1],
    ASC: [1, 0, -1]
};
function getGames(_a, next) {
    var _b = _a.offset, offset = _b === void 0 ? 0 : _b, _c = _a.order, order = _c === void 0 ? "ASC" : _c, _d = _a.by, by = _d === void 0 ? "name" : _d;
    return __awaiter(this, void 0, void 0, function () {
        var url, ext, locals, err_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    url = next === undefined
                        ? "https://api.rawg.io/api/games?key=" + API_KEY
                        : next.toString();
                    console.log(url);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1["default"]
                            .get(url, { responseType: 'json' })
                            .then(function (_a) {
                            var data = _a.data;
                            return ({ results: data.results, nextLink: data.next });
                        })
                            .then(function (_a) {
                            var results = _a.results, nextLink = _a.nextLink;
                            return ({
                                results: results.map(function (_a) {
                                    var id = _a.id, name = _a.name, imageURL = _a.background_image, imageURL_a = _a.background_image_additional, genres = _a.genres, rating = _a.rating;
                                    return ({ id: id, name: name, imageURL: imageURL, imageURL_a: imageURL_a, rating: rating, genres: genres.map(function (_a) {
                                            var id = _a.id, name = _a.name;
                                            return ({ id: id, name: name });
                                        }) });
                                }),
                                next: nextLink
                            });
                        })["catch"](function (e) { throw { err: e, inExt: true }; })];
                case 2:
                    ext = _e.sent();
                    return [4 /*yield*/, Videogame.findAndCountAll({
                            limit: 15,
                            offset: offset,
                            orderBy: [by, order],
                            attributes: ["name", "id", "imageURL", "rating"],
                            through: { attributes: [] },
                            include: {
                                model: Genre,
                                attributes: ["name", "id"],
                                through: { attributes: [] }
                            }
                        })["catch"](function (e) { throw { err: e, inLocal: true }; })];
                case 3:
                    locals = (_e.sent()).rows;
                    console.log("-------------------**/--");
                    return [2 /*return*/, {
                            next: ext.next,
                            results: __spreadArray(__spreadArray([], ext.results), locals).sort(function (_a, _b) {
                                var name1 = _a.name, rating1 = _a.rating;
                                var name2 = _b.name, rating2 = _b.rating;
                                return by === "rating"
                                    ? rating1 > rating2 ? Order[order][0] : rating1 === rating2 ? Order[order][1] : Order[order][2]
                                    : name1.localeCompare(name2) * (order === "ASC" ? 1 : -1);
                            })
                            // .map((e: object) => delete e.rating && e)
                        }];
                case 4:
                    err_1 = _e.sent();
                    console.log(err_1);
                    return [2 /*return*/, {
                            msg: exports.msg("gettingByName"),
                            error: err_1
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getGames = getGames;
function arrayChecker(arr) {
    return !(Array.isArray(arr) && arr.length &&
        arr.every(function (str) {
            return typeof (str) === "string" && str.length > 1 && str.length < 30;
        }));
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
    var LIST = [
        'background_image', 'background_image_additional', 'name', 'name_original', 'alternative_names', 'genres', 'description', 'description_raw', 'released', 'updated', 'rating', 'rating_top', 'ratings', 'platform'
    ];
    return Object.fromEntries(Object
        .entries(game)
        .filter(function (prop) {
        return LIST.includes(prop[0]);
    }));
}
function getById(id) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(id > 1000000)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Videogame.findOne({
                            where: { id: id },
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            },
                            include: {
                                model: Genre,
                                attributes: ['name', "id"],
                                through: {
                                    attributes: []
                                }
                            }
                        })];
                case 1:
                    _b = (_a = _d.sent()) !== null && _a !== void 0 ? _a : exports.msg("notFound");
                    return [3 /*break*/, 6];
                case 2:
                    if (!(id < GAMES_AT_DATE && id > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, axios_1["default"]
                            .get("https://api.rawg.io/api/games/" + id + "?key=" + API_KEY, { responseType: 'json' })
                            .then(function (_a) {
                            var data = _a.data;
                            return data.hasOwnProperty("detail")
                                ? exports.msg("invalid")
                                : transformGameRecived(data);
                        })["catch"](function (error) {
                            console.log(exports.msg("invalid"));
                            return ({
                                error: error.message,
                                msg: exports.msg("invalid").msg
                            });
                        })];
                case 3:
                    _c = _d.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _c = exports.msg("invalid");
                    _d.label = 5;
                case 5:
                    _b = _c;
                    _d.label = 6;
                case 6: return [2 /*return*/, _b];
            }
        });
    });
}
exports.getById = getById;
function getByName(name) {
    return __awaiter(this, void 0, void 0, function () {
        var locals, external_1, err_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, Videogame.findAndCountAll({
                            limit: 15,
                            where: name.length
                                ? {
                                    name: (_a = {}, _a[sequelize_1.Op.iLike] = "%" + name + "%", _a)
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
                        })["catch"](function (e) { throw { err: e, inLocal: true }; })];
                case 1:
                    locals = (_b.sent()).rows;
                    return [4 /*yield*/, axios_1["default"]
                            .get("https://api.rawg.io/api/games?search=" + name + "&key=" + API_KEY, { responseType: "json" })
                            .then(function (_a) {
                            var data = _a.data;
                            return data.results.slice(0, 14);
                        })["catch"](function (e) { throw { err: e, inExt: true }; })];
                case 2:
                    external_1 = _b.sent();
                    return [2 /*return*/, { l: locals, e: external_1 }];
                case 3:
                    err_2 = _b.sent();
                    console.log(err_2);
                    return [2 /*return*/, {
                            msg: exports.msg("gettingByName"),
                            error: new Error(err_2.err).message
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getByName = getByName;
function createGame(props, genres) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var name, description, releaseDate, rating, platform, imageURL, GENRES, _b, VIDEOGAME, VGCreated;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    name = props.name, description = props.description, releaseDate = props.releaseDate, rating = props.rating, platform = props.platform, imageURL = props.imageURL, GENRES = [];
                    return [4 /*yield*/, Videogame.findOrCreate({
                            where: { name: name },
                            defaults: {
                                name: name,
                                description: description,
                                platform: platform,
                                imageURL: imageURL,
                                releaseDate: dateParser(releaseDate) ? new Date(releaseDate) : null,
                                rating: (_a = parseFloat(rating)) !== null && _a !== void 0 ? _a : null
                            },
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            },
                            include: {
                                model: Genre,
                                attributes: ['name', "id"],
                                through: {
                                    attributes: []
                                }
                            }
                        })["catch"](function (e) { throw e; })];
                case 1:
                    _b = _c.sent(), VIDEOGAME = _b[0], VGCreated = _b[1];
                    if (!VGCreated)
                        return [2 /*return*/, { created: VGCreated, game: VIDEOGAME }];
                    genres.forEach(function (genre) {
                        GENRES.push(Genre
                            .findOrCreate({
                            where: { name: genre },
                            defaults: { name: genre },
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        })
                            .then(function (findedOrCreated) { return __awaiter(_this, void 0, void 0, function () {
                            var ts;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, VIDEOGAME.addGenre(findedOrCreated[0])];
                                    case 1:
                                        _a.sent();
                                        ts = findedOrCreated[0].dataValues;
                                        delete ts.createdAt;
                                        delete ts.updatedAt;
                                        return [2 /*return*/, ts];
                                }
                            });
                        }); })["catch"](function (err) { throw err; }));
                    });
                    return [4 /*yield*/, Promise.all(GENRES)
                            .then(function (r) {
                            var vgToSend = __assign(__assign({}, VIDEOGAME.dataValues), { genres: r !== null && r !== void 0 ? r : null, created: VGCreated });
                            delete vgToSend.createdAt;
                            delete vgToSend.updatedAt;
                            return vgToSend;
                        })["catch"](function (e) { throw e; })
                        // } catch (e:any) {
                        // 	return {a:e,b:"1"}
                        // }
                    ];
                case 2: return [2 /*return*/, _c.sent()
                    // } catch (e:any) {
                    // 	return {a:e,b:"1"}
                    // }
                ];
            }
        });
    });
}
exports.createGame = createGame;
//!?!?!traeme la copa MESSI
