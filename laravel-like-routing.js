const util = require('util');
const _ = require('lodash');

class LLRouting {

  constructor(options) {
    this.parent = '';
    this.before = '';
    this.after = '';
    this.rules = [];
    this.methods = ['get', 'post', 'put', 'del'];
    this.options = {
      loader: null,
      loaderkey: null,
    };
    this.run(options);
  }

  run(options) {
    if (options) Object.assign(this.options, options);
    if (this.options.loader && !this.options.loaderkey) {
      this.options.loaderkey = Object.keys(this.options.loader)[0];
    }
    this.methods.forEach((method) => {
      this[method] = (orgpath, ...args) => {
        const variable = LLRouting.getVariableArgs(args);
        let before = this.before;
        let ctrl = variable.callback;
        let after = this.after;
        if (variable.opt) {
          before = variable.opt.before || null;
          after = variable.opt.after || null;
        }

        if (this.options.loader && util.isString(ctrl)) {
          ctrl = _.get(this.options.loader[this.options.loaderkey], ctrl);
        }
        const path = `${this.parent}/${LLRouting.trim(orgpath)}`;
        const set = { path, ctrl, method, before, after };
        this.rules.push(set);
      };
    });
  }

  group(path, ...args) {
    const variable = LLRouting.getVariableArgs(args);

    if (variable.opt) this.before = variable.opt.before || null;

    if (!this.parent) this.parent = '';
    this.parent += `/${LLRouting.trim(path)}`;
    variable.callback();
    this.parent = '';
    this.before = null;
  }

  match(methods, path, ctrl) {
    if (!util.isArray(methods)) throw new Error('methods arg is only array');

    methods.forEach((v) => {
      this[v](path, ctrl);
    });
  }

  any(path, ctrl) {
    this.methods.forEach((method) => {
      this[method](path, ctrl);
    });
  }

  getRules() {
    return this.rules;
  }

  clearRule() {
    this.rules = [];
  }

  static getVariableArgs(args) {
    const r = {};
    if (args.length < 1) return r;
    args.forEach((v) => {
      if (_.isString(v)) {
        r.callback = v;
      } else if (_.isFunction(v)) {
        r.callback = v;
      } else if (_.isObject(v)) {
        r.opt = v;
      }
    });
    return r;
  }

  static trim(path) {
    return path.replace(/^\/+|\/+$/g, '');
  }
}

module.exports = LLRouting;
