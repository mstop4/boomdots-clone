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
    this.staticBg = this.add.image(0, 0, 'bg-static')
    this.staticBg.setTint(0x444444)
    this.staticBg.setOrigin(0)

    this.scrollingBg = this.add.tileSprite(0,0,396,529,'bg-overlay')
    this.scrollingBg.setOrigin(0)

    let cam = this.cameras.main
    cam.setViewport(0,0,270,480)
    cam.centerToBounds()
  }

  update() {
    this.scrollingBg.tilePositionY--
  }
}