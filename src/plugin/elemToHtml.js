function elemToHtml(elem, children) {
  const name = elem.name;
  children = children.replace(elem.name, `\`${name}\``);
  const html = `<span class="plugin-var-node" data-w-e-type="variable" data-w-e-is-inline data-name="${name}">${children}</span>`;
  return html;
}

export default {
  type: "variable",
  elemToHtml: elemToHtml,
};
