/**
 * ----------------------------------------------------------------------------
 * Name: Oreo Theme
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Theme Version: 1.6
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

// the semi-colon before the function invocation is a safety net against concatenated scripts and/or 
// other plugins that may not be closed properly.
;(function (theme, $js) {
  theme = theme || {};
  var themeKey  = 'data-oreo-theme';
  
  var Oreo = function (wrapper, options) {
    return this.init(wrapper, options)
  };

  Oreo.defaults = {
    Theme: 'highq',
    checkBoxes: false
  };

  Oreo.prototype = {
    init: function (wrapper, options) {
      this
        .setOptions(options)
        .build(wrapper);
      return this;
    },
    setOptions: function (options) {
      this.options = $js.extend(true, {}, Oreo.defaults, options);
      return this;
    },
    build: function (wrapper, options) {
      var checkboxes = $js('[input="checkbox"]');

      if (this.options.Theme) {
        wrapper.attr(themeKey, this.options.Theme);
      }

      if (this.options.checkBoxes) {
        $js('[type="checkbox"]').attr('data-oreo', 'checkbox');

        // $js(document).ajaxComplete(function () {
        //   $js('td.checkbox-custom span, th.checkbox-custom span').on(Event.CLICK, function () {
        //     _checkbox = $js(this).prev();
        //     _checkbox.is(':checked') ? _checkbox.prop('checked', false) : _checkbox.prop('checked', true);
        //   });      
        // });
      }
      return this;
    }
  };

  // theme plugin
  $js.fn.themeOreo = function (options) {
    var wrapper = this;
    console.log(options);
    return new Oreo(wrapper, options);
  };

}).apply(this, [window.theme, jQuery]);

$js(function () {

  var Event = {
    CLICK: 'click'
  }

  $js('[data-oreo="checkbox"] + label').on(Event.CLICK, function () {
    ($js(this).siblings().is(':checked')) ? $js(this).siblings().prop('checked', false) : $js(this).siblings().prop('checked', true);  
  });

});
