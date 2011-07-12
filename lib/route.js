var inflector = require('./inflection.js');

exports.index = function(context){
  return '/' + inflector.pluralize(context);
}
