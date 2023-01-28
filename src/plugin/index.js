import VariableMenu from "./menu";
import VariablePlugin from "./plugin";
import renderVariable from "./renderElem";
import variableToHtml from "./elemToHtml";
import parseElemHtml from "./htmlToElem";
import "./style.css";

export default function (options = {}) {
  const menu = {
    key: "variable",
    factory() {
      return new VariableMenu(options);
    },
  };
  return {
    menus: [menu],
    editorPlugin: VariablePlugin,
    renderElems: [renderVariable],
    elemsToHtml: [variableToHtml],
    parseElemsHtml: [parseElemHtml],
  };
}
