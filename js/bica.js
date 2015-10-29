/*
 * Basilico Interactive Cookie Alert for EU Cookie's Law (aka bica)
 * Plugin for jQuery
 *
 * @author Dharma Ferrari
 * @link http://github.com/basilico
 * @created Apr 14th, 2015
 *
 * Description:
 *   Universal cookie alert plugin, i18n ready, fully customizable
 *
 * Usage:
 *   <script src="vendor/bica/js/bica.js"></script>
 *   <script>bica.init({ <options> })</script>
 */
var bica = (function($, window, document, namespace, undefined) {
  var
    // Cache objects
    $wrapper,
    $window = $(window),

    // Settings container
    settings = {},

    // Private plugin settings
    plugin = {
      // Sets to true once loaded
      initialized: false,
      // Cookie settings (expires in 2 years)
      cookie: {name: namespace, value: 'is_approved', days: '730'},
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
      fallbackLang: 'en',
      lang: document.documentElement.lang,
      labels: {
        en: {
          disclaimer: "Cookies help us improve our website experience. By continuing to browse, you agree to our use of cookies.",
          info: "Learn more",
          dismiss: "CLOSE"
        },
        it: {
          disclaimer: "I cookie ci aiutano a migliorare l'esperienza del nostro sito web. Continuando la navigazione, accetti l'utilizzo dei cookie da parte nostra.",
          info: "Informazioni",
          dismiss: "CHIUDI"
        },
        de: {
          disclaimer: "Cookies erlauben uns, die Erfahrung unserer Webseite zu verbessern. Beim Fortsetzen das Surfen, du nimmst die Verwendung der Cookies unsererseits an.",
          info: "Informationen",
          dismiss: "Schließen"
        }
      },
      showAfter: 1200, // milliseconds before show up
      infoUrl: undefined,
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
    settings = $.extend(true, {}, defaults, options);
    // If cookie is not set, skip init
    if (getCookie( plugin.cookie.name ) != plugin.cookie.value) {
      $window.trigger('bica-ready');
    } else {
      destroy();
    }
  };

  /**
   * Set language to use for bica
   */

  var setLanguage = function() {
    // clean string in case of lang attribute is like [en-EN]
    if (settings.lang) {
      settings.lang = /^[a-z]{2}/.exec(settings.lang)[0];
    }

    if (!settings.labels[settings.lang]) {
      settings.lang = settings.fallbackLang;
    }
  };

  /**
   * Add css style and wrapper
   */
  var createView = function() {
    // Add container to body and cache it
    var disclaimer =
      '<div class="bica-content">'
        + '<div class="bica-disclaimer">'
        +   '<span data-trans="disclaimer">' + settings.labels[settings.lang].disclaimer + '</span>'
        +  '</div>'
        +  '<div class="bica-actions">'
        +    '<span data-role="link" data-action="info" data-trans="info">' + settings.labels[settings.lang].info + '</span>'
        +    '<span data-role="button" data-action="dismiss" data-trans="dismiss">' + settings.labels[settings.lang].dismiss + '</span>'
        +  '</div>' +
      '</div>';

    $wrapper = $('<div/>', {"id": namespace, "class": namespace})
      .attr('style', "background-color:"+ makeBackground(true) +";background-color:"+ makeBackground() +";color:"+ settings.txtColor)
      .html(disclaimer)
      .prependTo('body')
    ;
  };

  /**
   * Apply events
   */
  var applyEvents = function() {
    // Dismiss button
    $wrapper.find('[data-action="dismiss"]')
      .bind('click', function(){
        $wrapper.fadeOut('fast');
        setCookie( plugin.cookie );
      });

    // Learn More button
    $wrapper.find('[data-action="info"]')
      .bind('click', function(){
        window.location.href = settings.infoUrl;
      });
  };

  /**
   * Apply CSS styles
   */
  var applyStyles = function() {
    // Display style
    $wrapper.addClass(namespace +'-'+ settings.style);

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

  $window.bind('bica-ready', function(){
    plugin.initialized = true;
    setLanguage();
    createView();
    applyEvents();
    applyStyles();
    // Show wrapper after delay
    $wrapper.delay(settings.showAfter).slideDown('medium');
  });


  // Utilities

  /**
   * Mix color and opacity settings to get a rgba background
   * @return {string} rgba() color notation
   */
  function makeBackground(noRgba) {
    noRgba = noRgba || false;
    if (settings.bgColor.length != 7) {
      notify(['HEX too short', settings.bgColor], 'error');
      return settings.bgColor;
    }
    if (noRgba) {
      return settings.bgColor;
    }
    var color = hex2rgb(settings.bgColor);
    color.push(settings.bgOpacity);
    return 'rgba('+ color.join(',') +')';
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
    message = '['+ namespace.toUpperCase() +']: '+ message;
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

})(jQuery, window, document, 'bica');
