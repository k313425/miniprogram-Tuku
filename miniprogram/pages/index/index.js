//index.js
const app = getApp();
let pageStart = 1;
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    background: [
      '/images/img-750_458_blue.jpg',
      '/images/img-750_458_red.jpg',
      '/images/img-750_458_blue.jpg',
      '/images/img-750_458_red.jpg'
    ],
    vertical: false,
    autoplay: true,
    circular: true,
    pageData: {
      name: "推荐",
      id: 1,
      requesting: false,
      end: false,
      emptyShow: false,
      page: pageStart,
      listData: []
    }
  },
  getList(currentPage) {
    let pageData = this.getCurrentData();
    pageData.requesting = true;
    pageData.page = currentPage;
    this.setCurrentData(pageData);
    // wx.showNavigationBarLoading();
    wx.request({
      url: 'https://api.apiopen.top/getWangYiNews', //仅为示例，并非真实的接口地址
      data: {
        'id': pageData.id,
        'page': pageData.page,
        'count': 6
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: (res) => {
        pageData.requesting = false;
        // wx.hideNavigationBarLoading();
        pageData.listData = pageData.listData.concat(res.data.result);
        pageData.end = false;
        pageData.page = currentPage + 1;
        console.log(pageData);
        this.setCurrentData(pageData);
      }
    })
  },
  setCurrentData(pageData) {
    this.setData({
      pageData: pageData
    })
  },
  getCurrentData() {
    return this.data.pageData
  },
  // 判断是否为加载新的页面,如果是去加载数据
  loadData() {
    let pageData = this.getCurrentData(this.data.categoryCur);
    if (pageData.listData.length === 0) {
      this.getList('refresh', pageStart);
    }
  },
  // 加载更多
  more() {
    this.getList(this.getCurrentData().page);
  },
  zpLike(e) {
    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.index);
    // let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let pageData = this.getCurrentData();
    
    pageData.listData[index].path = 'active';
    pageData.listData[index].passtime = '2020';
    console.log(pageData.listData[index]);
    
    this.setCurrentData(pageData);
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      });
      return
    }
  
    this.getList(pageStart);
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
        app.globalData.openid = res.result.openid;
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err);
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  /**
   * 上传图片
   */
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        });

        const filePath = res.tempFilePaths[0];
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0];
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res);

            app.globalData.fileID = res.fileID;
            app.globalData.cloudPath = cloudPath;
            app.globalData.imagePath = filePath;
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e);
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }

});
