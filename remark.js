/**
 * ----------------------------------------------------------------------------
 * Name: Remark Theme for HighQ Publisher 5.x
 * Author: Christopher Yongchu, christopher.yongchu@highq.com
 * Theme Version: 2.3.6
 * Last Update: 19/11/2019
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
  var themeKey = 'Remark';
  var Attribute$1 = {
    ID: 'id',
    REMARK_THEME: 'data-theme',
  };
  var ClassName$1 = {
    ACTIVE: "active",
    ACTIVESECTION: 'activesection',
    BOXED_LAYOUT: 'remark-layout-boxed',
    HIDE: 'hide',
    LAZY: 'lazyload',
    PRETTYPANELS: 'remark-pretty-panels',
    REMARKABLE: 'Remark',
    SEARCHABLE: 'searchable'
  };
  var Element$1 = {
    ACTIVE: ".active",
    COL1: '.icon-highq-columns + .dropdown-menu li:first',
    COMPONENTS: '[id^="componentRender"]',
    CONTACT: 'div[id^="contact"]',
    CONTACT_COMP: '.contact_comp',
    CONTACT_OUTTER: 'div[id^="contact"] .thumbOuter',
    HTML: 'html',
    HEAD: 'head',
    FORM_GROUP: '.form-group',
    FORM_GROUPS: '.form-group:not(:first)',
    LABEL: 'label',
    LOAD_BUTTON: '#loadMoreBtn',
    PEOPLE: '.ppl_vert',
    PEOPLE_CARDS: '.ppl_vert .thumbOuter',
    ROW: '.row',
    ROW_CLASS_ICO: '.rowColClassico',
    ROW_CLASS: '.form-group:first',
    ROW_COLUMN: '.setRowColClass',
    ROW_CONTROLS: '.rowControls',
    TEXTBOXES: '.form-group:not(:first) input[type="text"]',
    TAB_CONTAINER: '.tabbable-container',
    COLLAPSE_CONTAINER: '.collapsible-container',
    TIMELINE_CONTAINER: '.setRowColClass .timeline-container'
  };
  var Template$1 = {
    LOAD_BUTTON: '<button id="loadMoreBtn" class="btn btn-default">Load more</button>'
  };
  var Event$1 = {
    CLICK: 'click'
  };
  
  var Remark = function (wrapper, options) {
    return this.init(wrapper, options)
  };

  Remark.defaults = {
    collapsible: false,
    layout: 'default',
    lazyload: false,
    panels: false,
    placeholder: 'Search',
    searchable: false,
    tabbable: false,
    timeline: false
  };

  Remark.prototype = {
    init: function (wrapper, options) {
      $js(Element$1.HTML).addClass(ClassName$1.REMARKABLE);
      // insert FontAwesome;
      $js(Element$1.HEAD).append("<script src='//use.fontawesome.com/aedcb74114.js'></script>");

      this
        .setOptions(options)
        .build(wrapper)
        .searchable(wrapper)
        .tabbable(wrapper)
        .timeline(wrapper)
        .lazyload(wrapper)
        .collapsible(wrapper);
      return this;
    },
    setOptions: function (options) {
      this.options = $js.extend(true, {}, Remark.defaults, options);
      return this;
    },
    build: function (wrapper, options) {

      if (this.options.panels) {
        wrapper.addClass(ClassName$1.PRETTYPANELS);
      }
      
      if (this.options.layout == 'boxed') {
        console.log(this.options.layout);
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

          // Add tabbable toggle switch on new columns that didn't already exist.
          $js(document).on(Event$1.CLICK, Element$1.ROW_CLASS_ICO, function () {
            $js(this).next().find(Element$1.TEXTBOXES).each(function () {
              var _row = $js(this).closest(Element$1.ROW).attr(Attribute$1.ID);
              var tabbable_container = $js(this).closest(Element$1.FORM_GROUP).find(Element$1.TAB_CONTAINER);
              if (!tabbable_container.length) {
                $js(this).closest(Element$1.FORM_GROUP).find(Element$1.LABEL).append(
                  '<div class="tabbable-container">Tabbable: ' +
                    '<button class="toggle-tabbable" for="' + _row + '"><i class="fa fa-toggle-off"></i></button>' +
                  '</div>'
                );
              }
            });
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
            
            $js(this).children().first().append(
              '<div class="timeline-container">Timeline: ' +
                '<button class="toggle-timeline" for="' + _row + '"><i class="fa fa-toggle-off"></i></button>' +
              '</div>'
            );

            // Add timeline toggle switch on new columns that didn't already exist.
            $js(document).on(Event$1.CLICK, Element$1.ROW_CLASS_ICO, function () {
              $js(this).next().find(Element$1.ROW_CLASS).each(function () {
                var _row = $js(this).closest(Element$1.ROW).attr(Attribute$1.ID);
                var timeline_container = $js(this).closest(Element$1.FORM_GROUP).find('.timeline-container');
                if (!timeline_container.length) {
                  $js(this).closest(Element$1.FORM_GROUP).find(Element$1.LABEL).append(
                    '<div class="timeline-container">Timeline: ' +
                      '<button class="toggle-timeline" for="' + _row + '"><i class="fa fa-toggle-off"></i></button>' +
                    '</div>'
                  );
                }
              });
            });

            $js(this).closest(Element$1.ROW).find(Element$1.COL1).each(function () {
              var _singleCol = $js(this).hasClass(ClassName$1.ACTIVESECTION);
              var _timelines = $js(this).closest(Element$1.ROW_CONTROLS).find(Element$1.TIMELINE_CONTAINER);

              (_singleCol) ? _timelines.show() : _timelines.hide();

            }); // only if single column.
          });
        });
      }

      return this;
    },
    lazyload: function () {

      if (this.options.lazyload) {
        $js.ajax({
          content: document.body,
          success: function () {
            $js(Element$1.PEOPLE).addClass(ClassName$1.LAZY);
            $js(Element$1.CONTACT_OUTTER).slice(0, 12).addClass(ClassName$1.ACTIVE);
            $js(Element$1.CONTACT).after(Template$1.LOAD_BUTTON);

            // Hide each "Load more" button when the last card is shown.
            if ($js(Element$1.PEOPLE_CARDS).eq(-1).is(Element$1.ACTIVE)) {
              $js(Element$1.PEOPLE).each(function () {
                var _button = $js(this).find(Element$1.LOAD_BUTTON);
                _button.addClass(ClassName$1.HIDE);
              });
            }
          }
          
        });
      }

      return this;
    },
    collapsible: function () {

      if (this.options.collapsible) {
        $js.ajax({
          context: document.body
        }).done(function () {
          $js(Element$1.ROW_COLUMN).find(Element$1.FORM_GROUPS).each(function () {
            var _row = $js(this).closest(Element$1.ROW).attr(Attribute$1.ID);

            $js(this).children().first().append(
              '<div class="collapsible-container">Collapsible: ' +
                '<button class="toggle-collapsible" for="' + _row + '"><i class="fa fa-toggle-off"></i></button>' +
              '</div>'
            );
          });

          // Add tabbable toggle switch on new columns that didn't already exist.
          $js(document).on(Event$1.CLICK, Element$1.ROW_CLASS_ICO, function () {
            $js(this).next().find(Element$1.TEXTBOXES).each(function () {
              var _row = $js(this).closest(Element$1.ROW).attr(Attribute$1.ID);
              var collapsible_container = $js(this).closest(Element$1.FORM_GROUP).find(Element$1.COLLAPSE_CONTAINER);
              if (!collapsible_container.length) {
                $js(this).closest(Element$1.FORM_GROUP).find(Element$1.LABEL).append(
                  '<div class="collapsible-container">Collapsible: ' +
                    '<button class="toggle-collapsible" for="' + _row + '"><i class="fa fa-toggle-off"></i></button>' +
                  '</div>'
                );
              }
            });
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
    ACCORDION: 'accordion',
    DATA_REMARK_KEY: 'data-remark',
    DATA_TARGET: 'data-target',
    DATA_TOGGLE: 'data-toggle',
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
    ACCORDION: 'accordion',
    ACTIVE: 'active',
    FADE: 'tab-pane fade',
    HIDE: 'hide',
    PANEL: 'tab-content',
    PANEL_OPEN: 'panel-collapse collapse in',
    SHOW: 'active in',
    TABBABLE: 'toggle-tabbable',
    COLLAPSIBLE: 'toggle-collapsible',
    TOGGLE_ON: 'fa-toggle-on'
  };
  var Element = {
    ACTIVE_CARDS: '.ppl_vert .active',
    DATA_TAB_KEY: '[data-remark="nav-tabs"]',
    LI: 'li',
    LOADIMAGE: '.loadingsection',
    PEOPLE_CARDS: '.ppl_vert .thumbOuter',
    ROW_CONTROLS: '.rowControls',
    TEXTINPUT: 'input[type="text"]'
  };
  var Event = {
    CLICK: 'click',
    KEYUP: 'keyup'
  };
  var Selector = {
    COMPONENT: '[id^="component"]',
    CONTAINER: '.tab-content',
    DROPDOWN_MENU: '.dropdown-menu',
    FORMGROUP: '.form-group',
    LOAD_BUTTON: '#loadMoreBtn',
    NEXT_TEXTBOX: '.form-group:not(:first) input[type="text"]',
    PANEL: '.tab-content div',
    PEOPLE: '.thumbOuter',
    PEOPLELIST: '.filterPeopleList',
    COLLAPSIBLE: '.remark-collapsible',
    FIRST_COLLAPSIBLE: '.remark-collapsible .sortable-item:first-child .collapse',
    REMARK: '.remark-tabs',
    REMARK_PANEL: '.remark-tabs > .sortable-list',
    ROW: '.row',
    ROWCLASSICON: '.rowColClassico',
    ROW_BUTTONS: '.rowControls .icon-highq-columns + .dropdown-menu a',
    SEARCHABLE: '.searchable',
    SETROWCLASS: '.setRowColClass',
    TABMENU: '.tabmenu',
    TABBABLE_ICON: '.toggle-tabbable i',
    TABBABLE_CONTAINER: '.tabbable-container',
    TIMELINE_ICON: '.toggle-timeline i',
    TIMELINE_CONTAINER: '.timeline-container',
    COLLAPSIBLE_ICON: '.toggle-collapsible i',
    COLLAPSIBLE_CONTAINER: '.collapsible-container',
    MAINTITLE: '.MainTitle',
    TITLE: '.Titletxt',
    TITLEHIDDEN: '.MainTitle.Titlehide',
    TOGGLER: '.toggle-tabbable, .toggle-timeline, .toggle-collapsible',
  };
  var State = {
    ACTIVE: ".active"
  }
  var Template = {
    NAV_TABS: '<ul class="nav nav-tabs" data-remark="nav-tabs"></ul>',
    LOADING_IMG: '<div class="loadingsection"><img src="images/v4/common/gray-loaderbig.gif" alt="loading"></div>'
  };
  var Value = {
    REMARK_TABS: 'remark-tabs',
    COLLAPSIBLE: 'remark-collapsible',
    TIMELINE: 'remark-timeline'
  };

  function createTabs(Titletxt, index, column, row) {
    var tabs = $js(Element.DATA_TAB_KEY);
    var rowID = $js(row).attr(Attribute.ID);
    var _title = $js(Titletxt).html();
    var columnID = $js(column).attr(Attribute.ID);
    var parentRow = "#" + $js(row).attr(Attribute.ID);
    var relatedColumn = "#" + $js(column).attr(Attribute.ID);
    
    if (row) {
     $js(parentRow).each(function () {
       var _this = $js(this);
       _this.find(relatedColumn).each(function () {
         $js(this).find(tabs).append(
           '<li class="nav-item">' +
             '<a class="nav-link" id="' + rowID + columnID + 'tab' + index + '" data-toggle="tab" role="tab" href="#panel_' + rowID + columnID + index + '">' + _title + '</a>' +
           '</li>'
          );
       });
     });
    }

    tabs.each(function () {
      $js(this).children().first().addClass(ClassName.ACTIVE);
    });
  }

  function createPanels(obj, columnID) {
    var firstChild = obj.find(Selector.CONTAINER).children().first();

    if (columnID) {
      obj.find(Selector.CONTAINER).children().each(function (index) {
        var _this = $js(this);
        var parentRow = _this.closest(Selector.ROW).attr(Attribute.ID);
        var panelColumn = $js(this).closest(Selector.REMARK).attr(Attribute.ID);
      
        _this.attr(Attribute.ID, Attribute.PANEL + parentRow + panelColumn + index);
        _this.attr(Attribute.ROLE, Attribute.TAB).addClass(ClassName.FADE);
        firstChild.addClass(ClassName.SHOW);
        
      });
       
       // Set all first tab-panes to active state.
      $js(Selector.REMARK).each(function () {
        $js(this).find(Selector.CONTAINER).children().first().addClass(ClassName.SHOW);
      });

      $js(Element.LOADIMAGE).hide();
    }
  }

  // Case insensitive contains selector
  jQuery.expr[':'].icontains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
  };

  // TrueType Search for People Module
  $js(document).on(Event.KEYUP, Selector.PEOPLELIST, function(e) {
    var s = $js(this).val().trim();
    var result = $js(this).parents(Selector.SEARCHABLE).find(Selector.PEOPLE);

    // Hide "Load more" button if Lazyload and Searchable are both enabled.
    if ($js(Selector.LOAD_BUTTON).length) {
      $js(Selector.LOAD_BUTTON).hide();
    }

    if (s === '') {
      result.show();
      return true;
    }

    result.not(':icontains(' + s + ')').hide();
    result.filter(':icontains(' + s + ')').show();
  });

  $js(document).on(Event.CLICK, Selector.ROWCLASSICON, function () {
    $js(this).closest(Element.LI).find(Element.TEXTINPUT).each(function () {
      var _this = $js(this);
      var tabbable = _this.parent().prev().find(Selector.TABBABLE_ICON);
      var timeline = _this.parent().prev().find(Selector.TIMELINE_ICON);
      var collapsible = _this.parent().prev().find(Selector.COLLAPSIBLE_ICON);
      var tabbableContainer = _this.closest(Selector.FORMGROUP).find(Selector.TABBABLE_CONTAINER);
      var collapsibleContainer = _this.closest(Selector.FORMGROUP).find(Selector.COLLAPSIBLE_CONTAINER);

      // if tabbable is not called.
      if (!tabbable.length) { 
        _this.attr(Attribute.DISABLED, false);
        _this.val(function (index, value) { return _this.val().replace(' remark-tabs', ''); });
      }

      // if collapsible is no called.
      if (!collapsible.length) {
        _this.attr(Attribute.DISABLED, false);
        _this.val(function (index, value) { return _this.val().replace(' remark-collapsible', ''); });
      }

      // Check if 'remark-tabs' is in input[type="text"], if so:
      // 1. Set toggle icon to on
      // 2. Disable input[type="text"] for the related column
      if (tabbable.length || collapsible.length) {        
        if (tabbable.length && _this.val().includes(Value.REMARK_TABS)) {
          tabbable.addClass(ClassName.TOGGLE_ON); // 1
          _this.attr(Attribute.DISABLED, true); // 2
          collapsibleContainer.hide();
        } else if (collapsible.length && _this.val().includes(Value.COLLAPSIBLE)) {
          collapsible.addClass(ClassName.TOGGLE_ON);
          _this.attr(Attribute.DISABLED, true);
          tabbableContainer.hide();
        } else {
          tabbable.removeClass(ClassName.TOGGLE_ON); // if not, set toggle to off
          collapsible.removeClass(ClassName.TOGGLE_ON); // set collapse toggle to off too
          _this.attr(Attribute.DISABLED, false); // remove disabled attribute
        }
      } else if (timeline.length) { // Check if timeline is set on
        if (_this.val().includes(Value.TIMELINE)) {
          timeline.addClass(ClassName.TOGGLE_ON); // set toggle to on if 'remark-timeline' is 
          _this.attr(Attribute.DISABLED, true);   // on and disable input[type="text"] box.
          tabbableContainer.hide();
          collapsibleContainer.hide();
        } else {
          timeline.removeClass(ClassName.TOGGLE_ON);
          _this.attr(Attribute.DISABLED, false);
        }
      } else { // Remove disable attributes on all input[type="text"]
        _this.attr(Attribute.DISABLED, false);
      }

    });
  });

  $js(document).on(Event.CLICK, Selector.TOGGLER, function (event) {
    event.preventDefault();
    event.stopPropagation(); // prevent row/column class dropdown from closing when toggling tabs or timeline switches.

    var tabInput = $js(this).closest(Selector.DROPDOWN_MENU).find(Selector.NEXT_TEXTBOX);
    var isTabbable = $js(this).hasClass(ClassName.TABBABLE);
    var isCollapsible = $js(this).hasClass(ClassName.COLLAPSIBLE);
    var tabbableIcon = $js(this).closest(Selector.FORMGROUP).next().find(Selector.TABBABLE_ICON);
    var collasibleIcon = $js(this).closest(Selector.FORMGROUP).next().find(Selector.COLLAPSIBLE_ICON);
    var targetedInput = $js(this).closest(Selector.FORMGROUP).find(Element.TEXTINPUT);
    var tabbableContainer = $js(this).closest(Selector.FORMGROUP).next().find(Selector.TABBABLE_CONTAINER);
    var collapsibleContainer = $js(this).closest(Selector.FORMGROUP).next().find(Selector.COLLAPSIBLE_CONTAINER);
    var nextContainer = $js(this).closest(Selector.FORMGROUP).find(Selector.COLLAPSIBLE_CONTAINER);
    var prevContainer = $js(this).closest(Selector.FORMGROUP).find(Selector.TABBABLE_CONTAINER);

    $js(this).children().toggleClass(ClassName.TOGGLE_ON);

    if (isTabbable) {
      if (targetedInput.val().includes(Value.REMARK_TABS)) {
        targetedInput.val(function (index, value) { return targetedInput.val().replace(' remark-tabs', ''); });
        nextContainer.show();
        targetedInput.attr(Attribute.DISABLED, false);
      } else { 
        targetedInput.val(function (index, value) { return value + ' remark-tabs' } );
        targetedInput.attr(Attribute.DISABLED, true);
        nextContainer.hide();
      }   
    } else if(isCollapsible) {
      if (targetedInput.val().includes(Value.COLLAPSIBLE)) {
        targetedInput.val(function (index, value) { return targetedInput.val().replace(' remark-collapsible', ''); });
        targetedInput.attr(Attribute.DISABLED, false);
        prevContainer.show();
      } else {
        targetedInput.val(function (index, value) { return value + ' remark-collapsible' } );
        targetedInput.attr(Attribute.DISABLED, true);
        prevContainer.hide();
      }
    } else {
       if (targetedInput.val().includes(Value.TIMELINE)) {
        targetedInput.val(function (index, value) { return targetedInput.val().replace(' remark-timeline', ''); });
        targetedInput.attr(Attribute.DISABLED, false);
        tabbableContainer.show();
        collapsibleContainer.show();
       } else {
         
        // If timeline and tabbables/collapsible are both enabled and timeline is enabled in the row
        // 1. Remove all 'remark-tabs' in column class
        // 2. Remove all 'remark-collapsible' in column class
        // 3. Toggle button off so that it doesn't stick in case dashboard is save
        // 4. Remove disabled state of input[type="text"] in column
        // 5. Hide tabbable container
        // 6. Hide collapsible container
        targetedInput.val(function (index, value) { return value + ' remark-timeline' }); 
        targetedInput.attr(Attribute.DISABLED, true);
        tabInput.val(function (index, value) { tabInput.val().replace(' remark-tabs', ''); }); // 1
        tabInput.val(function (index, value) { tabInput.val().replace(' remark-collapsible', ''); }); // 2
        tabbableIcon.removeClass(ClassName.TOGGLE_ON); // 3
        collasibleIcon.removeClass(ClassName.TOGGLE_ON); // 3
        tabInput.attr(Attribute.DISABLED, false); // 4
        tabbableContainer.hide(); // 5
        collapsibleContainer.hide(); // 6
       }
    }
      
  });

  $js(document).on(Event.CLICK, Selector.ROW_BUTTONS, function () {
    var isName = $js(this).attr(Attribute.NAME);
    var timeline = $js(this).closest(Element.ROW_CONTROLS).children().siblings().find($js(Selector.TIMELINE_CONTAINER));
    var tabbable = $js(this).closest(Element.ROW_CONTROLS).children().siblings().find($js(Selector.TABBABLE_CONTAINER));
    var collapsible = $js(this).closest(Element.ROW_CONTROLS).children().siblings().find($js(Selector.COLLAPSIBLE_CONTAINER));
    var timelineInput = timeline.parent().next().find(Element.TEXTINPUT);
    
    // 1. Hide timeline option on row if user selects columns > 1
    // 2. Remove 'remark-timeline' from row class
    // 3. Remove disabled state on row's input[type="text"]
    // 4. Show tabbable container
    // 5. Show collapsible container
    if (isName == Attribute.SINGLE_COL) {
      timeline.show()
    } else {
      timeline.hide(); // 1
      timelineInput.val(function (index, value) { return timelineInput.val().replace(' remark-timeline', ''); });  // 2
      timelineInput.prop(Attribute.DISABLED, false); // 3
      tabbable.show(); // 4
      collapsible.show(); // 5
    }
  });

  if ($js(Selector.REMARK).length) {
    // Check to make sure '.remark-tabs' is in DOM before building tabs and tab panes.
    $js(Selector.REMARK_PANEL).addClass(ClassName.PANEL);
    $js(Selector.REMARK_PANEL).before(Template.NAV_TABS);
    $js(Selector.REMARK_PANEL).before(Template.LOADING_IMG);

    // Using $.ajax() to construct tabs and panels after all ajax content is done loading.
    $js.ajax({
      context: document.body,
      complete: function () {
        var _element = $js(Selector.REMARK);
        
        $js(Selector.REMARK_PANEL).find(Selector.TITLE).each(function (index) {
          var _this = $js(this);
          var column = _this.closest(Selector.REMARK);
          var row = _this.closest(Selector.ROW);
          createTabs(this, index, column, row);
        });
        var columnID = $js(Selector.REMARK).each(function () {
          $js(this).parent(Element.COLUMN).attr(Attribute.ID);
        });
        
        createPanels(_element, columnID);
      }
    })
  }

  if ($js(Selector.COLLAPSIBLE).length) {
    $js.ajax({
      context: document.body
    }).done(() => {
      $js(Selector.COLLAPSIBLE).children().addClass(ClassName.ACCORDION);

      $js(Selector.COLLAPSIBLE).find(Selector.MAINTITLE).each(function (index) {
        var _this = $js(this);
        var _siblings = _this.siblings();
        var column = _this.closest(Selector.COLLAPSIBLE).attr(Attribute.ID);
        var row = _this.closest(Selector.ROW).attr(Attribute.ID);
        var accordion = 'collapse' + index + column + row;

        $js(Selector.COLLAPSIBLE).children().attr(Attribute.ID, Attribute.ACCORDION + column + row);

        if (!_this.next(Selector.TABMENU).length) {
          // add panel heading trigger classes and attributes
          _this.attr({
            type : 'button',
            'data-target' : '#' + accordion,
            'data-toggle' : 'collapse',
            'aria-controls' : accordion,
            'aria-expanded' : 'true'
          });

          // add panel body attributes
          _this
            .next()
            .attr(Attribute.ID, accordion)
            .addClass(ClassName.PANEL_OPEN);
        }

      });
    });
  }


  $js(document).on(Event.CLICK, Selector.LOAD_BUTTON, function () {
    // Each time the "Load more" button is clicked, show the next 12 cards.
    $js(Element.ACTIVE_CARDS).last().nextAll().slice(0, 12).addClass(ClassName.ACTIVE);

    // Hide the "Load more" button when the last card is shown.
    if ($js(Element.PEOPLE_CARDS).eq(-1).is(State.ACTIVE)) {
      $js(Selector.LOAD_BUTTON).addClass(ClassName.HIDE);
    }
  });

  $js.ajax({
    context: document.body,
    complete: function () {
      var titlehide = $js(Selector.TITLEHIDDEN);
      if (titlehide.length) {
        titlehide.each(function () {
          $js(this).closest(Selector.COMPONENT).removeClass(function (index, className) {
            return (className.match(/(^|\s)fa-\S+/g) || []).join('');
          });
        });
      }
    }
  });

});