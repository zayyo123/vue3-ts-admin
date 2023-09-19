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
    // 遍历useMenus数组
    for (const menu of useMenus) {
      // 如果menu的type类型为1
      if (menu.type === 1) {
        // 递归调用findRouteFun函数
        findRouteFun(menu.children);
      } else if (menu.type === 2) {
        // 找到menu的url
        const route = allRoutes.find((item) => item.path === menu.url);
        // 如果route存在
        if (route) {
          // 如果firstMenu为空
          if (!firstMenu) {
            // 设置firstMenu为menu
            firstMenu = menu;
          }

          // 将route添加到routes数组中
          routes.push(route);
        }
      }
    }
  }
  // 调用findRouteFun函数
  findRouteFun(useMenus);
  // 返回routes数组
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
      const findMenu = pathMapToMenu(menu.children?? [], path);
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
  // 传入useMenus数组
  useMenus: any[],
  // 传入路径
  path: string
): BreadCrumbItemType[] {
  // 定义一个空数组用于存放菜单项
  const breadCrumbList: BreadCrumbItemType[] = [];
  // 调用pathMapToMenu函数，将useMenus数组和路径传入，并将结果存入breadCrumbList数组中
  pathMapToMenu(useMenus, path, breadCrumbList);
  // 返回breadCrumbList数组
  return breadCrumbList;
}

export function jurisdictionList(useMenus: any[]): any {
  // 定义权限列表
  const permissionList = [];
  // 遍历useMenus
  for (const menu of useMenus) {
    // 如果menu有子菜单
    if (menu.children) {
      // 递归调用jurisdictionList函数
      const permission = jurisdictionList(menu.children);
      // 将权限添加到permissionList中
      permissionList.push(...permission);
    } else {
      // 如果menu没有子菜单，则添加menu的权限
      if (menu.permission) {
        permissionList.push(menu.permission);
      }
    }
  }
  // 返回权限列表
  return permissionList;
}

// 从给定的菜单数据中获取所有权限，返回一个权限列表
export function mapFirstMenuList(useMenus: any[]): {
  value: any;
  title: any;
}[] {
  // 定义一个空数组，用于存放菜单
  const menuList = [];
  // 遍历传入的useMenus数组
  for (const menu of useMenus) {
    // 如果菜单类型为1
    if (menu.type === 1) {
      // 将菜单id和name添加到menuList数组中
      menuList.push({
        value: menu.id,
        title: menu.name
      });
    }
  }
  // 将创建一级菜单添加到menuList数组中
  menuList.push({
    value: "",
    title: "创建一级菜单"
  });
  // 返回menuList数组
  return menuList;
}
// 将传入的菜单列表中所有叶子节点的id值提取出来，组成一个数组并返回
export function mapHalfCheckedKeys(menuList: any[]): number[] {
  // 定义一个keyList数组
  const keyList: number[] = [];
  // 定义一个_recursionMapKeys函数，用于遍历menuList数组
  const _recursionMapKeys = (menuList: any[]) => {
    // 遍历menuList数组
    for (const item of menuList) {
      // 如果item有children属性，则递归遍历item.children
      if (item.children) {
        _recursionMapKeys(item.children);
      } else {
        // 否则将item.id添加到keyList数组中
        keyList.push(item.id);
      }
    }
  };
  // 递归遍历menuList数组
  _recursionMapKeys(menuList);
  // 返回keyList数组
  return keyList;
}
export { firstMenu };
