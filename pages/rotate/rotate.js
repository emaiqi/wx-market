import Dial from "./utils/dial.js"

Page({
  data: {

  },

  onLoad () {
    let dial = new Dial(this, {
      areaNumber: 8,
      speed: 16,
      awardNumer: 2,
      callback: () => {
        wx.showModal({
          title: '提示',
          content: '恭喜您，中奖了',
          showCancel: false,
          success: (res) => {
            dial.reset()
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
  }

})