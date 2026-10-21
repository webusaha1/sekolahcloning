export const modal = $state({ open: false, type: '', item: null });

export function openDetail(type, item) {
	modal.type = type;
	modal.item = item;
	modal.open = true;
}

export function closeDetail() {
	modal.open = false;
	modal.item = null;
}
