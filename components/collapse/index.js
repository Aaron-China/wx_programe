// 折叠面板
Component({
  properties: {
    title: {           // 折叠面板的标题
      type: String,
      value: ''
    },
    open: {      // 是否展开面板
      type: Boolean,
      value: false
    }
  },
  options: {
    multipleSlots: true
  },
  data: {},
  ready: function () {

  },
  methods: {
    openOrClose: function () {
      const { open } = this.data
      console.log(open)
      this.setData({
        open: !open
      })
    }
  }
})