// =====================================================
//  DATA -- ROI & Impact metrics
// =====================================================

export var ROI_CONFIG = {
  monthlyPrice: 1490,
  hourlyRate: 45,
  monthsActive: 6,
};

export var ROI_KPIS = [
  {
    id: 'value-generated',
    label: 'Valeur générée',
    value: '13 830 €',
    bg: '#6E3CFF',
    fg: '#fff',
    formula: 'Coûts économisés + Revenus supplémentaires',
    sources: [
      { label: 'Heures automatisées', value: '127h', detail: '6 agents x ~21h/agent/mois en moyenne' },
      { label: 'Tarif horaire moyen', value: '45 €/h', detail: 'Benchmark tarif freelance marketing en France' },
      { label: 'Économie main-d\'œuvre', value: '5 715 €', detail: '127h x 45 €/h' },
      { label: 'Commandes Uber Eats supp.', value: '+156', detail: 'Hausse engagement Instagram → conversion estimée 2.1%' },
      { label: 'Marge moyenne/commande', value: '27 €', detail: 'Panier moyen 42 € x marge brute 64%' },
      { label: 'Revenus supplémentaires', value: '4 212 €', detail: '156 commandes x 27 € marge' },
      { label: 'Gain indirect (SEO)', value: '3 903 €', detail: 'Trafic organique +34% → estimation conversions' },
    ],
    confidence: 'estimated',
    trend: [8200, 9100, 10400, 11200, 12600, 13830],
  },
  {
    id: 'hours-saved',
    label: 'Heures économisées',
    value: '127h',
    bg: '#FF2D87',
    fg: '#fff',
    formula: 'Somme des heures automatisées par agent',
    sources: [
      { label: 'Social Manager', value: '38h', detail: '47 posts x 0.8h/post en moyenne' },
      { label: 'Google Avis', value: '14h', detail: '28 réponses x 0.5h/réponse' },
      { label: 'Photos Resto', value: '22h', detail: '15 séances x 1.5h/séance (prise + retouche)' },
      { label: 'SEO', value: '36h', detail: '12 articles x 3h/article' },
      { label: 'Site Web', value: '12h', detail: '8 mises à jour x 1.5h' },
      { label: 'Brand', value: '5h', detail: '6 designs x 0.8h (templates + itérations)' },
    ],
    confidence: 'verified',
    trend: [42, 58, 71, 89, 105, 127],
  },
  {
    id: 'roi-multiplier',
    label: 'Retour sur investissement',
    value: '×9.3',
    bg: '#00D4AA',
    fg: '#fff',
    formula: 'Valeur générée ÷ Coût abonnement Phantom',
    sources: [
      { label: 'Valeur générée', value: '13 830 €', detail: 'Voir KPI "Valeur générée"' },
      { label: 'Coût Phantom/mois', value: '1 490 €', detail: 'Forfait Standard (6 agents)' },
      { label: 'ROI', value: '×9.3', detail: '13 830 ÷ 1 490 = 9.3' },
    ],
    confidence: 'estimated',
    trend: [5.5, 6.1, 7.0, 7.5, 8.5, 9.3],
  },
];

export var ROI_AGENTS = [
  { id: 'social', label: 'Social Manager', value: 5400, hours: 38, tasks: 47, detail: 'Engagement +47%, 1247 abonnés (+43/sem)' },
  { id: 'google', label: 'Google Avis', value: 2100, hours: 14, tasks: 28, detail: 'Note maintenue 4.7★, 100% réponse' },
  { id: 'photos', label: 'Photos Resto', value: 1800, hours: 22, tasks: 15, detail: 'Visuels Uber Eats optimisés, +22% clics' },
  { id: 'seo', label: 'SEO', value: 3200, hours: 36, tasks: 12, detail: '"sushi marseille" passé de #7 à #4' },
  { id: 'web', label: 'Site Web', value: 960, hours: 12, tasks: 8, detail: 'Load time 2.4s → 1.6s, Core Web Vitals vert' },
  { id: 'brand', label: 'Brand B2C', value: 370, hours: 5, tasks: 6, detail: 'Nouveau menu print + packaging livraison' },
];

export var ROI_COMPARISON = {
  before: { label: 'Sans Phantom', monthly: 4850, detail: 'Freelance social 1 200 € + agence SEO 1 500 € + photographe 800 € + divers 1 350 €' },
  after: { label: 'Avec Phantom', monthly: 1490, detail: 'Forfait Standard — 6 agents inclus' },
  saving: { percent: 69, monthly: 3360, annual: 40320 },
};
