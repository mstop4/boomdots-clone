# Boomdots with Phaser 3 + Webpack + ES6

An attempt to follow the tutorial at http://codetuto.com/2018/02/getting-started-phaser-3-es6-create-boomdots-game/.
Game is incomplete because the tutorial is incomplete and buggy.

## Differences from Tutorial

### Stylistic Choices

* Added ESLint.
* Styles moved to seperate CSS file.

### Bugfixes

* CommonChunksPlugin is deprecated. Replaced with SplitChunksPlugin.
* UglifyJsPlugin is not included in webpack.optimize. Added as an external optimization module instead.
* Worked around issues with the camera bounds.
* Used delta timing for alien Y-movement