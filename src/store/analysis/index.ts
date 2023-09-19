import { Module } from "vuex";
import type { AnalysisStateType } from "./types";
import type { RootStateType } from "../types";

// 导入系统请求页的axios请求
import {
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale,
  getGoodsAmountList,
  getGoodsSaleTop10
} from "@/service/main/analysis";

const analysisModule: Module<AnalysisStateType, RootStateType> = {
  namespaced: true,
  state() {
    return {
      // 商品地址销售
      goodsAddressSale: [],
      // 商品分类数量
      goodsCategoryCount: [],
      // 商品分类收藏
      goodsCategoryFavor: [],
      // 商品分类销售
      goodsCategorySale: [],
      // 商品金额列表
      goodsAmountList: [],
      // 商品销售置顶10
      goodsSaleTop10: []
    };
  },
  getters: {},
  mutations: {
    // 改变商品分类数量
    changeGoodsCategoryCount(state, list: any[]) {
      state.goodsCategoryCount = list;
    },
    // 改变商品分类销量
    changeGoodsCategorySale(state, list: any[]) {
      state.goodsCategorySale = list;
    },
    // 改变商品分类收藏
    changeGoodsCategoryFavor(state, list: any[]) {
      state.goodsCategoryFavor = list;
    },
    // 改变商品地址销量
    changeGoodsAddressSale(state, list: any[]) {
      state.goodsAddressSale = list;
    },
    // 改变商品金额列表
    changeGoodsAmountList(state, list: any[]) {
      state.goodsAmountList = list;
    },
    // 改变商品销量前十
    changeGoodsSaleTop10(state, list: any[]) {
      state.goodsSaleTop10 = list;
    }
  },
  actions: {
    async chartDataAction(context) {
      // 获取商品数量列表
      const goodsAmountListRes = await getGoodsAmountList();
      // 更新商品数量列表
      context.commit("changeGoodsAmountList", goodsAmountListRes.data);

      // 获取商品分类数量
      const goodsCateCountRes = await getGoodsCategoryCount();
      // 更新商品分类数量
      context.commit("changeGoodsCategoryCount", goodsCateCountRes.data);

      // 获取商品分类销量
      const goodsCateSaleRes = await getGoodsCategorySale();
      // 更新商品分类销量
      context.commit("changeGoodsCategorySale", goodsCateSaleRes.data);

      // 获取商品分类收藏
      const goodsCateFavorRes = await getGoodsCategoryFavor();
      // 更新商品分类收藏
      context.commit("changeGoodsCategoryFavor", goodsCateFavorRes.data);

      // 获取商品地址销量
      const goodsAddressSaleRes = await getGoodsAddressSale();
      // 更新商品地址销量
      context.commit("changeGoodsAddressSale", goodsAddressSaleRes.data);
    },
    async goodsSaleTop10Action(context) {
      // 获取商品销量前10
      const goodsSaleTop10Res = await getGoodsSaleTop10();
      // 更新商品销量前10
      context.commit("changeGoodsSaleTop10", goodsSaleTop10Res.data);
    }
  },
  modules: {}
};

export default analysisModule;
