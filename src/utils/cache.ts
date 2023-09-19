// 本地缓存
// 定义一个LocalCache类
class LocalCache {
  // 将键值对存入本地存储
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  // 从本地存储中获取键值对
  getCache(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  // 删除本地存储中的键值对
  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }
  // 清空本地存储
  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
