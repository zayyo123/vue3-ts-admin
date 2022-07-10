import { zyRequest } from "../../index";
import { ResultType } from "../../types";
export function getDataList(url: string, query: any = {}) {
  return zyRequest.post<ResultType>({
    url,
    data: query
  });
}

export function deleteDataList(url: string) {
  return zyRequest.delete<Request>({
    url
  });
}

export function editorPageData(url: string, query: any) {
  return zyRequest.patch({
    url,
    data: query
  });
}

export function createPageData(url: string, query: any) {
  return zyRequest.post({
    url,
    data: query
  });
}
