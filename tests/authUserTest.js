"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var chai = require("chai");
var chaiHttp = require("chai-http");
require("mocha");
chai.use(chaiHttp);
var expect = chai.expect;
describe('Auth User API Test', function () {
    it('should return code status 200', function () {
        return chai.request(index_1.default).post('/auth/generateToken')
            .send({
            phone_number: '+201090730088',
        })
            .then(function (res) {
            chai.expect(res.status).to.eql(200);
        });
    });
});
