const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movies tests', () => {

    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({
                username: 'hkaraoglu',
                password: '123456'
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('GET Movies', () => {
        it('It Should GET All The Movies', (done) => {
            chai.request(server)
                .get('/api/movie')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    });

    describe('/POST Movie', () => {
        it('It Should POST a Movie', (done) => {

            const movie = {
                title: 'Dr Strange',
                directorId: '5c9b3c8db6cd8f3490742b64',
                category: 'Action',
                country: 'USA',
                imdbScore: 7.6,
                year: 2018
            };

            chai.request(server)
                .post('/api/movie')
                .set('x-access-token', token)
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('directorId');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('imdbScore');
                    res.body.should.have.property('year');
                    movieId = res.body._id;
                    done();
                });
        });

    });

    describe('/GET/:MovieId Movie', () => {
        it('It Should GET a Movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movie/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('directorId');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('imdbScore');
                    res.body.should.have.property('year');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });

    describe('/PUT/:MovieId Movie', () => {
        it('It Should UPDATE a Movie Given By Id', (done) => {

            const movie = {
                title: 'Aquaman II',
                directorId: '5c9b3c8db6cd8f3490742b56',
                category: 'Action',
                country: 'USA',
                imdbScore: 7.6,
                year: 2018
            };

            chai.request(server)
                .put('/api/movie/'+movieId)
                .set('x-access-token', token)
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('directorId').eql(movie.directorId);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('imdbScore').eql(movie.imdbScore);
                    res.body.should.have.property('year').eql(movie.year);
                    done();
                });
        });

    });

    describe('/DELETE/:MovieId Movie', () => {
        it('It Should DELETE a Movie Given By Id', (done) => {

            chai.request(server)
                .delete('/api/movie/'+movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });

    });

});