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
exports.__esModule = true;
exports.getById = exports.msg = exports.msgs = exports.getGenres = void 0;
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
var axios_1 = require("axios");
var API_KEY = process.env.API_KEY, GAMES_AT_DATE = 586489; //586489 is amount of games in External_Api to Date (21/7/21)
// const { API_KEY, games_ext_api_count } = process.env
var _a = require("./db.js"), Genre = _a.Genre, Videogame = _a.Videogame;
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
function getGames() {
    return __awaiter(this, void 0, void 0, function () {
        var ref;
        return __generator(this, function (_a) {
            ref = undefined;
            axios_1["default"]
                .get("https://api.rawg.io/api/games?key=" + API_KEY, { responseType: 'json' })
                .then(function (_a) {
                var data = _a.data;
                return ((ref = data.results) && data.results);
            })
                .then();
            return [2 /*return*/];
        });
    });
}
exports.msgs = {
    invalid: "el ID introducido no existe",
    notFound: "ID No Encontrado"
};
var msg = function (r) { var _a; return ({ msg: (_a = Object.getOwnPropertyDescriptor(exports.msgs, r)) === null || _a === void 0 ? void 0 : _a.value }); };
exports.msg = msg;
function transformDataRecived(game) {
    var LIST = [
        'background_image', 'background_image_additional', 'name name_original', 'alternative_names', 'genres', 'description', 'description_raw', 'released updated', 'rating', 'rating_top', 'ratings', 'platform'
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
                    if (!(id < GAMES_AT_DATE || id > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, axios_1["default"]
                            .get("https://api.rawg.io/api/games/" + id + "?key=" + API_KEY, { responseType: 'json' })
                            .then(function (_a) {
                            var data = _a.data;
                            return data.hasOwnProperty("detail")
                                ? exports.msg("invalid")
                                : transformDataRecived(data);
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
