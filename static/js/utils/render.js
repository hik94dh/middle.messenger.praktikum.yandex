export function render(query, block) {
    const root = document.getElementById(query);
    if (root) {
        root.appendChild(block.getContent());
    }
}
//# sourceMappingURL=render.js.map