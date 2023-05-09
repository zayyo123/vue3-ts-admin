import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import { uploadCache } from "@/store";
// 在不同的浏览器中为HTML元素提供一致的默认样式。
import "normalize.css";

// 导入自定义的基础样式和阿里巴巴图标库的 CSS 文件
import "./assets/css/index.less";
// 导入我们Element plush的组件自动注册函数
import register from "./global";
//导入自定义的浏览器本地缓存对象
import localCache from "@/utils/cache";

// 缓存登录密码
localCache.setCache("name", "zayyo");
localCache.setCache("password", "123456");
// 使用
const app = createApp(App);

app.use(register);
app.use(store);
uploadCache();
app.use(router);

app.mount("#app");
