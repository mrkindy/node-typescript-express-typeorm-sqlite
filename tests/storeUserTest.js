"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var chai = require("chai");
var chaiHttp = require("chai-http");
require("mocha");
var fs = require("fs");
var path = require("path");
chai.use(chaiHttp);
var expect = chai.expect;
describe('Store User API Test', function () {
    it('should return code status 201', function () {
        return chai.request(index_1.default).post('/user')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('first_name', 'Test')
            .field('last_name', 'User')
            .field('phone_number', '+201090730098')
            .field('country_code', 'EG')
            .field('gender', 'male')
            .field('birthdate', '1988-02-18')
            .attach('avatar', fs.readFileSync(path.dirname(__filename) + '/test.jpg'), 'preview.png')
            .then(function (res) {
            chai.expect(res.status).to.eql(201);
            chai.expect(res.body).to.be.an('object');
        });
    });
});
