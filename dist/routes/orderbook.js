"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.get('/orderbook/:from-:to/:limit', async (req, res) => {
    const { params: { from, to, limit } } = req;
    try {
        const { data } = await axios_1.default.get(`https://api.zonda.exchange/rest/trading/orderbook-limited/${from}-${to}/${limit}`);
        if (data.status !== "Ok")
            return res.status(400).send(data.errors);
        else
            return res.send(data);
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.default = router;
//# sourceMappingURL=orderbook.js.map