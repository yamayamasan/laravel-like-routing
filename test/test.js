const LLrouting = require('../laravel-like-routing');
const _ar = require('auto-requires');
const expect = require('chai').expect;

const routing = new LLrouting();

const urls = {
  user: [
    { path: '/user/:id', method: 'put' },
    { path: '/user/:id', method: 'post' },
    { path: '/user/:id', method: 'put' },
    { path: '/user/:id', method: 'del' },
  ],
};


describe("Tst laravel-like-router", () => {

  beforeEach((done) => {
    routing.clearRule();
    done();
  });

  it ('test:', () => {
    // GET /top
    routing.get('top', () => {});

    routing.group('user', () => {
      // GET /user/:id
      routing.get(':id', () => {});
      // POST /user/
      routing.post('', () => {});
      // PUT /user/:id
      routing.put(':id', () => {});
      // DELETE /user/:id
      routing.del(':id', () => {});
    });

    const rules = routing.getRules();
    expect(rules[0]).to.have.deep.property('path').and.equal('/top');
    expect(rules[0]).to.have.deep.property('method').and.equal('get');
    expect(rules[3]).to.have.deep.property('path').and.equal('/user/:id');
    expect(rules[3]).to.have.deep.property('method').and.equal('put');
  });

  it ('use auto-requires:', () => {
    const LLrouting_ar = require('../laravel-like-routing');

    const routing_ar = new LLrouting_ar({
      loader: _ar({
        root: `${__dirname}/app`,
        path: ['ctrl'],
        jointype: 'object'
      }),
    });

    routing_ar.get('top', 'top.index');

    routing_ar.get('admin', 'admin.index.index');

    const rules = routing_ar.getRules();
    expect(rules[0]).to.have.deep.property('path').and.equal('/top');
    expect(rules[0]).to.have.deep.property('method').and.equal('get');
    expect(rules[1]).to.have.deep.property('path').and.equal('/admin');
    expect(rules[1]).to.have.deep.property('method').and.equal('get');
  });

  it ('use before action:', () => {
    routing.get('after/auth', {'before': () => {}, 'after': () => {}}, ()=>{});

    routing.group('user', {'before': () =>{}},() => {
      // GET /user/:id
      routing.get(':id', () => {});
      // POST /user/
      routing.post('', () => {});
      // PUT /user/:id
      routing.put(':id', () => {});
      // DELETE /user/:id
      routing.del(':id', () => {});
    });
    const rules = routing.getRules();
    rules.forEach((v, idx) => {
      if (idx === 0) {
        expect(v).to.have.deep.property('after').that.is.an('function');
      }
      expect(v).to.have.deep.property('before').that.is.an('function');
    });
  });
});
