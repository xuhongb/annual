//index.js
//获取应用实例
const app = getApp()
const  config = require("../../utils/config.js")
Page({
  data: {
    year:'',
    musicStatus:0,
    phone: ''
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      year:options.year,
      musicStatus:app.globalData.musicStatus
    })
  
  },
  onReady: function () {
    var url = config.host
    
    wx.request({
      url: `${config.host + '/getSessionId'}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        wx.setStorageSync('sessionId', 'JSESSIONID=' + res.data)
        
      }
    })
  
  },
  //事件处理函数
  bindViewTap: function() {
    var sessionId = wx.getStorageSync('sessionId');
    var phoneNum = this.data.phone;
    var year = this.data.year;
    var checkUrl = config.host + '/user/phone/'+phoneNum;
    if(phoneNum == ""){
      wx.showModal({
        title: '提示',
        content: '请输入手机号码！',
        success: function (res) {
        }
      })
    }else{
      wx.request({
        url: `${checkUrl}`,
        data: {
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": sessionId
        },
        method: 'GET',
        success: function (res) {
          if (res.data == "") {
            
            wx.navigateTo({
              url: '../seach/seach'
            })
          } else {
            wx.navigateTo({
              url: '../eventlist/eventlist?year='+year+"&phone="+phoneNum
            })
          }

        }
      })
  }   
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  phoneNum:function(e){
    this.setData({
      phone: e.detail.value
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
