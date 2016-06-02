'use strict';

const util = require('util');
const _ = require('lodash');

const LLRouting = function (options) {
  if (!(this instanceof LLRouting)) {
    return new LLRouting(options);
  }

  this.parent = '';
  this.before = '';
  this.rules  = [];
  this.methods = ['get', 'post', 'put', 'del'];
  this.options = {
    loader: null,
    loaderkey: null
  };

  if (options) Object.assign(this.options, options);

  if (this.options.loader && !this.options.loaderkey)
      this.options.loaderkey = Object.keys(this.options.loader)[0];

  this.methods.forEach((method) => {
    this[method] = (path, ...args) => {
      const variable = getVariableArgs(args);
      let before = this.before;
      let ctrl = variable.callback;
      if (variable.opt) before = variable.opt.before || null;

      if (this.options.loader && util.isString(ctrl)) {
        ctrl = _.get(this.options.loader[this.options.loaderkey], ctrl);
      }

      path = `${this.parent}/${trim(path)}`;
      const set = {path, ctrl, method, before};
      this.rules.push(set);
    };
  });
};

LLRouting.prototype.group = function (path, ...args) {
  const variable = getVariableArgs(args);

  if (variable.opt) this.before = variable.opt.before || null;

  if (!this.parent) this.parent = '';
  this.parent += `/${trim(path)}`;
  variable.callback();
  this.parent = '';
  this.before = null;
};

LLRouting.prototype.match = function (methods, path, ctrl) {
  if (!util.isArray(methods)) throw new Error("methods arg is only array");

  methods.forEach((v) => {
    this[v](path, ctrl);
  });
};

LLRouting.prototype.any = function (path, ctrl){
  this.methods.forEach((method) => {
    this[method](path, ctrl);
  });
};

LLRouting.prototype.getRules = function () {
  return this.rules;
};

LLRouting.prototype.clearRule = function () {
  this.rules = [];
};

function trim(path) {
  return path.replace(/^\/+|\/+$/g, '');
}

function getVariableArgs(args) {
    const r = {};
    if (args.length < 1) return r;
    args.forEach((v) => {
      if (!util.isObject(v)) r.callback = v;
      if (util.isObject(v)) r.opt = v;
    });

    return r;
}

module.exports = LLRouting;
