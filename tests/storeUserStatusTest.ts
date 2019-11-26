import app from '../index';
import * as chai from 'chai';
import * as chaiHttp from  'chai-http';
import * as jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXP_TIME } from '../src/config/config';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
describe('Store User Status API Test', () => {
  it('should return code status 201', () => {

    const payload = {
      exp: Math.floor(Date.now() / 1000) + JWT_EXP_TIME,
      id: 5,
      phone_number: '+201090730088'
    }
    const token = jwt.sign(payload, JWT_SECRET);

    return chai.request(app).post('/user/storeStatus')
    //.set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Bearer '+token)
    .send({status : 'Available'})
      .then(res => {
        chai.expect(res.status).to.eql(201);
      })
  })
})
