// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 地址充值 地址充值 POST /app/address/recharge */
export async function appAddressRecharge(
  body: API.ParamRechargeBlockchain,
  options?: { [key: string]: any },
) {
  return request<API.SuccessError>('/app/address/recharge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询地址 查询地址 POST /app/address/${param0}/${param1} */
export async function appAddress(
  params: {
    // path
    /** 页吗 */
    current: number;
    /** 总量 max 100 */
    pageSize: number;
  },
  body: API.ParamAddress,
  options?: { [key: string]: any },
) {
  const { current: param0, pageSize: param1, ...queryParams } = params;
  return request<API.AddressData>(`/app/address/${param0}/${param1}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取余额 获取余额 POST /app/balance/${param0}/${param1} */
export async function appBalance(
  params: {
    // path
    /** 页吗 */
    current: number;
    /** 总量 max 100 */
    pageSize: number;
  },
  body: API.ParamAppBalance,
  options?: { [key: string]: any },
) {
  const { current: param0, pageSize: param1, ...queryParams } = params;
  return request<API.BalanceData>(`/app/balance/${param0}/${param1}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 创建APP 创建APP POST /app/create */
export async function appCreate(body: API.ParamApp, options?: { [key: string]: any }) {
  return request<API.AppData>('/app/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出助记词 导出助记词 POST /app/export/mnemonic */
export async function appExportMnemonic(
  body: API.ParamExportMnemonic,
  options?: { [key: string]: any },
) {
  return request<any>('/app/export/mnemonic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 我的APP 我的APP POST /app/me */
export async function appMe(body: API.ParamApp, options?: { [key: string]: any }) {
  return request<API.AppData>('/app/me', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审核订单 审核订单 POST /app/order/audit */
export async function appAuditOrder(body: API.AuditOrder, options?: { [key: string]: any }) {
  return request<API.SuccessError>('/app/order/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索订单 搜索订单 POST /app/order/${param0}/${param1} */
export async function appSearchOrder(
  params: {
    // path
    /** 页吗 */
    current: number;
    /** 总量 max 100 */
    pageSize: number;
  },
  body: API.SearchOrder,
  options?: { [key: string]: any },
) {
  const { current: param0, pageSize: param1, ...queryParams } = params;
  return request<API.OrderData>(`/app/order/${param0}/${param1}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 修改APP 修改APP POST /app/update/${param0} */
export async function appUpdate(
  params: {
    // path
    /** ID */
    id: number;
  },
  body: API.ParamApp,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AppData>(`/app/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
