// 上拉加载更多
Component({
  properties: {
    hidden: {           // 组件是否显示
      type: Boolean,
      value: true
    },
    text: {          // 提示信息
      type: String,
      value: '加载中'
    },
    iconShow: {      // 展示加载中图片
      type: Boolean,
      value: true
    }
  },
  data: {},
})