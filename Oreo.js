/**
 * ----------------------------------------------------------------------------
 * Name: Oreo Theme
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Theme Version: 1.5
 * Last Update: 29/03/2019
 */

window.theme = {};

// Oreo Theme Common Functions
window.theme.fn = {
  getOptions: function(options) {
    if (typeof(options) == 'object') {
      return options
    } else if (typeof(options) == 'string') {
      try {
        return JSON.parse(options.replace(/'/g,'"').replace(';',''));
      } catch(e) {
        return {};
      }
    } else {
      return {};
    }
  }
};

(function (theme, $js) {
  theme = theme || {};
  var themeName = 'oreo';
  var themeKey  = 'data-theme';
  
  var Oreo = function (wrapper) {
    this.wrapper = wrapper;
    this
      .init(wrapper)
      .checkboxes();
    return this;
  };

  Oreo.prototype = {
    init: function (wrapper) {
      wrapper.attr(themeKey, themeName);
      return this;
    },
    checkboxes: function() {
      var _checkbox = $js('[type="checkbox"]').attr('data-oreo-theme', 'checkbox');
      $js(document).ajaxComplete(function () {
        var inputs = $js('[type="checkbox"]');
        inputs.attr('data-oreo-theme', 'checkbox');
        inputs.closest('td, th').addClass('checkbox-custom').append('<span></span>');
      });
    }
  };

  // expose to scope
  $js.extend(theme, { Oreo: Oreo });

  // theme plugin
  $js.fn.themeOreo = function (options) {
    var wrapper = this[0].className;
    return new Oreo(this, wrapper);
  };

}).apply(this, [window.theme, jQuery]);

$js(function () {
/**
 * Constants
 */

  var Event = {
    CLICK: 'click'
  }

  $js('body').themeOreo();

  $js('.templateheader .checkbox label').on(Event.CLICK, function () {
    ($js(this).siblings().is(':checked')) ? $js(this).siblings().prop('checked', false) : $js(this).siblings().prop('checked', true);  
  });

  $js(document).ajaxComplete(function () {
    $js('td.checkbox-custom span, th.checkbox-custom span').on(Event.CLICK, function () {
      _checkbox = $js(this).prev();
      _checkbox.is(':checked') ? _checkbox.prop('checked', false) : _checkbox.prop('checked', true);
    });      
  });

});
