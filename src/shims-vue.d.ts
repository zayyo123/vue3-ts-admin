/* eslint-disable */
// TypeScript 的声明文件，用于告诉 TypeScript 如何处理某些模块或文件。

// 告诉 TypeScript 如何处理 .vue 文件，它会将每个 .vue 文件视为一个组件，并为其定义类型。该声明导出了一个默认的 DefineComponent 类型。
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 告诉 TypeScript 如何处理 kuan-vue-flip-clock/.json/.png/.jpg 模块
declare module "kuan-vue-flip-clock";
declare module "*.json";
declare module "*.png";
declare module "*.jpg";
