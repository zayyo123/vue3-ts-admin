import { createStore, useStore as useVuexStore, Store } from "vuex";

import { RootStateType, RootWithModule } from "./types";
import loginModule from "./login";
import systemModule from "./system";
import productModule from "./product";
import analysisModule from "./analysis";

import { getDataList } from "@/service/main/system";
const store = createStore<RootStateType>({
  state() {
    return {
      departmentList: [],
      // 部门列表
      departmentCount: 0,
      // 部门总数
      roleList: [],
      // 角色列表
      roleCount: 0,
      // 菜单列表
      menuList: []
    };
  },
  getters: {},
  mutations: {
    changeDepartmentList(state, payload: any[]) {
      // 将传入的参数赋值给state.departmentList
      state.departmentList = payload;
    },
    changeDepartmentCount(state, payload: number) {
      // 将传入的参数赋值给state.departmentCount
      state.departmentCount = payload;
    },
    changeRoleList(state, payload: any[]) {
      // 将传入的参数赋值给state.roleList
      state.roleList = payload;
    },
    changeRoleCount(state, payload: number) {
      // 将传入的参数赋值给state.roleCount
      state.roleCount = payload;
    },
    changeMenuList(state, payload: any[]) {
      // 将传入的参数赋值给state.menuList
      state.menuList = payload;
    }
  },
  actions: {
    async getInitDataAction({ commit }) {
      // 获取部门列表
      const departmentResult = await getDataList("/department/list", {
        offset: 0,
        size: 120
      });
      // 获取部门列表的总数
      const { list: departmentList, totalCount: departmentCount } =
        departmentResult.data;
      // 将部门列表放入commit中
      commit("changeDepartmentList", departmentList);
      // 将部门列表的总数放入commit中
      commit("changeDepartmentCount", departmentCount);

      // 获取角色列表
      const roleResult = await getDataList("/role/list", {
        offset: 0,
        size: 120
      });
      // 获取角色列表的总数
      const { list: roleList, totalCount: roleCount } = roleResult.data;
      // 将角色列表放入commit中
      commit("changeRoleList", roleList);
      // 将角色列表的总数放入commit中
      commit("changeRoleCount", roleCount);

      // 获取菜单列表
      const menuResult = await getDataList("/menu/list");
      // 获取菜单列表的总数
      const { list: menuList } = menuResult.data;
      // 将菜单列表放入commit中
      commit("changeMenuList", menuList);
    }
  },
  modules: {
    login: loginModule,
    system: systemModule,
    product: productModule,
    analysis: analysisModule
  }
});

export function uploadCache() {
  store.dispatch("login/uploadAction");
}
export function useStore(): Store<RootWithModule> {
  return useVuexStore();
}

export default store;
