import {LockOutlined, MailTwoTone,} from '@ant-design/icons';
import {message} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormText} from '@ant-design/pro-form';
import {FormattedMessage, history, Link, SelectLang, useIntl, useModel} from 'umi';
import Footer from '@/components/Footer';
import storage from "localforage";
import styles from './index.less';
import {TOKEN_NAME} from "../../../../config/app";
import {authLogin} from "@/services/ant-design-pro/Auth";


const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<string>('email');
  const {initialState, setInitialState} = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginAccount) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await authLogin({...values});

      const token = JSON.stringify(msg)
      await storage.setItem(TOKEN_NAME, token)
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.login.success',
        defaultMessage: '登录成功！',
      });
      message.success(defaultLoginSuccessMessage);
      await fetchUserInfo();
      if (!history) return;
      const {query} = history.location;
      const {redirect} = query as { redirect: string };
      history.push(redirect || '/');
      return;
      /* if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /!** 此方法会跳转到 redirect 参数所在的位置 *!/
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as { redirect: string };
        history.push(redirect || '/');
        return;
      } */
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });

      message.error(defaultLoginFailureMessage);
    }
    setSubmitting(false);
  };


  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang/>}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg"/>
              <span className={styles.title}>Chain Butler</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.RequestLogin);
            }}
          >


            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailTwoTone className={styles.prefixIcon}/>,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.email.placeholder',
                  defaultMessage: '邮箱',
                })}
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: (
                      <FormattedMessage
                        id="pages.login.email.required"
                        defaultMessage="请输入邮箱"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>


            <div
              style={{
                marginBottom: 24,
              }}
            >
              {/* <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/>
              </ProFormCheckbox> */}
              <Link to="/user/register">
                <FormattedMessage id="pages.login.registerAccount" defaultMessage="注册账号"/>
              </Link>
              <Link to="/user/forgot"
                    style={{
                      float: 'right',
                    }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
              </Link>
            </div>
          </ProForm>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
