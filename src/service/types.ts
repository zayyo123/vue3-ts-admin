// 导出一个自定义接口， ResultType
export interface ResultType<T = any> {
  code: number;
  data: T;
}
