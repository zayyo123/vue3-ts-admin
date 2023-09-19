import ZYRequest from "./request";

import localCache from "@/utils/cache";

const zyRequest = new ZYRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: Number(process.env.VUE_APP_TIME_OUT),
  interceptors: {
    // 请求拦截器
    requestInterceptor(config) {
      // 携带token的拦截
      const token = localCache.getCache("token");
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`
        // 携带token进行发送请求
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    // 请求拦截器抛出错误
    requestInterceptorCatch(error) {
      return error;
    },
    // 响应拦截器
    responseInterceptor(result) {
      return result;
    },
    // 响应拦截器抛出错误
    responseInterceptorCatch(error) {
      return error;
    }
  }
});
// console.log(process.env.VUE_APP_BASE_URL);

export { zyRequest };
// ZYRequest
