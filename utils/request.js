const app = getApp()
export default function request(url, options = {}) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${app.origin}${url}`,
      method: 'GET',
      ...options,
      data: options.data,
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("cookie")
      },
      success: function (res) {
        //重新授权登录
        if (res.statusCode === 401){
          wx.showToast({
            title: '未登录,请先登录',
            image: '/image/failed.png',
            duration: 2000
          });
          wx.redirectTo({url: '/pages/login/index'})
          return
        }else if (res.statusCode !== 200) {
          wx.showToast({
            title: '请求失败，请重试！',
            image: '/image/failed.png',
            duration: 2000
          });
          reject({ error: '服务器忙，请稍后重试', code: 500 });
          return
        } else {
          if (url === '/api/cdz/user/weixin/login') {
            const cookie = res.header["set-cookie"];
            if (cookie) wx.setStorageSync("cookie", cookie);
          }
          resolve(res.data);
        }
      },
      fail: function (res) {
        // fail调用接口失败
        if (url === '/api/cdz/user/weixin/login') {
          const cookie = res.header["set-cookie"];
          if (cookie) wx.setStorageSync("cookie", cookie);
        }
        wx.showToast({
          title: '网络错误',
          image: '/image/failed.png',
          duration: 2000
        });
        reject({ error: '网络错误', code: 0 });
      }
    })
  })
}