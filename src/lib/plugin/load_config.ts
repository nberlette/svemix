import path from 'path';
import fs from 'fs';
import url from 'url';
import type { Config } from '@sveltejs/kit';
import type { MetaResult } from '$lib/meta';

export interface SvemixConfig extends Config {
	svemix: Svemix_Config_Object;
}

interface Svemix_Config_Object {
	prerenderAll?: boolean;
	seo?: Partial<MetaResult>;
}

export interface InternalConfig extends Svemix_Config_Object {
	routes: string;
}

export const defaultConfig: InternalConfig = {
	routes: '/routes',
	prerenderAll: false,
	seo: {}
};

export default async function load_config({ cwd = process.cwd() } = {}) {
	const svelte_config_file = path.join(cwd, 'svelte.config.js');
	const config_file = fs.existsSync(svelte_config_file) ? svelte_config_file : null;

	let config: InternalConfig;

	if (config_file) {
		const loaded_config = await import(url.pathToFileURL(config_file).href);
		const svelte_config = loaded_config?.default;

		if (typeof svelte_config !== 'object') {
			config = defaultConfig;
			return config;
		}

		config = {
			...defaultConfig,
			...svelte_config.svemix
		};
	} else {
		// Default config
		config = defaultConfig;
	}

	return config;
}
