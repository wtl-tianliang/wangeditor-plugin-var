import { h } from "snabbdom";

function renderElem(elem, children) {
  const node = h(
    "span",
    {
      attrs: { class: "plugin-var-node" },
      dataset: { wEType: "variable", name: elem.name },
    },
    children
  );
  return node;
}

export default {
  type: "variable",
  renderElem: renderElem,
};
