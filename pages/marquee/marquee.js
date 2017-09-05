import Marquee from "./utils/marquee.js"

Page({
  data: {

  },

  onLoad () {
    this.marquee = new Marquee(this, {
      len: 9,
      ret: 9, //取值1～9
      speed: 100,
      callback: () => {
        wx.showModal({
          title: '提示',
          content: '恭喜您，中奖了',
          showCancel: false,
          success: (res) => {
            this.marquee.reset()
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })        
      }            
    })
  },

  onReady () {
    console.log("onReady")    

  },

  onStart () {
    this.marquee.start()
  }  
})