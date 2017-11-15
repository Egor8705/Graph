process.env.NODE_ENV = 'test';

const app = require("./app");

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);
describe('Lines', () => {
  describe('/GET lines', () => {
      it('it should GET all the lines', (done) => {
        chai.request('http://localhost:4000')
            .get('/api/getLines')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.lines.should.be.a('array');
              done();
            });
      });
  });
  describe('/PUT line', () => {
      it('it should PUT line', (done) => {
        const line = {
            start: 21,
            finish: 30
        };
        chai.request('http://localhost:4000')
            .put('/api/addLine')
            .send(line)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.id.should.be.a('number');
                res.body.start.should.be.a('number');
                res.body.finish.should.be.a('number');
              done();
            });
      });
  });
  describe('/DELETE lines', () => {
      it('it should delete array of lines', (done) => {
        const deleteLineArrayIds = {
            id: [326,327] 
        };
        chai.request('http://localhost:4000')
            .delete('/api/deleteLine')
            .send(deleteLineArrayIds)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.id.should.be.a('array');
               // res.body.id.length.should.be.eql(2);
              done();
            });
      });
  });

});