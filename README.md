# Boomdots with Phaser 3 + Webpack + ES6

## Differences from Tutorial

http://codetuto.com/2018/02/getting-started-phaser-3-es6-create-boomdots-game/

* Added ESLint
* CommonChunksPlugin is deprecated. Replaced with SplitChunksPlugin.
* UglifyJsPlugin is not included in webpack.optimize. Added as an external optimization module instead. 