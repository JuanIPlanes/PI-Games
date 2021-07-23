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
const functions_1 = require("../functions");
const router = express.Router();
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let _URL, { offset = 0, order = "ASC", by = "name" } = req.query, { next = undefined } = req.body;
    //!verify that NEXT is valid
    _URL = next === undefined ? false : yield (() => __awaiter(void 0, void 0, void 0, function* () { return yield new Promise(res => res(new URL(next))); }))()
        .catch((url) => ({ url, message: "invalid imageURL" }));
    if (((_a = _URL === null || _URL === void 0 ? void 0 : _URL.message) !== null && _a !== void 0 ? _a : false) ||
        !["DESC", "ASC"].includes(order) ||
        !["name", "rating"].includes(by) ||
        Number.isNaN(parseInt(offset)))
        return res.send(functions_1.msg("incorrect"));
    const GameList = yield functions_1.getGames({ offset: Number(offset), order, by }, next).catch(e => e);
    // if (GameList.hasOwnProperty("msg")) {
    //     console.log(`------->----->---->${GameList.msg}<----<-----<-------`)
    //     return res.send({
    //         lastmsg: "------->----->---->" + GameList.toString() + "<----<-----<-------",
    //         next: _URL
    //     })
    // }
    return res.send(GameList);
}));
module.exports = router;
