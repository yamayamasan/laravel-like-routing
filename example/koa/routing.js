'use strict';

const _ar = require('auto-requires');
const routing = require('../../laravel-like-routing')({
  loader: _ar({
    root: __dirname,
    path: 'ctrl',
    jointype: 'object'
  })
});
const before = require('./before');

// http://domain/
routing.get('', function *() {
  this.body = 'hello, this is index page';
});

routing.group('user', {'before': before}, () => {
// http://domain/user/:id
  routing.get(':id', 'user.index');
});

module.exports = routing.getRules();
