/**
 * ----------------------------------------------------------------------------
 * Oreo Theme (v1.1): Oreo.js 
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Last Update: 28/03/2019
 */

(function ($js) {
  $js.fn.oreo = function(options) {

    var defaults = {

    };

    var settings = $js.extend({}, defaults, options);

    return $js('input[type="checkbox"]').each(function () {
      var _checkbox = $js(this);
      _checkbox.parent().addClass('checkbox-custom');
    });

  };

})(jQuery);

$js(function () {
  $js('input[type="checkbox"]').oreo();
});


