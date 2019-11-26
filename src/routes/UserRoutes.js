"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserMiddleware_1 = require("../middleware/UserMiddleware");
var UserController_1 = require("../controllers/UserController");
var AuthController_1 = require("../controllers/AuthController");
var UserStatusController_1 = require("../controllers/UserStatusController");
var multer = require("multer");
var routes = function (app) {
    var upload = multer({ dest: './uploads/' });
    app.route('/user')
        .post(upload.single('avatar'), UserController_1.storeUser);
    app.route('/auth/generateToken')
        .post(AuthController_1.generateUserToken);
    app.route('/user/storeStatus')
        .post(UserMiddleware_1.default, UserStatusController_1.storeStatus);
};
exports.default = routes;
