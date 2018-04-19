import phaser from 'phaser'
import { APP_WIDTH, APP_HEIGHT } from '../setup'

const centerX = APP_WIDTH/2
const centerY = APP_HEIGHT/2

export class Game extends phaser.Scene {
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
    this.particles = null
    this.emitter = null
    this.isRocketResetting = false
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

    this.particles = this.add.particles('particle')
    this.emitter = this.particles.createEmitter({
      angle: { min: 0, max: 360 },
      speed: { min: 50, max: 200 },
      quantity: { min: 40, max: 50 },
      lifespan: { min: 200, max: 500 },
      alpha: { start: 1, end: 0 },
      scale: { min: 0.5, max: 0.5 },
      rotate: { start: 0, end: 360 },
      gravityY: 800,
      on: false
    })

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

    if (this.isRocketResetting) {
      this.scrollingBg.tilePositionY -= delta
      this.rocket.y += delta
      if (this.rocket.y >= 160) {
        this.rocket.y = 160
        this.isRocketResetting = false
        this.resetAlien()
      }
    } else if (this.rocket.y < 0) {
      this.resetRocket()
    }
  }

  shutdown() {
    this.sys.game.events.off('resize', this.resize, this)
    this.input.off('pointerdown', this.launchRocket, this)
  }

  launchRocket() {
    this.rocket.body.setVelocity(0, -1500)
  }

  rocketCollideWithAlien(rocket, alien) {
    if (!this.canUpdateAlien) {
      return
    }
    this.canUpdateAlien = false
    rocket.body.setVelocity(0)
    this.particles.emitParticleAt(alien.x, alien.y)
    alien.y = centerY-300
    this.cameras.main.shake(100, 0.01, 0.01)
    this.time.delayedCall(200, this.resetRocket, [], this)
  }

  moveAlien(time, delta) {
    this.alien.y += (this.alienTargetY - this.alien.y) * (delta/1000)
    this.alien.x = centerX + Math.sin(time * 0.005) * 80
  }

  resetAlien() {
    this.canUpdateAlien = true
    this.alien.x = centerX
    this.alien.y = centerY-300
    this.alienTargetY = phaser.Math.Between(-200,0)
  }

  resetRocket() {
    this.isRocketResetting = true
  }
}