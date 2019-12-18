// miniprogram/pages/list/list.js
let pageStart = 1;
Page({
  data: {
    duration: 300,  // swiper-item 切换过渡时间
    showPage: -1, // 控制列表空状态的显示时机
    categoryCur: 0,
    categoryMenu: ["推荐", "精选集锦", "最新体验"],
    categoryData: [
      {
        name: "推荐",
        id: 1,
        requesting: false,
        end: false,
        emptyShow: false,
        page: pageStart,
        listData: []
      },
      {
        name: "精选集锦",
        id: 2,
        requesting: false,
        end: false,
        emptyShow: false,
        page: pageStart,
        listData: []
      },
      {
        name: "最新体验",
        id: 3,
        requesting: false,
        end: false,
        emptyShow: false,
        page: pageStart,
        listData: []
      }
    ]
  },
  getList(type, currentPage) {
    let currentCur = this.data.categoryCur;
    let pageData = this.getCurrentData(currentCur);
    pageData.requesting = true;
    pageData.page = currentPage;
    this.setCurrentData(currentCur, pageData);
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
        console.log(res.data);
        pageData.requesting = false;
        // wx.hideNavigationBarLoading();
        if (type === 'refresh') {
          pageData.listData = res.data.result;
          pageData.end = false;
          pageData.page = currentPage + 1;
        } else {
          pageData.listData = pageData.listData.concat(res.data.result);
          pageData.end = false;
          pageData.page = currentPage + 1;
        }
        this.setCurrentData(currentCur, pageData);
      }
    })
  },
  // 顶部tab切换事件
  toggleCategory(e) {
    this.setData({
      duration: 0
    });
    this.setData({
      categoryCur: e.detail.index
    });
  },
  // 页面滑动切换事件
  swipeChange(e) {
    this.setData({
      duration: 300
    });
    this.setData({
      categoryCur: e.detail.current
    });
    this.loadData()
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
  // 判断是否为加载新的页面,如果是去加载数据
  loadData() {
    let pageData = this.getCurrentData(this.data.categoryCur);
    if (pageData.listData.length === 0) {
      this.getList('refresh', pageStart);
    }
  },
  // 刷新数据
  refresh() {
    this.getList('refresh', pageStart);
  },
  // 加载更多
  more() {
    this.getList('more', this.getCurrentData(this.data.categoryCur).page);
  },
  onLoad() {
    this.getList('refresh', pageStart);
  }
});

