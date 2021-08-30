import React, {useEffect, useState} from 'react';
import {Form, Input, message, Modal, Radio, Select} from 'antd';
import {useIntl} from 'umi';
import {getBlockchainType, searchBlockChain} from "@/services/ant-design-pro/Blockchain";
import {strHide} from "@/utils/util";
import {appAddressRecharge} from "@/services/ant-design-pro/App";


type P = {
  isModalVisible: boolean
  setIsModalVisible: (b: boolean) => void
  data?: API.App
}

const RechargeView: React.FC<P> = ({data, isModalVisible, setIsModalVisible}) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [blockchain, setBlockchain] = useState('ethereum');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('+');
  const [keywords, setKeywords] = useState('');
  const [types, setTypes] = useState<API.BlockChainType[]>([]);
  const [contract, setContract] = useState<{ label: string, value: string }[]>([]);
  const [form] = Form.useForm();

  const intl = useIntl();

  useEffect(() => {
    getBlockchainType().then(({data}) => {
      setTypes(data)
    })
  }, []);

  useEffect(() => {
    switch (blockchain) {
      case 'tron':
        setAddress(data?.tron || '')
        break
      default:
        setAddress(data?.ethereum || '')
    }
  }, [data, blockchain]);

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue({blockchain})
  }, [isModalVisible]);

  useEffect(() => {
    const time = setTimeout(() => {
      setContract([])
      setFetching(true)
      searchBlockChain({keywords, blockchain}).then(({data}) => {
        if (data?.length) {
          const val = data?.map(v => {
            const label = v.name + ' ' + strHide(v.contract, 8, 8)
            const value = v.contract
            return {label, value}
          })
          setContract(val)
        }
      }).finally(() => {
        setFetching(false)
      })
    }, 500)
    return () => clearTimeout(time)
  }, [keywords, blockchain]);

  const onFinish = async (val: API.ParamRechargeBlockchain) => {
    setLoading(true)
    try {
      await appAddressRecharge({...val, blockchain, address, type})
      message.success('success');
      setIsModalVisible(false);
    } catch (e) {
      message.error('error');
    } finally {
      setLoading(false)
    }

  }
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSearch = (keywords: string) => {
    setKeywords(keywords)
  }


  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return <Modal confirmLoading={loading} title={intl.formatMessage({id: 'app.address.recharge'})}
                visible={isModalVisible}
                onOk={form.submit} onCancel={handleCancel}>
    <Form layout='vertical' form={form} name="control-ref" onFinish={onFinish}>

      <Form.Item
        name="address"
        label={intl.formatMessage({id: 'balance.address'})}
      >
        {address}
      </Form.Item>
      <Form.Item name="blockchain" label={intl.formatMessage({id: 'menu.blockchain'})} rules={[{required: true}]}>
        <Radio.Group onChange={(e) => {
          setBlockchain(e.target.value)
          form.setFieldsValue({blockchain: e.target.value, contract: ''})
          setContract([])
        }}>
          {types.map(v => <Radio.Button key={v.id} value={v.blockchain}>{v.name}</Radio.Button>)}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="contract"
        label={intl.formatMessage({id: 'balance.contract'})}
      >
        <Select loading={fetching} onSearch={onSearch} showSearch options={contract} filterOption={false}/>
      </Form.Item>
      <Form.Item
        name="balance"
        rules={[{required: true}]}
        label={intl.formatMessage({id: 'balance.balance'})}
      >
        <Input
          addonBefore={<Form.Item name="type" noStyle>
            <Select style={{width: 70}} value={type} defaultValue={type} onChange={(value) => setType(value)}>
              <Select.Option value="+">+</Select.Option>
              <Select.Option value="-">-</Select.Option>
            </Select>
          </Form.Item>}/>
      </Form.Item>
      <Form.Item name="totp_password" label={intl.formatMessage({id: 'app.settings.security.mfa.password'})}
                 rules={[{required: true}]}>
        <Input.Password/>
      </Form.Item>
    </Form>
  </Modal>
}

export default RechargeView;
