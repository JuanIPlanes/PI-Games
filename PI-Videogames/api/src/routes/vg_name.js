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
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hasOwnProperty('name'))
        return next();
    const NAME = String(req.query.name).replace("%", ' ').trim();
    if (typeof NAME !== 'string' || NAME.length < 2)
        return res.send({ msg: 'Nombre invalido' });
    res.send(yield functions_js_1.getByName(NAME)); //Obtain Search of LOCAL_DB, and EXT_API_DB
    // GET https://api.rawg.io/api/games
    // GET https://api.rawg.io/api/games?search={game}
    // GET https://api.rawg.io/api/genres
    // GET https://api.rawg.io/api/games/{id}
}));
module.exports = router;
