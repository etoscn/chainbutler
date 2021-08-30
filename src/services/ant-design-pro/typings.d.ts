// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Address = {
    /** APPID */
    app_id?: number;
    /** 创建时间 */
    created_at?: string;
    /** 以太链 币安 火币 */
    ethereum?: string;
    /** 内部ID */
    id?: number;
    /** 波场链 */
    tron?: string;
    /** 更新时间 */
    updated_at?: string;
  };

  type AddressData = {
    /** 地址数组 */
    data?: Address[];
    /** 是否成功 */
    success?: boolean;
    /** 总数 */
    total?: number;
  };

  type App = {
    /** 回调地址 */
    callback?: string;
    /** 创建时间 */
    created_at?: string;
    /** 以太链 币安 火币 归集地址 */
    ethereum?: string;
    /** 到期时间 */
    expire_at?: string;
    /** 内部ID */
    id?: number;
    /** 名称 */
    name?: string;
    /** 说明 */
    note?: string;
    recharge_address?: AppAddress;
    renewals_address?: AppAddress;
    /** SECRET */
    secret?: string;
    /** 波场汇集地址 */
    tron?: string;
    /** 更新时间 */
    updated_at?: string;
    /** 用户 */
    user_id?: number;
  };

  type AppAddress = {
    ethereum?: string;
    tron?: string;
  };

  type AppData = {
    /** APP数组 */
    data?: App[];
    /** 是否成功 */
    success?: boolean;
    /** 总数 */
    total?: number;
  };

  type AppSign = {
    /** APPID */
    app_id?: number;
    /** SECRET */
    secret?: string;
  };

  type AuditOrder = {
    /** 订单内部ID */
    id: number[];
    /** 是否通过 */
    pass: boolean;
    /** totp密码 */
    totp_password: string;
  };

  type Balance = {
    /** 地址 */
    address?: string;
    /** APPID */
    app_id?: number;
    /** 余额 */
    balance?: string;
    /** 链名称 */
    blockchain?: string;
    /** 链上余额 */
    chain_balance?: string;
    /** 合约 */
    contract?: string;
    /** 创建时间 */
    created_at?: string;
    /** 内部ID */
    id?: number;
    /** 符号 */
    symbol?: string;
    /** 更新时间 */
    updated_at?: string;
  };

  type BalanceData = {
    /** 余额数组 */
    data?: Balance[];
    /** 是否成功 */
    success?: boolean;
    /** 总数 */
    total?: number;
  };

  type BalanceSend = {
    /** 合约 */
    contract?: string;
    /** 描述 */
    description?: string;
    /** 发送着 */
    from: string;
    /** 内部订单号 */
    out_trade_no?: string;
    /** 接收 */
    to: string;
    /** 数量 */
    value: string;
  };

  type BlockChain = {
    /** 名称 链名称 */
    blockchain?: string;
    /** 合约 */
    contract?: string;
    /** 创建时间 */
    created_at?: string;
    /** 精度 */
    decimals?: number;
    /** 浏览器 */
    explorer?: string;
    /** 内部ID */
    id?: number;
    /** 名称 */
    name?: string;
    /** 状态 active有效 abandoned关闭 */
    status?: string;
    /** 符号 */
    symbol?: string;
    /** 类型 */
    type?: string;
    /** 更新时间 */
    updated_at?: string;
  };

  type BlockChainData = {
    /** 符号数组 */
    data?: BlockChain[];
    /** 是否成功 */
    success?: boolean;
    /** 总数 */
    total?: number;
  };

  type BlockChainType = {
    /** 链名称 */
    blockchain?: string;
    /** 创建时间 */
    created_at?: string;
    /** 精度 */
    decimals?: number;
    /** 地址浏览 */
    explorer_address?: string;
    /** 快浏览 */
    explorer_block?: string;
    /** 交易浏览 */
    explorer_tx?: string;
    /** 内部ID */
    id?: number;
    /** 名称 */
    name?: string;
    /** 符号 */
    symbol?: string;
    /** 更新时间 */
    updated_at?: string;
  };

  type BlockChainTypeData = {
    /** 类型数组 */
    data?: BlockChainType[];
    /** 是否成功 */
    success?: boolean;
    /** 总数 */
    total?: number;
  };

  type GoogAuth = {
    secret?: string;
    uri?: string;
  };

  type HTTPError = {
    message?: Record<string, any>;
  };

  type LoginAccount = {
    /** 邮箱 */
    email: string;
    /** 密码 */
    password: string;
  };

  type Order = {
    /** APPID */
    app_id?: number;
    /** 链名称 */
    blockchain?: string;
    /** 合约 */
    contract?: string;
    /** 创建时间 */
    created_at?: string;
    /** 描述 */
    description?: string;
    /** 发送着 */
    from: string;
    /** 内部ID */
    id?: number;
    /** 内部交易 */
    internal?: boolean;
    /** 是否通知 */
    notify?: boolean;
    /** 内部订单号 */
    out_trade_no?: string;
    /** 状态 waiting 等待 running 处理中 failed 失败 success 成功 */
    status?: string;
    /** 符号 */
    symbol?: string;
    /** 接收 */
    to: string;
    /** 更新时间 */
    updated_at?: string;
    /** 数量 */
    value: string;
  };

  type OrderData = {
    /** 订单数组 */
    data?: Order[];
    /** 是否成功 */
    success?: boolean;
    /** 总数 */
    total?: number;
  };

  type ParamAddress = {
    /** APPID */
    app_id?: number;
    /** 以太链 */
    ethereum?: string;
    /** 波场链 */
    tron?: string;
  };

  type ParamApp = {
    /** 回调地址 */
    callback?: string;
    /** 以太链 币安 火币 归集地址 */
    ethereum?: string;
    /** 名称 */
    name?: string;
    /** SECRET 仅用于搜索 */
    secret?: string;
    /** 状态 active有效 abandoned关闭 */
    status?: string;
    /** totp密码 修改是必须提供 */
    totp_password: string;
    /** 波场汇集地址 */
    tron?: string;
  };

  type ParamAppBalance = {
    /** 地址 */
    address?: string;
    /** APPID */
    app_id?: number;
    /** 链名称 */
    blockchain?: string;
    /** 合约 */
    contract?: string;
    /** 符号 */
    symbol?: string;
  };

  type ParamBlockChain = {
    /** 合约 */
    contract?: string;
    /** 状态 active有效 abandoned关闭 */
    status?: string;
    /** 符号 */
    symbol?: string;
    /** 类型 */
    type?: string;
  };

  type ParamExportMnemonic = {
    /** 地址内部ID */
    id: number[];
    /** totp密码 */
    totp_password: string;
  };

  type ParamRechargeBlockchain = {
    /** 地址 */
    address: string;
    /** 余额 */
    balance?: string;
    /** 链名称 */
    blockchain: string;
    /** 合约 */
    contract?: string;
    /** totp密码 */
    totp_password: string;
    /** 充值类型 +、- */
    type: string;
  };

  type ParamSearchBlockchain = {
    /** 链名称 */
    blockchain: string;
    /** 关键词 符号、合约 */
    keywords?: string;
  };

  type ParamTx = {
    /** 合约 */
    contract?: string;
    /** 发送着 */
    from?: string;
    /** 高度 */
    number?: number;
    /** 符号 */
    symbol?: string;
    /** 接收 */
    to?: string;
    /** 哈希 */
    tx?: string;
  };

  type RegisterAccount = {
    /** 邮箱 */
    email: string;
    /** 密码 */
    password: string;
  };

  type SearchOrder = {
    /** APPID */
    app_id?: number;
    /** 链名称 */
    blockchain?: string;
    /** 合约 */
    contract?: string;
    /** 描述 */
    description?: string;
    /** 发送着 */
    from?: string;
    /** 内部订单号 */
    out_trade_no?: string;
    /** Internal    bool   `json:"internal"`     //内部交易 */
    status?: string;
    /** 接收 */
    to?: string;
  };

  type SuccessError = {
    message?: Record<string, any>;
  };

  type Token = {
    expires_at?: string;
    token?: string;
  };

  type TotpBinding = {
    /** 登陆密码 */
    password: string;
    /** Secret */
    secret: string;
    /** totp密码 */
    totp_password: string;
  };

  type Tx = {
    /** APPID */
    app_id?: number;
    /** 链名称 */
    blockchain?: string;
    /** 合约 */
    contract?: string;
    /** 创建时间 */
    created_at?: string;
    /** 发送着 */
    from?: string;
    /** 内部ID */
    id?: number;
    /** 是否通知 */
    notify?: boolean;
    /** 高度 */
    number?: number;
    /** 符号 */
    symbol?: string;
    /** 时间 */
    time?: number;
    /** 接收 */
    to?: string;
    /** 哈希 */
    tx?: string;
    /** 更新时间 */
    updated_at?: string;
    /** 数量 */
    value?: string;
  };

  type TxData = {
    /** 交易数组 */
    data?: Tx[];
    /** 是否成功 */
    success?: boolean;
    /** 总数 */
    total?: number;
  };

  type User = {
    /** 创建时间 */
    created_at?: string;
    /** 邮箱 */
    email?: string;
    /** 邮箱激活时间 */
    email_verified_at?: string;
    /** 内部ID */
    id?: number;
    /** 名称 */
    name?: string;
    /** 密码 */
    password?: string;
    /** 手机号 */
    phone_number?: string;
    /** 手机号码激活时间 */
    phone_number_verified_at?: string;
    security?: { email?: boolean; password?: boolean; phone_number?: boolean; totp?: boolean };
    /** 更新时间 */
    updated_at?: string;
  };

  type WalletSign = {
    /** 签名有效期 */
    expires_at?: string;
    /** 签名 */
    sign?: string;
  };
}
