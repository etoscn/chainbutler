import React, {useState} from 'react';
import {Alert, Col, Form, Input, List, message, Modal, Row} from 'antd';
import {useIntl, useModel} from 'umi';
// @ts-ignore
import QRCode from 'qrcode.react';
import {userBindingTotp, userNewTotp} from '@/services/ant-design-pro/User';

type Unpacked<T> = T extends (infer U)[] ? U : T;

/* const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
};
 */
const SecurityView: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totp, setTotp] = useState<API.GoogAuth>();
  const [form] = Form.useForm();
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState as { currentUser: API.User };
  const intl = useIntl();


  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields()
    setLoading(true)
    userNewTotp().then(res => {
      setTotp(res)
    }).catch(() => {
      setIsModalVisible(false);
    }).finally(() => {
      setLoading(false)
    })

  };

  const onFinish = (values: API.TotpBinding) => {
    setLoading(true)
    userBindingTotp({...values, secret: totp?.secret}).then(res => {
      setIsModalVisible(false);
      setLoading(false)
      message.success('ok');
    }).catch(() => {
      setLoading(false)
      message.error('error');
    })

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getData = () => [
    {
      title: intl.formatMessage({id: 'app.settings.security.password'}),
      //  actions: [<a key="Modify">{intl.formatMessage({id: 'app.settings.security.modify'})}</a>],
    },
    /* {
      title: '密保手机',
      description: `已绑定手机：138****8293`,
      actions: [<a key="Modify">修改</a>],
    },
    {
      title: '密保问题',
      description: '未设置密保问题，密保问题可有效保护账户安全',
      actions: [<a key="Set">设置</a>],
    }, */
    {
      title: intl.formatMessage({id: 'app.settings.basic.email'}),
      description: intl.formatMessage({id: 'app.settings.security.email-description'}),
      // actions: [<a key="Modify">{intl.formatMessage({id: 'app.settings.security.modify'})}</a>],
    },
    {
      title: intl.formatMessage({id: 'app.settings.security.mfa'}),
      description: currentUser.security?.totp ? '' : intl.formatMessage({id: 'app.settings.security.mfa-description'}),
      actions: currentUser.security?.totp ? [] : [<a key="bind"
                                                     onClick={showModal}>{intl.formatMessage({id: 'app.settings.security.bind'})}</a>],
    },
  ];

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description}/>
          </List.Item>
        )}
      />
      <Modal confirmLoading={loading} destroyOnClose title={intl.formatMessage({id: 'app.settings.security.mfa'})}
             visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Row justify='center'>
          <Col><QRCode value={totp?.uri || ''}/></Col>
        </Row>
        <div style={{marginTop: 15, marginBottom: 15}}><Alert
          message={intl.formatMessage({id: 'app.settings.security.alert'})}/></div>
        <Form layout='vertical' form={form} name="control-ref" onFinish={onFinish}>
          <Form.Item name="password" label={intl.formatMessage({id: 'app.settings.security.password'})}
                     rules={[{required: true}]}>
            <Input.Password/>
          </Form.Item>
          <Form.Item name="totp_password" label={intl.formatMessage({id: 'app.settings.security.mfa.password'})}
                     rules={[{required: true}]}>
            <Input.Password/>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default SecurityView;
