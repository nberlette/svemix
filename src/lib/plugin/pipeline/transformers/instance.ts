import { tc, SVEMIX_DIR } from '../utils.js';
import type { InternalConfig } from '../../load_config';
import type { Transformer } from './types';

const SvemixMeta = (defaults: InternalConfig['seo']): string => `
  <Meta _defaults={${stringify(defaults)}} {_metadata} />
`;

function stringify(obj_from_json: any) {
	if (typeof obj_from_json !== 'object' || Array.isArray(obj_from_json)) {
		// not an object, stringify using native function
		return JSON.stringify(obj_from_json);
	}
	// Implements recursive object serialization according to JSON spec
	// but without quotes around the keys.
	let props = Object.keys(obj_from_json)
		.map((key) => `${key}:${stringify(obj_from_json[key])}`)
		.join(',');
	return `{${props}}`;
}

const InstanceTransformer: Transformer = function (args) {
	let { doc, config } = args;

	const instanceContent = `
    <script ${tc(doc.scripts.instance?.attrs?.lang === 'ts', 'lang="ts"')}>
        import { Meta } from "${SVEMIX_DIR()}"; 
        ${doc.scripts.instance?.content || ''}
        export let _metadata = {};
    </script>
    ${SvemixMeta(config.seo)}
  `;

	return instanceContent;
};

export default InstanceTransformer;
