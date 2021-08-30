import { Settings as LayoutSettings } from '@ant-design/pro-layout';
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Chain Butler',
  pwa: false,
  logo: '/logo.svg',
  iconfontUrl: '',
};

export default Settings;
