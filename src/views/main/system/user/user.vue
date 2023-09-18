<template>
  <div class="user">
    <page-search :formConfig="formConfigList" @searchKeyValue="searchBtnClic" @searchReset="resetBtnClic"></page-search>
    <div class="user-tabel">
      <page-tabel :tabelConfig="tableConfigList" pageName="users" ref="pageTabelRef" @editorBtnClic="handleEditorBtnClic"
        @createBtnClic="handleCreateBtnClic">
        <template v-slot:status="scope">
          <el-button :type="scope.row.status === 2 ? 'danger' : 'success'" size="small" plain>{{ scope.row.enabel === 2 ?
            "启用" : "停用" }}</el-button>
        </template>
      </page-tabel>
    </div>
    <page-dialog ref="pageDialogRef" pageName="users" :pageDialogConfig="dialogConfigRef" :defaultValue="defaultValue">
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

import PageSearch from "@/components/page-search";
import PageTabel from "@/components/page-tabel";
import PageDialog from "@/components/page-dialog";

import formConfigList from "./configs/form.config";
import tableConfigList from "./configs/tabel.config";
import dialogConfig from "./configs/dialog.config";

import { searchLinkage, operationLinkage } from "@/hooks/pageLinkage";
export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageTabel,
    PageDialog
  },
  setup() {
    const store = useStore();
    // 搜索联动
    const [pageTabelRef, resetBtnClic, searchBtnClic] = searchLinkage();
    // 操作联动
    const formItem = dialogConfig.formItem.find((item) => {
      return item.field === "password";
    });
    const editorCallback = () => {
      // 将表单项隐藏
      formItem!.isHidden = true;
    };
    const createCallback = () => {
      // 将表单项显示
      formItem!.isHidden = false;
    };
    const [
      pageDialogRef,
      defaultValue,
      handleEditorBtnClic,
      handleCreateBtnClic
    ] = operationLinkage(editorCallback, createCallback);
    // 对配置文件进行操作

    const dialogConfigRef = computed(() => {
      // 获取dialogConfig的值
      const departmentItem = dialogConfig.formItem.find((item) => {
        // 查找dialogConfig的formItem中field为departmentId的元素
        return item.field === "departmentId";
      });
      // 获取store中的departmentList
      const departmentList = store.state.departmentList.map((item) => {
        // 将item映射成一个对象，并赋值给title和value
        return {
          title: item.name,
          value: item.id
        };
      });
      // 获取dialogConfig的formItem中field为roleId的元素
      const roleItem = dialogConfig.formItem.find((item) => {
        // 查找dialogConfig的formItem中field为roleId的元素
        return item.field === "roleId";
      });
      // 获取store中的roleList
      const roleList = store.state.roleList.map((item) => {
        // 将item映射成一个对象，并赋值给title和value
        return {
          title: item.name,
          value: item.id
        };
      });
      // 将departmentItem和roleItem映射成一个对象，并赋值给departmentItem!.options和roleItem!.options
      departmentItem!.options = departmentList;
      roleItem!.options = roleList;
      // 返回dialogConfig
      return dialogConfig;
    });

    // 编辑 新建按钮的点击

    return {
      pageTabelRef,
      formConfigList,
      tableConfigList,
      searchBtnClic,
      resetBtnClic,
      dialogConfigRef,
      handleEditorBtnClic,
      handleCreateBtnClic,
      pageDialogRef,
      defaultValue
    };
  }
});
</script>

<style scoped lang="less">
.main {
  .user-tabel {
    margin-top: 20px;
    border-radius: 10px;
  }
}
</style>
