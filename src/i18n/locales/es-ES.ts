export default {
  app: {
    title: 'FocusFar',
    description: 'Una herramienta web para ayudarte a mirar a lo lejos regularmente, relajar tus ojos y reducir el trabajo continuo de cerca.',
    nav: {
      history: 'Historial',
      settings: 'Ajustes'
    },
    footer: {
      safety: 'Seguridad y Aviso Legal',
      copyright: '© 2026 FocusFar Project. No para uso médico.'
    },
    viewMode: {
      cross: 'Cruzado',
      parallel: 'Paralelo'
    }
  },
  home: {
    todayCompleted: 'Completado Hoy',
    times: 'veces',
    startTraining: 'Iniciar Entrenamiento',
    currentFlow: 'Ajustes actuales: {cycles} estiramientos × {rounds} rondas (Descanso {rest}s)'
  },
  settings: {
    title: 'Ajustes de Entrenamiento',
    save: 'Guardar Ajustes',
    saved: 'Ajustes guardados',
    reset: 'Restablecer',
    confirmReset: '¿Estás seguro de que quieres restablecer los ajustes predeterminados?',
    mode: {
      title: 'Modo 3D a Simple Vista',
      focusMethod: 'Método de Enfoque',
      crossTitle: 'Visión Cruzada',
      crossDesc: 'Los ojos convergen delante de la pantalla',
      parallelTitle: 'Visión Paralela',
      parallelDesc: 'Los ojos divergen detrás de la pantalla',
      intensity: 'Intensidad de Paralaje',
      speed: 'Velocidad de Animación'
    },
    process: {
      title: 'Parámetros del Proceso',
      cycles: 'Estiramientos por Ronda',
      rounds: 'Rondas Totales',
      restSec: 'Duración de Descanso (seg)',
      minDistance: 'Distancia Mínima (m)',
      maxDistance: 'Distancia Máxima (m)'
    },
    calibration: {
      title: 'Calibración Física (Precisión Verdadera)',
      use: 'Habilitar Calibración Física',
      ipd: 'Su IPD Real (mm)',
      ipdDesc: 'El promedio en adultos es de 55 a 75',
      screen: 'Tamaño del Monitor (pulgadas)',
      screenDesc: 'Móviles: ~6.1-6.8, Monitores: 24-27. Manual debido a límites del navegador'
    }
  },
  training: {
    rotate: {
      title: 'Please rotate your device',
      desc: 'Please rotate your device to landscape mode to get enough inter-pupillary distance for training. Disable orientation lock if needed.',
      autoRotate: 'Rotar automáticamente'
    },
    confirmExit: 'El entrenamiento está en curso. ¿Seguro que quieres salir?',
    round: 'Ronda',
    completed: 'Entrenamiento Completado',
    times: 'veces',
    rest: 'Por favor, cierra los ojos y relaja los músculos oculares',
    paused: 'Pausado',
    locking: {
      instruction: 'Por favor, usa {mode} para enfocar',
      cross: 'Visión Cruzada',
      parallel: 'Visión Paralela',
      desc: 'Ajusta tu mirada hasta que aparezca una tercera imagen 3D clara en el medio de la pantalla. Haz clic en el botón de abajo cuando puedas fijarla de manera estable.',
      confirm: 'Veo la imagen 3D (Iniciar estiramiento dinámico)'
    },
    done: {
      title: 'Entrenamiento Completado',
      desc: '¡Bien hecho! Tus ojos tuvieron un buen ejercicio.',
      back: 'Volver al Inicio'
    },
    canvas: {
      distance: 'Distancia Simulada'
    }
  },
  history: {
    title: 'Historial de Entrenamiento',
    totalTime: 'Tiempo Total',
    totalCompleted: 'Total Completado',
    minutes: 'mins',
    times: 'veces',
    recent: 'Últimos 30 Días',
    empty: 'Aún no hay registros de entrenamiento',
    startNow: 'Comienza tu primer entrenamiento',
    recordFormat: '{date} completó {rounds} rondas, {time} total'
  },
  safety: {
    title: 'Seguridad y Aviso Legal',
    back: 'Volver al Inicio',
    sections: {
      general: {
        title: 'Advertencias de Seguridad Generales',
        items: [
          'Esta herramienta es solo una ayuda para la relajación ocular y no puede reemplazar ningún diagnóstico, tratamiento o consejo médico profesional.',
          'Si tienes alguna afección ocular (por ejemplo, glaucoma, cataratas, retinopatía severa), estrabismo, ambliopía, o recientemente tuviste una cirugía ocular, consulta a un oftalmólogo profesional antes de usarlo.',
          'Los menores (especialmente niños menores de 12 años) tienen una visión en desarrollo; por favor úsalo bajo la guía de padres y profesionales.'
        ]
      },
      usage: {
        title: 'Precauciones de Uso',
        items: [
          'No entrenes en exceso. Si experimentas dolor ocular, mareos, náuseas, visión borrosa o cualquier malestar, detén su uso inmediatamente y descansa los ojos.',
          'No fuerces tus ojos al usar la Visión Cruzada o Paralela. Si no puedes enfocar en unos minutos, descansa e inténtalo más tarde.',
          'Recomendamos limitar el uso diario y tratarlo como parte de los descansos regulares, en lugar de un entrenamiento intensivo forzado.'
        ]
      },
      disclaimer: {
        title: 'Aviso Legal',
        items: [
          'Todos los riesgos derivados del uso de esta herramienta son asumidos en su totalidad por el usuario.',
          'Los desarrolladores de esta herramienta no serán legalmente responsables por daños directos, indirectos, incidentales o consecuentes (incluyendo pero no limitándose a pérdida de visión o malestar físico) causados por el uso o la incapacidad de usar esta herramienta.'
        ]
      }
    }
  }
};
