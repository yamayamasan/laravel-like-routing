'use strict';
/**
 * this example is minimum
 */
// koa modules
const app = require('koa')();
const router = require('koa-router')();

// routing
const routing = require('./routing');

routing.forEach((r) => {
  if (r.before) {
    router[r.method](r.path, r.before, r.ctrl);
  } else {
    router[r.method](r.path, r.ctrl);
  }
});

app.use(router.routes());

app.use(router.allowedMethods());

if (!module.parent) app.listen(9005);
