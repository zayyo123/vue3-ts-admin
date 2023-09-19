import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";

import { firstMenu } from "@/utils/menuToRoute";

const routes: RouteRecordRaw[] = [
  {
    // 首页
    path: "/",
    redirect: "/login"
  },
  {
    // 主页
    path: "/main",
    name: "main",
    component: () => import("@/views/main/Main.vue")
  },
  {
    // 登录页
    path: "/login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    // 错误页
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/not-found/NotFound.vue")
  }
];

const router = createRouter({
  // 使用createRouter创建路由对象
  routes,
  // 使用createWebHashHistory创建浏览器历史记录
  history: createWebHashHistory()
});
// router.beforeEach((to, from) => {
router.beforeEach((to) => {
// 使用router.beforeEach函数，当跳转的路由不是/login时，检查本地缓存是否有token
router.beforeEach((to, from) => {
  // 如果跳转的路由不是/login，则检查本地缓存是否有token
  if (to.path!== "/login") {
    if (!localCache.getCache("token")) {
      // 如果没有token，则返回/login
      return "/login";
    }
  }
  // 如果跳转的路由是/main，则返回第一个菜单的url
  if (to.path === "/main") {
    return firstMenu.url;
  }
});
export default router;
