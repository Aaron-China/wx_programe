//用户登录
import { login } from '../../services/user'
const app = getApp()
Page({
  data: {},
  onLoad: function () {},

  login: function (data) {
    wx.login({
      success: res => {
        const params = {
          code: res.code,
          nickName: data.detail.userInfo.nickName,
          avatarUrl: data.detail.userInfo.avatarUrl,
          gender: data.detail.userInfo.gender,
          language: data.detail.userInfo.language,
          subdomain: 'default'
        }
        login(params).then(result => {
          const obj = {
            user: result.user._id,
            company: result.user.company,
            name: result.user.name,
            phone: result.user.phone,
            nickName: data.detail.userInfo.nickName,
            gender: data.detail.userInfo.gender,
            city: data.detail.userInfo.city,
            province: data.detail.userInfo.province,
            country: data.detail.userInfo.country,
            avatarUrl: data.detail.userInfo.avatarUrl,
            language: data.detail.userInfo.language,
          }
          app.userInfo = obj
          wx.setStorageSync('userInfo', obj)
          wx.redirectTo({url: '/pages/main/index'})
        })
      }
    })
  }
})
