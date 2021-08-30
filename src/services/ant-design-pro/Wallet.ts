// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取地址 获取地址 GET /wallet/address */
export async function walletAddress(
  params: {
    // header
    /** 签名 */
    sign: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Address>('/wallet/address', {
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 查看余额 查看余额 GET /wallet/balance/view/${param0}/${param1} */
export async function walletViewBalance(
  params: {
    // query
    /** 合约 */
    contract?: string;
    // header
    /** 签名 */
    sign: string;
    // path
    /** 区块名称 */
    blockchain: 'ethereum' | 'smartchain' | 'tron' | 'heco';
    /** 地址 */
    address: string;
  },
  options?: { [key: string]: any },
) {
  const { blockchain: param0, address: param1, ...queryParams } = params;
  return request<API.Balance>(`/wallet/balance/view/${param0}/${param1}`, {
    method: 'GET',
    headers: {},
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 获取余额批量 获取余额批量 GET /wallet/balance/${param0}/${param1} */
export async function walletAddressBalance(
  params: {
    // header
    /** 签名 */
    sign: string;
    // path
    /** 区块名称 */
    blockchain: 'ethereum' | 'smartchain' | 'tron' | 'heco';
    /** 地址 */
    address: string;
  },
  options?: { [key: string]: any },
) {
  const { blockchain: param0, address: param1, ...queryParams } = params;
  return request<API.BalanceData>(`/wallet/balance/${param0}/${param1}`, {
    method: 'GET',
    headers: {},
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 发送余额 发送余额 POST /wallet/send/${param0} */
export async function walletSendBalance(
  params: {
    // header
    /** 签名 */
    sign: string;
    // path
    /** 区块名称 */
    blockchain: 'ethereum' | 'smartchain' | 'tron' | 'heco';
  },
  body: API.BalanceSend,
  options?: { [key: string]: any },
) {
  const { blockchain: param0, ...queryParams } = params;
  return request<API.Order>(`/wallet/send/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取签名 获取签名 此方法仅测试使用 为了提高效率建议离线签名
离线签名
{
"alg": "HS512",
"typ": "JWT"
}.{
"app_id": int,
"exp": int
}.[secret Signature] POST /wallet/sign */
export async function walletSign(body: API.AppSign, options?: { [key: string]: any }) {
  return request<API.WalletSign>('/wallet/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
