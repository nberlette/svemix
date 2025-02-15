import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import svemix from 'svemix/plugin';

/** @type {import('svemix').SvemixConfig} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: adapter({}),
		prerender: {
			crawl: true,
			enabled: true
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			plugins: [svemix()]
		}
	},
	svemix: {
		prerenderAll: true
	}
};

export default config;
