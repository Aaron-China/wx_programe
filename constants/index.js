export const PILE_STATE = {
  1: {
    icon: 'success',
    label: '可用',
    description: 'q，q',
    btn: {
      label: 'qq',
      classes: 'successBtn'
    }
  },
  2: {
    icon: 'warn',
    extraColor: '#FFBE00',
    label: '工作中',
    description: 'q，q',
    btn: {
      label: '',
      classes: 'useBtn'
    }
  },
  3: {
    icon: 'warn',
    label: '停用',
    description: 'q，q',
    btn: {
      label: '',
      classes: 'warnBtn'
    }
  },
  4: {
    icon: 'waiting',
    label: '被预约',
    description: 'q，q',
    btn: {
      label: '',
      classes: 'waitingBtn'
    }
  }
}

export const PILE_STATE_TEXT = {
  1: '闲置',
  2: '工作',
  3: '停用',
  4: '被预约'
}
export const PILE_STATE_ICON_PATH = {
  1: '/image/po_free.png',          // 闲置
  2: '/image/po_working.png',       // 工作
  3: '/image/po_stopped.png',       // 停用
  4: '/image/po_order.png',      // 被预约
}

