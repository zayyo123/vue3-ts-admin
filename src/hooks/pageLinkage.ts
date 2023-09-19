import { ref } from "vue";
import PageTabel from "@/components/page-tabel";
import PageDialog from "@/components/page-dialog";

type callback = (data?: any) => void;

export function searchLinkage() {
  // 声明一个pageTabelRef变量，类型为InstanceType<typeof PageTabel>
  const pageTabelRef = ref<InstanceType<typeof PageTabel>>();
  // 声明一个resetBtnClic函数，返回一个void类型的参数
  const resetBtnClic = () => {
    // 调用pageTabelRef的getDataList方法，获取数据列表
    pageTabelRef.value?.getDataList();
  };
  // 声明一个searchBtnClic函数，返回一个void类型的参数
  const searchBtnClic = (queryInfo: any) => {
    // 打印queryInfo参数
    console.log(queryInfo);

    // 调用pageTabelRef的getDataList方法，获取数据列表，并传入queryInfo参数
    pageTabelRef.value?.getDataList(queryInfo);
  };
  // 返回pageTabelRef和resetBtnClic函数
  return [pageTabelRef, resetBtnClic, searchBtnClic];
}

export function operationLinkage(
  // 声明一个editCallback变量，类型为callback
  editCallback?: callback,
  // 声明一个createCallBack变量，类型为callback
  createCallBack?: callback
) {
  // 声明一个pageDialogRef变量，类型为InstanceType<typeof PageDialog>
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>();
  // 声明一个defaultValue变量，类型为ref<any>
  const defaultValue = ref({});
  // 声明一个handleCreateBtnClic函数，返回一个void类型的参数
  const handleCreateBtnClic = () => {
    // 将defaultValue的值赋值给pageDialogRef
    defaultValue.value = {};
    // 如果pageDialogRef存在，则调用centerDialogVisible的setter方法，设置centerDialogVisible为true
    if (pageDialogRef.value) {
      pageDialogRef.value.centerDialogVisible = true;
    }
    // 如果createCallBack存在，则调用createCallBack函数
    createCallBack && createCallBack();
  };

  // 声明一个handleEditorBtnClic函数，返回一个void类型的参数
  const handleEditorBtnClic = (payload: any) => {
    // 将payload的值赋值给defaultValue
    defaultValue.value = payload;

    // 如果pageDialogRef存在，则调用centerDialogVisible的setter方法，设置centerDialogVisible为true
    if (pageDialogRef.value) {
      pageDialogRef.value.centerDialogVisible = true;
    }

    // 如果editCallback存在，则调用editCallback函数，传入payload参数
    editCallback && editCallback({...payload });
  };
  // 返回pageDialogRef和defaultValue函数
  return [
    pageDialogRef,
    defaultValue,
    handleEditorBtnClic,
    handleCreateBtnClic
  ];
}
