//index.js
//获取应用实例
const app = getApp()
const bgMusic = wx.getBackgroundAudioManager() //创建背景音乐
Page({
  data: {
    musicStatus:0,
    year:''
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
    var year = this.data.year
    wx.navigateTo({
      url: '../eventphone/phone?year='+year
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
