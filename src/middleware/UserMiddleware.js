"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
var userMiddleware = function (req, res, next) {
    try {
        var bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ');
            var bearerToken = bearer[1];
            var data = jwt.verify(bearerToken, config_1.JWT_SECRET);
            var now = Math.floor(Date.now() / 1000);
            if (data.exp < now) {
                res.status(403);
                res.send({ "error": "Token Expired", "expired": data.exp, "now": now });
            }
            else {
                req.body.userId = data.id;
                return next();
            }
        }
    }
    catch (err) {
        res.status(403);
        res.send({ "error": "Token Failed" });
    }
};
exports.default = userMiddleware;
