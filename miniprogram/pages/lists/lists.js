// miniprogram/pages/lists/lists.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 375,
    clickNumber: 0,
    navScrollLeft: 0,
    navInfo: {
      vertical: false,
      autoplay: false,
      circular: true,
      nav: [
        {
          id: 0,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 1,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 2,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 3,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 4,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 5,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 6,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 7,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 8,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 9,
          val: '婚纱',
          lurl: '#'
        },
        {
          id: 10,
          val: '婚纱',
          lurl: '#'
        }
      ]
    }
  },
  lower(e) {
    console.log(e)
  },
  /**
   * 点击tab
   * @param e: ...
   */
  centerTap: function (e) {
    //点击的偏移量
    console.log(e);
    if (this.data.clickNumber == e.target.dataset.i) {
      return false;
    } else {
      var scrollNavWidth = e.detail.x - this.data.windowWidth;
      this.setData({
        navScrollLeft: scrollNavWidth,
        clickNumber: e.currentTarget.dataset.i
      })
    }
  },
  changeSwipe: function (e) {
    var scrollNavWidth = (e.detail.current + 1) * 50 - this.data.windowWidth;
    this.setData({
      navScrollLeft: scrollNavWidth,
      clickNumber: e.detail.current
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth / 2
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    console.log(e)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  }
});
