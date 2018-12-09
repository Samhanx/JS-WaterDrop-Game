export default class {
  constructor(options) {
    this.container = null
    this.drop = null
    this.level = options.level
    this.onClick = options.onClick
    this.onBoom = null
  }

  draw(wrapper) {
    this.container = document.createElement('div')
    this.drop = new Image()
    this.container.classList.add('water-drop-box')
    this.drop.classList.add('water-drop')
    this.drop.src = `/assets/images/${this.level}.png`

    this.drop.onload = () => {
      this.container.appendChild(this.drop)
    }
    this.drop.addEventListener('click', () => {
      typeof this.onClick === 'function' && this.onClick()
    })
    
    wrapper.appendChild(this.container)
  }

  levelUp() {
    if (this.level === 4) {
      this.level = 0
    } else {
      this.level++
    }
    
    this.drop.src = `/assets/images/${this.level}.png`
  }
}