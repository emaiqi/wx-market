/**
 * @description 九宫格翻纸盘游戏逻辑部分
 * @author pfan
 * 
 */

/**
 * [runAsync 延迟返回promise]
 */
function runAsync(time) {
  return new Promise(function(resolve, reject) {
    let timer = setTimeout(function(){
      resolve()
      clearTimeout(timer)
    }, time)
  })
}


export default class Card {
  constructor (pageContext, opts) {
    this.page = pageContext
    this.isFlip = false
    this.card = opts.data || []
    this.init()
    this.endCallBack = opts.callback
    this.page.start = this.start.bind(this)
    this.page.onClick = this.onClick.bind(this)
  }

  init () {
     let {card} = this
     
     for(let i = 0; i < 9; i++){
        card[i] = {inlineStyle: '', isBack: false, isMove: false, award: card[i].award}
     }
     this.page.setData({card})
     this.card = card
  }

  start () {
     let {card} = this
    
     runAsync(100).then( () => {
       for(let i = 0; i < 3; i++){
          card[i].isBack = true
       }
       this.page.setData({card})
       return runAsync(200)

     }).then( () => {
       for(let i = 3; i < 6; i++){
          card[i].isBack = true
       }
      this.page.setData({card})
      return runAsync(200)

     }).then( () => {
       for(let i = 6; i <= 8; i++){
          card[i].isBack = true
       }
      this.page.setData({card})
      return runAsync(800)

     }).then( () => {
       for(let i = 0; i < 9; i++){
          card[i].isBack = false
       }
      this.page.setData({card})
      return runAsync(400)
      
     }).then( () => {
       for(let i = 0; i < 9; i++){
          card[i].isMove = true
       }
      this.page.setData({card})
      return runAsync(500)
      
     }).then( () => {
       for(let i = 0; i < 9; i++){
          card[i].isMove = false
       }
      this.page.setData({ card })
      this.isFlip = true
      this.card = card
     })    
  }

  reset () {
     let {card} = this
     this.isFlip = false
     for(let i = 0; i < 9; i++){
        card[i] = {inlineStyle: '', isBack: false, isMove: false, award: card[i].award}
     }     
     this.card = card
     this.page.setData({card})

    runAsync(800).then( () => {
      this.start()
    })     
     
  }

  onClick (event) {
    let {card, isFlip, endCallBack} = this
    if(!isFlip)return
    let idx = event.currentTarget.dataset.idx
    let award = event.currentTarget.dataset.award
    card[idx].isBack = !card[idx].isBack
    this.page.setData({card})
    console.log("award", award)
    runAsync(600).then( () => {
      endCallBack(idx, award)
    })
  }  

}
