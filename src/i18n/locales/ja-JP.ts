export default {
  app: {
    title: 'FocusFar',
    description: '遠くを見る習慣をつけ、目をリラックスさせ、近業の負担を軽減するウェブツールです。',
    nav: {
      history: '履歴',
      settings: '設定'
    },
    footer: {
      safety: '安全性と免責事項',
      copyright: '© 2026 FocusFar Project. 医療用ではありません。'
    },
    viewMode: {
      cross: '交差法',
      parallel: '平行法'
    }
  },
  home: {
    todayCompleted: '本日の完了回数',
    times: '回',
    startTraining: 'トレーニング開始',
    defaultFlow: 'デフォルト: 準備 5秒 → (近 5秒 → 遠 20秒 → 休憩 10秒) × 3'
  },
  settings: {
    title: 'トレーニング設定',
    save: '設定を保存',
    saved: '設定を保存しました',
    reset: '初期設定に戻す',
    confirmReset: '初期設定に戻してもよろしいですか？',
    mode: {
      title: '裸眼3Dモード',
      focusMethod: '焦点の合わせ方',
      crossTitle: '交差法',
      crossDesc: '画面の手前で焦点を合わせる',
      parallelTitle: '平行法',
      parallelDesc: '画面の奥で焦点を合わせる',
      intensity: '視差の強さ',
      speed: 'アニメーション速度'
    },
    process: {
      title: 'プロセスパラメータ',
      cycles: '1ラウンドのストレッチ回数',
      rounds: 'ラウンド数',
      restSec: '休憩時間 (秒)',
      minDistance: '最小距離 (m)',
      maxDistance: '最大距離 (m)'
    },
    calibration: {
      title: '物理キャリブレーション（正確さの追求）',
      use: '物理的なキャリブレーションを有効にする',
      ipd: '実際の瞳孔間距離 (mm)',
      ipdDesc: '成人の平均は 55 ～ 75',
      screen: 'モニターサイズ (インチ)',
      screenDesc: '実際の物理ピクセル比を計算するために使用されます'
    }
  },
  training: {
    confirmExit: 'トレーニング中です。終了してもよろしいですか？',
    round: 'ラウンド',
    completed: 'トレーニング完了',
    times: '回',
    rest: '目を閉じて目の筋肉をリラックスさせてください',
    paused: '一時停止',
    locking: {
      instruction: '{mode} で焦点を合わせてください',
      cross: '交差法',
      parallel: '平行法',
      desc: '画面の中央に3つ目のクリアな3D画像が現れるまで視線を調整してください。安定してロックできたら下のボタンをクリックしてください。',
      confirm: '3D画像が見えました (ダイナミックストレッチ開始)'
    },
    done: {
      title: 'トレーニング完了',
      desc: 'よくできました！目がしっかりと鍛えられました。',
      back: 'ホームに戻る'
    },
    canvas: {
      distance: 'シミュレーション距離'
    }
  },
  history: {
    title: 'トレーニング履歴',
    totalTime: '合計時間',
    totalCompleted: '完了回数',
    minutes: '分',
    times: '回',
    recent: '最近30日間',
    empty: 'トレーニング記録がありません',
    startNow: '最初のトレーニングを始めましょう',
    recordFormat: '{date} {rounds}ラウンド完了、合計{time}'
  },
  safety: {
    title: '安全性と免責事項',
    back: 'ホームに戻る',
    sections: {
      general: {
        title: '一般的な安全警告',
        items: [
          'このツールは目のリラックスを補助するものであり、専門的な医療診断、治療、またはアドバイスの代わりにはなりません。',
          '眼疾患（緑内障、白内障、重度の網膜症など）、斜視、弱視がある場合、または最近眼の緊急手術を受けた場合は、使用前に専門の眼科医にご相談ください。',
          '未成年者（特に12歳以下の子供）は視力が発達段階にあるため、保護者や専門家の指導の下で使用してください。'
        ]
      },
      usage: {
        title: '使用上の注意',
        items: [
          '過度なトレーニングはお控えください。目の痛み、めまい、吐き気、かすみ目などの不快感を感じた場合は、すぐに使用を中止し、目を休めてください。',
          '交差法や平行法を使用する際、目に無理な力をかけないでください。数分以内に焦点が合わない場合は、休憩してから再度お試しください。',
          '1日の使用を制限し、強制的な過度なトレーニングではなく、定期的な休憩の一部として使用することをお勧めします。'
        ]
      },
      disclaimer: {
        title: '免責事項',
        items: [
          '本ツールの使用に起因するすべてのリスクは、すべてユーザー自身が負うものとします。',
          '本ツールの開発者は、本ツールの使用または使用不能によって生じた直接的、間接的、偶発的、または結果的な損害（視力低下や身体的不快感を含みますが、これらに限定されません）について、法的責任を負わないものとします。'
        ]
      }
    }
  }
};
