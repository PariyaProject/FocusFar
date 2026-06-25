export default {
  app: {
    title: 'FocusFar',
    description: 'Ein Web-Tool, das Ihnen hilft, regelmäßig in die Ferne zu schauen, Ihre Augen zu entspannen und ständige Naharbeit zu reduzieren.',
    nav: {
      history: 'Verlauf',
      settings: 'Einstellungen'
    },
    footer: {
      safety: 'Sicherheit & Haftungsausschluss',
      copyright: '© 2026 FocusFar Project. Nicht für medizinische Zwecke.'
    },
    viewMode: {
      cross: 'Kreuzblick',
      parallel: 'Parallelblick'
    }
  },
  home: {
    todayCompleted: 'Heute Abgeschlossen',
    times: 'mal',
    startTraining: 'Training Starten',
    currentFlow: 'Aktuelle Einstellungen: {cycles} Dehnungen × {rounds} Runden (Pause {rest}s)'
  },
  settings: {
    title: 'Trainings-Einstellungen',
    save: 'Einstellungen Speichern',
    saved: 'Einstellungen gespeichert',
    reset: 'Auf Standard Zurücksetzen',
    confirmReset: 'Möchten Sie die Einstellungen wirklich auf die Standardwerte zurücksetzen?',
    mode: {
      title: '3D-Modus für das bloße Auge',
      focusMethod: 'Fokus-Methode',
      crossTitle: 'Kreuzblick',
      crossDesc: 'Augen kreuzen sich vor dem Bildschirm',
      parallelTitle: 'Parallelblick',
      parallelDesc: 'Augen schauen durch den Bildschirm hindurch',
      intensity: 'Parallax-Intensität',
      speed: 'Animations-Geschwindigkeit'
    },
    process: {
      title: 'Prozess-Parameter',
      cycles: 'Dehnungen pro Runde',
      rounds: 'Runden Gesamt',
      restSec: 'Pausendauer (Sek)',
      minDistance: 'Minimale Distanz (m)',
      maxDistance: 'Maximale Distanz (m)'
    },
    calibration: {
      title: 'Physische Kalibrierung',
      use: 'Physische Kalibrierung aktivieren',
      ipd: 'Ihre echte IPD (mm)',
      ipdDesc: 'Durchschnitt ist 55 - 75',
      screen: 'Monitorgröße (Zoll)',
      screenDesc: 'Zur Berechnung des echten Pixelverhältnisses'
    }
  },
  training: {
    rotate: {
      title: 'Please rotate your device',
      desc: 'Please rotate your device to landscape mode to get enough inter-pupillary distance for training. Disable orientation lock if needed.'
    },
    confirmExit: 'Das Training läuft. Möchten Sie wirklich beenden?',
    round: 'Runde',
    completed: 'Training Abgeschlossen',
    times: 'mal',
    rest: 'Bitte schließen Sie die Augen und entspannen Sie Ihre Augenmuskeln',
    paused: 'Pausiert',
    locking: {
      instruction: 'Bitte verwenden Sie den {mode} zum Fokussieren',
      cross: 'Kreuzblick',
      parallel: 'Parallelblick',
      desc: 'Passen Sie Ihren Blick an, bis ein drittes klares 3D-Bild in der Mitte des Bildschirms erscheint. Klicken Sie auf die Schaltfläche unten, wenn Sie es stabil fixieren können.',
      confirm: 'Ich sehe das 3D-Bild (Dynamische Dehnung starten)'
    },
    done: {
      title: 'Training Abgeschlossen',
      desc: 'Gut gemacht! Ihre Augen hatten ein gutes Workout.',
      back: 'Zurück zur Startseite'
    },
    canvas: {
      distance: 'Simulierte Distanz'
    }
  },
  history: {
    title: 'Trainings-Verlauf',
    totalTime: 'Gesamtzeit',
    totalCompleted: 'Gesamt Abgeschlossen',
    minutes: 'Min',
    times: 'mal',
    recent: 'Letzte 30 Tage',
    empty: 'Noch keine Trainings-Aufzeichnungen',
    startNow: 'Starten Sie Ihr erstes Training',
    recordFormat: '{date}: {rounds} Runden abgeschlossen, {time} gesamt'
  },
  safety: {
    title: 'Sicherheit & Haftungsausschluss',
    back: 'Zurück zur Startseite',
    sections: {
      general: {
        title: 'Allgemeine Sicherheitswarnungen',
        items: [
          'Dieses Tool ist nur ein Hilfsmittel zur Augenentspannung und kann keine professionelle medizinische Diagnose, Behandlung oder Beratung ersetzen.',
          'Wenn Sie an Augenerkrankungen (z.B. Glaukom, Katarakt, schwere Retinopathie), Schielen, Amblyopie leiden oder kürzlich eine Augenoperation hatten, konsultieren Sie vor der Anwendung bitte einen professionellen Augenarzt.',
          'Minderjährige (insbesondere Kinder unter 12 Jahren) haben ein sich entwickelndes Sehvermögen; bitte verwenden Sie es unter Anleitung von Eltern und Fachleuten.'
        ]
      },
      usage: {
        title: 'Vorsichtsmaßnahmen bei der Nutzung',
        items: [
          'Trainieren Sie nicht übermäßig. Wenn Sie Augenschmerzen, Schwindel, Übelkeit, verschwommenes Sehen oder andere Beschwerden verspüren, brechen Sie die Anwendung sofort ab und ruhen Sie Ihre Augen aus.',
          'Zwingen Sie Ihre Augen nicht, wenn Sie den Kreuzblick oder Parallelblick verwenden. Wenn Sie sich innerhalb weniger Minuten nicht konzentrieren können, ruhen Sie sich aus und versuchen Sie es später noch einmal.',
          'Wir empfehlen, die tägliche Nutzung zu begrenzen und sie als Teil regelmäßiger Pausen zu behandeln, anstatt als intensives erzwungenes Workout.'
        ]
      },
      disclaimer: {
        title: 'Haftungsausschluss',
        items: [
          'Alle Risiken, die sich aus der Nutzung dieses Tools ergeben, trägt vollständig der Benutzer.',
          'Die Entwickler dieses Tools sind rechtlich nicht haftbar für direkte, indirekte, zufällige oder Folgeschäden (einschließlich, aber nicht beschränkt auf Sehverlust oder körperliche Beschwerden), die durch die Nutzung oder die Unfähigkeit zur Nutzung dieses Tools entstehen.'
        ]
      }
    }
  }
};
