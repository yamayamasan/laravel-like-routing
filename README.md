# laravel-like-routing

for node.js verison over 4.2.0

# Installation
```sh
npm install yamayamasan/laravel-like-routing
```

# Usage

```js:sample
const routing = require('laravel-like-routing')();

routing.get('top', () => {});

routing.get('after/auth', { 'before': () => {} }, () => {});

routing.group('user', { 'before': () => {} }, () => {
  // GET /user/:id
  routing.get(':id', () => {});
  // POST /user/
  routing.post('', { 'before': null },() => {});
  // PUT /user/:id
  routing.put(':id', () => {});
  // DELETE /user/:id
  routing.del(':id', () => {});
});

const rules = routing.getRules();
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
const routing = require('laravel-like-router')({
  loader: _ar({
    root: `${__dirname}/app`,
    path: 'ctrl',
    jointype: 'object'
  })
});

// top.index => __dirname/app/ctrl/top.js: Function: index
routing.get('top', 'top.index');

const rules = routing.getRules();
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

