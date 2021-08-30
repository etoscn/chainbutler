import React, {useEffect} from 'react';
import {Form, Input, Modal} from 'antd';
import {useIntl} from 'umi';

type P = {
  onFinish: (values: { totp_password: string }) => void
  isModalVisible: boolean
  setIsModalVisible: (b: boolean) => void
  loading: boolean
}

const TotpPassword: React.FC<P> = ({loading, onFinish, isModalVisible, setIsModalVisible}) => {


  const intl = useIntl();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields()
  }, [isModalVisible]);


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return <Modal confirmLoading={loading} destroyOnClose title='Authenticator' visible={isModalVisible}
                onOk={form.submit} onCancel={handleCancel}>

    <Form layout='vertical' form={form} name="control-ref" onFinish={onFinish}>

      <Form.Item name="totp_password" label={intl.formatMessage({id: 'app.settings.security.mfa.password'})}
                 rules={[{required: true}]}>
        <Input.Password/>
      </Form.Item>

    </Form>
  </Modal>
}

export default TotpPassword;
