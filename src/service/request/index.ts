import axios from "axios";
// 导入axios里定义的AxiosInstance(axios实例）类型
import type { AxiosInstance } from "axios";
// 导入element-plus里的El插件Loading
import { ElLoading } from "element-plus";
// 导入自定义的ZYRequestConfig 类型
import { ZYRequestConfig } from "./type";
// 导入element-plus里定义的ILoadingInstance接口类型
import { ILoadingInstance } from "element-plus/lib/el-loading/src/loading.type";

// 是否打开了loading默认开启
const SHOW_LOADING = true;
// 定义一个ZYRequest 类用于发送axion的请求
// 定义一个axion实例属性
class ZYRequest {
  // 定义一个拦截器属性
  instance: AxiosInstance;
  // 引入我们的element loading属性
  elLoading?: ILoadingInstance;
  // 定义应该加载是否开启属性
  isShowLoading: boolean = SHOW_LOADING;
  // 利用构造函数要求传入使用 ZYRequest类时传入参数
  constructor(config: ZYRequestConfig) {
    // 把axios实例赋给instance
    this.instance = axios.create(config);
    // showLoading如果没有传入默认true如果有值进行赋值保存
    this.isShowLoading = config.isShowLoading ?? SHOW_LOADING;
    // 实例拦截器 请求拦截
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    );
    // 响应拦截
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    );
    // 全局拦截器  所有的实例都有的拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器: 请求成功拦截')
        // 判断是否需要加载页面
        if (this.isShowLoading === true) {
          this.elLoading = ElLoading.service({
            text: "正在加载中，请稍后....",
            background: "rgba(0,0,0,.6)"
          });
        }

        return config;
      },
      (error) => {
        return error;
      }
    );
    // 响应拦截
    this.instance.interceptors.response.use(
      (result) => {
        // console.log('所有的实例都有的拦截器: 响应成功拦截')
        // 将loading移除
        this.elLoading?.close();
        // 对返回的响应返回值进行判断，是否响应成功
        const data = result.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败~, 错误信息");
        } else {
          return result.data;
        }
      },
      (error) => {
        this.elLoading?.close();
        if (error.response.status === 404) {
          console.log("404的错误~");
        }
        return error;
      }
    );
  }

  request<T = any>(config: ZYRequestConfig<T>): Promise<T> {
    // 1.单个请求对请求config的处理
    if (config.interceptors?.requestInterceptor) {
      // 2.判断是否需要显示loading
      this.isShowLoading = config.isShowLoading ?? SHOW_LOADING;
      config = config.interceptors.requestInterceptor(config);
    }

    return this.instance
      .request<any, T>(config)
      .then((res) => {
        // 1.单个请求对数据的处理
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res);
        }
        // 2.将showLoading设置true, 这样不会影响下一个请求
        this.isShowLoading = SHOW_LOADING;
        // 3.将结果resolve返回出去
        return res;
      })
      .catch((err) => {
        // 将showLoading设置true, 这样不会影响下一个请求
        this.isShowLoading = SHOW_LOADING;
        return err;
      });
  }

  // 定义发送请求的ts类型
  get<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request({
      ...config,
      method: "GET"
    });
  }
  post<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request({
      ...config,
      method: "POST"
    });
  }
  delete<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request({
      ...config,
      method: "DELETE"
    });
  }
  patch<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request({
      ...config,
      method: "PATCH"
    });
  }
}

export default ZYRequest;
