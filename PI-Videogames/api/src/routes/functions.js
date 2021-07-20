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
exports.getGenres = void 0;
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
const db_js_1 = require("./db.js");
const axios_1 = __importDefault(require("axios"));
const { API_KEY } = process.env;
function getGenres() {
    return __awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .get(`https://api.rawg.io/api/genres?key=${API_KEY}`, { responseType: 'json' })
            .then(({ data }) => data.results)
            .then(genres => genres.map(({ name = String }) => ({ name: name !== null && name !== void 0 ? name : "desconocido" })))
            //!geting names of genre from array of genres
            .then((genreNames) => __awaiter(this, void 0, void 0, function* () { return yield db_js_1.Genre.bulkCreate(genreNames); }));
        //!create all genres in d
    });
}
exports.getGenres = getGenres;
