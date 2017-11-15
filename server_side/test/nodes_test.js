process.env.NODE_ENV = 'test';

const app = require("./app");

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);
describe('Nodes', () => {
  describe('/GET nodes', () => {
      it('it should GET all the nodes', (done) => {
        chai.request('http://localhost:4000')
            .get('/api/getNodes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.nodes.should.be.a('array');
              done();
            });
      });
  });
  describe('/CHANGE node position', () => {
      it('it should CHANGE node position', (done) => {
        const changedNode = {
            id: 400,
            X:  600,
            Y:  600
        };
        chai.request('http://localhost:4000')
            .post('/api/changeNodePosition')
            .send(changedNode)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.id.should.be.a('number');
                res.body.X.should.be.a('number');
                res.body.Y.should.be.a('number');
              done();
            });
      });
  });
  describe('/PUT node', () => {
      it('it should PUT the new node', (done) => {
        const newNode = {
            x: 40,
            y: 50
        };
        chai.request('http://localhost:4000')
            .put('/api/addNode')
            .send(newNode)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.id.should.be.a('number');
                res.body.x.should.be.a('number');
                res.body.y.should.be.a('number');
              done();
            });
      });
  });
  describe('/DELETE node', () => {
      it('it should DELETE the node', (done) => {
        const deletedNode = {
            id: 215
        };
        chai.request('http://localhost:4000')
            .delete('/api/deleteNode')
            .send(deletedNode)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.id.should.be.a('number');
              done();
            });
      });
  });
});