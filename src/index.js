import phaser from 'phaser'
import { Preloader } from './scenes/preloader'
import { Game } from './scenes/game'
import { APP_WIDTH, APP_HEIGHT } from './setup'

const config = {
  width: APP_WIDTH,
  height: APP_HEIGHT,
  parent: 'content',
  scene: [
    Preloader,
    Game
  ]
}

const game = new phaser.Game(config)

window.onresize = function() {
  game.renderer.resize(window.innerWidth, window.innerHeight)
  game.events.emit('resize')
}