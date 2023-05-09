import { zyRequest } from "../../index";
import { ResultType } from "../../types";

enum ChartsUrl {
  GOODS_CATEGORY_COUNT = "/goods/category/count",
  GOODS_CATEGORY_SALE = "/goods/category/sale",
  GOODS_CATEGORY_FAVOR = "/goods/category/favor",
  GOODS_ADDRESS_SALE = "/goods/address/sale",
  GOODS_AMOUNT_LIST = "/goods/amount/list",
  GOODS_SALE_TOP10 = "/goods/sale/top10"
}
// 导出系统分析页的数据请求API

export function getGoodsCategoryCount() {
  return zyRequest.get<ResultType>({
    url: ChartsUrl.GOODS_CATEGORY_COUNT
  });
}
export function getGoodsCategorySale() {
  return zyRequest.get<ResultType>({
    url: ChartsUrl.GOODS_CATEGORY_SALE
  });
}
export function getGoodsCategoryFavor() {
  return zyRequest.get<ResultType>({
    url: ChartsUrl.GOODS_CATEGORY_FAVOR
  });
}
export function getGoodsAddressSale() {
  return zyRequest.get<ResultType>({
    url: ChartsUrl.GOODS_ADDRESS_SALE
  });
}

export function getGoodsAmountList() {
  return zyRequest.get<ResultType>({
    url: ChartsUrl.GOODS_AMOUNT_LIST
  });
}

export function getGoodsSaleTop10() {
  return zyRequest.get<ResultType>({
    url: ChartsUrl.GOODS_SALE_TOP10
  });
}
