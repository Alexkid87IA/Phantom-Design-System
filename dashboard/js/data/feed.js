// ═══════════════════════════════════════════════════════════
//  FEED — Activity feed items + background events
// ═══════════════════════════════════════════════════════════

let FEED = [
  { id: 'f1', time: '14:32', agent: 'social', title: 'Social Manager', text: 'a publié Post "Nigiri du jour" sur Instagram', sub: '147 likes en 2h · super départ.', status: 'done', impact: '+147 likes' },
  { id: 'f2', time: '13:18', agent: 'google', title: 'Avis Google', text: 'a répondu à Avis 3★ de Camille D.', sub: 'Réponse approuvée par l\'équipe.', status: 'done', impact: 'Note 4.7★' },
  { id: 'f3', time: '12:01', agent: 'photos', title: 'Photos Resto', text: 'attend ta validation sur 5 nouvelles photos pour Uber Eats', sub: 'Maki saumon, california, dragon roll, +2', status: 'waiting' },
  { id: 'f4', time: '11:24', agent: 'seo', title: 'SEO', text: 'a publié l\'article "Pourquoi le sushi marseillais cartonne"', sub: 'Indexé Google · position 12 estimée', status: 'done', impact: 'Pos. 12' },
  { id: 'f5', time: '10:45', agent: 'social', title: 'Social Manager', text: 'a programmé 12 posts pour la semaine du 18 mai', sub: 'Validation requise avant lundi 7h', status: 'waiting' },
];

let feedCounter = 10;

export function getFeed() {
  return FEED;
}

export function addFeedItem(item) {
  FEED.unshift(item);
  if (FEED.length > 20) FEED.pop();
}

export function getNextFeedId() {
  feedCounter++;
  return 'f' + feedCounter;
}

export const BACKGROUND_EVENTS = [
  { agent: 'social', title: 'Social Manager', text: 'a analysé les tendances de la semaine', sub: '3 formats identifiés · Reels, Carousel, Story' },
  { agent: 'google', title: 'Avis Google', text: 'a détecté un nouvel avis 5★', sub: '"Service au top, sushis incroyables" — Lucas M.' },
  { agent: 'seo', title: 'SEO', text: 'a mis à jour le maillage interne du blog', sub: '12 liens ajoutés · +15% de crawl estimé' },
  { agent: 'brand', title: 'Brand B2C', text: 'a finalisé le design packaging baguettes', sub: 'Version kraft + tampon Sushi Boy' },
  { agent: 'social', title: 'Social Manager', text: 'a détecté une mention @sushiboy_marseille', sub: '@marseillefood — potentiel collab' },
  { agent: 'photos', title: 'Photos Resto', text: 'a généré 3 variantes plating pour le chirashi', sub: 'Style ardoise noire, lumière rasante' },
];
