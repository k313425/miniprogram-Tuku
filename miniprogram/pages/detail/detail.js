// miniprogram/pages/detail/detail.js
Page({
  data: {
    list:['精选','新闻','电影','电视剧','综艺','少儿','体育','音乐','游戏'],
    navScrollLeft: 10,
    clickNumber: 0,
  },
  //点击上方文字  切换
  centerTap:function(event) {
    //点击的偏移量
    console.log(event);
    var cur = event.detail.x;
    console.log(cur);
    //每个tab选项宽度占15%
    var singleNavWidth = wx.getSystemInfoSync().windowWidth * 12 / 100;
    console.log(singleNavWidth);
    this.setData({
      navScrollLeft: singleNavWidth,
      clickNumber: parseInt(cur / singleNavWidth)
    })
  },
  changeSwipe:function(event) {
    console.log(event);
    var type =
      event.detail.current;
    this.setData({
      clickNumber: type
    });
  },
  
  onLoad: function () {
  
  },
});
