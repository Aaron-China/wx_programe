// 菜单组件
Component({
  properties: {
    menuList: {    // 菜单列表
      type: Array,
      value: [],
    },
    menuEvent: {    // 菜单点击的自定义事件名称
      type: String,
      value: '',
    },
  },
  data: {
  },
  ready: function () {

  },
  methods: {
    handleMenuTap:function () {
      const { menuEvent } = this.data
      if (menuEvent) this.triggerEvent(menuEvent, {})
    }
  }
})