const expect = require('chai').expect;

// example for remember
describe('Simple math test', () => {
    it('Should return 2', () => {
        expect(1 + 1).to.equal(2);
    });

    it('Shold return 9', () => {
        expect(3 * 3).to.equal(9);
    });
});