//index.js
//获取应用实例
const app = getApp()
const  config = require("../../utils/config.js")
Page({
  data: {
    phone: '',
    musicStatus:0
  },
  onLoad:function(){
    this.setData({
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
    var checkUrl = config.host + '/user/phone/'+phoneNum;
    if(phoneNum == ""){
      wx.showModal({
        title: '提示',
        content: '请输入手机号码！',
        success: function (res) {
        }
      })
    }else if(phoneNum.length !=11){
      wx.showModal({
        title: '提示',
        content: '请输入正确手机号码！',
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
            wx.request({
              url: `${config.host + '/user/user'}`,
              data: {
                phone: phoneNum
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": sessionId
              },
              method: 'POST',
              success: function (res) {
                if (res.data == "success") {
                  wx.navigateTo({
                    url: '../user/user?phone='+phoneNum
                  })
                } else if (res.data = "error") {
                  
                }
        
              }
            })
            
          } else {
            if(res.data.firstName !=null || res.data.lastName !=null){
              wx.navigateTo({
                url: '../query/query?phone='+phoneNum+'&year='+res.data.entryTime
              })
            }else{
              wx.navigateTo({
                url: '../user/user?phone='+phoneNum
              })
            }
            
            // wx.showModal({
            //   title: '提示',
            //   content: '该手机号已授权',
            //   cancelText: '确定',
            //   confirmText: '继续修改',
            //   success (res) {
            //     if (res.confirm) {
            //       console.log('用户点击继续修改')
            //         wx.navigateTo({
            //           url: '../user/user?phone='+phoneNum
            //         })
            //     } else if (res.cancel) {
            //       console.log('用户点击确定')
            //     }
            //   }
            // })
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
