/* eslint-disable no-unused-vars */
import { DomEditor, SlateTransforms } from "@wangeditor/editor";

export default class VariablePannel {
  constructor(options = {}) {
    this.title = "插入变量";
    // this.iconSvg = '<svg >...</svg>'
    this.tag = "button";
    this.getData = options.getData || (() => []);
    this.slot = options.slot || (() => null);
    this.showDropPanel = true;
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor) {
    // JS 语法
    return false;
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor) {
    // JS 语法
    return "";
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor) {
    const selectedElems = DomEditor.getSelectedNodeByType(editor, "variable");
    if (selectedElems) {
      return true;
    }
    // JS 语法
    return false;
  }

  // 点击菜单时触发的函数
  exec(editor, value) {
    // JS 语法
    // DropPanel menu ，这个函数不用写，空着即可
  }

  // 定义 DropPanel 内部的 DOM Element
  getPanelContentElem(editor) {
    const wrap = document.createElement("div");
    wrap.classList.add("plugin-var-list");

    wrap.addEventListener("click", (event) => {
      const { target } = event;
      if (Array.from(target.classList).includes("var-item")) {
        const node = {
          type: "variable",
          name: target.innerText,
          children: [{ text: target.innerText }],
        };
        SlateTransforms.insertNodes(editor, [node, { text: "" }]);
      }
    });

    Promise.resolve(this.getData()).then((list = []) => {
      list.forEach((text) => {
        const el = document.createElement("span");
        el.classList.add("var-item");
        el.innerText = text;
        wrap.appendChild(el);
      });
    });

    Promise.resolve(this.slot()).then((elem) => {
      elem && wrap.appendChild(elem);
    });

    return wrap; // 返回 DOM Element 类型
  }
}
