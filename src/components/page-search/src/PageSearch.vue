<template>
  <div class="page-search">
    <z-y-form v-bind="formConfig" v-model="formData">
      <template #title>
        <h2>检索</h2>
      </template>
      <template #footer>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleSearchClick"
          >提交</el-button
        >
        <el-button icon="el-icon-refresh-right" @click="handleResetClick"
          >重置</el-button
        >
      </template>
    </z-y-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import ZYForm from "@/common-ui/zy-form";
export default defineComponent({
  props: {
    formConfig: {
      type: Object,
      require: true
    }
  },
  emits: ["searchKeyValue", "searchReset"],
  components: { ZYForm },
  name: "PageSearch",
  setup(props, { emit }) {
    // 获取formConfig中的formItem
    const formItems = props.formConfig?.formItem?? [];
    // 初始化formValue
    const formValue: any = {};
    // 遍历formItems，将formValue中的值赋值给formData
    for (const item of formItems) {
      formValue[item.field] = "";
    }
    // 将formValue赋值给formData
    const formData = ref(formValue);

    // 检索
    const handleSearchClick = () => {
      // 发出searchKeyValue事件，传入formData.value
      emit("searchKeyValue", formData.value);
    };
    // 重置
    const handleResetClick = () => {
      // 可以这样理解，双向绑定一个对象，并进行解构，{...value}解构之后并不会有对value的依赖
      // 但是其对象内部的属性还是有依赖的
      // formData.value.id = "fzb";
      //不可取
      for (const item in formValue) {
        formData.value[item] = formValue[item];
      }
      // 发出searchReset事件
      emit("searchReset");
    };

    return { formData, handleSearchClick, handleResetClick };
  }
});
</script>

<style lang="less" scoped></style>
