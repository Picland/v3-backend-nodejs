'use strict';

module.exports = (pandora) => {

  pandora
    .process('master')
    .scale('auto')
    .entry('./dist/main/server.js')

  /**
  * you can custom workers scale number
  */
  // pandora
  //   .process('worker')
  //   .scale('auto'); // .scale('auto') means os.cpus().length

  /**
   * you can also use fork mode to start application 
   */
  // pandora
  //   .fork('Earth', './dist/server.js');

  /**
   * you can create another process here
   */
  // pandora
  //   .process('background')
  //   .argv(['--expose-gc']);

  /**
   * more features please visit our document.
   * https://github.com/midwayjs/pandora/
   */

};