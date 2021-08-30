import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
import type {RunTimeLayoutConfig} from 'umi';
import {history, Link} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {LinkOutlined} from '@ant-design/icons';
import type {RequestConfig} from "@@/plugin-request/request";
import type {RequestOptionsInit} from "umi-request";

import storage from "localforage";
import {API_URL, TOKEN_NAME} from "../config/app";
import {userMe} from "@/services/ant-design-pro/User";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registerPath = '/user/register';
const registerresultPath = '/user/registerresult';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserInfo;
  fetchUserInfo?: () => Promise<API.UserInfo | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await userMe();
      return msg;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath && history.location.pathname !== registerPath && history.location.pathname !== registerresultPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath && history.location.pathname !== registerPath && history.location.pathname !== registerresultPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        <Link to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
        /* <Link to="/~docs">
          <BookOutlined />
          <span>业务组件文档</span>
        </Link>, */
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
const errorHandler = (error: any) => {
  throw error;
};


const authHeaderInterceptor = async (url: string, options: RequestOptionsInit) => {
  const data = await storage.getItem(TOKEN_NAME) as string | null
  const token = data ? JSON.parse(data) : undefined as API.Token | undefined
  const authHeader = token ? {Authorization: `Bearer ${token?.token}`} : {};
  return {
    url: `${API_URL}${url}`,
    options: {...options, interceptors: true, headers: authHeader},
  };
};
export const request: RequestConfig = {
  errorHandler,
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authHeaderInterceptor],
};
