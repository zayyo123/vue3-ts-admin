// 从vue 中导入APP类型
import type { App } from "vue";
// 导入我们们的组件注册声明文件
import registerElement from "./registerElement";
import registerGlobal from "./registerGlobal";
// 导出（暴露）我们的主接口方便main接口调用使用
//default导出未命名函数
export default function (app: App): void {
  // 使用use函数安装我们的registerElement,registerProperties
  app.use(registerElement);
  app.use(registerGlobal);
}
