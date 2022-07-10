// 导入axios里面定义的两个类型AxiosRequestConfig(axios参数传入类型), AxiosResponse(请求类型)
import { AxiosRequestConfig, AxiosResponse } from "axios";

// 定义一个ZYInterceptors接口用于增加我们传入的AxiosRequestConfig的请求拦截的类型
export interface ZYInterceptors<T> {
  // 请求成功
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  // 请求失败
  requestInterceptorCatch?: (error: any) => any;
  // 响应成功
  responseInterceptor?: (result: T) => T;
  // 响应失败
  responseInterceptorCatch?: (error: any) => any;
}
// 导出 ZYRequestConfig给index的ZYRequest类的constructor构造类传入参数是设置传参类型，
//  ZYRequestConfig继承AxiosRequestConfig并且包含ZYInterceptors，所以具有AxiosRequestConfig和ZYInterceptors的功能
export interface ZYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZYInterceptors<T>;
  isShowLoading?: boolean;
}
