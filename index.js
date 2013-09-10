
module.exports = sourceURL;

/**
 * Create an executable function with a `sourceURL`
 * mapping from the given `js`
 *
 * @api public
 * @param {String} js
 * @param {Array} [args] Arguments the function will accept
 * @param {String} url Mapping URL
 * @return {String}
 */

function sourceURL(js, args, url) {
  if (typeof args === 'string') {
    url = args;
    args = null;
  }

  var source = String(js);

  source += '\n\n';
  source += '//@ sourceURL=' + url;

  var fn = 'Function(';
  if (args && args.length) {
    // add arguments
    fn += '"' + args.join('","') + '",\n';
  }
  fn += JSON.stringify(source);
  fn += ')';

  return fn;
}
