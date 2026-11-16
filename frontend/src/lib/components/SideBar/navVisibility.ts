import { hasPermissionAnywhere, isAccessAllowed } from '$lib/utils/access-control';
import { URL_MODEL_MAP } from '$lib/utils/crud';
import type { User } from '$lib/utils/types';

export interface NavItem {
	name?: string;
	href?: string;
	fa_icon?: string;
	alwaysShow?: boolean;
	adminOnly?: boolean;
	exclude?: string[];
	permissions?: string[];
	globalPermissions?: string[];
	/** Show for BI-UG-ADM when doc codenames are not in the session yet */
	adminFallback?: boolean;
}

export function canSeeNavItem(item: NavItem, user: User | null | undefined): boolean {
	if (item.alwaysShow) return true;
	if (item.adminOnly) return Boolean(user?.is_admin);
	if (item.exclude) {
		return user?.roles?.some((role: string) => !item.exclude!.includes(role)) ?? false;
	}
	if (item.globalPermissions) {
		const root = user?.root_folder_id;
		return Boolean(root) && item.globalPermissions.some((p) => isAccessAllowed(user, p, root!));
	}
	if (item.permissions) {
		const allowed = item.permissions.some((permission) =>
			hasPermissionAnywhere(user, permission)
		);
		if (allowed) return true;
		return Boolean(item.adminFallback && user?.is_admin);
	}
	const urlModel = item.href?.split('?')[0].split('/')[1] ?? '';
	if (Object.hasOwn(URL_MODEL_MAP, urlModel)) {
		return hasPermissionAnywhere(user, `view_${URL_MODEL_MAP[urlModel].name}`);
	}
	return false;
}