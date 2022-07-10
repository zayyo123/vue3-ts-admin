import ZYRequest from "./request";

import localCache from "@/utils/cache";

const zyRequest = new ZYRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: Number(process.env.VUE_APP_TIME_OUT),
  interceptors: {
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
    requestInterceptorCatch(error) {
      return error;
    },
    responseInterceptor(result) {
      return result;
    },
    responseInterceptorCatch(error) {
      return error;
    }
  }
});
// console.log(process.env.VUE_APP_BASE_URL);

export { zyRequest };
// ZYRequest
