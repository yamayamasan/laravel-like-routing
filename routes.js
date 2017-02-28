const LLrouting = require('./laravel-like-routing');

const routing = new LLrouting();

routing.get('top', () => {});

routing.group('user', { 'before': () =>{ console.log('before'); } }, () => {
  // GET /user/:id
  routing.get(':id', () => {});
  // POST /user/
  routing.post('', () => {});
  // PUT /user/:id
  routing.put(':id', () => {});
  // DELETE /user/:id
  routing.del(':id', () => {});
});

module.exports = routing.getRules();
