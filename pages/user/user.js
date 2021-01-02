//index.js
//获取应用实例
const app = getApp()
const  config = require("../../utils/config.js")
Page({
  data: {
    submit:0,
    phone: '',
    lastName:'',
    firstName:'',
    musicStatus:0,
    entryTime:'',
    entryFlag:false,
    multiArray: [['品牌中心', '运营本部','综合管理本部','海外事业部','新兴品牌','新媒体'], 
    ['母婴用品部', '资生堂项目部', '日韩品牌部', '欧美品牌部', '医药健康部','自有品牌部','市场推广部','品牌策略部','品牌拓展部（BD）','费用统括部']],
    objectArray:[{'品牌中心':0, '运营本部': 1,'综合管理本部': 2,'海外事业部':3 ,'新兴品牌': 4,'新媒体': 5,
    '母婴用品部': 0, '资生堂项目部':1 , '日韩品牌部':2 , '欧美品牌部':3 , '医药健康部':4 ,'自有品牌部': 5,'市场推广部': 6,'品牌策略部':7 ,'品牌拓展部（BD）':8 ,'费用统括部':9 ,
    '顾客关系部': 0,'FTF自播业务部': 1,'B2C母婴运营部':2 ,'B2C资生堂运营部': 3,'B2C美妆运营部': 4,'B2C个护运营部':5 ,
    'B2C医药健康事业部':6 ,'B2C自有品牌运营部':7 ,'B2C POP店运营部':8,'B2B运营部': 9,'视觉创意部':10 ,'消费者运营部': 11,
    '财务部': 0,'人事行政部': 1,'供应链管理部':2 ,'法务部': 3,'信息系统部': 4,'公关企宣部': 5,'投资者关系部': 6,
    '海外营业部':0,'海外供应链部':1 ,'海外管理部':2 ,
    '好驿':0,
    '芙立':0}
  ],
    multiIndex: [0, 0],
    multiva1:'',
    multiva2:'',
    deptFlag:false
  },
  onLoad: function (options) {
    var that = this;
    
    console.log(options.phone)
    that.setData({
      musicStatus:app.globalData.musicStatus,
      phone:options.phone
    })
    var sessionId = wx.getStorageSync('sessionId');
    var phoneNum = this.data.phone;
    var checkUrl = config.host + '/user/phone/'+phoneNum;
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
         
        } else {
          if(res.data.firstName !=null || res.data.lastName !=null){
            var multiIndexaaa = that.data.multiIndex;
            var multiArrayaaa = that.data.multiArray;
            if(res.data.firstDept !=null){
              var firstIndex = that.data.objectArray[0][res.data.firstDept]
              multiIndexaaa[0] = firstIndex;
              if(firstIndex == 0){
                multiArrayaaa[1] = ['母婴用品部', '资生堂项目部', '日韩品牌部', '欧美品牌部', '医药健康部','自有品牌部','市场推广部','品牌策略部','品牌拓展部（BD）','费用统括部'];
              }else if(firstIndex ==1){
                multiArrayaaa[1] = ['顾客关系部','FTF自播业务部','B2C母婴运营部','B2C资生堂运营部','B2C美妆运营部','B2C个护运营部',
                'B2C医药健康事业部','B2C自有品牌运营部','B2C POP店运营部','B2B运营部','视觉创意部','消费者运营部'];
              }else if(firstIndex ==2){
                multiArrayaaa[1] = ['财务部','人事行政部','供应链管理部','法务部','信息系统部','公关企宣部','投资者关系部'];
              }else if(firstIndex ==3){
                multiArrayaaa[1] = ['海外营业部','海外供应链部','海外管理部'];
              }else if(firstIndex ==4){
                multiArrayaaa[1] = ['好驿'];
              }else if(firstIndex ==5){
                multiArrayaaa[1] = ['芙立'];
              }
            }
            if(res.data.secondDept !=null){
              multiIndexaaa[1] = that.data.objectArray[0][res.data.secondDept];
            }
            var firstDeptVa = multiArrayaaa[0][multiIndexaaa[0]].substring(0,5);
            var secondDeptVa = multiArrayaaa[1][multiIndexaaa[1]].substring(0,5);
            that.setData({
              lastName:res.data.lastName,
              firstName:res.data.firstName,
              entryTime:res.data.entryTime,
              multiIndex:multiIndexaaa,
              multiArray:multiArrayaaa,
              multiva1:firstDeptVa,
              multiva2:secondDeptVa,
              submit:1,
              entryFlag:true,
              deptFlag:true
            })
          }
        }
      }
    })
  
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if(e.detail.value[0]==0 && e.detail.value[1]==0){
      this.setData({
        multiIndex: e.detail.value,
        deptFlag:true,
        multiva1:'品牌中心',
        multiva2:'母婴用品部'
      })
    }else{
      this.setData({
        multiIndex: e.detail.value,
        deptFlag:true
      })
    }
    
    if(this.data.firstName == "" || this.data.lastName == ""|| this.data.entryTime=="" ||this.data.multiva1 ==""){
      this.setData({
        submit:0
      })
    }else{
      this.setData({
        submit:1
      })
    }
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['母婴用品部', '资生堂项目部', '日韩品牌部', '欧美品牌部', '医药健康部','自有品牌部','市场推广部','品牌策略部','品牌拓展部（BD）','费用统括部'];
            break;
          case 1:
            data.multiArray[1] = ['顾客关系部','FTF自播业务部','B2C母婴运营部','B2C资生堂运营部','B2C美妆运营部','B2C个护运营部',
                  'B2C医药健康事业部','B2C自有品牌运营部','B2C POP店运营部','B2B运营部','视觉创意部','消费者运营部'];
            break;
          case 2:
            data.multiArray[1] = ['财务部','人事行政部','供应链管理部','法务部','信息系统部','公关企宣部','投资者关系部'];
            break;
          case 3:
            data.multiArray[1] = ['海外营业部','海外供应链部','海外管理部'];
            break;
          case 4:
            data.multiArray[1] = ['好驿'];
            break;
          case 5:
            data.multiArray[1] = ['芙立'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    var firstDeptVa = this.data.multiArray[0][this.data.multiIndex[0]].substring(0,5);
    var secondDeptVa = this.data.multiArray[1][this.data.multiIndex[1]].substring(0,5);
    this.setData({
      multiva1:firstDeptVa,
      multiva2:secondDeptVa
    })
    this.setData(data);
  },
  lastNameTap:function(e){
    this.setData({
      lastName: e.detail.value
    })
    if(this.data.firstName == "" || this.data.lastName == "" || this.data.entryTime=="" ||this.data.multiva1 ==""){
      this.setData({
        submit:0
      })
    }else{
      this.setData({
        submit:1
      })
    }
  },
  firstNameTap:function(e){
    this.setData({
      firstName: e.detail.value
    })
    if(this.data.firstName == "" || this.data.lastName == ""|| this.data.entryTime=="" ||this.data.multiva1 ==""){
      this.setData({
        submit:0
      })
    }else{
      this.setData({
        submit:1
      })
    }
  },
  bindDateChange:function(e){
    this.setData({
      entryFlag:true,
      entryTime: e.detail.value
    })
    if(this.data.firstName == "" || this.data.lastName == ""|| this.data.entryTime=="" ||this.data.multiva1 ==""){
      this.setData({
        submit:0
      })
    }else{
      this.setData({
        submit:1
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    var sessionId = wx.getStorageSync('sessionId');
    var phoneNum = this.data.phone;
    var lastNameVa = this.data.lastName;
    var firstNameVa = this.data.firstName;
    var entryTimeVa = this.data.entryTime;
    var firstDeptVa = this.data.multiArray[0][this.data.multiIndex[0]];
    var secondDeptVa = this.data.multiArray[1][this.data.multiIndex[1]];
    if(lastNameVa == "" || firstNameVa == "" || entryTimeVa == ""){
      wx.showModal({
        title: '提示',
        content: '请输入完整信息！',
        success: function (res) {
        }
      })
    }else{
      wx.request({
        url: `${config.host + '/user/user'}`,
        data: {
          phone: phoneNum,
          lastName: lastNameVa,
          firstName:firstNameVa,
          entryTime:entryTimeVa,
          firstDept:firstDeptVa,
          secondDept:secondDeptVa
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": sessionId
        },
        method: 'POST',
        success: function (res) {
          if (res.data == "success") {
            wx.navigateTo({
              url: '../planet/planet?year='+entryTimeVa
            })
          } else if (res.data = "error") {
            
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
