// 路由鉴权

import type { RouteRecordRaw } from "vue-router";
import { BreadCrumbItemType } from "@/common-ui/breadcrumb";

let firstMenu: any = null;
export default function (useMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 加入全部路由
  const allRoutes: RouteRecordRaw[] = [];
  // 使用Webpack的require.context方法来创建一个上下文，用于匹配 "@/router/main" 目录及其子目录中的所有 .ts 文件。
  const routeFiles = require.context("@/router/main", true, /\.ts$/);
  routeFiles.keys().forEach((filePath) => {
    // 获取与后端发送的目录信息相匹配的route路径
    const routeModule = require("@/router/main" + filePath.split(".")[1]);
    allRoutes.push(routeModule.default);
  });

  // 递归函数 获取可点击部分的url，并进行筛选

  /**遍历 useMenus 中的每一个菜单项，如果这个菜单项是第一级菜单，就调用 findRouteFun 函数自身，传入这个菜单的子菜单列表作为参数，继续递归下去。如果这个菜单项是第二级菜单，就在 allRoutes 中找到 path 属性和这个菜单的 url 属性匹配的路由项，将这个路由项推入 routes 数组中，并且如果 firstMenu 为空，则将这个菜单项设置为 firstMenu。最后，这个函数返回 routes 数组，这个数组包含了需要授权访问的路由项列表。 */
  function findRouteFun(useMenus: any[]): void {
    for (const menu of useMenus) {
      if (menu.type === 1) {
        findRouteFun(menu.children);
      } else if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url);
        if (route) {
          if (!firstMenu) {
            firstMenu = menu;
          }

          routes.push(route);
        }
      }
    }
  }
  findRouteFun(useMenus);
  return routes;
}

// 匹配，后端发来的路由形象和本地定义的路由映射
export function pathMapToMenu(
  useMenus: any[],
  path: string,
  breadCrumbList?: BreadCrumbItemType[]
): any {
  // 遍历菜单数据 useMenus 的每一项来查找与路由地址 path 匹配的菜单项
  for (const menu of useMenus) {
    // 如果当前菜单项是一个一级菜单，函数将递归地调用自身，以查找它的子菜单中是否包含匹配的菜单项。如果找到了匹配的菜单项，函数将把当前菜单项和匹配的菜单项都添加到面包屑导航列表 breadCrumbList 中，并返回匹配的菜单项
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], path);
      if (findMenu) {
        breadCrumbList?.push(menu);
        breadCrumbList?.push(findMenu);
        return findMenu;
      }
      // 如果当前菜单项是一个二级菜单，函数将判断它的路由地址是否与待查找的路由地址 path 相等。如果相等，则直接返回这个菜单项。
    } else if (menu.type === 2 && menu.url === path) {
      return menu;
    }
  }
}

// 将指定路径对应的菜单项转换成面包屑菜单项数组，并返回该数组
export function breadCrumbMapToMenu(
  useMenus: any[],
  path: string
): BreadCrumbItemType[] {
  const breadCrumbList: BreadCrumbItemType[] = [];
  pathMapToMenu(useMenus, path, breadCrumbList);
  return breadCrumbList;
}

export function jurisdictionList(useMenus: any[]): any {
  const permissionList = [];
  for (const menu of useMenus) {
    if (menu.children) {
      const permission = jurisdictionList(menu.children);
      permissionList.push(...permission);
    } else {
      if (menu.permission) {
        permissionList.push(menu.permission);
      }
    }
  }
  return permissionList;
}

// 从给定的菜单数据中获取所有权限，返回一个权限列表
export function mapFirstMenuList(useMenus: any[]): {
  value: any;
  title: any;
}[] {
  const menuList = [];
  for (const menu of useMenus) {
    if (menu.type === 1) {
      menuList.push({
        value: menu.id,
        title: menu.name
      });
    }
  }
  menuList.push({
    value: "",
    title: "创建一级菜单"
  });
  return menuList;
}

// 将传入的菜单列表中所有叶子节点的id值提取出来，组成一个数组并返回
export function mapHalfCheckedKeys(menuList: any[]): number[] {
  const keyList: number[] = [];
  const _recursionMapKeys = (menuList: any[]) => {
    for (const item of menuList) {
      if (item.children) {
        _recursionMapKeys(item.children);
      } else {
        keyList.push(item.id);
      }
    }
  };
  _recursionMapKeys(menuList);
  return keyList;
}
export { firstMenu };
