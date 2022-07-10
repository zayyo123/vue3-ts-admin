<template>
  <div class="page-rose-chart">
    <z-y-echarts :options="option" :zoom="1.176471"></z-y-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import ZYEcharts from "@/common-ui/zy-echarts";

export default defineComponent({
  name: "PageRoseChart",
  props: {
    optionData: {
      type: Object,
      default: () => ({})
    }
  },
  components: { ZYEcharts },
  setup(props) {
    var option = computed(() => {
      return {
        tooltip: {
          trigger: "item"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [15, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8
            },
            data: props.optionData
          }
        ]
      };
    });
    return { option };
  }
});
</script>

<style lang="less" scoped></style>
