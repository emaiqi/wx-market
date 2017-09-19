/**
 * @description 跑马灯游戏逻辑部分
 * @author pfan
 * * 调用方式：
 * 
 * 例如：import Marquee from "../../components/fruitMachine/fruitMachine.js"
 * 
 * wxss 文件需要引入 fruitMachine.wxss
 * `@import '../../components/fruitMachine/fruitMachine.wxss'`
 * 
 * wxml 文件需要引入 fruitMachine.wxml
 * 例如：<import src="../../components/fruitMachine/fruitMachine.wxml" />
 *      <template is = "fruitMachine" data="{{...machine}}"></template> 
 * 
 * js 中调用
 * 
 *  this.fruitMachine = new FruitMachine(this, {
 *    len: 9, //宫格个数
 *    ret: 9, //抽奖结果对应值1～9
 *    speed: 100,  // 速度值
 *    callback: () => {
 *      //结束回调    
 *    }            
 *  })

 */



export default class FruitMachine {
  constructor (pageContext, opts) {
    this.page = pageContext
    this.len = opts.len || 8
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
          machine: {
            idx: count % 8  == 0 ? 8 : count % 8
          }
        })
        
      }, speed)
    })(this)
  }

  reset () {
     this.page.setData({
      machine: {
        idx: ''
      }
    })   
  }

}
