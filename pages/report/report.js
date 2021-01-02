//index.js
//获取应用实例
const app = getApp()
const bgMusic = wx.getBackgroundAudioManager() //创建背景音乐
Page({
  data: {
		visible:false,
    musicStatus:0,
    year:'',
    name:'',
    nameT: '点点',
		posterPath: '/pages/img/logo1.png',
    qrCodePath: '/pages/img/sign_s.png',
    musicPath: '/pages/img/open.png',
    contentPath:'/pages/img/content2010.png',
    canvasWidth:2,
    canvasHeight:3
  },
  customData: {
		ctx: null,
	},
	customData2: {
		ctx: null,
	},
  onLoad: function (options) {
    let _ = this;
    var contentPathVa = '/pages/img/content'+options.year+'.png'
    wx.getSystemInfo({
      success: function(res) {
        var myCanvasWidth = res.windowWidth
        var myCanvasHeight = res.windowHeight
        _.setData({
          canvasWidth: myCanvasWidth,
          canvasHeight: myCanvasHeight
        })
      },
    })
    _.setData({
      musicStatus:app.globalData.musicStatus,
      year:options.year,
      name:options.name,
      contentPath:contentPathVa
    })
    
		this.customData.ctx = wx.createCanvasContext('firstCanvas');
		// 获取画布的宽高
		wx.createSelectorQuery().select('#canvas').boundingClientRect(function (rect) {
			let canvasWidth = rect.width;
			let canvasHeight = rect.height;

			// 清除画布
			_.customData.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

			// 绘制背景
			_.customData.ctx.rect(0, 0, canvasWidth, canvasHeight);
			_.customData.ctx.setFillStyle('white');
			_.customData.ctx.fill();

			// 获取海报图片信息
			wx.getImageInfo({
				src: _.data.posterPath,
				success(res) {
					// 绘制海报
         // 绘制海报
					let posterHeight = res.height ;	// 海报高度
					let posterWidth = res.width;
				
					if (posterWidth > canvasWidth) {		// 海报比画布宽
						let offsetX = (posterWidth - canvasWidth) / 2;
						_.customData.ctx.drawImage(_.data.posterPath, 0, 0, posterWidth, posterHeight, 0, 0, canvasWidth, canvasHeight);

					}else {
						let offsetX = (canvasWidth - posterWidth) / 2;
						_.customData.ctx.drawImage(_.data.posterPath, 0, 0, posterWidth, posterHeight, offsetX, 0, posterWidth, posterHeight);
					}

          
          // //绘制音乐图标
          // wx.getImageInfo({
					// 	src: _.data.musicPath,
					// 	success(res) {
					// 		_.customData.ctx.drawImage(_.data.musicPath, 0, 0, res.width, res.height, canvasWidth*0.88, canvasHeight*0.03, canvasWidth*0.08, canvasWidth*0.08);
					// 		//_.customData.ctx.draw();
					// 	}
					// });
					// // 绘制10年方始
					wx.getImageInfo({
						src: _.data.qrCodePath,
						success(res) {
							_.customData.ctx.drawImage(_.data.qrCodePath, 0, 0, res.width, res.height, canvasWidth*0.08, canvasHeight*0.15, canvasWidth*0.84, canvasWidth*0.84);
							//_.customData.ctx.draw();
							// 绘制多少日夜
							wx.getImageInfo({
								src: _.data.contentPath,
								success(res) {
									let canvasheightImg = canvasHeight*0.15+canvasWidth*0.84+16;
									_.customData.ctx.drawImage(_.data.contentPath, 0, 0, res.width, res.height, canvasWidth*0.10, canvasheightImg, canvasWidth*0.8, canvasHeight*0.25);
									// 绘制文字
									_.customData.ctx.setFillStyle('#00F1FF');
									_.customData.ctx.font = 'normal bold 30rpx sans-serif';
									//_.customData.ctx.setFontSize(40);
									if(canvasHeight<600){
										_.customData.ctx.fillText(_.data.name, canvasWidth*0.25, canvasheightImg+40);
									}else if(canvasHeight<700){
										_.customData.ctx.fillText(_.data.name, canvasWidth*0.25, canvasheightImg+50);
									}else if(canvasHeight<800){
										_.customData.ctx.fillText(_.data.name, canvasWidth*0.25, canvasheightImg+50);
									}else if(canvasHeight<900){
										_.customData.ctx.fillText(_.data.name, canvasWidth*0.25, canvasheightImg+60);
									}else{
										_.customData.ctx.fillText(_.data.name, canvasWidth*0.25, canvasheightImg+70);
									}
									
									_.customData.ctx.draw();
									_.setData({
										visible:true
									})
									
								}
							});
						}
          });
          
					// 绘制按钮

				}
			})

		}).exec();
  },
  // 将海报存入相册
	doSave() {
		wx.canvasToTempFilePath({
			x: 0,
			y: 0,
			canvasId: 'firstCanvas',
			success(res) {
				wx.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success(res) {
						wx.showToast({
							title: '保存成功',
						})
					},
					fail(err) {
						wx.showToast({
							title: '请确保您的微信已取得手机相册授权',
							icon: '',
						})
					}
				})
			},
			fail(err) {
				wx.showToast({
					title: '保存失败',
				})
			},
		})
	},

	// 保存海报
	savePoster() {
		let _ = this;
		wx.getSetting({
			success(res) {
				// 查询用户是否授权
				if (res.authSetting['scope.writePhotosAlbum']) {
					_.doSave();
				}else {
					wx.authorize({
						scope: 'scope.writePhotosAlbum',
						success() {
							_.doSave();
						},
						fail() {
							// wx.navigateTo({
							// 	url: '/pages/logs/logs',
							// })
							wx.showModal({
                title: '温馨提示',
                content: '你关闭了访问相册的权限，无法保存，请设置允许访问相册',
                showCancel: false
            	})
						}
					})
				}
			}
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
