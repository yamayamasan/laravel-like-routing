# laravel-like-routing

for node.js verison over 4.2.0

# Installation
```sh
npm install yamayamasan/laravel-like-router
```

# Usage

```js:sample
const LLRouter = require('laravel-like-router')();

LLRouter.get('top', () => {});

LLRouter.get('after/auth', { 'before': () => {} }, () => {});

LLRouter.group('user', { 'before': () => {} }, () => {
  // GET /user/:id
  LLRouter.get(':id', () => {});
  // POST /user/
  LLRouter.post('', { 'before': null },() => {});
  // PUT /user/:id
  LLRouter.put(':id', () => {});
  // DELETE /user/:id
  LLRouter.del(':id', () => {});
});

const rules = LLRouter.getRules();
// => [
//  { path: '/top', ctrl: [Function], method: 'get', before: '' },
//  { path: '/after/auth', ctrl: [Function], method: 'get', before: [Function] },
//  { path: '/user/:id', ctrl: [Function], method: 'get', before: [Function] },
//  { path: '/user/', ctrl: [Function], method: 'post', before: null },
//  { path: '/user/:id', ctrl: [Function], method: 'put', before: [Function] },
//  { path: '/user/:id', ctrl: [Function], method: 'del', before: [Function] } 
//]
```

# Usage for use auto_requires

```sh
npm install yamayamasan/auto-requires
```

```js:sample
const _ar = require('auto-requires');
const LLRouter = require('laravel-like-router')({
  loader: _ar({
    root: `${__dirname}/app`,
    path: 'ctrl',
    jointype: 'object'
  })
});

// top.index => __dirname/app/ctrl/top.js: Function: index
LLRouter.get('top', 'top.index');

const rules = LLRouter.getRules();
// => [ { path: '/top', ctrl: [Function], method: 'get', before: '' } ]
```
# Example for koa
exampe for koa
```sh
example/koa
```

use modules
* koa
* koa-router

before npm install ,depencies modules.
```sh
npm install koa
npm install koa-router
```

