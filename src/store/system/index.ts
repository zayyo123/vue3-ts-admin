import { Module } from "vuex";
import { RootStateType } from "../types";
import { SystemStateType, DataListEnum } from "./types";

import {
  getDataList,
  deleteDataList,
  editorPageData,
  createPageData
} from "@/service/main/system";
import { firstCapitalLetter } from "@/utils/handleString";
const systemModule: Module<SystemStateType, RootStateType> = {
  namespaced: true,
  state: () => ({
    usersList: [],
    // 用户列表
    usersCount: 0,
    // 用户数量
    roleList: [],
    // 角色列表
    roleCount: 0,
    // 角色数量
    menuList: [],
    // 菜单列表
    menuCount: 0,
    // 菜单数量
    goodsList: [],
    // 商品列表
    goodsCount: 0,
    // 商品数量
    departmentList: [],
    // 部门列表
    departmentCount: 0,
    // 部门数量
    categoryList: [],
    // 分类列表
    categoryCount: 0,
    // 分类数量
    storyList: [],
    // 悬赏列表
    storyCount: 0
  }),
  getters: {
    getDataCount(state) {
      // 返回一个函数，该函数接收一个字符串参数pageName
      return function (pageName: string) {
        // 返回state中pageName的Count属性
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  mutations: {
    changeUsersList(state, payload) {
      // 将传入的参数payload赋值给state.usersList
      state.usersList = payload;
    },
    changeUsersCount(state, payload: number) {
      // 将传入的参数payload赋值给state.usersCount
      state.usersCount = payload;
    },
    changeRoleList(state, payload) {
      // 将传入的参数payload赋值给state.roleList
      state.roleList = payload;
    },
    changeRoleCount(state, payload: number) {
      // 将传入的参数payload赋值给state.roleCount
      state.roleCount = payload;
    },
    changeMenuList(state, payload) {
      // 将传入的参数payload赋值给state.menuList
      state.menuList = payload;
    },
    changeMenuCount(state, payload: number) {
      // 将传入的参数payload赋值给state.menuCount
      state.menuCount = payload;
    },
    changeGoodsList(state, payload) {
      // 将传入的参数payload赋值给state.goodsList
      state.goodsList = payload;
    },
    changeGoodsCount(state, payload: number) {
      // 将传入的参数payload赋值给state.goodsCount
      state.goodsCount = payload;
    },
    changeDepartmentList(state, payload) {
      // 将传入的参数payload赋值给state.departmentList
      state.departmentList = payload;
    },
    changeDepartmentCount(state, payload: number) {
      // 将传入的参数payload赋值给state.departmentCount
      state.departmentCount = payload;
    },
    changeCategoryList(state, list: any[]) {
      // 将传入的参数list赋值给state.categoryList
      state.categoryList = list;
    },
    changeCategoryCount(state, payload: number) {
      // 将传入的参数payload赋值给state.categoryCount
      state.categoryCount = payload;
    },
    changeStoryList(state, list: any[]) {
      // 将传入的参数list赋值给state.storyList
      state.storyList = list;
    },
    changeStoryCount(state, count: number) {
      // 将传入的参数count赋值给state.storyCount
      state.storyCount = count;
    }
  },
  actions: {
     // 通过传入 payload 参数来决定获取哪个页面的数据
    async dataListAction({ commit }, payload) {
      let dataUrl = "";
      switch (payload.pageName) {
        case "users":
          // 获取用户列表URL
          dataUrl = DataListEnum.USER_LIST_URL;
          break;
        case "role":
          // 获取角色列表URL
          dataUrl = DataListEnum.ROLE_LIST_URL;
          break;
        case "menu":
          // 获取菜单列表URL
          dataUrl = DataListEnum.MENU_LIST_URL;
          break;
        case "goods":
          // 获取商品列表URL
          dataUrl = DataListEnum.GOODS_LIST_URL;
          break;
        case "department":
          // 获取部门列表URL
          dataUrl = DataListEnum.DEPAERTMENT_LIST_URL;
          break;
        case "category":
          // 获取分类列表URL
          dataUrl = DataListEnum.CATEGORY_LIST_URL;
          break;
        case "story":
          // 获取文章列表URL
          dataUrl = DataListEnum.STORY_LIST_URL;
          break;
      }

      const result = await getDataList(dataUrl, payload.queryInfo);

// 获取指定页面的数据列表
      const pageName = firstCapitalLetter(payload.pageName);
      // 改变对应页面的数据列表和总数量。
      commit(`change${pageName}List`, result.data.list);
      commit(`change${pageName}Count`, result.data.totalCount);
    },
  //  通过传入 payload 参数来决定删除哪个页面的数据
    async deleteDataAction(context, payload) {
      // 解构出pageName和id
      const { pageName, id } = payload;
      // 删除对应数据，然后重新获取当前页面数据。
      const url = `/${pageName}/${id}`;
      // 删除对应数据，然后重新获取当前页面数据。
      await deleteDataList(url);
      // 调用dispatch函数，触发dataListAction事件
      context.dispatch("dataListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async editorPageDataAction(context, payload: any) {
      // 获取参数
      const { pageName, userId, queryInfo } = payload;
      // 获取url
      const url = `/${pageName}/${userId}`;
      // 打印参数
      console.log(payload);
      // 调用editorPageData函数
      await editorPageData(url, queryInfo);
      // 调用dispatch函数，传入pageName和offset和size参数
      context.dispatch("dataListAction", {
        pageName,
        offset: 0,
        size: 10
      });
    },
    async createPageDataAction(context, payload: any) {
      // payload 中包含 pageName 和 queryInfo
      const { pageName, queryInfo } = payload;
      // 定义 url
      const url = `/${pageName}`;
      // 调用 createPageData 函数，传入 url 和 queryInfo
      await createPageData(url, queryInfo);
      // 调用 context.dispatch 函数，传入 "dataListAction" 和 { pageName, offset: 0, size: 10 }
      context.dispatch("dataListAction", {
        pageName,
        offset: 0,
        size: 10
      });
    }
  }
};
export default systemModule;
