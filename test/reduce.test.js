/* eslint-disable no-unused-expressions */
import * as reduce from '../src';

describe('action', () => {
  beforeEach(() => {
    sandbox.reset();
  });
  describe('overwrite', () => {
    it('replaces a value with the given one', () => {
      reduce.overwrite('prop')({ prop: 'other' }, { payload: 'val' })
        .should.have.property('prop', 'val');
    });
  });
  describe('merge', () => {
    it('merges the object with the state', () => {
      reduce.merge({ prop: 'other' }, { payload: { prop: 'val' } })
        .should.have.property('prop', 'val');
    });
  });
  describe('addError', () => {
    it('adds the value to the errors list', () => {
      reduce.addError({ prop: 'other' }, { error: 'error' })
        .errors.should.contain('error');
    });
  });
  describe('clearErrors', () => {
    it('adds the value to the errors list', () => {
      reduce.clearErrors({ errors: ['error'] })
        .errors.should.be.empty;
    });
  });
  describe('byType', () => {
    it('applies the function if it exists', () => {
      reduce.byType(
        { prop: 'init' },
        { type: reduce.overwrite('prop') },
      )(
        { prop: 'val' },
        { type: 'type', payload: 'new' },
      ).should.be.eql({ prop: 'new' });
    });
    it('returns the stat if the function does not exist', () => {
      reduce.byType(
        { prop: 'init' },
        { type: reduce.overwrite('prop') },
      )(
        { prop: 'val' },
        { type: 'something/else', payload: 'new' },
      ).should.be.eql({ prop: 'val' });
    });
    it('returns the init val if the state is undefined', () => {
      reduce.byType(
        { prop: 'init' },
        { type: reduce.overwrite('prop') },
      )(
        undefined,
        { type: 'something/else', payload: 'new' },
      ).should.be.eql({ prop: 'init' });
    });
  });
});
