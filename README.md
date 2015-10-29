# Basilico Interactive Cookie Alert for EU Cookie's Law (aka bica)

Universal cookie alert plugin, i18n ready, fully customizable. Depends on jQuery (works both on v1 and v2).

See a [live demo](http://www.basili.co?ref=gh).
  
  
## Install

### Bower 

Install and save the dependency with `bower install bica-cookie-alert --save`.

### Manually

Clone this repository or download and uncompress a `*.tar.gz` [release](https://github.com/basilico/bica-cookie-alert/releases) in your js directory.
  
  
## Usage

Copy/paste this code into the `<head>` tag of your html page(s), just before your layout stylesheet.

```html
<link rel="stylesheet" type="text/css" href="path-to-vendors/bica-cookie-alert/css/cookie.min.css">
```

Copy/paste this code at the bottom of your html page(s), just before `</body>` closing tag.

```html
<!-- jQuery loaded from a cdn -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script src="path-to-vendors/bica-cookie-alert/js/bica.min.js"></script>
<script>bica.init({ <options> })</script>
```

Enjoy!
  
  
## Available options

Options are passed as js object `{…}`.

### style

May be `inline`, `column` or `stack`. Changes the way disclaimer and actions will appear.

### txtColor

Css color (default to `#000`).

### btnTxtColor

Css color (default to `#fff`).

### btnBgBackgrund

Css color (default to `#666`).

### bgColor

Css color (default to `#ffffff`). This option needs the #rrggbb full notation to work correctly. Combined with `bgOpacity` to achieve a custom transparent background color.

### bgOpacity

Float (default to `0.9`). Combined with `bgColor` to achieve a custom transparent background color.

### showAfter

Integer (default to `1200`). Number of milliseconds before the disclaimer show up.

### infoUrl

String (default to <empty_string>). Specify the url to link the *Learn more* button. If no url is provided, the button will not appear.

### fallbackLang

String (default to `en`). Specify the fallback language.

### lang

String (default fetched right from <html:lang> attribute). (Supported languages: `it`, `en`, `de`).

### labels

Object (default `it`, `en`, `de` translations). Define view labels text.


## Changelog

### v2.0.0

- Lowered jQuery requirements to 1.4
- Removed async loads of translations, css and view
- Text injected via options
  

## Todo

- Remove jQuery dependency.
  
  
## License

Script is licensed under MIT license.
