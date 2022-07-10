import { zyRequest } from "../../index";
import { ResultType } from "../../types";
interface IArticlesDataType {
  title: string;
  cotent: string;
}
export function publishArticlesData(articlesData: IArticlesDataType) {
  return zyRequest.post<ResultType>({
    url: "/story",
    data: articlesData
  });
}
export function getArticlesData(payload: any) {
  return zyRequest.post<ResultType>({
    url: "/story/list",
    data: payload
  });
}
