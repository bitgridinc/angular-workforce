var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

Object.defineProperty(protractor.promise.Promise.prototype, 'should', {
  get: Object.prototype.__lookupGetter__('should'),
  set: Object.prototype.__lookupSetter__('should')
});

describe('home page', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
  });

  it('should get home page title', function() {
    browser.get('/#/index');
    browser.getTitle().should.eventually.equal("BitGrid");
  });
});
