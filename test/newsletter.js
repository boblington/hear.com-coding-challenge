const models = require('../src/models');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

let should = chai.should();

chai.use(chaiHttp);

describe('Newsletter', () => {
    /*
    * Test the /GET route
    */
   describe('/GET send', () => {
    it('it should trigger a newsletter send out', (done) => {
        chai.request(server)
            .get('/newsletter/send')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message').eql('Newsletter sent!');
                res.body.should.have.property('emailPayload');
            done();
            });
    });
});
});