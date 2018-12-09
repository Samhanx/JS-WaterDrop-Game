export default class {
  constructor(options) {
    this._bullet = null
    this.left = 0
    this.top = 0
    this.width = 100
    this.height = 100
    this.timer = 0
    this.direction = options.direction
    this.speed = options.speed
    this.onMove = options.onMove
  }

  draw(wrapper) {
    this._bullet = document.createElement('div')
    this._bullet.classList.add('water-bullet')
    this._bullet.classList.add(this.direction)

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
      this.left -= 3
      this.setPosition(this.left, this.top)
      typeof this.onMove === 'function' && this.onMove()
    }, 16)
  }

  checkCollision(waterDrops) {
    let bulletCenter = {
      x: this.left + this.width / 2,
      y: this.top + this.height / 2,
    }
    let collidedWaterDrop = null
    for (let i = 0; i < waterDrops.length; i++) {
      let waterDropCenter = {
        x: waterDrops[i].left + waterDrops[i].width / 2,
        y: waterDrops[i].top + waterDrops[i].height / 2,
      }
      // 子弹的中心点 x坐标 在 水滴的中心点 x坐标 正负 10 的范围内， y坐标 同样
      const xCollide = bulletCenter.x > waterDropCenter.x - 10 && bulletCenter.x < waterDropCenter.x + 10
      const yCollide = bulletCenter.y > waterDropCenter.y - 10 && bulletCenter.y < waterDropCenter.y + 10
      if (xCollide && yCollide) {
        collidedWaterDrop = waterDrops[i]
      }
    }
    return collidedWaterDrop
  }

  destroy() {
    clearInterval(this.timer)
    this._bullet.remove()
  }
}
