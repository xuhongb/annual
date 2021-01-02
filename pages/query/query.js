//index.js
//获取应用实例
const app = getApp()
const  config = require("../../utils/config.js")
Page({
  data: {
    musicStatus:0,
    phone: ''
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      musicStatus:app.globalData.musicStatus,
      phone:options.phone,
      year:options.year
    })
  
  },
  //事件处理函数
  bindViewTap: function() {
    var phoneNum = this.data.phone;
    wx.navigateTo({
      url: '../user/user?phone='+phoneNum
    })
  },
  bindViewOkTap: function() {
    var entryTimeVa= this.data.year
    wx.navigateTo({
      url: '../planet/planet?year='+entryTimeVa
    })
  },
  openAndColse:function(){
    if(app.globalData.musicStatus ==1){
      this.setData({
        musicStatus:0
      })
      app.bgMusic(0);
    }else{
      this.setData({
        musicStatus:1
      })
      app.bgMusic(1);
    }
    
  }
})
