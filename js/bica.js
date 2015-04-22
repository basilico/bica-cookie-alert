/*
 * Basilico Interactive Cookie Alert (aka bica)
 * Plugin for jQuery
 *
 * @author Dharma Ferrari
 * @link http://github.com/basilico
 * @created Apr 14th, 2015
 *
 * Description:
 *   Universal cookie plugin, i18n ready, fully customizable
 *
 * Usage:
 *   <script src="vendor/bica/js/bica.js"></script>
 *   <script>bica.init({ <options> })</script>
 */
var bica = (function($, namespace, window, document, undefined){
  var
    // Cache objects
    $wrapper,
    $window = $(window),

    // Settings container
    settings = {},

    // Private plugin settings
    plugin = {
      initialized: false,
      // Default language
      defaultLang: 'en',
      // i18n strings
      translations: {},
      // Plugin absolute path
      root: getAbsolutePath(),
      // Cookie settings (expires in 2 years)
      cookie: {name: 'bica', value: 'is_approved', days: '730'},
      // Min allowed font size
      minFontSize: 12
    },

    // Default settings
    defaults = {
      style: 'inline',
      txtColor: '#000',
      btnTxtColor: '#fff',
      btnBgBackgrund: '#666',
      bgColor: '#ffffff', // this prop needs #rrggbb notation (full)
      bgOpacity: 0.9,
      lang: document.documentElement.lang || plugin.defaultLang,
      showAfter: 1200, // milliseconds before show up
      useStylesheet: true,
      infoUrl: undefined
    };


  /**
   * Destroy plugin
   */
  var destroy = function() {};

  /**
   * Initializes plugin
   */
  var init = function( options ) {
    if (plugin.initialized) return notify('Re-init not allowed');
    settings = $.extend({}, defaults, options);
    // If cookie is not set, skip init
    if (getCookie( plugin.cookie.name ) != plugin.cookie.value) {
      $window.trigger('bica-ready');
    } else {
      destroy();
    }
  };

  /**
   * Load i18n translations
   */
  var loadTranslations = function() {
    $.getJSON(plugin.root +'i18n/'+ settings.lang +'.json', function(json) {
      plugin.translations = json[settings.lang];
      if (json.status == 'OK') {
        $window.trigger('bica-trans-loaded');
      } else {
        notify('Translation json’s not-well-formatted');
      }
    });
  };

  /**
   * Add css style and wrapper
   */
  var loadView = function() {
    // Inject CSS
    if (settings.useStylesheet) {
      $('head').append( $('<link rel="stylesheet" type="text/css"/>').attr('href', plugin.root +'css/cookie.css') );
    }
    // Add container to body and cache it
    $wrapper = $('<div/>', {"id": namespace, "class": namespace})
      .css({"background": makeBackground(), "color": settings.txtColor})
      .load(plugin.root +'/view/disclaimer.html', function(){
        $window.trigger('bica-view-loaded');
      })
      .prependTo('body')
    ;
  };

  /**
   * Translates labels
   * Default language doesn't need translations
   */
  var translateLabels = function() {
    $('[data-trans]').each(function() {
      this.innerHTML = plugin.translations[ this.attributes['data-trans'].value ];
    });
  };

  /**
   * Apply events
   */
  var applyEvents = function() {
    // Dismiss button
    $wrapper.find('[data-action="dismiss"]')
      .on('click', function(){
        $wrapper.fadeOut('fast');
        setCookie( plugin.cookie );
      });

    // Learn More button
    $wrapper.find('[data-action="info"]')
      .on('click', function(){
        window.location.href = settings.infoUrl;
      });
  };

  /**
   * Apply CSS styles
   */
  var applyStyles = function() {
    // Display style
    $wrapper.addClass(settings.style);

    // Button style
    $wrapper.find('[data-role="button"]')
      .css({"color": settings.btnTxtColor, "background": settings.btnBgBackgrund});

    // Remove info link if no url is provided
    if (settings.infoUrl === undefined) {
      $wrapper.find('[data-action="info"]').remove();
    }

    // Check that min font size is not smaller than allowed
    $wrapper.css({
      'fontSize': Math.max(parseInt($wrapper.css('fontSize'), 10), plugin.minFontSize)
    });
  };


  // Events

  $window.on('bica-ready', function(){
    plugin.initialized = true;
    loadTranslations();
  });
  $window.on('bica-trans-loaded', loadView);
  $window.on('bica-view-loaded', function(){
    applyEvents();
    applyStyles();
    translateLabels();
    // Show wrapper after delay
    $wrapper.delay(settings.showAfter).slideDown('medium');
  });


  // Utilities

  /**
   * Mix color and opacity settings to get a rgba background
   * @return {string} rgba() color notation
   */
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
   * @param  {type} type of notice (info|warn|error)
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
   * @param options:
   *        {string} name
   *        {string} value
   *        {number} days
   */
  function setCookie(options) {
    var d = new Date();
    d.setTime(d.getTime() + (options.days * (24*60*60*1000)));
    document.cookie = options.name +'='+ options.value +'; expires='+ d.toUTCString() +'; path=/';
  }

  /**
   * Delete cookie helper
   * @param {string} cookie name to delete
   */
  function deleteCookie(name) {
    document.cookie = name +'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
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


  // Public methods

  return {
    'init': init,
    'destroy': destroy
  };

})(jQuery, 'bica-cookie-alert', window, document);
