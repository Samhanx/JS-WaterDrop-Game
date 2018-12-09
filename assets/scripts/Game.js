import WaterDrop from './WaterDrop.js'

export default {
  name: 'Game',

  life: 10,

  boardWrapper: null,

  countWrapper: null,

  start() {
    if (!this.boardWrapper || !this.countWrapper) throw new Error('DOM Container does not initialized for Game!')
    this.countWrapper.textContent = this.life

    for (let i = 0; i < 36; i++) {
      const waterDrop = new WaterDrop(this._getRandomGameSeed())
      waterDrop.draw(this.boardWrapper)
      waterDrop.handleClick = () => {
        if (this.life > 0) {
          this.life--
          waterDrop.levelUp()
          this.countWrapper.textContent = this.life
        }
      }
    }
  },

  _getRandomGameSeed() {
    return Math.floor(Math.random() * 5)
  }
}
