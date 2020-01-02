// miniprogram/pages/user/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ['男', '女'],
    sexIndex: 0,
    zhiyeData: [{"id":"15","name":"\u6444\u5f71\u5e08","value":"\u6444\u5f71\u5e08"},{"id":"17","name":"\u5316\u5986\u5e08","value":"\u5316\u5986\u5e08"},{"id":"16","name":"\u6570\u7801\u5e08","value":"\u6570\u7801\u5e08"},{"id":"25","name":"\u8bbe\u8ba1\u5e08","value":"\u8bbe\u8ba1\u5e08"},{"id":"24","name":"\u6a21\u7279","value":"\u6a21\u7279"},{"id":"19","name":"\u513f\u7ae5\u5f15\u5bfc\u5e08","value":"\u513f\u7ae5\u5f15\u5bfc\u5e08"},{"id":"20","name":"\u793c\u670d\u5e08","value":"\u793c\u670d\u5e08"},{"id":"18","name":"\u95e8\u5e02\u9500\u552e","value":"\u95e8\u5e02\u9500\u552e"},{"id":"21","name":"\u7ecf\u8425\u7ba1\u7406","value":"\u7ecf\u8425\u7ba1\u7406"},{"id":"23","name":"\u6587\u6848\u7b56\u5212","value":"\u6587\u6848\u7b56\u5212"},{"id":"28","name":"\u8001\u677f","value":"\u8001\u677f"},{"id":"22","name":"\u5176\u4ed6","value":"\u5176\u4ed6"}],
    zhiyeIndex: 0,
    region: ['广东省', '广州市', '海珠区'],
    regionCode: ["440000", "440100", "440105"],
  },
  bindSexPickerChange: function(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindZhiyePickerChange: function(e) {
    this.setData({
      zhiyeIndex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      regionCode: e.detail.code
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onPullDownRefresh: function () {

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

  }
});
