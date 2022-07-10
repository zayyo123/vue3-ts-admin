<template>
  <div class="nav-dialog">
    <el-dialog v-model="isShow" width="30%">
      <template v-if="showFlag === 1">
        <h2>QQ</h2>
        <img src="~assets/images/qq.png" alt="" />
      </template>
      <template v-else-if="showFlag === 2">
        <h2>WeiChat</h2>
        <img src="~assets/images/weichat.png" alt="" />
      </template>
      <template v-else-if="showFlag === 3">
        <p><i class="icon-wendang"></i><b>来我的博客一起学习前端吧</b></p>
        <a href="https://blog.csdn.net/weixin_45215308?spm=1000.2115.3001.5343"
          >zayyo的学习笔记</a
        >
      </template>
      <template v-else-if="showFlag === 4">
        <h2>时间</h2>
        <iframe
          frameborder="0"
          width="100%"
          src="/page/run-time/index.html"
        ></iframe
      ></template>
      <h3>和我一起来学习前端吧<i class="icon-yiqiguang"></i></h3>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "NavDialog",
  setup() {
    const isShow = ref(false);
    const showFlag = ref(1);
    return { isShow, showFlag };
  }
});
</script>

<style lang="less" scoped>
.nav-dialog {
  padding: 10px 10px;
  img {
    width: 100%;
  }
  i {
    font-family: "iconfont";
    font-size: 25px;
  }
  b {
    font-size: 18px;
    margin-left: 10px;
  }
  a {
    color: #57606a;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
