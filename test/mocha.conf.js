/* eslint-disable import/no-extraneous-dependencies, prefer-promise-reject-errors */

import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

global.sandbox = sinon.sandbox.create();

global.expect = chai.expect;

global.sinon = sinon;
global.spy = sinon.spy;
global.stub = sinon.stub;

global.promiseStub = sandbox.spy(a => (a
  ? Promise.resolve('resolved')
  : Promise.reject('rejected')
));

global.dispatchStub = sandbox.spy(a => a);
