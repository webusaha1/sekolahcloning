import { json } from '@sveltejs/kit';
import { getContent } from '$lib/data.js';

export function GET() {
	return json(getContent());
}
