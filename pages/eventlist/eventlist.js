//index.js
//获取应用实例
const app = getApp()
const  config = require("../../utils/config.js")
Page({
  data: {
		musicStatus:0,
    year:'',
    phone:'',
    name:'',
    //month:'',
    //dateNum:'',
    flag:true,
    eventList:[]
  },
  customData: {
		ctx: null,
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
  onLoad: function (options) {
    var that = this;
    that.setData({
      year:options.year,
			phone:options.phone,
			musicStatus:app.globalData.musicStatus
    })
    var sessionId = wx.getStorageSync('sessionId');
    wx.request({
      url: `${config.host + '/user/event'}`,
      data: {
        year:options.year,
        phone:options.phone
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": sessionId
      },
      method: 'GET',
      success: function (res) {
        if (res.data != "") {
					var strs= new Array();
					strs =res.data.lists.split("|");
          that.setData({
            name:res.data.name,
            //month:res.data.month,
            //dateNum:res.data.day,
            flag:res.data.flag,
            eventList:strs
          })
        }
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
		var yearVa = this.data.year;
		var nameVa = this.data.name; 
    wx.navigateTo({
      url: '../report/report?year='+yearVa+'&name='+nameVa
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
  },


	
})
