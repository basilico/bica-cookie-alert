# Basilico Interactive Cookie Alert for EU Cookie's Law (aka bica)

Universal cookie alert plugin, i18n ready, fully customizable. Depends on jQuery (works both on v1 and v2).

See a [live demo](http://www.basili.co?ref=gh).


## Install

### Bower 

Install and save the dependency with `bower install bica --save`.

### Manually

Clone this repository or download and uncompress a `*.tar.gz` [release](https://github.com/basilico/bica/releases) in your js directory.


## Usage

Copy/paste this code at the bottom of your html page(s), just before `</body>` closing tag.

```html
<!-- jQuery loaded from a cdn -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="vendor/bica/js/bica.js"></script>
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

### lang
String (defaut to `en`) or fetched right from `<html:lang>` attribute.

### showAfter
Integer (default to `1200`). Number of milliseconds before the disclaimer show up.

### useStylesheet
Bool (default to `true`). Whether to use embedded stylesheet or not.

### infoUrl
String (default to <empty_string>). Specify the url to link the *Learn more* button. If no url is provided, the button will not appear.


## i18n

- PR to submit new translations.
- Now available in italian and english.


## Todo

- Customizable text via options.


## License

Script is licensed under MIT license.
