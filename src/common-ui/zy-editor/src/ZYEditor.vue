<template>
  <div class="z-y-editor">
    <div ref="editorRef" class="editor"></div>
    <div :innerHTML="content.html" class="content" ref="contentRef"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  nextTick
} from "vue";
import WangEditor from "wangeditor";

export default defineComponent({
  name: "ZYEditor",
  setup() {
    const editorRef = ref<HTMLDivElement>();
    const content = reactive({
      html: "",
      text: ""
    });
    let instance: any;
    onMounted(() => {
      // 创建WangEditor实例
      instance = new WangEditor(editorRef.value);
      // 设置配置
      Object.assign(instance.config, {
        onchange() {
          syncHTML();
        }
      });
      // 设置菜单提示位置
      instance.config.menuTooltipPosition = "down";
      // 设置全屏显示
      instance.config.showFullScreen = true;
      // 创建实例
      instance.create();
      // 监听屏幕大小时间
      window.onresize = () => {
        setEditorBoxSize();
      };
    });

    // 卸载时销毁实例
    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });

    const syncHTML = () => {
      content.html = instance.txt.html();
    };
    // 设置高度
    const contentRef = ref<HTMLDivElement>();
    contentRef.value?.setAttribute;
    function setEditorBoxSize() {
      // 获取导航菜单和内容部分的高度
      const [navMenu, bodyContent]: any = editorRef.value!.children;
      // 设置内容部分的高度
      const height = contentRef.value!.offsetHeight - navMenu.offsetHeight;
      bodyContent.style.height = height + "px";
    }

    nextTick(() => {
      setEditorBoxSize();
    });
    return {
      editorRef,
      contentRef,
      content
    };
  }
});
</script>

<style lang="less" scoped>
.zy-editor {
  display: flex;
  width: 100%;
  height: 100%;

  .editor {
    flex: 1;
    margin-right: 10px;
    height: 100%;
  }

  .content {
    flex: 1;
    padding: 10px 15px;
    background-color: #fff;
    border: 1px solid #c9d8db;
  }
}
</style>
