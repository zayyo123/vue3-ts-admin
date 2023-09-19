<template>
  <div class="show-charts">
    <el-row :gutter="10">
      <el-col :span="7">
        <z-y-card title="分类商品数量(饼图)">
          <page-pic-chart :optionData="goodsCategoryCount" />
        </z-y-card>
      </el-col>
      <el-col :span="10">
        <z-y-card title="不同城市销量(中国地图)">
          <page-china-chart :optionData="goodsAddressSale" />
        </z-y-card>
      </el-col>
      <el-col :span="7">
        <z-y-card title="分类商品数量(玫瑰图)">
          <page-rose-chart :optionData="goodsCategoryCount" />
        </z-y-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="dashboard-row">
      <el-col :span="12">
        <z-y-card title="分类商品销售(折现图)">
          <page-line-chart :optionData="goodsCategorySale" />
        </z-y-card>
      </el-col>
      <el-col :span="12">
        <z-y-card title="分类商品收藏(柱状图)">
          <page-bar-chart :optionData="goodsCategoryFavor" />
        </z-y-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "@/store";
import ZYCard from "@/common-ui/zy-card";
import {
  PageBarChart,
  PagePicChart,
  PageRoseChart,
  PageLineChart,
  PageChinaChart
} from "@/components/page-echart";
export default defineComponent({
  name: "ShowCharts",
  components: {
    ZYCard,
    PagePicChart,
    PageRoseChart,
    PageLineChart,
    PageBarChart,
    PageChinaChart
  },
  setup() {
    const store = useStore();
    const goodsCategoryFavor = computed(() => {
      // 获取商品分类收藏的数据
      const valueList: string[] = [];
      const keyList: number[] = [];
      store.state.analysis.goodsCategoryFavor.map((item) => {
        // 将商品收藏的类别名称和商品收藏的类别id放入valueList和keyList数组中
        valueList.push(item.goodsFavor);
        keyList.push(item.name);
      });
      return {
        valueList,
        keyList
      };
    });
    const goodsCategoryCount = computed(() => {
      // 获取商品分类总数的数据
      return store.state.analysis.goodsCategoryCount.map((item) => ({
        value: item.goodsCount,
        name: item.name
      }));
    });
    const goodsCategorySale = computed(() => {
      // 获取商品分类销量的数据
      const valueList: string[] = [];
      const keyList: number[] = [];
      store.state.analysis.goodsCategorySale.map((item) => {
        valueList.push(item.goodsCount);
        keyList.push(item.name);
      });
      return {
        valueList,
        keyList
      };
    });
    const goodsAddressSale = computed(() => {
      // 获取地址销量的数据
      const dataList: any[] = [];
      store.state.analysis.goodsAddressSale.map((item) => {
        dataList.push({
          name: item.address,
          value: item.count
        });
      });
      console.log(dataList);

      return {
        dataList
      };
    });
    return {
      goodsCategoryFavor,
      goodsCategoryCount,
      goodsCategorySale,
      goodsAddressSale
    };
  }
});
</script>

<style lang="less" scoped>
.dashboard-row {
  margin-top: 10px;
}
</style>
