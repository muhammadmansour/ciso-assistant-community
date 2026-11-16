import type { User } from './types';

interface CanPerformActionParams {
	user: User | null | undefined;
	action: 'add' | 'view' | 'change' | 'delete';
	model: string; // lowercase domain name, e.g. riskassessment
	domain: string; // UUID
}

/**
 * RBAC check: does the user hold this permission codename on this folder?
 */
export function isAccessAllowed(
	user: User | null | undefined,
	codename: string,
	domain: string
): boolean {
	const index = user?.domain_permissions?.[domain];
	if (index === undefined) return false;
	const sets = (user as User & { permission_sets?: string[][] }).permission_sets;
	if (sets && typeof index === 'number') {
		return (sets[index] ?? []).includes(codename);
	}
	const legacy = user?.domain_permissions?.[domain];
	if (Array.isArray(legacy)) {
		return legacy.includes(codename);
	}
	return false;
}

/**
 * Existential check: permission on at least one folder (nav, global actions).
 */
export function hasPermissionAnywhere(user: User | null | undefined, codename: string): boolean {
	if (!user) return false;
	if (user.permissions && Object.hasOwn(user.permissions, codename)) {
		return true;
	}
	const sets = (user as User & { permission_sets?: string[][] }).permission_sets;
	if (sets?.length) {
		return sets.some((codenames) => codenames.includes(codename));
	}
	const domainPerms = user.domain_permissions;
	if (domainPerms) {
		return Object.values(domainPerms).some((entry) => {
			if (Array.isArray(entry)) return entry.includes(codename);
			if (typeof entry === 'number' && sets) return (sets[entry] ?? []).includes(codename);
			return false;
		});
	}
	return false;
}

export function canPerformAction({ user, action, model, domain }: CanPerformActionParams): boolean {
	return isAccessAllowed(user, `${action}_${model}`, domain);
}

export function resolveObjectDomain(
	modelName: string,
	object: Record<string, any> | undefined
): string | undefined {
	if (modelName === 'folder') return object?.id;
	return object?.folder?.id ?? object?.folder ?? undefined;
}

export function canPerformActionOnObject({
	user,
	action,
	model,
	object
}: Omit<CanPerformActionParams, 'domain'> & {
	object: Record<string, any> | undefined;
}): boolean {
	const domain = resolveObjectDomain(model, object);
	return domain
		? canPerformAction({ user, action, model, domain })
		: hasPermissionAnywhere(user, `${action}_${model}`);
}