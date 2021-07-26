import Block from '../modules/block';

export function render(query: string, block: Block) {
	const root = document.getElementById(query) as Node;

	if (root) {
		root.appendChild(block.getContent());
	}
}
