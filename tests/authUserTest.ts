import app from '../index';
import * as chai from 'chai';
import * as chaiHttp from  'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Auth User API Test', () => {
  it('should return code status 200', () => {
    return chai.request(app).post('/auth/generateToken')
    .send({
      phone_number: '+201090730088',
    })
      .then(res => {
        chai.expect(res.status).to.eql(200);
      })
  })
})
