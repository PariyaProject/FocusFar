export default {
  app: {
    title: 'FocusFar',
    description: '규칙적으로 멀리 보고, 눈을 쉬게 하며, 지속적인 근거리 작업을 줄이는 데 도움을 주는 웹 도구입니다.',
    nav: {
      history: '기록',
      settings: '설정'
    },
    footer: {
      safety: '안전 및 면책 조항',
      copyright: '© 2026 FocusFar Project. 의료용이 아닙니다.'
    },
    viewMode: {
      cross: '교차법',
      parallel: '평행법'
    }
  },
  home: {
    todayCompleted: '오늘 완료',
    times: '회',
    startTraining: '훈련 시작',
    currentFlow: '현재 설정: 라운드당 {cycles} 회 스트레칭 × {rounds} 라운드 (휴식 {rest}초)'
  },
  settings: {
    title: '훈련 설정',
    save: '설정 저장',
    saved: '설정이 저장되었습니다',
    reset: '기본값으로 초기화',
    confirmReset: '기본 설정으로 초기화하시겠습니까?',
    mode: {
      title: '맨눈 3D 모드',
      focusMethod: '초점 방식',
      crossTitle: '교차법',
      crossDesc: '시선이 화면 앞쪽에서 교차함',
      parallelTitle: '평행법',
      parallelDesc: '시선이 화면 뒤쪽을 향함',
      intensity: '시차 강도',
      speed: '애니메이션 속도'
    },
    process: {
      title: '과정 매개변수',
      cycles: '라운드당 스트레칭',
      rounds: '총 라운드 수',
      restSec: '휴식 시간 (초)',
      minDistance: '최소 거리 (m)',
      maxDistance: '최대 거리 (m)'
    },
    calibration: {
      title: '물리적 보정 (정확성 추구)',
      use: '물리적 정확한 보정 활성화',
      ipd: '실제 동공 간 거리 (mm)',
      ipdDesc: '성인 평균 55 - 75',
      screen: '모니터 크기 (인치)',
      screenDesc: '실제 물리적 픽셀 비율을 계산하는 데 사용됨'
    }
  },
  training: {
    confirmExit: '훈련이 진행 중입니다. 정말 종료하시겠습니까?',
    round: '라운드',
    completed: '훈련 완료',
    times: '회',
    rest: '눈을 감고 눈 근육을 쉬게 해주세요',
    paused: '일시 정지',
    locking: {
      instruction: '{mode}으로 초점을 맞춰주세요',
      cross: '교차법',
      parallel: '평행법',
      desc: '화면 중앙에 세 번째 선명한 3D 이미지가 나타날 때까지 시선을 조정하세요. 안정적으로 초점이 맞춰지면 아래 버튼을 클릭하세요.',
      confirm: '3D 이미지가 보입니다 (동적 스트레칭 시작)'
    },
    done: {
      title: '훈련 완료',
      desc: '잘 하셨습니다! 눈이 충분히 운동되었습니다.',
      back: '홈으로 돌아가기'
    },
    canvas: {
      distance: '시뮬레이션 거리'
    }
  },
  history: {
    title: '훈련 기록',
    totalTime: '총 시간',
    totalCompleted: '총 완료',
    minutes: '분',
    times: '회',
    recent: '최근 30일',
    empty: '아직 훈련 기록이 없습니다',
    startNow: '첫 번째 훈련을 시작하세요',
    recordFormat: '{date} {rounds}라운드 완료, 총 {time}'
  },
  safety: {
    title: '안전 및 면책 조항',
    back: '홈으로 돌아가기',
    sections: {
      general: {
        title: '일반 안전 경고',
        items: [
          '이 도구는 눈의 휴식을 돕는 보조 도구일 뿐이며, 전문적인 의학적 진단, 치료 또는 조언을 대체할 수 없습니다.',
          '눈 질환(예: 녹내장, 백내장, 심각한 망막증), 사시, 약시가 있거나 최근 눈 수술을 받은 경우, 사용 전에 전문 안과 의사와 상담하십시오.',
          '미성년자(특히 12세 이하 어린이)는 시력이 발달하는 시기이므로 부모와 전문가의 지도 하에 사용하십시오.'
        ]
      },
      usage: {
        title: '사용 시 주의 사항',
        items: [
          '과도하게 훈련하지 마십시오. 눈의 통증, 어지러움, 메스꺼움, 시야 흐림 또는 기타 불편함을 느끼면 즉시 사용을 중지하고 눈을 쉬게 하십시오.',
          '교차법이나 평행법을 사용할 때 눈에 무리한 힘을 가하지 마십시오. 몇 분 안에 초점을 맞출 수 없으면 휴식을 취하고 나중에 다시 시도하십시오.',
          '강제적인 집중 훈련보다는 일일 사용을 제한하고 규칙적인 휴식의 일부로 다루는 것을 권장합니다.'
        ]
      },
      disclaimer: {
        title: '면책 조항',
        items: [
          '이 도구의 사용으로 인해 발생하는 모든 위험은 전적으로 사용자가 부담합니다.',
          '이 도구의 개발자는 이 도구의 사용 또는 사용 불능으로 인해 발생한 직접적, 간접적, 우발적 또는 결과적 손해(시력 저하 또는 신체적 불편을 포함하되 이에 국한되지 않음)에 대해 법적 책임을 지지 않습니다.'
        ]
      }
    }
  }
};
