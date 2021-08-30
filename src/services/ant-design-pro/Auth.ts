// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取令牌 获取令牌 POST /auth/login */
export async function authLogin(body: API.LoginAccount, options?: { [key: string]: any }) {
  return request<API.Token>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册 注册 POST /auth/register */
export async function authRegister(body: API.RegisterAccount, options?: { [key: string]: any }) {
  return request<API.User>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
