import React, {useEffect, useState} from 'react';
import {Form, Input, message, Modal} from 'antd';
import {useIntl} from 'umi';
import {appCreate} from '@/services/ant-design-pro/App';

type P = {
  onComplete: () => void
  isModalVisible: boolean
  setIsModalVisible: (b: boolean) => void
}

const CreateView: React.FC<P> = ({onComplete, isModalVisible, setIsModalVisible}) => {
  const [loading, setLoading] = useState(false);

  const intl = useIntl();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields()
  }, [isModalVisible]);

  const onFinish = async (values: API.ParamApp) => {
    setLoading(true)
    try {
      await appCreate(values)
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

  return <Modal confirmLoading={loading} title={intl.formatMessage({id: 'app.create'})}
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

    </Form>
  </Modal>
}

export default CreateView;
