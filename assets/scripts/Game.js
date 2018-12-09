import WaterDrop from './WaterDrop.js'
import Bullet from './Bullet.js';

export default {
  name: 'Game',

  life: 10,

  boardWrapper: null,

  countWrapper: null,

  waterWrapper: null,

  waterDrops: [],

  bullets: [],

  start() {
    if (!this.boardWrapper || !this.countWrapper || !this.waterWrapper) throw new Error('DOM Container does not initialized for Game!')
    let game = this
    game._setGameLifeDisplay()

    const onClick = function() {
      if (game.life > 0) {
        game.life--
        game._setGameLifeDisplay()
        this.levelUp()
      }
    }
    const onBoom = function() {
      let self = this
      const onMove = function() {
        let canCollideWaterDrops = game.waterDrops.filter(waterDrop => {
          return waterDrop.level > 0 && waterDrop !== self
        })
        let collidedWaterDrop = this.checkCollision(canCollideWaterDrops)
        if (collidedWaterDrop) {
          // 碰撞销毁
          this.destroy()
          game.bullets = game.bullets.filter(bullet => bullet !== this)
          collidedWaterDrop.levelUp()
        } else if (this.left < -this.width || this.left > game.boardWrapper.offsetWidth || this.top < -this.height || this.top > game.boardWrapper.offsetHeight) {
          // 超出左边 this.left < -this.width, 超出右边 this.left > game.boardWrapper.offsetWidth
          // 超出上边 this.top < -this.height, 超出下边 this.top > game.boardWrapper.offsetHeight
          this.destroy()
          game.bullets = game.bullets.filter(bullet => bullet !== this)
        }
        if (game.bullets.length === 0) {
          game._checkGame()
        }
      }

      let directions = ['left', 'top', 'right', 'bottom']
      directions.forEach(direction => {
        let buttet = new Bullet({
          direction,
          speed: 3,
          onMove,
        })
        game.bullets.push(buttet)
        buttet.draw(game.boardWrapper)
        buttet.setPosition(this.left, this.top)
      })
    }

    for (let i = 0; i < 36; i++) {
      let waterDrop = new WaterDrop({
        level: game._getRandomGameSeed(),
        onClick,
        onBoom,
      })
      game.waterDrops.push(waterDrop)
      waterDrop.draw(game.boardWrapper)
    }
  },

  _checkGame() {
    const waterDropsLeft = this.waterDrops.filter(waterDrop => waterDrop.level > 0)
    if (this.life >= 0 && waterDropsLeft.length === 0) {
      return alert('You Win!')
    } else if (this.life === 0) {
      return alert('Game Over!')
    }
  },

  _getRandomGameSeed() {
    return Math.floor(Math.random() * 5)
  },

  _setGameLifeDisplay() {
    this.countWrapper.textContent = this.life
    this.waterWrapper.style.height = `${this.life * 10}px`
  },
}
