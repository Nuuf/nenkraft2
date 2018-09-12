var version = require( './package.json' ).version;

module.exports = function () {

  return [
    '/**',
    '* @package     Nenkraft2',
    '* @author      Gustav \'Nuuf\' Åberg <gustavrein@gmail.com>',
    '* @version     ' + version,
    '* @copyright   (C) 2018 Gustav \'Nuuf\' Åberg',
    '* @license     {@link https://github.com/Nuuf/nenkraft2/blob/master/LICENSE}',
    '*/'
  ].join( '\n' );

};
