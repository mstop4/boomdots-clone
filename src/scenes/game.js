import { Scene } from 'phaser'

export class Game extends Scene {
  constructor() {
    super({
      key: 'game'
    })
    this.staticBg = null
    this.scrollingBg = null
  }

  create() {
    this.staticBg = this.add.image(135, 240, 'bg-static')
    this.staticBg.setTint(0x444444)
    this.staticBg.setOrigin(0.5)
    this.scrollingBg = this.add.tileSprite(135, 240, 396, 529, 'bg-overlay')
    this.scrollingBg.setOrigin(0.5)

    this.sys.game.events.on('resize', this.resize, this)
    this.resize()
    this.events.once('shutdown', this.shutdown, this)
  }

  resize() {
    let cam = this.cameras.main
    cam.setViewport(0,0,window.innerWidth,window.innerHeight)
    cam.centerToBounds()
    //cam.zoom = Math.max(window.innerWidth/270, window.innerHeight/480)
  }

  update() {
    this.scrollingBg.tilePositionY--
  }

  shutdown() {
    this.sys.game.events.off('resize', this.resize, this)
  }
}