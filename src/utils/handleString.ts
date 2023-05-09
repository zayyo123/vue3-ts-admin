// 该函数的功能是将 letter 字符串的第一个字符转换为大写字母，然后返回结果
export function firstCapitalLetter(letter: string): string {
  // 使用 slice(0, 1) 方法获取 letter 字符串的第一个字符
  // 使用 toUpperCase() 方法将该字符转换为大写字母。
  // 使用 slice(1) 方法获取 letter 字符串除第一个字符以外的部分
  // 将步骤2和步骤3的结果进行字符串拼接，返回最终的字符串结果。
  return letter.slice(0, 1).toUpperCase() + letter.slice(1);
}
