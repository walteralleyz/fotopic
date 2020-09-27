const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const baseURL = 'http://localhost:5000';

describe('/user requests test', () => {
    it('Try to read a user without token header', done => {
        chai.request(baseURL)
        .get('/user/1')
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(401);

            done();
        })
    });

    it('Try to read a user with token, but wrong id', done => {
        chai.request(baseURL)
        .get('/user/1')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.ODQwOA.4XSOh6IFQuML9XAmTZPyt-cIcdJ6D5JVypE5LxO1xQU')
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);

            done();
        })
    });

    it('Try to read a user correctly', done => {
        chai.request(baseURL)
        .get('/user/4')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.ODQwOA.4XSOh6IFQuML9XAmTZPyt-cIcdJ6D5JVypE5LxO1xQU')
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('email');

            done();
        })
    });

    it('Try to create a user without name', done => {
        chai.request(baseURL)
        .post('/user/signup')
        .send({ email: 'rafael@client.com' })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);

            done();
        });
    });

    it('Try to create a user without email', done => {
        chai.request(baseURL)
        .post('/user/signup')
        .send({ name: 'rafael' })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);

            done();
        });
    });

    it('Try to create a user without data', done => {
        chai.request(baseURL)
        .post('/user/signup')
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);

            done();
        });
    });

    it('Try to create a user correctly', done => {
        const num = Math.floor(Math.random() * 99);

        chai.request(baseURL)
        .post('/user/signup')
        .send({ name: 'rafael' + num, email: 'rafael@client' + num + '.com' })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('email');

            done();
        });
    });
})