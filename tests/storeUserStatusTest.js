"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var chai = require("chai");
var chaiHttp = require("chai-http");
var jwt = require("jsonwebtoken");
var config_1 = require("../src/config/config");
require("mocha");
chai.use(chaiHttp);
var expect = chai.expect;
describe('Store User Status API Test', function () {
    it('should return code status 201', function () {
        var payload = {
            exp: Math.floor(Date.now() / 1000) + config_1.JWT_EXP_TIME,
            id: 5,
            phone_number: '+201090730088'
        };
        var token = jwt.sign(payload, config_1.JWT_SECRET);
        return chai.request(index_1.default).post('/user/storeStatus')
            //.set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + token)
            .send({ status: 'Available' })
            .then(function (res) {
            chai.expect(res.status).to.eql(201);
        });
    });
});
