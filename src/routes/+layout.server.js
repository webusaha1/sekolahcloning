import { getContent } from '$lib/data.js';
import { toSettings, isDemoData } from '$lib/utils.js';

export function load() {
	const { mode, data } = getContent();
	return {
		content: data,
		settings: toSettings(data.settings),
		isDemo: mode === 'demo' || isDemoData(data),
		mode
	};
}
