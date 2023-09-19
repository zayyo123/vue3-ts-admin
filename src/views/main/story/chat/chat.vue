<template>
  <div class="chat">
    <div class="header">
      <el-input style="width: 300px" v-model="title"></el-input>
      <el-button @click="publishArticlesClic">发布文章</el-button>
    </div>
    <div class="content">
      <z-y-editor ref="editRef"></z-y-editor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import ZYEditor from "@/common-ui/zy-editor";
import { ElMessage } from "element-plus";

import { publishArticlesData } from "@/service/main/story";
export default defineComponent({
  name: "chat",
  components: { ZYEditor },
  setup() {
    const editRef = ref<InstanceType<typeof ZYEditor>>();
    const title = ref<string>();
    const publishArticlesClic = () => {
      // 调用publishArticlesData函数，传入参数title和cotent
      publishArticlesData({
        title: title.value!,
        cotent: editRef.value!.content.html
      })
        // 如果发布成功，调用ElMessage.success函数，传入参数message和type，并显示文字
        .then(() => {
          ElMessage.success({
            message: "文章发布成功",
            type: "success"
          });
        })
        // 如果发布失败，调用ElMessage.error函数，传入参数message
        .catch(() => {
          ElMessage.error("文章发布失败");
        });
    };
    return { editRef, publishArticlesClic, title };
  }
});
</script>

<style lang="less" scoped>
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    text-align: right;
    height: 40px;
  }
  .content {
    flex: 1;
  }
}
</style>
