/*
 * `Basilico Interactive Cookie Alert` Plugin for jQuery
 * (aka bica)
 *
 * @author Dharma Ferrari
 * @link http://github.com/basilico
 * @created Apr 14th, 2015
 *
 * Description:
 *
 * Usage:
 */
(function($, namespace, window, document) {
  // Private
  var
    // Cache objects
    $wrapper,
    $window = $(window),
    // Settings container
    settings = {},
    // Default settings object
    defaults = {
      txtColor: '#000',
      btnTxtColor: '#fff',
      btnBgBackgrund: '#666',
      bgColor: '#ffffff', // this prop needs #rrggbb (full) notation
      bgOpacity: 0.9,
      style: 'stack',
      // Fetch language from <html:lang> attribute, or use default
      language: document.documentElement.lang || 'it',
      // Wait this ms before show up
      showAfter: 2000
    },
    // Private plugin settings
    plugin = {
      // i18n strings
      translations: {},
      // Plugin absolute path
      root: getAbsolutePath()
    };


  /**
   * Initializes plugin
   */
  var init = function( options ) {
    settings = $.extend({}, defaults, options);

    $.getJSON(plugin.root +'i18n/'+ settings.language +'.json', function(data) {
      plugin.translations = data[settings.language];
      if (data.status == 'OK') {
        $window.trigger('trans-loaded');
      } else {
        $window.trigger('trans-not-loaded');
      }
    });
  };

  /**
   * Add css style and wrapper
   */
  var manipulateDOM = function() {
    // Inject CSS
    $('head').append( $('<link rel="stylesheet" type="text/css"/>').attr('href', plugin.root +'css/cookie.css') );
    // Add container to body and cache it
    $wrapper = $('<div/>', {"id": namespace, "class": namespace})
      .css({"background": makeBackground(), "color": settings.txtColor})
      .load(plugin.root +'/view/info.html', function(){
        $window.trigger('view-loaded');
      })
      .prependTo('body')
    ;
  };

  function makeBackground() {
    if (settings.bgColor.length != 7) {
      notify(['HEX too short', settings.bgColor], 'error');
      return settings.bgColor;
    }
    var color = hex2rgb(settings.bgColor);
    color.push(settings.bgOpacity);
    return 'rgba('+ color.join(',') +')';
  }

  /**
   * Translates labels
   */
  var translateLabels = function() {
    $('[data-trans]').each(function() {
      this.innerText = plugin.translations[ this.attributes['data-trans'].value ];
    });
  };

  /**
   * Apply events
   */
  var applyEvents = function() {
    $wrapper.find('[data-action="dismiss"]')
      .on('click', function(){
        $wrapper.fadeOut('fast');
        setCookie('bica', 'user_approved');
      });
  };

  /**
   * Apply CSS styles
   */
  var applyStyles = function() {
    $wrapper.addClass(settings.style);
    $wrapper.find('[data-role="button"]')
      .css({"color": settings.btnTxtColor, "background": settings.btnBgBackgrund});
  };


  // Events
  $window.on('trans-loaded', manipulateDOM);
  $window.on('view-loaded', function(){
    applyEvents();
    applyStyles();
    translateLabels();
    $wrapper.delay(settings.showAfter).slideDown('medium');
  });


  // Run
  init();



  /**
   * Private function to get plugin absolute path
   * @return {string} Absolute url to plugin root
   */
  function getAbsolutePath() {
    var
      baseUrl = 'js/bica.js',
      src = $('script[src$="'+ baseUrl +'"]')[0].src;
    return src.replace(baseUrl, '');
  }

  /**
   * Private function for debugging
   * @param  {mixed} debugData
   */
  function debug( debugData ) {
    if ( window.console && window.console.log ) {
      window.console.log( debugData );
    }
  }

  /**
   * Private function for notify errors or warnings
   * @param  {string} message
   * @param  {type} type of notice (warn|error)
   */
  function notify( message, type ) {
    type = type || 'info';
    message = '['+ namespace.replace(/-/g,' ').toUpperCase()  +']: '+ message;
    if ( window.console && window.console[type] ) {
      console[type]( message );
    } else {
      alert( message );
    }
  }

  /**
   * Private function for converting colors from hex to rgb
   * @param  {string} color should be #rrggbb
   * @return {array}         rgb colors
   */
  function hex2rgb( color ){
    var
      hex = parseInt(color.substring(1), 16),
      r = (hex & 0xff0000) >> 16,
      g = (hex & 0x00ff00) >> 8,
      b = hex & 0x0000ff;
    return [r, g, b];
  }

  /**
   * Set cookie helper
   * @param {string} name
   * @param {string} value
   * @param {number} days
   */
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = name +'='+ value +'; expires='+ d.toUTCString();
  }

  /**
   * Delete cookie helper
   * @param {string} cookie name to delete
   */
  function deleteCookie(name) {
    document.cookie = name +'=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  }

  /**
   * Get a cookie
   * @param  {string} name
   * @return {string} Cookie's value
   */
  function getCookie(name) {
    var ca = document.cookie.split(';');
    name = name + '=';
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return undefined;
  }


})(jQuery, 'bica-cookie-alert', window, document);
