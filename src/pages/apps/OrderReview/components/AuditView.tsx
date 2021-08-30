import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Modal, Space} from 'antd';
import {useIntl} from 'umi';
import {appAuditOrder} from "@/services/ant-design-pro/App";


type P = {
  isModalVisible: boolean
  setIsModalVisible: (b: boolean) => void
  id?: number[]
  onComplete: () => void
}

const AuditView: React.FC<P> = ({id, onComplete, isModalVisible, setIsModalVisible}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const intl = useIntl();


  useEffect(() => {
    form.resetFields()
  }, [isModalVisible]);


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onOverrule = async () => {
    form.validateFields()
      .then(values => {
        setLoading(true)
        appAuditOrder({...values, id, pass: false}).then(() => {
          onComplete()
          message.success('success');
          setIsModalVisible(false);
        }).catch(() => {
          message.error('error');
        }).finally(() => {
          setLoading(false)
        })
      })
      .catch(errorInfo => {

      });

  }
  const onPass = async () => {
    form.validateFields()
      .then(values => {
        setLoading(true)
        appAuditOrder({...values, id, pass: true}).then(() => {
          onComplete()
          message.success('success');
          setIsModalVisible(false);
        }).catch(() => {
          message.error('error');
        }).finally(() => {
          setLoading(false)
        })
      })
      .catch(errorInfo => {

      });
  }

  return <Modal confirmLoading={loading} title={intl.formatMessage({id: 'app.order.audit'})}
                visible={isModalVisible}
                footer={<Space>
                  <Button type="primary" onClick={onOverrule}
                          danger>{intl.formatMessage({id: 'app.order.audit.overrule'})}</Button>
                  <Button type="primary" onClick={onPass}>{intl.formatMessage({id: 'app.order.audit.pass'})}</Button>
                </Space>} onCancel={handleCancel}>
    <Form layout='vertical' form={form} name="control-ref">


      <Form.Item name="totp_password" label={intl.formatMessage({id: 'app.settings.security.mfa.password'})}
                 rules={[{required: true}]}>
        <Input.Password/>
      </Form.Item>
    </Form>
  </Modal>
}

export default AuditView;
