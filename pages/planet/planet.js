//index.js
//获取应用实例
const app = getApp()
const  config = require("../../utils/config.js")
Page({
  data: {
    musicStatus:0,
    phone: '',
    year:2010
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      musicStatus:app.globalData.musicStatus,
      year:options.year
    })
  
  },
  //事件处理函数
  bindViewTap: function() {
   
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
