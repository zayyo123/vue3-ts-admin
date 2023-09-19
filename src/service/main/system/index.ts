import { zyRequest } from "../../index";
import { ResultType } from "../../types";
export function getDataList(url: string, query: any = {}) {
  return zyRequest.post<ResultType>({
    url,
    data: query
  });
}

// 导出一个函数，用于删除数据列表
export function deleteDataList(url: string) {
  // 使用post方法发送请求，url为请求地址，data为请求参数
  return zyRequest.delete<Request>({
    url
  });
}

// 导出一个函数，用于编辑页面数据
export function editorPageData(url: string, query: any) {
  // 使用patch方法发送请求，url为请求地址，data为请求参数
  return zyRequest.patch({
    url,
    data: query
  });
}

// 导出一个函数，用于创建页面数据
export function createPageData(url: string, query: any) {
  // 使用post方法发送请求，url为请求地址，data为请求参数
  return zyRequest.post({
    url,
    data: query
  });
}
