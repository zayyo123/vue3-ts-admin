<template>
  <div class="page-pic-label-chart">
    <z-y-echarts
      :options="option"
      :zoom="1.176471"
      width="800px"
      height="420px"
    ></z-y-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import ZYEcharts from "@/common-ui/zy-echarts";

export default defineComponent({
  name: "PagePicLableChart",
  props: {
    optionData: {
      type: Array,
      default: () => []
    }
  },
  components: { ZYEcharts },
  setup(props) {
    const option = computed(() => {
      return {
        title: {
          text: "销量前10的商品数量",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          textStyle: {
            fontSize: 13,
            fontWeight: 700,
            width: 50,
            overflow: "truncate",
            ellipsis: "..."
          }
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "40%"],
            selectedMode: "single",
            data: props.optionData,
            label: {
              fontSize: 13
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    });

    return { option };
  }
});
</script>

<style lang="less" scoped>
.page-pic-label-chart {
  display: flex;
  justify-content: center;
}
</style>
