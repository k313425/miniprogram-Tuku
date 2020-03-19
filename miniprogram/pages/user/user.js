// miniprogram/pages/user/user.js
let pageStart = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: 0,
    currentCur: 0,
    categoryData: [
      {
        name: "作品",
        id: 0,
        end: false,
        page: pageStart,
        listData: []
      },
      {
        name: "关注",
        id: 1,
        end: false,
        page: pageStart,
        listData: []
      },
      {
        name: "粉丝",
        id: 2,
        end: false,
        page: pageStart,
        listData: []
      }
    ]
  },
  // 获取页面数据
  getList(currentPage) {
    let currentCur = this.data.currentCur; //当前页
    let pageData = this.getCurrentData(currentCur); //当前页的数据
    if (pageData.page > 15) {
      pageData.end = true;
      this.setCurrentData(pageData);
      return false
    } //加载15次
    if (this.data.currentCur !== 0) {
      console.log(pageData);
      // return false
    }
    // pageData.page = currentPage;
    // this.setCurrentData(currentCur, pageData);
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
        // wx.hideNavigationBarLoading();
        pageData.listData = pageData.listData.concat(res.data.result);
        pageData.end = false;
        pageData.page = currentPage + 1;
        this.setCurrentData(currentCur, pageData);
      }
    })
  },
  // 更新页面数据
  setCurrentData(currentCur, pageData) {
    let categoryData = this.data.categoryData;
    categoryData[currentCur] = pageData;
    this.setData({
      categoryData: categoryData
    })
  },
  // 获取当前激活页面的数据
  getCurrentData(currentCur) {
    return this.data.categoryData[currentCur]
  },
  // 加载更多
  more() {
    this.getList(this.getCurrentData(this.data.currentCur).page);
  },
  click(e) {
    let id = e.currentTarget.dataset.id;
    if (this.data.currentCur === id) {
      return false
    }
    this.setData({
      currentCur: id
    });
    this.getList(pageStart);
  },
  focus() {
    if (this.data.focus == 1) {
      this.setData({
        focus: 2
      })
    } else {
      this.setData({
        focus: 1
      })
    }
    console.log(this.data.focus)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(pageStart);
  },
  onReachBottom: function () {
    this.more();
  },
});
