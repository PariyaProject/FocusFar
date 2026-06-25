export default {
  app: {
    title: '遠眺計畫',
    description: '一個幫助您定期眺望遠處、放鬆雙眼並減少持續近距離工作的網頁工具。',
    nav: {
      history: '歷史記錄',
      settings: '設定'
    },
    footer: {
      safety: '安全與免責聲明',
      copyright: '© 2026 FocusFar Project. 非醫療用途。'
    },
    viewMode: {
      cross: '交叉眼',
      parallel: '平行眼'
    }
  },
  home: {
    todayCompleted: '今日已完成',
    times: '次',
    startTraining: '開始訓練',
    currentFlow: '目前設定: 單輪 {cycles} 次拉伸 × {rounds} 輪 (休息 {rest}s)'
  },
  settings: {
    title: '訓練設定',
    save: '儲存設定',
    saved: '設定已儲存',
    reset: '恢復預設',
    confirmReset: '確定要恢復為預設設定嗎？',
    mode: {
      title: '裸眼 3D 模式',
      focusMethod: '對焦方式',
      crossTitle: '交叉眼 (鬥雞眼)',
      crossDesc: '視線在螢幕前方交會',
      parallelTitle: '平行眼 (發呆看)',
      parallelDesc: '視線穿透螢幕看向後方',
      intensity: '視差拉扯幅度',
      speed: '動畫切換速度'
    },
    process: {
      title: '流程參數',
      cycles: '單輪拉伸 (次)',
      rounds: '循環輪數',
      restSec: '閉眼休息 (秒)',
      minDistance: '最小模擬距離 (米)',
      maxDistance: '最大模擬距離 (米)'
    },
    calibration: {
      title: '物理校準 (追求真實還原)',
      use: '啟用物理精確校準',
      ipd: '您的真實瞳距 (mm)',
      ipdDesc: '一般成人在 55 - 75 之間',
      screen: '顯示器物理尺寸 (英吋)',
      screenDesc: '手機通常約 6.1-6.8，電腦通常為 24-27。受瀏覽器限制，此項必須手動填寫'
    }
  },
  training: {
    rotate: {
      title: '请将手机横屏握持',
      desc: '为了获得足够的双眼间距，请旋转手机至横屏模式进行训练。如果开启了方向锁定，请暂时关闭。',
      autoRotate: '點擊自動橫向 (全螢幕)'
    },
    confirmExit: '訓練正在進行中，確定要退出嗎？',
    round: '第',
    completed: '訓練完成',
    times: '輪',
    rest: '請閉上雙眼，放鬆眼部肌肉',
    paused: '已暫停',
    locking: {
      instruction: '請使用{mode}進行對焦',
      cross: '交叉眼',
      parallel: '平行眼',
      desc: '調整您的視線，直到螢幕中央出現第三個清晰的 3D 影像。當您能穩定鎖定它時，點擊下方按鈕。',
      confirm: '我看到 3D 影像了 (開始動態拉伸)'
    },
    done: {
      title: '訓練完成',
      desc: '做得好！您的眼睛得到了充分的運動。',
      back: '返回首頁'
    },
    canvas: {
      distance: '模擬距離'
    }
  },
  history: {
    title: '訓練歷史',
    totalTime: '累計時長',
    totalCompleted: '累計完成',
    minutes: '分鐘',
    times: '次',
    recent: '近 30 天記錄',
    empty: '暫無訓練記錄',
    startNow: '去開啟您的第一次訓練吧',
    recordFormat: '{date} 完成 {rounds} 輪，共計 {time}'
  },
  safety: {
    title: '安全與免責聲明',
    back: '返回首頁',
    sections: {
      general: {
        title: '一般安全警告',
        items: [
          '本工具僅作為眼部放鬆的輔助手段，不能替代任何專業的醫療診斷、治療或建議。',
          '如果您患有眼部疾病（如青光眼、白內障、嚴重的視網膜病變等）、斜視、弱視，或近期做過眼部手術，請在使用前諮詢專業的眼科醫生。',
          '未成年人（尤其是 12 歲以下的兒童）視力正處於發育期，請在家長和專業人士的指導下使用。'
        ]
      },
      usage: {
        title: '使用注意事項',
        items: [
          '請勿過度訓練。如果您在訓練過程中感到眼部痠痛、頭暈、噁心、視力模糊或任何不適，請立即停止使用並讓眼睛休息。',
          '在使用交叉眼或平行眼時，請勿強行用力。如果幾分鐘內無法成功對焦，請休息後再試，切勿勉強。',
          '我們建議您限制每日的使用次數，將其作為日常用眼休息的一部分，而不是強迫性的高強度運動。'
        ]
      },
      disclaimer: {
        title: '免責聲明',
        items: [
          '使用本工具所產生的一切風險完全由使用者自行承擔。',
          '本工具的開發者對於因使用或無法使用本工具而導致的任何直接、間接、偶然或衍生性的損害（包括但不限於視力受損、身體不適），均不承擔法律責任。'
        ]
      }
    }
  }
};
