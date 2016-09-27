var request = require('supertest');

// please make sure mongodb is running on localhost
// TODO: add more test
describe('loading express', function () {
    var server;

    before(function () {
        server = require('../bin/www');
    });

    after(function (done) {
        server.close(done);
    });

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('responds to /users', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('responds to /feeds', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
});