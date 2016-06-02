'use strict';

const LLRouter = require('../laravel-like-router')();
const _ar = require('auto-requires');
const expect = require('chai').expect;

const urls = {
    user: [
      {path: '/user/:id', method: 'put'},
      {path: '/user/:id', method: 'post'},
      {path: '/user/:id', method: 'put'},
      {path: '/user/:id', method: 'del'},
    ]
};


describe("Tst laravel-like-router", () => {

  beforeEach((done) => {
    LLRouter.clearRule();
    done();
  });

  it ('test:', () => {
    // GET /top
    LLRouter.get('top', () => {});

    LLRouter.group('user', () => {
      // GET /user/:id
      LLRouter.get(':id', () => {});
      // POST /user/
      LLRouter.post('', () => {});
      // PUT /user/:id
      LLRouter.put(':id', () => {});
      // DELETE /user/:id
      LLRouter.del(':id', () => {});
    });

    const rules = LLRouter.getRules();
    expect(rules[0]).to.have.deep.property('path').and.equal('/top');
    expect(rules[0]).to.have.deep.property('method').and.equal('get');
    expect(rules[3]).to.have.deep.property('path').and.equal('/user/:id');
    expect(rules[3]).to.have.deep.property('method').and.equal('put');
  });

  it ('use auto-requires:', () => {
    const LLRouter_ar = require('../laravel-like-router')({
      loader: _ar({
        root: `${__dirname}/app`,
        path: ['ctrl'],
        jointype: 'object'
      }),
    });

    LLRouter_ar.get('top', 'top.index');

    LLRouter_ar.get('admin', 'admin.index.index');

    const rules = LLRouter_ar.getRules();
    expect(rules[0]).to.have.deep.property('path').and.equal('/top');
    expect(rules[0]).to.have.deep.property('method').and.equal('get');
    expect(rules[1]).to.have.deep.property('path').and.equal('/admin');
    expect(rules[1]).to.have.deep.property('method').and.equal('get');
  });

  it ('use before action:', () => {
    LLRouter.get('after/auth', {'before': () => {}}, ()=>{});

    LLRouter.group('user', {'before': () =>{}},() => {
      // GET /user/:id
      LLRouter.get(':id', () => {});
      // POST /user/
      LLRouter.post('', () => {});
      // PUT /user/:id
      LLRouter.put(':id', () => {});
      // DELETE /user/:id
      LLRouter.del(':id', () => {});
    });
    const rules = LLRouter.getRules();
    rules.forEach((v) => {
      expect(v).to.have.deep.property('before').that.is.an('function');
    });
  });
});
