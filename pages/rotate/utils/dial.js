/**
 * @description 大转盘游戏逻辑部分
 * @author pfan
 * 
 * 问题：
 * 移动端真机，不支持requestAnimationFrame
 */

export default class Dial {
  constructor (pageContext, opts) {
    this.page = pageContext
    this.deg = 0 
    this.areaNumber = opts.areaNumber  // 奖区数量
    this.speed = opts.speed || 16   // 每帧速度
    this.awardNumer = opts.awardNumer //中奖区域从1开始
    this.singleAngle = ''   //每片扇形的角度
    this.isStart = false
    this.endCallBack = opts.callback

    this.init()

    this.page.start = this.start.bind(this)
  }

  init () {
    let {areaNumber, singleAngle} = this
    singleAngle = 360 / areaNumber
    this.singleAngle = singleAngle
    this.page.setData({
      dial: {
        singleAngle: singleAngle
      }
    })
  }

  start () {
    let {deg, awardNumer, singleAngle, speed, isStart} = this
    if(isStart)return
    this.isStart = true
    let endAddAngle = (awardNumer - 1) * singleAngle + 360   //中奖角度
    let rangeAngle = (Math.floor(Math.random() * 4) + 4) * 360 // 随机旋转几圈再停止  
    let cAngle
    deg = 0
    this.timer = setInterval( () => {
      if( deg < rangeAngle ){
        deg += speed
      }else{
        cAngle = (endAddAngle + rangeAngle - deg) / speed
        cAngle = cAngle > speed ? speed : cAngle < 1 ? 1 : cAngle
        deg += cAngle

        if(deg >= ( endAddAngle + rangeAngle )){
          deg = endAddAngle + rangeAngle
          this.isStart = false
          clearInterval(this.timer)
          this.endCallBack()         
        }
      }
      
      this.page.setData({
        dial: {
          singleAngle: singleAngle,
          deg: deg
        }
      })
    }, 1000/60)      
  }

  reset () {
    this.deg = 0
    this.page.setData({
      dial: {
        singleAngle: this.singleAngle,
        deg: 0
      }
    })    
  }

}

