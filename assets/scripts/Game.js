import WaterDrop from './WaterDrop.js'

export default {
  name: 'Game',

  life: 10,

  wrapper: null,

  start() {
    if (!this.wrapper) throw new Error('No DOM Container for Game Board!')
    for (let i = 0; i < 36; i++) {
      const waterDrop = new WaterDrop(this._getRandomGameSeed())
      waterDrop.draw(this.wrapper)
    }
  },

  _getRandomGameSeed() {
    return Math.floor(Math.random() * 5)
  }
}
