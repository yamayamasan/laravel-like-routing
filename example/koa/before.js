'use strict';
/**
 * before action
 */

module.exports = function *(next) {
  console.log('before action');
  yield next;
}
