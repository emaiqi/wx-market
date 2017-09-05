/**
 * @description 跑马灯游戏逻辑部分
 * @author pfan
 * 
 */

export default class Marquee {
  constructor (pageContext, opts) {
    this.page = pageContext
    this.len = opts.len
    this.ret = opts.ret
    this.speed = opts.speed
    this.isStart = false
    this.endCallBack = opts.callback
    this.page.start = this.start.bind(this)
  }

  start () {

    let { idx, ret, len, speed, isStart } = this
    if(isStart)return
    this.isStart = true
    let range = Math.floor(Math.random()*2 + 2)
    let count = 0
    let spd2 = speed*2
    !(function interval(self){
      setTimeout( () => {
        count++
        if(count > range * len){
          speed = spd2
        }
        if(count != (range + 1) * len + ret ){
          interval(self)
        }else{
          self.isStart = false
          self.endCallBack && self.endCallBack()
        }

        self.page.setData({
          marquee: {
            idx: count % 9  == 0 ? 9 : count % 9
          }
        })
        
      }, speed)
    })(this)
  }

  reset () {
     this.page.setData({
      marquee: {
        idx: ''
      }
    })   
  }

}
