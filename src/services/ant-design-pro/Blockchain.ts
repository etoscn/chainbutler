// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 搜索符号 搜索符号 POST /blockchain/search */
export async function searchBlockChain(
  body: API.ParamSearchBlockchain,
  options?: { [key: string]: any },
) {
  return request<API.BlockChainData[]>('/blockchain/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 浏览交易 浏览交易 POST /blockchain/tx/${param0}/${param1}/${param2} */
export async function getBlockchainTx(
  params: {
    // path
    /** 区块名称 */
    blockchain: 'ethereum' | 'smartchain' | 'tron' | 'heco';
    /** 页吗 */
    current: number;
    /** 总量 max 100 */
    pageSize: number;
  },
  body: API.ParamTx,
  options?: { [key: string]: any },
) {
  const { blockchain: param0, current: param1, pageSize: param2, ...queryParams } = params;
  return request<API.TxData>(`/blockchain/tx/${param0}/${param1}/${param2}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 区块链类型 区块链类型 GET /blockchain/type */
export async function getBlockchainType(options?: { [key: string]: any }) {
  return request<API.BlockChainTypeData>('/blockchain/type', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 区块链符号 区块链符号 POST /blockchain/${param0}/${param1}/${param2} */
export async function getBlockchain(
  params: {
    // path
    /** 区块名称 */
    blockchain: 'ethereum' | 'smartchain' | 'tron' | 'heco';
    /** 页吗 */
    current: number;
    /** 总量 max 100 */
    pageSize: number;
  },
  body: API.ParamBlockChain,
  options?: { [key: string]: any },
) {
  const { blockchain: param0, current: param1, pageSize: param2, ...queryParams } = params;
  return request<API.BlockChainData>(`/blockchain/${param0}/${param1}/${param2}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
