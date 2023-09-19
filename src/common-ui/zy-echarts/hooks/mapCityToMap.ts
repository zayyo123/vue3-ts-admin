import geoCoordMap from "../map/city";

export default function (data: any) {
  // 定义一个空数组用于存放结果
  const res = [];
  // 遍历data数组
  for (let i = 0; i < data.length; i++) {
    // 获取data数组中name属性对应的geoCoordMap中的值
    const geoCoord = (geoCoordMap as any)[data[i].name];
    // 如果geoCoord存在
    if (geoCoord) {
      // 将name和value添加到res数组中
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  // 返回res数组
  return res;
}
