/**
 * @description 刮刮乐游戏逻辑部分
 * @author pfan
 * 
 * 问题：
 * 1.drawImage 与 clearRect 清除展示移动端和模拟器不一致
 * 2.小程序无globalCompositeOperation = 'destination-out'属性
 * 3.小程序无getImageData获取像素点对比擦除范围
 * 4.小程序canvas绘制图片，真机要正常展示需要使用https协议的图片， http或相对路径微信小程序工具可以展示
 * 遗留问题：图片画的问题
 */

export default class Scratch {
  constructor (pageContext, opts) {
    this.page = pageContext
    this.canvasWidth = opts.canvasWidth
    this.canvasHeight = opts.canvasHeight
    this.imageResource = opts.imageResource
    // this.canvasId = opts.canvasId
    this.r = opts.r || 4
    this.lastX = 0
    this.lastY = 0
    this.minX = ''
    this.minY = ''
    this.maxX = ''
    this.maxY = ''
    this.isStart = false
    this.init()

    this.page.touchStart = this.touchStart.bind(this)
    this.page.touchMove = this.touchMove.bind(this)
    this.page.touchEnd = this.touchEnd.bind(this)
    this.page.imgOnLoad = this.imgOnLoad.bind(this)

    this.page.setData({
      scratch: {
        "awardTxt": opts.awardTxt,
        "awardTxtColor": opts.awardTxtColor,
        "awardTxtFontSize": opts.awardTxtFontSize,
        "awardTxtLineHeight": opts.canvasHeight,   
        "width": opts.canvasWidth,   
        "height": opts.canvasHeight,
        "imageResource": opts.imageResource
      },
      "isScroll": true
    })
  }

  init () {
    let {canvasWidth, canvasHeight, imageResource} = this
    this.ctx = wx.createCanvasContext('scratch')
    // this.ctx.drawImage(imageResource, 0, 0, canvasWidth, canvasHeight)
    this.ctx.setFillStyle('red')
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    this.ctx.draw()
  }

  drawRect (x, y) {
    let {r, canvasWidth, canvasHeight, lastX, lastY, minX, minY, maxX, maxY} = this
    let x1 = x - r > 0 ? x - r : 0
    let y1 = y - r > 0 ? y - r : 0
    if('' != minX){
      this.minX = minX > x1 ? x1 : minX
      this.minY = minY > y1 ? y1 : minY
      this.maxX = maxX > x1 ? maxX : x1
      this.maxY = maxY > y1 ? maxY : y1
    }else{
      this.minX = x1
      this.minY = y1
      this.maxX = x1
      this.maxY = y1
    }
    this.lastX = x1
    this.lastY = y1

    return [x1, y1, 2*r]
  }  

  start () {
    this.isStart = true
    this.page.setData({
      "isScroll": false
    })
  }

  restart () {    
    this.init()
    this.lastX = 0
    this.lastY = 0
    this.minX = ''
    this.minY = ''
    this.maxX = ''
    this.maxY = ''    
    this.isStart = true
    this.page.setData({
      "isScroll": false
    })    
  }

  touchStart (e) {
    if(!this.isStart)return
    let pos = this.drawRect(e.touches[0].x, e.touches[0].y)
    this.ctx.clearRect(pos[0] ,pos[1] , pos[2], pos[2]) 
    this.ctx.draw(true)
  }

  touchMove (e) {
    if(!this.isStart)return
    let pos = this.drawRect(e.touches[0].x, e.touches[0].y)
    this.ctx.clearRect(pos[0] ,pos[1] , pos[2], pos[2]) 
    this.ctx.draw(true) 
  }

  touchEnd (e) {
    if(!this.isStart)return
    //自动清楚采用点范围值方式判断
    let {canvasWidth, canvasHeight, minX, minY, maxX, maxY} = this
    if(maxX - minX > .8 * canvasWidth && maxY - minY > .8 * canvasHeight ){
      this.ctx.draw() 
      this.isStart = false
      this.page.setData({
        "isScroll": true
      })      
    }
  } 

  imgOnLoad () {
    
  }   
}

