import { App } from "vue";

// 注册时间格式化的指令
import { formatUtcToData } from "@/utils/formate";
export default function registerDirectives(app: App): void {
  // 设置全局变量$formatUTC，接收一个参数，参数类型为字符串，默认值为"YYYY-MM-DD HH:mm:ss"
  app.config.globalProperties.$formatUTC = function (
    data: string,
    formatString = "YYYY-MM-DD HH:mm:ss"
  ) {
    // 调用formatUtcToData函数，格式化时间
    return formatUtcToData(data, formatString);
  };
}
