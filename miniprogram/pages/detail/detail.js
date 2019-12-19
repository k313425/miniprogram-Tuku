// miniprogram/pages/detail/detail.js
Page({
  data: {
    lazy: true,
    id: 0,
    like: '',
    likenum: 0,
    detail: {
      title: '',
      image: '',
      time: ''
    }
  },
  // 作品喜欢点赞
  zpLike(e) {
    console.log(e.currentTarget.dataset.id);
    // let id = e.currentTarget.dataset.id;

    this.setData({
      like: 'active',
      likenum: 1
    })
    
  },
  outputSrc(e) {
    // 只需查看本事件触发即可知道image 的加载情况
    console.log(e)
  },
  
  onLoad: function (options) {
    let pageDetail = this.data.detail;
    pageDetail.title = options.title;
    pageDetail.image = options.image;
    pageDetail.time = options.time;
    this.setData({
      id: options.id,
      detail: pageDetail
    });
  
    console.log(this.data.detail);
  },
});
