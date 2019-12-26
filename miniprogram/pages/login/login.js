// miniprogram/pages/login/login.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginMode: true,
    loginFormBtn: '',
    inputValue: [],
    formData: {},
  },
  loginOther() {
    this.setData({
      loginMode: !this.data.loginMode
    })
  },
  bindKeyInput(e) {
    let valueTmp = this.data.inputValue;
    var index = e.target.dataset.index;
    valueTmp[index] = e.detail.value;
    this.setData({
      inputValue: valueTmp
    });
    if (this.data.inputValue[0] && this.data.inputValue[1]) {
      this.setData({
        loginFormBtn: 'active'
      })
    } else {
      this.setData({
        loginFormBtn: ''
      })
    }
  },
  /*** 表单-验证字段*/
  formSubmit(e) {
    const params = e.detail.value;
    console.log(this.checkForm(params));
  
    if (!this.checkForm(params)) return false;
    //验证通过以后->
    if (params.username === '2511@qq.com' && params.password === '1234') {
      wx.showToast({
        title: '登录成功！',
        icon: 'sussess'
      });
      wx.switchTab({
        url: '../index/index'
      })
    } else {
      wx.showToast({
        title: '账号密码错误！',
        icon: 'none'
      })
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  checkForm(params) {
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      wx.showToast({
        title: error.msg,
        icon: 'none'
      });
      return false
    } else {
      return true
    }
  },
  /**
   * 生命周期函数_监听页面加载
   */
  onLoad: function () {
    this.WxValidate = app.WxValidate(
      {
        username: {
          required: true,
          email: true
        },
        password: {
          required: true,
        }
      },
      {
        username: {
          required: '请输入账号',
          email: '请正确输入账号'
        },
        password: {
          required: '请输入密码',
        }
      }
    )
  }
});
