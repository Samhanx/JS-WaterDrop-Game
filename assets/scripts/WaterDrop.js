export default class {
  constructor(options) {
    this._container = null
    this._drop = null
    this.left = 0
    this.top = 0
    this.width = 100
    this.height = 100
    this.level = options.level
    this.onClick = options.onClick
    this.onBoom = options.onBoom
  }

  draw(wrapper) {
    this._container = document.createElement('div')
    this._drop = new Image()
    this._container.classList.add('water-drop-box')
    this._drop.classList.add('water-drop')
    this._drop.src = `/assets/images/${this.level}.png`

    this._drop.onload = () => {
      this._container.appendChild(this._drop)
    }
    this._drop.addEventListener('click', () => {
      typeof this.onClick === 'function' && this.onClick()
    })
    
    wrapper.appendChild(this._container)
    this.left = this._container.offsetLeft
    this.top = this._container.offsetTop
  }

  levelUp() {
    if (this.level === 4) {
      this.level = 0
      typeof this.onBoom === 'function' && this.onBoom()
    } else {
      this.level++
    }
    
    this._drop.src = `/assets/images/${this.level}.png`
  }
}