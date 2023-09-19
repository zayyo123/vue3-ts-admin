<template>
  <div class="z-y-echarts">
    <div ref="echartRef" :style="{ width: width, height: height, zoom: zoom }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watchEffect } from "vue";

import { EChartsOption } from "echarts";
import echartInit from "../hooks/initECharts";

export default defineComponent({
  name: "ZYEcharts",
  props: {
    options: {
      type: Object as PropType<EChartsOption>,
      default: () => ({})
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "360px"
    },
    zoom: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const echartRef = ref<HTMLDivElement>();
    onMounted(() => {
      // 初始化echart
      const { setChartOption } = echartInit(echartRef.value!);
      // 监听echartRef.value的变化
      watchEffect(() => {
        // 设置echart的option
        setChartOption(props.options);
      });
    });

    return { echartRef };
  }
});
</script>

<style lang="less" scoped></style>
