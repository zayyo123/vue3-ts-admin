import { CountUp } from "countup.js";
// 创建一个CountUp实例
const demo = new CountUp("myTargetElement", 6884);
// 如果CountUp实例没有出错，则开始计数
if (!demo.error) {
  demo.start();
} else {
  // 如果CountUp实例出错，则打印出错信息
  console.error(demo.error);
}
