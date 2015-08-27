# &lt;hot-table&gt;

Polymer Element wrapper for [Handsontable](http://handsontable.com/) data grid editor

:exclamation: some stuff does not work yet. Do not use this yet! But feel free to submit issues on GitHub

## Demo

[Check it live!](http://handsontable.github.io/hot-table)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install hot-table --save
```

Or [download as ZIP](https://github.com/handsontable/hot-table/archive/gh-pages.zip).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/hot-table/src/hot-table.html">
    ```

3. Start using it!

    ```html
    <hot-table datarows="{{itemsArray}}"></hot-table>
    ```

## License

[MIT License](http://opensource.org/licenses/MIT)
