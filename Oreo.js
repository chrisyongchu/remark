/**
 * ----------------------------------------------------------------------------
 * Name: Oreo Theme
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Theme Version: 1.7
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
  var themeKey = 'data-oreo-theme';
  
  var Oreo = function (wrapper, options) {
    return this.init(wrapper, options)
  };

  Oreo.defaults = {
    Theme: 'highq',
    Boxed: false,
    PrettyPanels: false
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

      if (this.options.Theme) {
        wrapper.attr(themeKey, this.options.Theme);
      }

      if (this.options.PrettyPanels) {
        wrapper.addClass('oreo-pretty-panels');
      }

      if (this.options.Boxed) {
        wrapper.addClass('oreo-layout-boxed');
      }

      return this;
    }
  };

  // theme plugin
  $js.fn.themeOreo = function (options) {
    var wrapper = this;
    return new Oreo(wrapper, options);
  };

}).apply(this, [window.theme, jQuery]);
