// ═══════════════════════════════════════════════════════════
//  VIEW — Équipe & Permissions
// ═══════════════════════════════════════════════════════════

var TEAM_MEMBERS = [
  { id: 'm1', name: 'Yannick L.', email: 'yannick@sushiboy.fr', role: 'owner', avatar: 'YL', lastActive: 'Maintenant', agents: 'Tous' },
  { id: 'm2', name: 'Karim B.', email: 'karim@sushiboy.fr', role: 'manager', avatar: 'KB', lastActive: 'Il y a 2h', agents: 'Social, Photos' },
  { id: 'm3', name: 'Laura S.', email: 'laura@sushiboy.fr', role: 'viewer', avatar: 'LS', lastActive: 'Hier', agents: 'Lecture seule' },
];

var ROLES = {
  owner: { label: 'Propriétaire', color: 'var(--phantom-violet)' },
  manager: { label: 'Manager', color: 'var(--rainbow-blue)' },
  viewer: { label: 'Lecteur', color: 'var(--ink-40)' },
};

export function renderTeamPermissions() {
  var members = TEAM_MEMBERS.map(function(m) {
    var role = ROLES[m.role];
    return '<div class="team-member-card">'
      + '<div class="team-member-left">'
        + '<div class="team-member-avatar" style="background:' + role.color + '">' + m.avatar + '</div>'
        + '<div class="team-member-info">'
          + '<div class="team-member-name">' + m.name + '</div>'
          + '<div class="team-member-email">' + m.email + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="team-member-right">'
        + '<span class="team-role-badge" style="background:' + role.color + '22;color:' + role.color + '">' + role.label + '</span>'
        + '<div class="team-member-meta">'
          + '<span>Agents : ' + m.agents + '</span>'
          + '<span>Actif : ' + m.lastActive + '</span>'
        + '</div>'
      + '</div>'
    + '</div>';
  }).join('');

  return '<div class="view-team-permissions">'
    + '<div class="team-perm-header">'
      + '<div>'
        + '<h2 class="view-title">Équipe & Permissions</h2>'
        + '<p class="view-subtitle">' + TEAM_MEMBERS.length + ' membres · Gère les accès à ton espace</p>'
      + '</div>'
      + '<button class="team-invite-btn" data-action="team-invite">+ Inviter un membre</button>'
    + '</div>'
    + '<div class="team-members-list">' + members + '</div>'

    + '<div class="team-roles-section">'
      + '<h3 class="team-roles-title">Niveaux d\'accès</h3>'
      + '<div class="team-roles-grid">'
        + '<div class="team-role-card">'
          + '<div class="team-role-name" style="color:var(--phantom-violet)">Propriétaire</div>'
          + '<div class="team-role-desc">Accès complet. Peut gérer l\'abonnement, inviter/supprimer des membres, modifier tous les agents.</div>'
        + '</div>'
        + '<div class="team-role-card">'
          + '<div class="team-role-name" style="color:var(--rainbow-blue)">Manager</div>'
          + '<div class="team-role-desc">Peut valider les livrables, discuter avec les agents, voir les statistiques. Ne peut pas gérer l\'abonnement.</div>'
        + '</div>'
        + '<div class="team-role-card">'
          + '<div class="team-role-name" style="color:var(--ink-40)">Lecteur</div>'
          + '<div class="team-role-desc">Lecture seule. Peut consulter les livrables et statistiques, mais ne peut rien modifier.</div>'
        + '</div>'
      + '</div>'
    + '</div>'
  + '</div>';
}
