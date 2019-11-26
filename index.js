"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var UserRoutes_1 = require("./src/routes/UserRoutes");
var config_1 = require("./src/config/config");
var bodyParser = require("body-parser");
var typeorm_1 = require("typeorm");
var helmet = require("helmet");
var cors = require("cors");
var app = express();
typeorm_1.createConnection().then(function (connection) {
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    UserRoutes_1.default(app);
    app.listen(config_1.SERVER_PORT, function () {
        return console.log("Hello! Kindy server is running on port " + config_1.SERVER_PORT);
    });
});
exports.default = app;
