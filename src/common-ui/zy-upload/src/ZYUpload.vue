<template>
  <div class="zy-upload">
    <el-upload
      class="upload-demo"
      ref="uploadRef"
      :limit="1"
      action="https://img.kuibu.net/upload/backblaze"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button size="small" type="primary">选取文件</el-button>
      </template>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";
import ElUpload from "element-plus/lib/el-upload";

// interface IFileListType {
//   name: string;
//   url: string;
// }

export default defineComponent({
  name: "index",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const uploadRef = ref<InstanceType<typeof ElUpload>>();

    // 创建一个新的fileList变量，用于存放上传的文件
    const fileList = ref<any>([]);
    // 等待上传完成后，将文件信息添加到fileList中
    nextTick(() => {
      if (props.modelValue) {
        fileList.value.push({
          name: "image",
          url: props.modelValue
        });
      }
    });

    // 当组件被渲染时，调用submitUpload函数，上传文件
    const submitUpload = () => {
      uploadRef.value!.submit();
    };
    // 当文件上传成功时，将文件信息添加到fileList中，并触发emit函数，传入modelValue值
    const handleRemove = (file: any, fileList: any) => {
      console.log("handleRemove:", file, fileList);
      emit("update:modelValue", "");
    };
    // 当文件上传成功时，将文件信息添加到fileList中，并触发emit函数，传入modelValue值
    const handleSuccess = (response: any, file: any) => {
      // console.log("handlePreview:", response, file, fileList);
      fileList.value!.push({
        name: file.name,
        url: response.url
      });
      emit("update:modelValue", response.url);
    };
    return {
      submitUpload,
      handleSuccess,
      handleRemove,
      uploadRef,
      fileList
    };
  }
});
</script>

<style lang="less" scoped></style>
