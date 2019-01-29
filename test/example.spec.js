const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

let data = 'Meli Test BFF';

describe('Automated Tests in Node.js with Mocha and Chai: ', () => {
    describe('Tests using Assert interface from Chai module: ', () => {
        it('Test example: Assert', done => {
            assert.typeOf(data, 'string');
            assert.equal(data, 'Meli Test BFF');
            assert.lengthOf(data, 13);
            done();
        });
    });
    describe('Tests using Expect interface from Chai module: ', () => {
        it('Test example: Expect', done => {
            expect(data).to.be.a('string');
            expect(data).to.equal('Meli Test BFF');
            expect(data).to.have.lengthOf(13);
            done();
        });
    });
    describe('Tests using Should interface from Chai module: ', () => {
        it('Test example: Should', done => {
            data.should.be.a('string');
            data.should.equal('Meli Test BFF');
            data.should.have.lengthOf(13);
            done();
        });
    });
});