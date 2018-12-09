import WaterDrop from './WaterDrop.js'
import Bullet from './Bullet.js';

export default {
  name: 'Game',

  life: 10,

  boardWrapper: null,

  countWrapper: null,

  waterWrapper: null,

  start() {
    if (!this.boardWrapper || !this.countWrapper || !this.waterWrapper) throw new Error('DOM Container does not initialized for Game!')
    const game = this
    game._setGameLifeDisplay()

    for (let i = 0; i < 36; i++) {
      const waterDrop = new WaterDrop({
        level: game._getRandomGameSeed(),
        onClick() {
          if (game.life > 0) {
            game.life--
            game._setGameLifeDisplay()
            this.levelUp()
          }
        },
        onBoom() {
          const bullet = new Bullet({
            onMove() {
              
            }
          })
          bullet.draw(game.boardWrapper)
          bullet.setPosition(this.left, this.top)
        },
      })
      waterDrop.draw(game.boardWrapper)
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
