import type {FC} from 'react';
import React, {useState} from 'react';
import {Button, Form, Input, message, Popover, Progress,} from 'antd';
import type {Store} from 'antd/es/form/interface';
import {history, Link, useIntl} from 'umi';


import styles from './style.less';
import {SelectLang} from "@@/plugin-locale/SelectLang";
import Footer from "@/components/Footer";
import {authRegister} from '@/services/ant-design-pro/Auth';
import {useRequest} from "@@/plugin-request/request";

const FormItem = Form.Item;


const Register: FC = () => {
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  const [form] = Form.useForm();
  const intl = useIntl();

  const passwordStatusMap = {
    ok: (
      <div className={styles.success}>
        <span>{intl.formatMessage({id: 'app.settings.security.strong'})}</span>
      </div>
    ),
    pass: (
      <div className={styles.warning}>
        <span>{intl.formatMessage({id: 'app.settings.security.medium'})}</span>
      </div>
    ),
    poor: (
      <div className={styles.error}>
        <span>{intl.formatMessage({id: 'app.settings.security.weak'})}</span>
      </div>
    ),
  };

  const passwordProgressMap: {
    ok: 'success';
    pass: 'normal';
    poor: 'exception';
  } = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
  };


  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const {loading: submitting, run: register} = useRequest<{ data: API.RegisterAccount }>(authRegister, {
    manual: true,
    onSuccess: (data, params) => {
      message.success('注册成功！');
      history.push({
        pathname: '/user/registerresult',
        state: {
          account: params.email,
        },
      });
    },
    onError: () => {
      message.error('登录失败，请重试！');
    }
  });
  const onFinish = (values: Store) => {
    register(values);
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };


  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
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
          <h3>注册</h3>
          <Form form={form} name="UserRegister" onFinish={onFinish}>
            <FormItem
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱地址!',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误!',
                },
              ]}
            >
              <Input size="large" placeholder="邮箱"/>
            </FormItem>
            <Popover
              getPopupContainer={(node) => {
                if (node && node.parentNode) {
                  return node.parentNode as HTMLElement;
                }
                return node;
              }}
              content={
                visible && (
                  <div style={{padding: '4px 0'}}>
                    {passwordStatusMap[getPasswordStatus()]}
                    {renderPasswordProgress()}
                    <div style={{marginTop: 10}}>
                      <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                    </div>
                  </div>
                )
              }
              overlayStyle={{width: 240}}
              placement="right"
              visible={visible}
            >
              <FormItem
                name="password"
                className={
                  form.getFieldValue('password') &&
                  form.getFieldValue('password').length > 0 &&
                  styles.password
                }
                rules={[
                  {
                    validator: checkPassword,
                  },
                ]}
              >
                <Input size="large" type="password" placeholder="至少6位密码，区分大小写"/>
              </FormItem>
            </Popover>
            <FormItem
              name="confirm"
              rules={[
                {
                  required: true,
                  message: '确认密码',
                },
                {
                  validator: checkConfirm,
                },
              ]}
            >
              <Input size="large" type="password" placeholder="确认密码"/>
            </FormItem>

            <FormItem>
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                <span>注册</span>
              </Button>
              <Link className={styles.login} to="/user/login">
                <span>使用已有账户登录</span>
              </Link>
            </FormItem>
          </Form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
