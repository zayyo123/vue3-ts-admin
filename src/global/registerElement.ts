import type { App } from "vue";

import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElTabPane,
  ElTabs,
  ElRow,
  ElSelect,
  ElDatePicker,
  ElOption,
  ElBreadcrumbItem,
  ElBreadcrumb,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElAvatar,
  ElUpload,
  ElCard,
  ElTooltip,
  ElCollapse,
  ElCollapseItem,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag
} from "element-plus";

import "element-plus/lib/theme-chalk/base.css";

const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElCol,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElAvatar,
  ElUpload,
  ElCard,
  ElTooltip,
  ElCollapse,
  ElCollapseItem,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag
];

export default function (app: App): void {
  // 遍历components数组
  for (const cpn of components) {
    // 将每一个元素赋值给app.component
    app.component(cpn.name, cpn);
  }
}
