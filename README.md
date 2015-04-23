# Basilico Interactive Cookie Alert for EU Cookie's Law (aka bica)

Universal cookie alert plugin, i18n ready, fully customizable. Depends on jQuery (works both on v1 and v2).

## Usage

```html
    <script src="vendor/bica/js/bica.js"></script>
    <script>bica.init({ <options> })</script>
```


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

