/**
 * ----------------------------------------------------------------------------
 * Name: Oreo Theme
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Theme Version: 1.9
 * Last Update: 31/03/2019
 */

window.themes = {};

// Oreo Theme Common Functions
window.themes.fn = {
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
;(function (themes, $js) {
  themes = themes || {};
  var themeKey = 'data-oreo-theme';
  
  var Oreo = function (wrapper, options) {
    return this.init(wrapper, options)
  };

  Oreo.defaults = {
    theme: 'default',
    boxed: false,
    panels: false,
    searchable: false,
    tabbable: false
  };

  Oreo.prototype = {
    init: function (wrapper, options) {
      this
        .setOptions(options)
        .build(wrapper)
        .searchable(wrapper);
      return this;
    },
    setOptions: function (options) {
      this.options = $js.extend(true, {}, Oreo.defaults, options);
      return this;
    },
    build: function (wrapper, options) {
      if (this.options.theme) {
        wrapper.attr(themeKey, this.options.theme);
      }
      if (this.options.panels) {
        wrapper.addClass('oreo-pretty-panels');
      }
      if (this.options.boxed) {
        wrapper.addClass('oreo-layout-boxed');
      }

      if (this.options.tabbable) {
        wrapper.find('.tabbable').each(function () {
          $js(this).closest('[id^="row"]');
        });
      }

      return this;
    },
    searchable: function (wrapper, options) {
      if (this.options.searchable) {
        // wait for ajax component to finish loading.
        $js.ajax({
          context: document.body
        }).done(function () {
          wrapper.find('.contact_comp').each(function () {
            $js(this).closest('[id^="componentRender"]').addClass('searchable');
            $js(this).children().first().after(
              '<div class="row">' +
                '<div class="col-xs-12">' +
                  '<input type="text" class="filterPeopleList form-control margBott20">' +
                '</div>' +
              '</div>'
            );
          });
        });
      }

      return this;
    }

  };

  // theme plugin
  $js.fn.themeOreo = function (options) {
    var wrapper = this;
    return new Oreo(wrapper, options);
  };

}).apply(this, [window.themes, jQuery]);
