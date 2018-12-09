export default class {
  constructor(options) {
    this._bullet = null
    this.left = 0
    this.top = 0
    this.width = 100
    this.height = 100
    this.timer = 0
    this.onMove = options.onMove
  }

  draw(wrapper) {
    this._bullet = document.createElement('div')
    this._bullet.classList.add('water-bullet')
    this._bullet.classList.add('left')

    wrapper.appendChild(this._bullet)
    this.move()
  }

  setPosition(left, top) {
    this.left = left
    this.top = top
    this._bullet.style.left = `${left}px`
    this._bullet.style.top = `${top}px`
  }

  move() {
    this.timer = setInterval(() => {
      if (this.left < -this.width) clearInterval(this.timer)
      this.left--
      this.setPosition(this.left, this.top)
      typeof this.onMove === 'function' && this.onMove()
    }, 16)
  }
}
