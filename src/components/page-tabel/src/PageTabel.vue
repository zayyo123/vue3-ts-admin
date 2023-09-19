<template>
  <div class="page-tabel">
    <z-y-tabel :="tabelConfig" :tableData="dataList" :dataCount="dataCount" v-model:page="pageInfo"
      @handleMultipleChoice="receiveMultipleChoice">
      <template v-slot:headerHandler>
        <el-button type="success" plain v-if="isDelete && multipleChoiceData.length > 1" @click="deleteMultipleChoice">
          删除多条
        </el-button>
        <el-button type="success" plain v-if="isCreate" @click="handleCreateClick">新建数据</el-button>
      </template>
      <template #createAt="scope">
        <b>{{ $formatUTC(scope.row.createAt) }}</b>
      </template>
      <template #updateAt="scope">
        <b>{{ $formatUTC(scope.row.updateAt) }}</b>
      </template>
      <template #operation="scope">
        <el-button type="text" size="small" class="el-icon-edit" v-if="isUpdate" @click="handleEditorClick(scope.row)">
          编辑
        </el-button>
        <el-button type="text" size="small" class="el-icon-delete" v-if="isDelete" @click="handleDeleteClick(scope.row)">
          删除
        </el-button>
      </template>
      <template v-for="item in dataSlot" :key="item.prop" #[item.slotName]="scope">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </z-y-tabel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";

import { useStore } from "@/store";
import ZYTabel from "@/common-ui/zy-tabel";

import { usePermission } from "@/hooks/permission";
export default defineComponent({
  name: "PageTabel",
  props: {
    pageName: {
      type: String,
      default: ""
    },
    tabelConfig: {
      type: Object,
      require: true
    },
    usePermission: {
      type: Boolean,
      default: true
    }
  },
  components: { ZYTabel },
  emits: ["createBtnClic", "editorBtnClic"],
  setup(props, { emit }) {
    const store = useStore();

    // 获取权限
    const isQuery = usePermission(props.pageName, "query");
    const isUpdate = usePermission(props.pageName, "update");
    const isCreate = usePermission(props.pageName, "create");
    const isDelete = usePermission(props.pageName, "delete");

    // 设置页面信息
    const pageInfo = ref({ pageSize: 10, currentPage: 1 });
    watch(pageInfo, () => {
      getDataList();
    });
    // 数据请求
    function getDataList(queryInfo: any = {}) {
      // 判断是否使用权限
      if (!isQuery && props.usePermission) return;
      // 调用系统数据列表操作
      store.dispatch("system/dataListAction", {
        // 请求参数
        pageName: props.pageName,
        queryInfo: {
          // 请求参数
          offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    }


    getDataList();
    // 数据处理
    const dataSlot = props.tabelConfig?.propList.filter((data: any) => {
      // 如果slotName为createAt，则返回false
      if (data.slotName === "createAt") return false;
      // 如果slotName为updateAt，则返回false
      if (data.slotName === "updateAt") return false;
      // 如果slotName为operation，则返回false
      if (data.slotName === "operation") return false;
      // 否则，返回true
      return true;
    });    // 数据获取
    let dataList = computed(
      () => (store.state.system as any)[`${props.pageName}List`]
    );
    const dataCount = computed(() =>
      store.getters[`system/getDataCount`](props.pageName)
    );
    // 编辑按钮 & 删除按钮
    const handleEditorClick = (data: any) => {
      emit("editorBtnClic", data);
    };
    const handleCreateClick = () => {
      emit("createBtnClic");
    };
    const handleDeleteClick = (data: any) => {
      store.dispatch("system/deleteDataAction", {
        pageName: props.pageName,
        id: data.id
      });
    };
    // 处理多选按钮
    const multipleChoiceData = ref<any[]>([]);
    const receiveMultipleChoice = (value: any[]) => {
      multipleChoiceData.value = value;
    };
    const deleteMultipleChoice = () => {
      for (const data of multipleChoiceData.value!) {
        handleDeleteClick(data);
      }
    };
    return {
      dataList,
      getDataList,
      dataCount,
      pageInfo,
      dataSlot,
      isUpdate,
      isCreate,
      isDelete,
      handleEditorClick,
      handleDeleteClick,
      handleCreateClick,
      multipleChoiceData,
      receiveMultipleChoice,
      deleteMultipleChoice
    };
  }
});
</script>

<style lang="less" scoped>
.page-tabel {
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
}
</style>
