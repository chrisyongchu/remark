/**
 * ----------------------------------------------------------------------------
 * Name: Remark Theme for HighQ Publisher 5.x
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Theme Version: 2.0
 * Last Update: 05/04/2019
 */

window.themes = {};

// Remark Theme Common Functions
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
  var themeKey = 'data-remark-theme';
  var Attribute$1 = {
    ID: 'id'
  };
  var ClassName$1 = {
    BOXED_LAYOUT: 'remark-layout-boxed',
    PRETTYPANELS: 'remark-pretty-panels',
    SEARCHABLE: 'searchable'
  };
  var Element$1 = {
    COMPONENTS: '[id^="componentRender"]',
    CONTACT_COMP: '.contact_comp',
    FORM_GROUPS: '.form-group:not(:first)',
    ROW: '.row',
    ROW_CLASS: '.form-group:first',
    ROW_COLUMN: '.setRowColClass'
  };
  
  var Remark = function (wrapper, options) {
    return this.init(wrapper, options)
  };

  Remark.defaults = {
    theme: 'default',
    boxed: false,
    panels: false,
    placeholder: 'Search',
    searchable: false,
    tabbable: false,
    timeline: false
  };

  Remark.prototype = {
    init: function (wrapper, options) {
      this
        .setOptions(options)
        .build(wrapper)
        .searchable(wrapper)
        .tabbable(wrapper)
        .timeline(wrapper);
      return this;
    },
    setOptions: function (options) {
      this.options = $js.extend(true, {}, Remark.defaults, options);
      return this;
    },
    build: function (wrapper, options) {

      if (this.options.theme) {
        wrapper.attr(themeKey, this.options.theme);
      }

      if (this.options.panels) {
        wrapper.addClass(ClassName$1.PRETTYPANELS);
      }

      if (this.options.boxed) {
        wrapper.addClass(ClassName$1.BOXED_LAYOUT);
      }

      return this;
    },
    searchable: function (wrapper, options) {
      var _placeholder = this.options.placeholder

      if (this.options.searchable) {
        // wait for ajax component to finish loading.
        $js.ajax({
          context: document.body
        }).done(function () {
          wrapper.find(Element$1.CONTACT_COMP).each(function () {
            $js(this).closest(Element$1.COMPONENTS).addClass(ClassName$1.SEARCHABLE);
            $js(this).children().first().after(
              '<div class="row">' +
                '<div class="col-xs-12">' +
                  '<input type="text" class="filterPeopleList form-control margBott20" placeholder="' + _placeholder + '">' +
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
          $js(Element$1.ROW_COLUMN).find(Element$1.FORM_GROUPS).each(function () {
            var _row = $js(this).closest(Element$1.ROW).attr(Attribute$1.ID);

            $js(this).children().first().append(
              '<div class="tabbable-container">Tabbable: ' +
                '<button class="toggle-tabbable" for="' + _row + '"><i class="fa fa-toggle-off"></i></button>' +
              '</div>'
            );
          });
        });
      }

      return this;
    },
    timeline: function () {
      
      if (this.options.timeline) {
        $js.ajax({
          context: document.body
        }).done(function () {
          $js(Element$1.ROW_COLUMN).find(Element$1.ROW_CLASS).each(function () {
            var _row = $js(this).closest(Element$1.ROW).attr(Attribute$1.ID);
            var _singleCol = $js(this).closest(Element$1.ROW).find('.icon-highq-columns + .dropdown-menu li:first').hasClass('activesection'); // only if single column.
            
            if (_singleCol) {
              $js(this).children().first().append(
                '<div class="timeline-container">Timeline: ' +
                  '<button class="toggle-timeline" for="' + _row + '"><i class="fa fa-toggle-off"></i></button>' +
                '</div>'
              );
            }

          });
        });
      }

      return this;
    }
  };

  // theme plugin
  $js.fn.remarkable = function (options) {
    var wrapper = this;
    return new Remark(wrapper, options);
  };

}).apply(this, [window.themes, jQuery]);

$js(function () {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var AUTHOR = "Christopher Yongchu";
  var COMPANY = "HighQ Solutions, Ltd.";
  var NAME = "Remark for HighQ Publisher 5.x";
  var ESCAPE_KEYCODE = 27; // keyboard value for esc key
  var Attribute = {
    DATA_REMARK_KEY: 'data-remark',
    DISABLED: 'disabled',
    ID: 'id',
    PANEL: 'panel_',
    NAME: 'name',
    NAV_TABS: 'nav-tabs',
    TAB: 'tabpanel',
    TAB_LIST: 'tablist',
    ROLE: 'role',
    SINGLE_COL: 'col_xl'
  };
  var ClassName = {
    ACTIVE: 'active',
    FADE: 'tab-pane fade',
    PANEL: 'tab-content',
    HIDE: 'hide',
    SHOW: 'active in',
    TABBABLE: 'toggle-tabbable',
    TOGGLE_ON: 'fa-toggle-on'
  };
  var Element = {
    DATA_TAB_KEY: '[data-remark="nav-tabs"]',
    CONTAINER: '<div class="tab-content"></div>',
    FORMGROUP: '.form-group',
    MAINTITLE: '.MainTitle',
    NAV_TABS: '<ul class="nav nav-tabs" data-remark="nav-tabs"></ul>',
    PEOPLE: '.thumbOuter',
    PEOPLELIST: '.filterPeopleList',
    ROWCLASSICON: '.rowColClassico',
    REMARK: '.remark-tabs',
    REMARK_PANEL: '.remark-tabs .sortable-list',
    ROW: '.row',
    SEARCHABLE: '.searchable',
    TOGGLER: '.toggle-tabbable, .toggle-timeline',
    TABBABLE_ICON: '.toggle-tabbable i',
    TIMELINE_ICON: '.toggle-timeline i',
    TEXTINPUT: 'input[type="text"]',
    TITLE: '.Titletxt'
  };
  var Event = {
    CLICK: 'click',
    KEYUP: 'keyup'
  };
  var Selector = {
    CONTAINER: '.tab-content',
    PANEL: '.tab-content div',
    ROW_BUTTONS: '.rowControls .icon-highq-columns + .dropdown-menu a',
    TIMELINE_CONTAINER: '.timeline-container',
    TITLE: '.Titletxt'
  };
  var Template = {
    NAV_TABS: '<ul class="nav nav-tabs" data-remark="nav-tabs"></ul>'
  };
  var Value = {
    REMARK_TABS: 'remark-tabs',
    TIMELINE: 'remark-timeline'
  };

  function createTabs(Titletxt, index, _column, _row) {
    var _tabs = $js(Element.DATA_TAB_KEY);
    var _cID = $js(_column).attr(Attribute.ID);
    var _columnObj = "#" + $js(_column).attr(Attribute.ID);
    var _rID = $js(_row).attr(Attribute.ID);
    var _rowObj = "#" + $js(_row).attr(Attribute.ID);

    if (_row) {
     $js(_rowObj).each(function () {
       var _this = $js(this);
       _this.find(_columnObj).each(function () {
         $js(this).find(_tabs).append(
           '<li class="nav-item">' +
             '<a class="nav-link" id="' + _rID + _cID + 'tab' + index + '" data-toggle="tab" role="tab" href="#panel_' + _rID + _cID + index + '">' + $js(Titletxt).html() + '</a>' +
           '</li>'
          );
       });
     });
    }

    _tabs.each(function () {
     $js(this).children().first().addClass(ClassName.ACTIVE);
    });
  }

  function createPanels(obj, colID) {
    var _first = obj.find(Selector.CONTAINER).children().first();

    if (colID) {
      obj.find(Selector.CONTAINER).children().each(function (index) {
        var _this = $js(this);
         var _parentRow = _this.closest(Element.ROW).attr(Attribute.ID);
         var _panelColumn = $js(this).closest(Element.REMARK).attr(Attribute.ID);
         _this.attr(Attribute.ID, Attribute.PANEL + _parentRow + _panelColumn + index);
         _this.attr(Attribute.ROLE, Attribute.TAB).addClass(ClassName.FADE);
         _first.addClass(ClassName.SHOW);
       });
       
       $js(Element.REMARK).each(function () {
         $js(this).find(Selector.CONTAINER).children().first().addClass(ClassName.SHOW);
       });
    }
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
    $js(this).closest('li').find(Element.TEXTINPUT).each(function () {
      var _tabbable = $js(this).parent().prev().find(Element.TABBABLE_ICON);
      var _timeline = $js(this).parent().prev().find(Element.TIMELINE_ICON);

      if (_tabbable.length) {
        ($js(this).val().includes(Value.REMARK_TABS)) ? 
          (
            _tabbable.addClass(ClassName.TOGGLE_ON), 
            $js(this).attr(Attribute.DISABLED, true)
          ) :
          (
            _tabbable.removeClass(ClassName.TOGGLE_ON), 
            $js(this).attr(Attribute.DISABLED, false)
          );
      } else if (_timeline.length) { 
        ($js(this).val().includes(Value.TIMELINE)) ? 
          (
            _timeline.addClass(ClassName.TOGGLE_ON), 
            $js(this).attr(Attribute.DISABLED, true)
          ) :
          (
            _timeline.removeClass(ClassName.TOGGLE_ON), 
            $js(this).attr(Attribute.DISABLED, false)
          );
      } else {
        $js(this).attr(Attribute.DISABLED, false);
      }

    });
  });

  $js(document).on(Event.CLICK, Element.TOGGLER, function (event) {
    event.preventDefault();
    event.stopPropagation();

    var _input = $js(this).closest(Element.FORMGROUP).find(Element.TEXTINPUT);

    $js(this).children().toggleClass(ClassName.TOGGLE_ON);

    if ($js(this).hasClass(ClassName.TABBABLE)) {
      (_input.val().includes(Value.REMARK_TABS)) ? 
        (
          _input.val(function (index, value) { return _input.val().replace(' remark-tabs', '') }), 
          _input.attr(Attribute.DISABLED, false)
        ) : 
        (
          _input.val(function (index, value) { return value + ' remark-tabs' }), 
          _input.attr(Attribute.DISABLED, true)
        );   
    } else {
      (_input.val().includes(Value.TIMELINE)) ? 
        (
          _input.val(function (index, value) { return _input.val().replace(' remark-timeline', '') }), 
          _input.attr(Attribute.DISABLED, false)
        ) : 
        (
          _input.val(function (index, value) { return value + ' remark-timeline' }), 
          _input.attr(Attribute.DISABLED, true)
        ); 
    }
      
  });

  $js(document).on(Event.CLICK, Selector.ROW_BUTTONS, function () {
    var _name = $js(this).attr(Attribute.NAME);

    (_name == Attribute.SINGLE_COL) ? 
      ($js(Selector.TIMELINE_CONTAINER).show()) : 
      (
        $js(Selector.TIMELINE_CONTAINER).hide(),
        $js(Selector.TIMELINE_CONTAINER).parent().next().find(Element.TEXTINPUT).val(''),
        $js(Selector.TIMELINE_CONTAINER).parent().next().find(Element.TEXTINPUT).prop(Attribute.DISABLED, false)
      );

  });

  if ($js(Element.REMARK).length) {
    // Check to make sure '.remark-tabs' is in DOM before building tabs and tab panes.
    $js(Element.REMARK_PANEL).addClass(ClassName.PANEL);
    $js(Element.REMARK_PANEL).before(Template.NAV_TABS);

    // Using $.ajax() to construct tabs and panels after ajax content is done loading.
    $js.ajax({
      context: document.body
    }).done(function () {
      var _element = $js(Element.REMARK);

      $js(Element.REMARK_PANEL).find(Element.TITLE).each(function (index) {
        var _column = $js(this).closest(Element.REMARK);
        var _row = $js(this).closest(Element.ROW);

        createTabs(this, index, _column, _row);
      });
      var colID = $js(Element.REMARK).each(function () {
        $js(this).parent(Element.COLUMN).attr(Attribute.ID);
      });
      
      createPanels(_element, colID);
    });
  }

});
