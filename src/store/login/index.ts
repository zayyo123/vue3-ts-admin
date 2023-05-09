import { Module } from "vuex";
import router from "@/router";

import {
  accountLoginRequest,
  userInfoRequest,
  userMenuRequest
} from "@/service/login";

import { AccountLoginType } from "@/service/login/types";
import localCache from "@/utils/cache";
import jurisdictionList, { jurisdictionList } from "@/utils/menuToRoute";

import { RootStateType } from "../types";
import { LoginStateType } from "./types";
const loginModule: Module<LoginStateType, RootStateType> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissionList: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload;
    },
    changeUserMenus(state, payload: any) {
      state.userMenus = payload;
      // 使用Vue Router动态地添加路由映射规则
      const menusInfo = menuToRoute(payload);
      menusInfo.forEach((item) => {
        router.addRoute("main", item);
      });

      const permissionList = jurisdictionList(payload);
      state.permissionList = permissionList;
    }
  },
  actions: {
    async accountLoginAction(context, payload: AccountLoginType) {
      // 登陆信息
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      context.commit("changeToken", token);
      localCache.setCache("token", token);

      context.dispatch("getInitDataAction", null, { root: true });
      // 登陆后用户信息
      const userInfoResult = await userInfoRequest(id);
      context.commit("changeUserInfo", userInfoResult.data);
      localCache.setCache("userInfo", userInfoResult.data);
      //请求用户菜单
      const userMenuResult = await userMenuRequest(id);
      context.commit("changeUserMenus", userMenuResult.data);
      localCache.setCache("userMenus", userMenuResult.data);
      // 路由跳转
      router.push("/main");
    },
    // 从本地缓存中获取存储的用户信息和菜单信息，并将其存储到 Vuex 的状态中，以便应用程序中的其他组件可以访问这些信息。
    uploadAction(context) {
      // 存储的 token（令牌）
      const token = localCache.getCache("token");
      if (token) {
        context.commit("changeToken", token);
        context.dispatch("getInitDataAction", null, { root: true });
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        context.commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        context.commit("changeUserMenus", userMenus);
      }
    }
  }
};

export default loginModule;
