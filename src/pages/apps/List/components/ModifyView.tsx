import React, {useEffect, useState} from 'react';
import {Form, Input, message, Modal} from 'antd';
import {useIntl} from 'umi';
import {appUpdate} from '@/services/ant-design-pro/App';

type P = {
  onComplete: () => void
  isModalVisible: boolean
  setIsModalVisible: (b: boolean) => void
  data?: API.App
}

const ModifyView: React.FC<P> = ({data, onComplete, isModalVisible, setIsModalVisible}) => {
  const [loading, setLoading] = useState(false);

  const intl = useIntl();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({...data, totp_password: ''})
  }, [data, isModalVisible]);

  const onFinish = async (values: API.ParamApp) => {
    setLoading(true)
    try {
      await appUpdate({id: data?.id}, values)
      message.success('success');
      setIsModalVisible(false);
      onComplete()
    } catch (error) {
      message.error('error');
    } finally {
      setLoading(false)
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return <Modal confirmLoading={loading} destroyOnClose title={intl.formatMessage({id: 'app.modify'})}
                visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
    <Form layout='vertical' form={form} name="control-ref" onFinish={onFinish}>
      <Form.Item name="name" label={intl.formatMessage({id: 'app.name'})} rules={[{required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item name="ethereum" label={intl.formatMessage({id: 'app.ethereum'})} help="ethereum、smartchain、heco">
        <Input/>
      </Form.Item>
      <Form.Item name="tron" label={intl.formatMessage({id: 'app.tron'})}>
        <Input/>
      </Form.Item>
      <Form.Item name="callback" label={intl.formatMessage({id: 'app.callback.url'})} help={intl.formatMessage({id: 'app.callback.url.help'})}>
        <Input/>
      </Form.Item>
      <Form.Item name="totp_password" label={intl.formatMessage({id: 'app.settings.security.mfa.password'})}
                 rules={[{required: true}]}>
        <Input.Password/>
      </Form.Item>

    </Form>
  </Modal>
}

export default ModifyView;
