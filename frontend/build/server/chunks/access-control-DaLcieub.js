function canPerformAction({ user, action, model, domain }) {
  return (user.domain_permissions[domain] || []).includes(`${action}_${model}`);
}

export { canPerformAction as c };
//# sourceMappingURL=access-control-DaLcieub.js.map
