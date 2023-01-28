<template>
  <div class="toolbar" ref="toolbarRef"></div>
  <div class="editor" ref="editorRef"></div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { ref, onMounted } from "vue";
import { Boot, createEditor, createToolbar } from "@wangeditor/editor";
import variable from "./plugin/index.js";

Boot.registerModule(
  variable({
    slot() {
      const el = document.createElement("div");
      el.innerText = "click me";
      el.onclick = () => {
        alert("hello world");
      };
      return el;
    },
    getData() {
      return Promise.resolve([
        "黑暗之女",
        "诡术妖姬",
        "无畏战车",
        "狂战士",
        "寒冰射手",
        "猩红收割者",
      ]);
    },
  })
);

const editorRef = ref(null);
const toolbarRef = ref(null);

onMounted(() => {
  const editorConfig = {
    placeholder: "Type here...",
    onChange(editor) {
      const html = editor.getHtml();
      console.log("editor content", html);
    },
  };

  const editor = createEditor({
    selector: editorRef.value,
    html: "",
    config: editorConfig,
    mode: "default", // or 'simple'
  });

  const toolbarConfig = {
    insertKeys: {
      index: 0,
      keys: ["variable"],
    },
  };

  createToolbar({
    editor,
    selector: toolbarRef.value,
    config: toolbarConfig,
    mode: "default", // or 'simple'
  });
});
</script>

<style scoped>
.toolbar {
  border: 1px solid #ddd;
}
.editor {
  border: 1px solid #ddd;
  border-top: 0;
  height: 600px;
}
</style>
