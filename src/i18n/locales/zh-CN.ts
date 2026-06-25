export default {
  app: {
    title: '远眺计划',
    description: '一个帮助你定时远眺、放松眼睛、减少连续近距离用眼的网页工具。',
    nav: {
      history: '记录',
      settings: '设置'
    },
    footer: {
      safety: '安全说明与免责声明',
      copyright: '© 2026 FocusFar Project. 不用于医疗用途。'
    },
    viewMode: {
      cross: '交叉眼',
      parallel: '平行眼'
    }
  },
  home: {
    todayCompleted: '今日完成训练',
    times: '次',
    startTraining: '开始训练',
    currentFlow: '当前设置: 单轮 {cycles} 次拉伸 × {rounds} 轮 (休息 {rest}s)'
  },
  settings: {
    title: '训练设置',
    save: '保存设置',
    saved: '设置已保存',
    reset: '恢复默认',
    confirmReset: '确定要恢复默认设置吗？',
    mode: {
      title: '裸眼 3D 模式',
      focusMethod: '对焦方式',
      crossTitle: '交叉眼 (Cross-view)',
      crossDesc: '视线在屏幕前相交，俗称斗鸡眼',
      parallelTitle: '平行眼 (Parallel-view)',
      parallelDesc: '视线在屏幕后相交，发呆看远方',
      intensity: '调节强度 (视差拉扯幅度)',
      speed: '动画速度'
    },
    process: {
      title: '流程参数',
      cycles: '单轮拉伸 (次)',
      rounds: '循环轮数',
      restSec: '闭眼休息 (秒)',
      minDistance: '最小模拟距离 (米)',
      maxDistance: '最大模拟距离 (米)'
    },
    calibration: {
      title: '物理校准 (追求真实还原)',
      use: '启用物理精确校准',
      ipd: '您的真实瞳距 (mm)',
      ipdDesc: '一般成人在 55 - 75 之间',
      screen: '显示器物理尺寸 (英寸)',
      screenDesc: '手机通常约 6.1-6.8，电脑通常为 24-27。受浏览器限制，此项必须手动填写'
    }
  },
  training: {
    rotate: {
      title: '请将手机横屏握持',
      desc: '为了获得足够的双眼间距，请旋转手机至横屏模式进行训练。如果开启了方向锁定，请暂时关闭。',
      autoRotate: '点击自动横屏 (全屏)'
    },
    confirmExit: '训练正在进行中，确定要退出吗？',
    round: '轮次',
    completed: '训练完成',
    times: '次',
    rest: '请闭眼休息，放松眼部肌肉',
    paused: '已暂停',
    locking: {
      instruction: '请使用 {mode} 对焦',
      cross: '交叉眼 (斗鸡眼)',
      parallel: '平行眼 (发呆)',
      desc: '调节双眼视线，直到屏幕中间浮现出第三个清晰的立体图像。当你能够稳定锁定它时，点击下方按钮。',
      confirm: '我已经看到 3D 图像了 (开始动态拉伸)'
    },
    done: {
      title: '训练完成',
      desc: '做得好！你的眼睛得到了很好的锻炼。',
      back: '返回首页'
    },
    canvas: {
      distance: '模拟视距'
    }
  },
  history: {
    title: '训练记录',
    totalTime: '累计训练时长',
    totalCompleted: '累计完成次数',
    minutes: '分钟',
    times: '次',
    recent: '最近 30 天记录',
    empty: '暂无训练记录',
    startNow: '去开始第一次训练吧',
    recordFormat: '{date} 完成了 {rounds} 轮，共 {time}'
  },
  safety: {
    title: '安全说明与免责声明',
    back: '返回首页',
    sections: {
      general: {
        title: '一般性安全警告',
        items: [
          '本工具仅为视力放松辅助工具，不能替代任何专业的医疗诊断、治疗或建议。',
          '如果您有任何眼部疾病（如青光眼、白内障、严重的视网膜病变等）、斜视、弱视，或近期接受过眼部手术，请在使用前咨询专业眼科医生。',
          '未成年人（特别是 12 岁以下儿童）视力仍在发育中，请在家长和专业医生的指导下使用。'
        ]
      },
      usage: {
        title: '使用注意事项',
        items: [
          '不要过度训练。如果感到眼睛酸痛、头晕、恶心、视力模糊或任何不适，请立即停止使用并闭眼休息。',
          '在使用“交叉眼”或“平行眼”对焦时，不要强行用力。如果几分钟内无法成功对焦，请休息后再试。',
          '建议每天使用次数不要过多，将其作为日常休息的一部分，而非高强度的强制锻炼。'
        ]
      },
      disclaimer: {
        title: '免责声明',
        items: [
          '使用本工具所产生的一切风险由用户自行承担。',
          '本工具的开发者不对任何因使用或无法使用本工具而导致的直接、间接、偶然或必然的损害（包括但不限于视力下降、身体不适等）承担任何法律责任。'
        ]
      }
    }
  }
};
