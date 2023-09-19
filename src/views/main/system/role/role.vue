<template>
  <div class="role">
    <page-search
      :formConfig="FormConfig"
      @searchKeyValue="searchBtnClic"
      @searchReset="resetBtnClic"
    />
    <div class="page-role">
      <page-tabel
        pageName="role"
        :tabelConfig="TabelConfig"
        @editorBtnClic="handleEditorBtnClic"
        @createBtnClic="handleCreateBtnClic"
        ref="pageTabelRef"
      />
    </div>
    <page-dialog
      :pageDialogConfig="DialogConfig"
      ref="pageDialogRef"
      pageName="role"
      :defaultValue="defaultValue"
      :otherInfo="checkedList"
    >
      <el-tree
        style="padding: 0px 20px"
        :data="entireMenuList"
        show-checkbox
        node-key="id"
        ref="treeRef"
        @check="checkBoxChange"
        highlight-current
        :props="{ label: 'name', children: 'children' }"
      >
      </el-tree>
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from "vue";
import { useStore } from "@/store";

import ElTree from "element-plus/lib/el-tree";
import PageSearch from "@/components/page-search";
import PageTabel from "@/components/page-tabel";
import PageDialog from "@/components/page-dialog";

import FormConfig from "./config/form.config";
import TabelConfig from "./config/tabel.config";
import DialogConfig from "./config/dialog.config";

import { searchLinkage, operationLinkage } from "@/hooks/pageLinkage";
import { mapHalfCheckedKeys } from "@/utils/menuToRoute";
export default defineComponent({
  name: "role",
  components: {
    PageSearch,
    PageTabel,
    PageDialog
  },
  setup() {
    const [pageTabelRef, resetBtnClic, searchBtnClic] = searchLinkage();

    // 本身是响应式，但是赋值之后，就不在是响应式的范畴了
    const store = useStore();
    // 获取菜单列表
    const entireMenuList = computed(() => store.state.menuList);

    // 获取勾选的菜单
    const checkedList = ref({});
    const checkBoxChange = (data1: any, data2: any) => {
      // 获取勾选的菜单和半勾选的菜单
      const { checkedKeys, halfCheckedKeys } = data2;
      // 将勾选的菜单和半勾选的菜单合并
      const menuList = [...checkedKeys,...halfCheckedKeys];
      // 将合并后的菜单赋值给checkedList
      checkedList.value = { menuList };
    };
    // 获取树形组件
    const treeRef = ref<InstanceType<typeof ElTree>>();
    // 当树形组件的勾选框发生变化时，调用editorCallback函数
    const editorCallback = (payload: any) => {
      // 获取勾选的菜单
      const menuList = mapHalfCheckedKeys(payload.menuList);

      // 等待下一次调用nextTick函数
      nextTick(() => {
        // 设置勾选的菜单
        treeRef.value!.setCheckedKeys(menuList, false);
      });
    };
    const [
      pageDialogRef,
      defaultValue,
      handleEditorBtnClic,
      handleCreateBtnClic
    ] = operationLinkage(editorCallback);
    return {
      FormConfig,
      TabelConfig,
      searchBtnClic,
      resetBtnClic,
      pageTabelRef,
      DialogConfig,
      pageDialogRef,
      defaultValue,
      handleEditorBtnClic,
      handleCreateBtnClic,
      entireMenuList,
      treeRef,
      checkedList,
      checkBoxChange
    };
  }
});
</script>

<style scoped lang="less">
.role {
  .page-role {
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
  }
}
</style>
