//时间戳
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
export function formatUtcToData(data: string, formatString: string): string {
  // 将传入的 data 字符串转换为 dayjs 对象，使用了 dayjs.utc(data) 方法，并将其转换为 UTC 时间。
  // 使用 utcOffset(8) 方法将 UTC 时间转换为 GMT+8 时区的时间。其中 8 代表时差，这里指的是 GMT+8。
  // 使用 format(formatString) 方法将时间对象按照指定的格式输出。formatString 是一个字符串参数，它定义了时间的格式，例如 "YYYY-MM-DD" 表示输出年月日。
  return dayjs.utc(data).utcOffset(8).format(formatString);
}
