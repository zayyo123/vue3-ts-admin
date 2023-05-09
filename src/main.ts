import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import { uploadCache } from "@/store";
// 在不同的浏览器中为HTML元素提供一致的默认样式。
import "normalize.css";

import "./assets/css/index.less";
import register from "./global";
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
