import app from '../index';
import * as chai from 'chai';
import * as chaiHttp from  'chai-http';
import 'mocha';
import * as fs from 'fs';
import * as path from 'path';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Store User API Test', () => {
  it('should return code status 201', () => {
    return chai.request(app).post('/user')

    .set('Content-Type', 'application/x-www-form-urlencoded')
    .field('first_name', 'Test')
    .field('last_name', 'User')
    .field('phone_number', '+201090730098')
    .field('country_code', 'EG')
    .field('gender', 'male')
    .field('birthdate', '1988-02-18')
    .attach('avatar',
      fs.readFileSync(path.dirname(__filename)+'/test.jpg'),
      'preview.png')
      .then(res => {
        chai.expect(res.status).to.eql(201);
        chai.expect(res.body).to.be.an('object');
      })
  })
})
