import * as action from '../src';


describe('action', () => {
  beforeEach(() => {
    sandbox.reset();
  });
  describe('noop', () => {
    it('adds type', () => {
      action.noop('test')().type.should.be.eql('test');
    });
  });
  describe('payload', () => {
    it('adds type', () => {
      action.payload('test')().type.should.be.eql('test');
    });
    it('saves the argument to the payload', () => {
      action.payload('test')('other').payload.should.be.eql('other');
    });
  });
  describe('error', () => {
    it('adds type', () => {
      action.error('test')('other').type.should.be.eql('test');
    });
    it('saves the argument to the payload', () => {
      action.error('test')('other').error.should.be.eql('other');
    });
  });
  describe('thunk', () => {
    it('calls action.payload when the promise resolves', () => {
      const act = action.thunk('load', promiseStub);
      return act(true)(dispatchStub).then((res) => {
        res.payload.should.be.eql('resolved');
      });
    });
    it('calls action.error when the promise resolves', () => {
      const act = action.thunk('load', promiseStub);
      return act(false)(dispatchStub).then((err) => {
        err.error.should.be.eql('rejected');
      });
    });
  });
});
