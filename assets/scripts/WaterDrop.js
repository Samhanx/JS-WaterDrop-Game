export default class {
  constructor(level) {
    this.div = null
    this.img = null
    this.level = level
  }

  draw(wrapper) {
    this.div = document.createElement('div')
    this.img = new Image()
    this.div.classList.add('water-drop-box')
    this.img.classList.add('water-drop')
    this.img.src = `/assets/images/${this.level}.png`
    this.img.onload = () => {
      this.div.appendChild(this.img)
    }
    
    wrapper.appendChild(this.div)
  }
}