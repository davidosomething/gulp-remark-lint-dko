/**
 * gulp-remark-lint-dko
 */

'use strict';

var through    = require('through2');
var remark     = require('remark');
var remarkLint = require('remark-lint');
var toVFile    = require('convert-vinyl-to-vfile');
var stylish    = require('vfile-reporter');


/**
 * mdlint
 *
 * @param {Object} options
 */
var mdlint = function (options) {
  options = options || {};

  var processor = remark.use(remarkLint, options.rules);

  /**
   * lintVinyl
   *
   * @param {Vinyl} vinyl
   * @param {String} encoding
   * @param {Function} callback after processing stream
   */
  var lintStream = through.obj(function lintVinyl(vinyl, encoding, callback) {
    if (vinyl.isNull()) {
      return callback();
    }

    if (vinyl.isStream()) {
      this.emit('error', new Error('Streams are not supported!'));
      return callback();
    }

    var vfile = toVFile(vinyl);

    /**
     * processDone
     *
     * @param {Error} err
     * @param {VFile} doc result
     * @param {VFile} file original VFile
     */
    var processDone = function (err, doc, file) {
      vinyl.lintResult = doc;
      this.push(vinyl);
      callback(err);
    }.bind(this);

    processor.process(vfile, processDone);
  });

  return lintStream;
};


/**
 * report
 */
mdlint.report = function () {

  /**
   * report
   *
   * @param {Vinyl} vinyl
   * @param {String} encoding
   * @param {Function} callback Callback function
   */
  var reportStream = through.obj(function report(vinyl, encoding, callback) {
    if (vinyl.isNull()) {
      return callback();
    }

    if (vinyl.isStream()) {
      this.emit('error', new Error('Streams are not supported!'));
      return callback();
    }

    process.stdout.write('\n' + stylish(vinyl.lintResult) + '\n');

    this.push(vinyl);
    callback();
  });

  return reportStream;
};


module.exports = mdlint;
