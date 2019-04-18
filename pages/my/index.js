//我的页面
const app = getApp()
Page({
  data: {
    menuList: [
      { name: '订单', path: '/order/index', key: 'order', icon:'../../image/dingdan.png' },
      { name: '预约', path: '/appointment/index', key: 'appointment', icon:'../../image/yuyue.png' },
      { name: '账户管理', path: '/account/index', key: 'account', icon:'../../image/zhgl.png' },
      { name: '发票', path: '/invoice/index', key: 'invoice', icon:'../../image/fapiao.png' },
      { name: '积分/优惠券', path: '/coupon/index', key: 'coupon', icon:'../../image/yhq.png' },
      { name: '电卡', path: '/card/index', key: 'card', icon:'../../image/qiabao.png' },
      { name: '设置', path: '/setting/index', key: 'setting', icon:'../../image/gerenshezhi.png' },
      { name: '客服', path: '/contact/index', key: 'contact', icon:'../../image/lianxiwomen.png' },
    ],
    userInfo: {
      avatarUrl: '',
      name: '',
      phone: ''
    }
  },
  
  onLoad: function () {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({ userInfo })
  },

})
