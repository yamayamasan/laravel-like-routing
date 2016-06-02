'use strict';

const _ar = require('auto-requires');
const LLRouter = require('../../laravel-like-router')({
  loader: _ar({
    root: __dirname,
    path: 'ctrl',
    jointype: 'object'
  })
});
const before = require('./before');

// http://domain/
LLRouter.get('', function *() {
  this.body = 'hello, this is index page';
});

LLRouter.group('user', {'before': before}, () => {
// http://domain/user/:id
  LLRouter.get(':id', 'user.index');
});

module.exports = LLRouter.getRules();
