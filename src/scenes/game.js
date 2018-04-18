import { Scene } from 'phaser'
import { APP_WIDTH, APP_HEIGHT } from '../setup'

const centerX = APP_WIDTH/2
const centerY = APP_HEIGHT/2

export class Game extends Scene {
  constructor() {
    super({
      key: 'game',
      physics: {
        default: 'arcade',
        arcade: {
          debug: true
        }
      }
    })
    this.staticBg = null
    this.scrollingBg = null
    this.alienTargetY = centerY
    this.canUpdateAlien = false
  }

  create() {
    this.staticBg = this.add.image(centerX, centerY, 'bg-static')
    this.staticBg.setTint(0x444444)
    this.staticBg.setOrigin(0.5)

    this.scrollingBg = this.add.tileSprite(centerX, centerY, 396, 529, 'bg-overlay')
    this.scrollingBg.setOrigin(0.5)

    this.rocket = this.add.sprite(centerX, centerY+160, 'rocket')
    this.alien = this.add.sprite(centerX, centerY-300, 'alien')
    this.physics.world.enable([this.rocket, this.alien])
    this.resetAlien()

    this.input.on('pointerdown', this.launchRocket, this)

    this.sys.game.events.on('resize', this.resize, this)
    this.resize()
    this.events.once('shutdown', this.shutdown, this)
  }

  resize() {
    let cam = this.cameras.main
    cam.setViewport(0,0,window.innerWidth,window.innerHeight)
    cam.centerToBounds()
    //cam.zoom = Math.min(window.innerWidth/270, window.innerHeight/480)
  }

  update(time, delta) {
    this.scrollingBg.tilePositionY--
    if (this.canUpdateAlien) {
      this.moveAlien(time, delta)
      this.physics.add.overlap(this.rocket, this.alien, this.rocketCollideWithAlien, null, this)
    }
  }

  shutdown() {
    this.sys.game.events.off('resize', this.resize, this)
    this.input.off('pointerdown', this.launchRocket, this)
  }

  launchRocket() {
    this.rocket.body.setVelocity(0, -300)
  }

  rocketCollideWithAlien(rocket, alien) {
    this.canUpdateAlien = false
    rocket.body.setVelocity(0)
    alien.y = centerY-300
  }

  moveAlien(time, delta) {
    this.alien.y += (this.alienTargetY - this.alien.y) * (delta/1000)
    this.alien.x = centerX + Math.sin(time * 0.005) * 80
  }

  resetAlien() {
    this.canUpdateAlien = true
    this.alien.x = centerX
    this.alien.y = centerY-300
  }
}