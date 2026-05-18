// ═══════════════════════════════════════════════════════════
//  ADMIN VIEW — Roles & Permissions (RBAC)
// ═══════════════════════════════════════════════════════════

var ROLES = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    desc: 'Accès complet à toutes les fonctionnalités. Gestion équipe, facturation, suppression données.',
    users: ['Alex Q.'],
    color: '#FF2D87',
    permissions: ['Tout']
  },
  {
    id: 'admin',
    name: 'Admin',
    desc: 'Gestion clients, agents, contenu. Pas d\'accès aux paramètres sensibles ni à la facturation Stripe.',
    users: ['Marie L.'],
    color: '#6E3CFF',
    permissions: ['Clients', 'Agents', 'Contenu', 'Pilots', 'Templates', 'Calendar']
  },
  {
    id: 'pilot',
    name: 'Pilot',
    desc: 'Supervision des agents assignés, validation contenu, communication clients. Lecture seule sur le reste.',
    users: ['Julie M.', 'Paul M.'],
    color: '#0066FF',
    permissions: ['Agents assignés', 'Contenu assigné', 'Chat clients', 'Notes CRM']
  },
  {
    id: 'cs',
    name: 'Customer Success',
    desc: 'Vue clients, onboarding, churn. Pas d\'accès aux agents ni aux templates.',
    users: [],
    color: '#00D26A',
    permissions: ['Clients', 'Onboarding', 'Churn', 'Notes CRM', 'Facturation lecture']
  },
  {
    id: 'sales',
    name: 'Sales',
    desc: 'Pipeline, leads, démos. Lecture seule sur les clients actifs.',
    users: [],
    color: '#FF8A1F',
    permissions: ['Pipeline', 'Clients (lecture)', 'Revenue (lecture)']
  },
];

var PERMISSION_MATRIX = [
  { module: 'Dashboard', super_admin: true, admin: true, pilot: true, cs: true, sales: true },
  { module: 'Clients', super_admin: true, admin: true, pilot: false, cs: true, sales: false },
  { module: 'Agents', super_admin: true, admin: true, pilot: true, cs: false, sales: false },
  { module: 'Contenu', super_admin: true, admin: true, pilot: true, cs: false, sales: false },
  { module: 'Revenue', super_admin: true, admin: false, pilot: false, cs: false, sales: true },
  { module: 'Pipeline', super_admin: true, admin: false, pilot: false, cs: false, sales: true },
  { module: 'Facturation', super_admin: true, admin: false, pilot: false, cs: true, sales: false },
  { module: 'Settings', super_admin: true, admin: false, pilot: false, cs: false, sales: false },
  { module: 'Audit Trail', super_admin: true, admin: true, pilot: false, cs: false, sales: false },
];

export function renderRoles() {
  var roleCards = ROLES.map(function(r) {
    var userList = r.users.length > 0
      ? r.users.map(function(u) { return '<span class="admin-badge admin-badge-muted">' + u + '</span>'; }).join(' ')
      : '<span style="font-size:11px;color:var(--admin-text-muted)">Aucun membre</span>';
    var permList = r.permissions.map(function(p) {
      return '<span style="font-size:10px;padding:2px 7px;border-radius:4px;background:rgba(255,255,255,0.04);color:var(--admin-text-secondary)">' + p + '</span>';
    }).join(' ');

    return '<div class="admin-card" style="border-left:3px solid ' + r.color + '">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">'
        + '<div>'
          + '<div style="font-size:15px;font-weight:600">' + r.name + '</div>'
          + '<div style="font-size:12px;color:var(--admin-text-muted);margin-top:3px;max-width:360px">' + r.desc + '</div>'
        + '</div>'
        + '<div class="admin-btn admin-btn-ghost" style="font-size:10px;padding:4px 10px">Modifier</div>'
      + '</div>'
      + '<div style="margin-bottom:10px">'
        + '<div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase;margin-bottom:5px">Permissions</div>'
        + '<div style="display:flex;flex-wrap:wrap;gap:4px">' + permList + '</div>'
      + '</div>'
      + '<div>'
        + '<div style="font-size:10px;color:var(--admin-text-muted);text-transform:uppercase;margin-bottom:5px">Membres</div>'
        + userList
      + '</div>'
    + '</div>';
  }).join('');

  var matrixHeader = '<th style="width:140px">Module</th>' + ROLES.map(function(r) {
    return '<th style="text-align:center">' + r.name + '</th>';
  }).join('');

  var matrixRows = PERMISSION_MATRIX.map(function(row) {
    var cells = ROLES.map(function(r) {
      var has = row[r.id];
      return '<td style="text-align:center">' + (has ? '<span style="color:var(--admin-green)">✓</span>' : '<span style="color:var(--admin-text-muted)">—</span>') + '</td>';
    }).join('');
    return '<tr><td><strong>' + row.module + '</strong></td>' + cells + '</tr>';
  }).join('');

  return ''
    + '<div class="admin-grid admin-grid-3" style="margin-bottom:24px">'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Rôles définis</div><div class="admin-kpi-value">' + ROLES.length + '</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Membres actifs</div><div class="admin-kpi-value">4</div></div>'
      + '<div class="admin-kpi"><div class="admin-kpi-label">Modules protégés</div><div class="admin-kpi-value">' + PERMISSION_MATRIX.length + '</div></div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header">'
        + '<div class="admin-section-title">Rôles</div>'
        + '<div class="admin-btn admin-btn-primary" style="font-size:11px;padding:6px 14px">+ Nouveau rôle</div>'
      + '</div>'
      + '<div class="admin-grid admin-grid-2" style="gap:12px">' + roleCards + '</div>'
    + '</div>'

    + '<div class="admin-section">'
      + '<div class="admin-section-header"><div class="admin-section-title">Matrice de permissions</div></div>'
      + '<div class="admin-card" style="padding:0;overflow:hidden">'
        + '<table class="admin-table"><thead><tr>' + matrixHeader + '</tr></thead><tbody>' + matrixRows + '</tbody></table>'
      + '</div>'
    + '</div>';
}
