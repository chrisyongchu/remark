/**
 * ----------------------------------------------------------------------------
 * Oreo Theme (v1.2): Oreo.js 
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Last Update: 28/03/2019
 */

(function (global, factory, $js) {
  // no dependencies.
})(this, function ($js, Oreo) { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperties(target, descriptor.key, descriptor);
    }
  }
  
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    return Constructor;
  }
});

$js(function () {

  $js.ajax({
    context: document.body
  }).done(function (){
    // the start of Oreo plugin.
  });
  
});


