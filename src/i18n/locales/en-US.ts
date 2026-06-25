export default {
  app: {
    title: 'FocusFar',
    description: 'A web tool to help you regularly look far away, relax your eyes, and reduce continuous near-work.',
    nav: {
      history: 'History',
      settings: 'Settings'
    },
    footer: {
      safety: 'Safety & Disclaimer',
      copyright: '© 2026 FocusFar Project. Not for medical use.'
    },
    viewMode: {
      cross: 'Cross',
      parallel: 'Parallel'
    }
  },
  home: {
    todayCompleted: 'Completed Today',
    times: 'times',
    startTraining: 'Start Training',
    currentFlow: 'Current settings: {cycles} stretches × {rounds} rounds (Rest {rest}s)'
  },
  settings: {
    title: 'Training Settings',
    save: 'Save Settings',
    saved: 'Settings saved',
    reset: 'Reset to Default',
    confirmReset: 'Are you sure you want to reset to default settings?',
    mode: {
      title: 'Naked Eye 3D Mode',
      focusMethod: 'Focus Method',
      crossTitle: 'Cross-view',
      crossDesc: 'Eyes converge in front of the screen',
      parallelTitle: 'Parallel-view',
      parallelDesc: 'Eyes diverge behind the screen',
      intensity: 'Parallax Intensity',
      speed: 'Animation Speed'
    },
    process: {
      title: 'Process Parameters',
      cycles: 'Stretch per Round',
      rounds: 'Total Rounds',
      restSec: 'Rest Duration (sec)',
      minDistance: 'Min Distance (m)',
      maxDistance: 'Max Distance (m)'
    },
    calibration: {
      title: 'Physical Calibration (True Accuracy)',
      use: 'Enable Physical Calibration',
      ipd: 'Your Real IPD (mm)',
      ipdDesc: 'Adult average is 55 - 75',
      screen: 'Monitor Size (inches)',
      screenDesc: 'Phones: ~6.1-6.8, Monitors: 24-27. Must be set manually due to browser limits'
    }
  },
  training: {
    rotate: {
      title: 'Please rotate your device',
      desc: 'Please rotate your device to landscape mode to get enough inter-pupillary distance for training. Disable orientation lock if needed.',
      autoRotate: 'Click to Auto Rotate'
    },
    confirmExit: 'Training is in progress. Are you sure you want to exit?',
    round: 'Round',
    completed: 'Training Completed',
    times: 'times',
    rest: 'Please close your eyes and relax your eye muscles',
    paused: 'Paused',
    locking: {
      instruction: 'Please use {mode} to focus',
      cross: 'Cross-view',
      parallel: 'Parallel-view',
      desc: 'Adjust your gaze until a third clear 3D image appears in the middle of the screen. Click the button below when you can stably lock onto it.',
      confirm: 'I see the 3D image (Start dynamic stretching)'
    },
    done: {
      title: 'Training Completed',
      desc: 'Well done! Your eyes got a good workout.',
      back: 'Back to Home'
    },
    canvas: {
      distance: 'Simulated Dist'
    }
  },
  history: {
    title: 'Training History',
    totalTime: 'Total Time',
    totalCompleted: 'Total Completed',
    minutes: 'mins',
    times: 'times',
    recent: 'Recent 30 Days',
    empty: 'No training records yet',
    startNow: 'Go start your first training',
    recordFormat: '{date} completed {rounds} rounds, {time} total'
  },
  safety: {
    title: 'Safety & Disclaimer',
    back: 'Back to Home',
    sections: {
      general: {
        title: 'General Safety Warnings',
        items: [
          'This tool is only an aid for eye relaxation and cannot replace any professional medical diagnosis, treatment, or advice.',
          'If you have any eye conditions (e.g., glaucoma, cataracts, severe retinopathy), strabismus, amblyopia, or recently had eye surgery, please consult a professional ophthalmologist before using.',
          'Minors (especially children under 12) have developing vision; please use under the guidance of parents and professionals.'
        ]
      },
      usage: {
        title: 'Usage Precautions',
        items: [
          'Do not over-train. If you experience eye soreness, dizziness, nausea, blurred vision, or any discomfort, stop using immediately and rest your eyes.',
          'Do not force your eyes when using Cross-view or Parallel-view. If you cannot focus within a few minutes, rest and try again later.',
          'We recommend limiting daily usage and treating it as a part of regular breaks, rather than an intensive forced workout.'
        ]
      },
      disclaimer: {
        title: 'Disclaimer',
        items: [
          'All risks arising from the use of this tool are borne entirely by the user.',
          'The developers of this tool shall not be legally liable for any direct, indirect, incidental, or consequential damages (including but not limited to vision loss or physical discomfort) caused by the use or inability to use this tool.'
        ]
      }
    }
  }
};
