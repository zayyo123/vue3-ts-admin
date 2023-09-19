import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import chinaMap from "../map/china.json";
echarts.registerMap("china", chinaMap);
export default function (el: HTMLElement) {
  // 初始化echarts实例
  const echartsInstance = echarts.init(el);
  // 定义setChartOption函数，用于设置echarts实例的option
  const setChartOption = function (options: EChartsOption) {
    echartsInstance.setOption(options);
  };
  // 定义window.resize事件，用于重新设置echarts实例的大小
  window.addEventListener("resize", () => {
    echartsInstance.resize();
  });
  // 定义updateSize函数，用于重新设置echarts实例的大小
  const updateSize = () => {
    echartsInstance.resize();
  };
  // 返回echarts实例、setChartOption函数、updateSize函数
  return {
    echartsInstance,
    setChartOption,
    updateSize
  };
}
