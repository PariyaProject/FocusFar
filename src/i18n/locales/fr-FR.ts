export default {
  app: {
    title: 'FocusFar',
    description: 'Un outil web pour vous aider à regarder au loin régulièrement, détendre vos yeux et réduire le travail de près continu.',
    nav: { history: 'Historique', settings: 'Paramètres' },
    footer: { safety: 'Sécurité & Avertissement', copyright: '© 2026 FocusFar Project. Pas pour usage médical.' },
    viewMode: { cross: 'Croisé', parallel: 'Parallèle' }
  },
  home: {
    todayCompleted: 'Terminé Aujourd\'hui', times: 'fois', startTraining: 'Commencer',
    currentFlow: 'Paramètres actuels: {cycles} étirements × {rounds} tours (Repos {rest}s)'
  },
  settings: {
    title: 'Paramètres d\'entraînement', save: 'Enregistrer', saved: 'Paramètres enregistrés', reset: 'Réinitialiser', confirmReset: 'Voulez-vous vraiment réinitialiser les paramètres par défaut ?',
    mode: { title: 'Mode 3D à l\'œil nu', focusMethod: 'Méthode de Mise au Point', crossTitle: 'Vision Croisée', crossDesc: 'Les yeux convergent devant l\'écran', parallelTitle: 'Vision Parallèle', parallelDesc: 'Les yeux divergent derrière l\'écran', intensity: 'Intensité de la Parallaxe', speed: 'Vitesse d\'Animation' },
    process: { title: 'Paramètres du Processus', cycles: 'Étirements par Tour', rounds: 'Tours Totaux', restSec: 'Durée de Repos (sec)', minDistance: 'Distance Min (m)', maxDistance: 'Distance Max (m)' },
    calibration: { title: 'Calibration Physique', use: 'Activer la Calibration Physique', ipd: 'Votre vrai IPD (mm)', ipdDesc: 'La moyenne est de 55 - 75', screen: 'Taille de l\'écran (pouces)', screenDesc: 'Mobiles : ~6.1-6.8, Écrans : 24-27. Manuel en raison des limites du navigateur' }
  },
  training: {
    rotate: {
      title: 'Please rotate your device',
      desc: 'Please rotate your device to landscape mode to get enough inter-pupillary distance for training. Disable orientation lock if needed.',
      autoRotate: 'Pivoter automatiquement'
    },
    confirmExit: 'Entraînement en cours. Voulez-vous vraiment quitter ?', round: 'Tour', completed: 'Entraînement Terminé', times: 'fois', rest: 'Veuillez fermer les yeux et détendre vos muscles oculaires', paused: 'En pause',
    locking: { instruction: 'Veuillez utiliser la {mode} pour faire la mise au point', cross: 'Vision Croisée', parallel: 'Vision Parallèle', desc: 'Ajustez votre regard jusqu\'à ce qu\'une troisième image 3D claire apparaisse au milieu de l\'écran. Cliquez sur le bouton ci-dessous lorsque vous pouvez la verrouiller de manière stable.', confirm: 'Je vois l\'image 3D (Démarrer l\'étirement dynamique)' },
    done: { title: 'Entraînement Terminé', desc: 'Bien joué ! Vos yeux ont fait un bon exercice.', back: 'Retour à l\'Accueil' },
    canvas: { distance: 'Distance Simulée' }
  },
  history: {
    title: 'Historique d\'Entraînement', totalTime: 'Temps Total', totalCompleted: 'Total Terminé', minutes: 'min', times: 'fois', recent: '30 Derniers Jours', empty: 'Aucun enregistrement d\'entraînement', startNow: 'Commencez votre premier entraînement', recordFormat: '{date} a terminé {rounds} tours, {time} au total'
  },
  safety: {
    title: 'Sécurité et Avertissement', back: 'Retour à l\'Accueil',
    sections: {
      general: { title: 'Avertissements de Sécurité Généraux', items: ['Cet outil n\'est qu\'une aide à la relaxation oculaire et ne peut remplacer aucun diagnostic, traitement ou avis médical professionnel.', 'Si vous souffrez d\'une affection oculaire (ex: glaucome, cataracte, rétinopathie sévère), de strabisme, d\'amblyopie, ou si vous avez récemment subi une chirurgie oculaire, veuillez consulter un ophtalmologiste professionnel avant utilisation.', 'Les mineurs (en particulier les enfants de moins de 12 ans) ont une vision en développement; veuillez l\'utiliser sous la direction de parents et de professionnels.'] },
      usage: { title: 'Précautions d\'Utilisation', items: ['Ne vous entraînez pas à l\'excès. Si vous ressentez une douleur oculaire, des étourdissements, des nausées, une vision floue ou tout autre inconfort, arrêtez immédiatement de l\'utiliser et reposez vos yeux.', 'Ne forcez pas vos yeux lorsque vous utilisez la Vision Croisée ou Parallèle. Si vous ne pouvez pas vous concentrer en quelques minutes, reposez-vous et réessayez plus tard.', 'Nous recommandons de limiter l\'utilisation quotidienne et de la considérer comme une partie des pauses régulières, plutôt que comme un entraînement intensif forcé.'] },
      disclaimer: { title: 'Avertissement', items: ['Tous les risques découlant de l\'utilisation de cet outil sont entièrement à la charge de l\'utilisateur.', 'Les développeurs de cet outil ne seront pas légalement responsables de tout dommage direct, indirect, accessoire ou consécutif (y compris, mais sans s\'y limiter, la perte de vision ou l\'inconfort physique) causé par l\'utilisation ou l\'incapacité d\'utiliser cet outil.'] }
    }
  }
};
