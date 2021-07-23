"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const router = express.Router();
const functions_js_1 = require("../functions.js");
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //! props
    let body = Object.assign({}, req.body), { name, description, releaseDate, rating, platform } = body, { genres } = req.body;
    delete body.genres;
    //! verification have all props
    if (!['name', 'description', 'releaseDate', 'rating', 'platform']
        .every((prop) => Object.entries(body).some((propName) => propName[0] === prop)))
        return res.send(functions_js_1.msg("empty"));
    //! verification all props are correct
    if ((typeof name !== "string" ||
        name.length < 3 || //? name checher
        name.length > 30) ||
        typeof description !== "string" || //? desc checher
        functions_js_1.arrayChecker(platform) || //? platform checher
        functions_js_1.dateChecker(releaseDate) || //? Date checher X
        Number.isNaN(parseFloat(rating)) || //? Rating checher
        (genres ? functions_js_1.arrayChecker(genres) : !!0) //? Genres checher
    )
        return res.send(functions_js_1.msg("incorrect"));
    return res.send(yield functions_js_1.createGame(body, genres));
}));
module.exports = router;
