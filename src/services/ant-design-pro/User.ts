// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 个人信息 个人信息 GET /user/me */
export async function userMe(options?: { [key: string]: any }) {
  return request<API.User>('/user/me', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取TOTP 获取TOTP GET /user/totp */
export async function userNewTotp(options?: { [key: string]: any }) {
  return request<API.GoogAuth>('/user/totp', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 绑定TOTP 绑定TOTP 不支持重复绑定和挂失 POST /user/totp */
export async function userBindingTotp(body: API.TotpBinding, options?: { [key: string]: any }) {
  return request<API.SuccessError>('/user/totp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
