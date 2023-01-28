function traverse(nodes, name) {
  nodes.forEach((node) => {
    const reg = new RegExp(`\`${name}\``, "g");
    if (node.text && reg.test(node.text)) {
      node.text = node.text.replace(/`/g, "");
    }
    if (node.children && node.children.length > 0) {
      traverse(node.children);
    }
  });
}

function parseVariableHtml(domElem, children) {
  const name = domElem.dataset.name;
  traverse(children, name);

  const node = {
    type: "variable",
    name: name,
    children,
  };
  return node;
}

export default {
  selector: 'span[data-w-e-type="variable"]',
  parseElemHtml: parseVariableHtml,
};
