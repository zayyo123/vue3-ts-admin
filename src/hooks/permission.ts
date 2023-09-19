import { useStore } from "@/store";
export function usePermission(pageName: string, actions: string) {
  // 使用useStore函数获取store
  const store = useStore();
  // 获取登录的权限列表
  const permissionList = store.state.login.permissionList;
  // 根据页面名称和动作名称拼接权限字符串
  const permission = `system:${pageName}:${actions}`;
  // 根据权限字符串查找是否存在权限列表中
  return!!permissionList.find((item) => item === permission);
}
