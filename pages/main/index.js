//主页面
const moment = require('moment')
const coordtransform = require('coordtransform')
import { getCurrentUser } from '../../services/user'
import { searchQrcode } from '../../services/main'
import { PILE_STATE_TEXT } from '../../constants/index'
const app = getApp()

Page({
  data: {
    latitude: 30.27919,
    longitude: 120.12174,
    scale: 15,
    markers: [],
    marker: {},
    markerModal: false,
    cover: ['', '', '']
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    this.checkTasks()
    this.goLocation()
  },

  goLocation: function (data) {
    this.setBtnCover(data)
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (res) => {
        let markers = [];
        markers.push({
          id: 9999999,
          latitude: res.latitude,
          longitude: res.longitude,
          name: '当前位置',
          iconPath: '/image/location.png',
          label: '当前位置'
        })

        const userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
          const positionNow = coordtransform.gcj02tobd09(res.latitude, res.longitude);
          const params = {
            company: userInfo.company,
            // latitude: res.latitude,
            // longitude: res.longitude,
            latitude: positionNow[0],
            longitude: positionNow[1],
            distance: 5000
          }
        } else {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            scale: 15,
            markers: markers
          })
        }
      },
      fail: (res) => {
        console.log(res)
      },
    })
  },
  scanCode: function (data) {
    this.setBtnCover(data)
    const callback = function (userInfo) {
      wx.scanCode({
        onlyFromCamera: true,
        success: (scanCode) => {
          // let no = getUrlParams(scanCode.result, 'no')
          const params = {
            company: userInfo.company,
            code: scanCode.result
          }
          searchQrcode(params).then(result => {
            if (result.cdz_charging_pile) {
              app.globalData.pileDetail = result.cdz_charging_pile
              wx.navigateTo({
                url: '/pages/main/pileDetail/index'
              })
            }
          })
        },
        fail: (res) => {
          console.log(res)
        },
      })
    }
    this.checkTasks(callback)
  },
  goMy: function (data) {
    this.setBtnCover(data)
    const callback = function (userInfo) {
      wx.navigateTo({
        url: '/pages/my/index'
      })
    }
    this.checkTasks(callback)
  },
  // 处理地图上3个按钮点击的active效果。
  setBtnCover: function (data) {
    if (data){
      const { cover } = this.data
      let newCover = [...cover]
      switch (data.target.dataset.id) {
        case 'position':
          newCover[0] = 'active'
          break
        case 'scan':
          newCover[1] = 'active'
          break
        case 'my':
          newCover[2] = 'active'
          break
      }
      this.setData({
        cover: newCover
      })
      const w = this
      setTimeout(function () {
        w.setData({
          cover: ['','','']
        })
      }, 300)
    }
  },
  checkTasks: function (callback) {
    try {
      const userInfo = wx.getStorageSync('userInfo')
      const params = {
        _id: userInfo.user ? userInfo.user : ''
      }
      getCurrentUser(params).then(res => {
        if (res.cdz_user){
          if (res.orderList && res.orderList.length){
            wx.navigateTo({
              url: `/pages/my/orderDetail/index?_id=${res.orderList[0]._id}&url=/pages/main/index`
            })
          }
          if (res.chargingList && res.chargingList.length){
            app.globalData.cdzCharging = res.chargingList[0]
            wx.setStorageSync('chargingStartTime', moment(res.chargingList[0].startTime).valueOf())
            wx.navigateTo({
              url: `/pages/main/charging/index?_id=${res.chargingList[0]._id}&url=/pages/main/index`
            })
          }
          if(callback) callback(userInfo)
        } else {
          wx.redirectTo({ url: '/pages/login/index' })
        }
      })
    } catch (e) {
      console.log(e)
    }
  },
  showModal: function (data) {
    const { markers } = this.data
    const marker = markers.find(item => item.id === data.markerId)
    this.setData({
      markerModal: true,
      marker: { ...marker, statusText: PILE_STATE_TEXT[marker.status] }
    })
  },
  closeModal: function () {
    const { markerModal } = this.data
    if (markerModal) this.setData({ markerModal: false })
  },
  orderPile: function () {
    wx.navigateTo({
      url: `/pages/my/appointDetail/index?_id=${this.data.marker.id}&type=prepay`
    })
  },
  goMap: function () {
    const { marker } = this.data
    let address = ''
    Object.keys(marker.address).forEach(item => {
      address += marker.address[item]
    })
    wx.openLocation({
      latitude: marker.latitude,
      longitude: marker.longitude,
      name: marker.name,
      address: address
    })
  }

})
