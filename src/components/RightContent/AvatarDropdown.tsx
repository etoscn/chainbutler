import React, {useCallback} from 'react';
import {LogoutOutlined, SettingOutlined} from '@ant-design/icons';
import {Menu, Spin} from 'antd';
import {history, useIntl, useModel} from 'umi';
import storage from "localforage";
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

import type {MenuInfo} from 'rc-menu/lib/interface';
import {TOKEN_NAME} from '../../../config/app';


export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await storage.removeItem(TOKEN_NAME);
  history.replace({
    pathname: '/user/login'
  });
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({menu}) => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const intl = useIntl();
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const {key} = event;
      if (key === 'logout') {
        setInitialState((s) => ({...s, currentUser: undefined}));
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );


  if (!initialState) {
    return loading;
  }

  const {currentUser} = initialState;

  if (!currentUser || !currentUser?.id) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>

      {/* <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
 */}
      <Menu.Item key="settings">
        <SettingOutlined/>
        {intl.formatMessage({id: 'menu.account.settings'})}
      </Menu.Item>

      <Menu.Divider/>

      <Menu.Item key="logout">
        <LogoutOutlined/>
        {intl.formatMessage({id: 'menu.account.logout'})}
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
       {/* <Avatar size="small" className={styles.avatar} src={currentUser?.avatar} alt="avatar" /> */}
        <span className={`${styles.name} anticon`}>{currentUser?.name || currentUser.email}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
