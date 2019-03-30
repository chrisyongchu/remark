/**
 * ----------------------------------------------------------------------------
 * Name: Oreo Theme
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Theme Version: 1.4
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
  var Attribute = {
    API_KEY: 'data-oreo-theme',
    CHECKBOX: 'checkbox'
  };
  var Element = {
    CHECKBOX: '[type="checkbox"]'
  };
  
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
      var _checkbox = $js(Element.CHECKBOX).attr(Attribute.API_KEY, Attribute.CHECKBOX);
      $js(document).ajaxComplete(function () {
        var inputs = $js('[type="checkbox"]');
        inputs.attr(Attribute.API_KEY, Attribute.CHECKBOX);
        inputs.closest('td, th').addClass('checkbox-custom').append('<span></span>');
      });
      $js.ajax({
        context: document.body
      }).done(function () {
        var inputs = $js('[type="checkbox"]');
        inputs.attr(Attribute.API_KEY, Attribute.CHECKBOX);
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

  $js(function () {
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

}).apply(this, [window.theme, jQuery]);
