import {
  DomEditor,
  SlateEditor,
  SlateNode,
  SlatePath,
  SlateTransforms,
} from "@wangeditor/editor";

export default function VariablePlugin(editor) {
  const { isInline, isVoid, normalizeNode, insertText } = editor;

  const newEditor = editor;

  newEditor.insertText = (text) => {
    // 变量节点不允许插入其他文本
    const nodes = DomEditor.getSelectedNodeByType(editor, "variable");
    if (nodes) {
      return;
    }

    // 手动输入`xxx`时自动解析为变量
    // 获取当前选中节点
    const selected = SlateEditor.nodes(editor, {
      match: (node) => {
        return typeof node.children === "undefined";
      },
    });
    const { value } = selected.next();
    const [node, path] = value; // 得到当前选中节点及节点路径

    // 闭合变量时转换节点类型
    if (node.text.includes("`") && text === "`") {
      // 查找节点是否可被分为普通文本与变量文本
      const [staticText, varText] = node.text.split("`");

      // 移除当前位置的节点
      SlateTransforms.removeNodes(editor, { at: path });

      const nodes = [];
      if (staticText) {
        // 若普通文本节点存在，则添加到当前位置
        nodes.push({ text: staticText });
      }

      // 在当前位置插入变量节点
      nodes.push({
        type: "variable",
        name: varText,
        children: [{ text: varText }],
      });

      SlateTransforms.insertNodes(editor, nodes, { at: path });

      // 光标选中位置定位到变量节点后
      SlateTransforms.select(editor, SlatePath.next(SlatePath.next(path)));
      SlateTransforms.collapse(editor, { edge: "end" });

      return;
    }

    // 非变量节点执行默认插入操作
    insertText(text);
  };

  newEditor.normalizeNode = ([node, path]) => {
    const type = DomEditor.getNodeType(node);
    if (type !== "variable") {
      return normalizeNode([node, path]);
    }
    // 如果内容为空，则删除
    const str = SlateNode.string(node);
    if (str === "") {
      SlateTransforms.removeNodes(newEditor, { at: path });
    }

    return normalizeNode([node, path]);
  };

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "variable") {
      return true;
    }
    return isInline(elem);
  };

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "variable") {
      return false;
    }
    return isVoid(elem);
  };

  return newEditor;
}
