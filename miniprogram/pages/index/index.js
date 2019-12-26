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
    if (pageData.page > 5) {
      console.log(pageData.page);
      pageData.end = true;
      this.setCurrentData(pageData);
      return false
    }
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
  // 加载更多
  more() {
    this.getList(this.getCurrentData().page);
  },
  zpLike(e) {
    // let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let pageData = this.getCurrentData();
    pageData.listData[index].path = 'active';
    pageData.listData[index].passtime = '2020';
    this.setCurrentData(pageData);
  },
  onLoad: function () {
    this.getList(pageStart);
  },
  onReachBottom: function () {
    this.more();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
});
