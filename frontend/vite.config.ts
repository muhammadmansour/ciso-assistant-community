import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/paraglide',
			outputStructure: 'locale-modules',
			cookieName: 'LOCALE',
			strategy: ['custom-userPreference', 'cookie', 'custom-fallback', 'baseLocale']
		}),
		tailwindcss(),
		sveltekit()
	],
	server: {
		host: '0.0.0.0',
		port: 3000,
		allowedHosts: ['localhost', 'ciso.wathbahs.com'],
		hmr: false
	},
	test: {
		include: ['{src}/**/*.{test,spec}.{js,ts}']
	}
});
