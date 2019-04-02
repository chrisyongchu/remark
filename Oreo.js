/**
 * ----------------------------------------------------------------------------
 * Name: Oreo Theme
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Theme Version: 1.12
 * Last Update: 01/04/2019
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
        .searchable(wrapper)
        .tabbable(wrapper);
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
    },
    tabbable: function () {
      if (this.options.tabbable) {
        $js.ajax({
          context: document.body
        }).done(function () {
          $js('.setRowColClass').find('.form-group:not(:first)').each(function () {
            var _row = $js(this).closest('.row').attr('id');
            $js(this).children().first().append(
              '<div class="tabbable-container">Tabbable: ' +
                '<button class="toggle-tabbable" for="' + _row + '"><i class="fa fa-toggle-off"></i></button>' +
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

$js(function () {

  var Element = {
    PEOPLE: '.thumbOuter',
    PEOPLELIST: '.filterPeopleList',
    ROWCLASSICON: '.rowColClassico',
    SEARCHABLE: '.searchable'
  };
  var Event = {
    CLICK: 'click',
    KEYUP: 'keyup'
  }

  // Case insensitive contains selector
  jQuery.expr[':'].icontains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
  };

  // TrueType Search for People Module
  $js(document).on(Event.KEYUP, Element.PEOPLELIST, function(e) {
    var s = $js(this).val().trim(),
    result = $js(this).parents(Element.SEARCHABLE).find(Element.PEOPLE);

    if (s === '') {
      result.show();
      return true;
    }

    result.not(':icontains(' + s + ')').hide();
    result.filter(':icontains(' + s + ')').show();
  });

  $js(document).on(Event.CLICK, Element.ROWCLASSICON, function () {
    $js(this).closest('li').find('input[type="text"]').each(function () {
      var _icons = $js(this).parent().prev().find('.toggle-tabbable i');
      ($js(this).val() === 'oreo-tabs') ? _icons.addClass('fa-toggle-on') : _icons.removeClass('fa-toggle-on');
    });
  });

  $js(document).on(Event.CLICK, '.toggle-tabbable', function (e) {
    e.preventDefault();
    var _input = $js(this).closest('.form-group').find('input[type="text"]');
    $js(this).children().toggleClass('fa-toggle-on');
    (_input.val() === 'oreo-tabs') ? _input.val('') : _input.val('oreo-tabs');
  });

});
