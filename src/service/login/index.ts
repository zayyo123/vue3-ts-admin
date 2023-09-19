import { zyRequest } from "../index";

import { ResultType } from "../types";
import { AccountLoginType, AccountLoginResultType } from "./types";

enum AccountLoginAPI {
  ACCOUNT_LOGIN = "/login",
  USER_INFO = "/users/",
  USER_MENU = "role/"
}

export function accountLoginRequest(account: AccountLoginType) {
  // 使用zyRequest.post发送post请求，url为AccountLoginAPI.ACCOUNT_LOGIN，data为account对象
  return zyRequest.post<ResultType<AccountLoginResultType>>({
    url: AccountLoginAPI.ACCOUNT_LOGIN,
    data: {
      ...account,
      name: "coderwhy"
    }
  });
}

export function userInfoRequest(id: number) {
  // 使用zyRequest.get发送get请求，url为AccountLoginAPI.USER_INFO + id
  return zyRequest.get<ResultType>({
    url: AccountLoginAPI.USER_INFO + id
  });
}

export function userMenuRequest(id: number) {
  // 使用zyRequest.get发送get请求，url为AccountLoginAPI.USER_MENU + id + "/menu"
  return zyRequest.get<ResultType>({
    url: AccountLoginAPI.USER_MENU + id + "/menu"
  });
}
