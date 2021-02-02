const models = require('../src/models');
let User = models.users;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    /*
    * Test the /GET route
    */
    describe('/GET user', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                done();
                });
        });
    });
    /*
    * Test the /POST route
    */
    describe('/POST user/add', () => {
        it('it should not POST a user without email field', (done) => {
            let user = {
                id: 2,
                name: "J.R.R. Tolkien"
            }
        chai.request(server)
            .post('/user/add')
            .send(user)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                done();
            });
        });
        it('it should POST a user ', (done) => {
            let user = {
                id: 2,
                name: "J.R.R. Tolkien",
                email: "jrr@tolkien.com"
            }
          chai.request(server)
              .post('/user/add')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('User added successfully!');
                done();
              });
        });
    });
    /*
    * Test the /PUT /user/:id route
    */
    describe('/PUT/user/:id', () => {
        it('it should UPDATE a user given the id', (done) => {
            let user = {
                id: 1,
                name: "Fred Flintstone",
                email: "fred@freddy.com"
            }
            console.log('/user/'+user.id);
            chai.request(server)
                .put('/user/' + user.id)
                .send(user)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eql('User updated successfully!');
                        res.body.user.should.have.property('name').eql("Fred Flintstone");
                        res.body.user.should.have.property('email').eql("fred@freddy.com");
                    done();
            });
        });
    });

    /*
    * Test the /POST route to create favorite subreddits
    */
   describe('/POST user/:id/subreddits', () => {
        it('it should not POST favorite subreddits without subreddits field', (done) => {
            let favoriteSubreddits = {"name":"r/business"};
            chai.request(server)
                .post('/user/1/subreddits')
                .send(favoriteSubreddits)
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                    done();
            });
        });

        it('it should POST a users favorite subreddit ', (done) => {
            let favoriteSubreddits = {"subreddits": ["r/business", "r/funny"]};
            chai.request(server)
                .post('/user/1/subreddits')
                .send(favoriteSubreddits)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('msg').eql('Favorite Subreddits added.');
                    done();
                });
            });
        
    }); 



});