import React, {useEffect, useState} from 'react';
import {Alert, Col, Modal, Radio, Row, Typography} from 'antd';
import {useIntl} from 'umi';
// @ts-ignore
import QRCode from 'qrcode.react';

const {Paragraph, Title} = Typography;

type P = {
  isModalVisible: boolean
  setIsModalVisible: (b: boolean) => void
  data?: API.App
}

const RechargeView: React.FC<P> = ({data, isModalVisible, setIsModalVisible}) => {
  const [value, setValue] = useState<string>('');
  const [type, setType] = useState<string>('tron');


  const intl = useIntl();


  useEffect(() => {
    if (data?.recharge_address) {
      switch (type) {
        case 'tron':
          data?.recharge_address?.tron && setValue(data?.recharge_address?.tron)
          break
        default:
          data?.recharge_address?.ethereum && setValue(data?.recharge_address.ethereum)

      }
    }

  }, [type, data]);


  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSizeChange = e => {
    setType(e.target.value);
  };


  return <Modal destroyOnClose title={intl.formatMessage({id: 'app.recharge'})} visible={isModalVisible}
                onOk={handleCancel} onCancel={handleCancel}>

    <Row justify='center'>
      <Col>
        <QRCode value={value} size={200}/>
      </Col>
    </Row>
    <div style={{marginTop: 15, marginBottom: 15, textAlign: 'center'}}>

      <Radio.Group value={type} onChange={handleSizeChange}>
        <Radio.Button value="ethereum">Ethereum</Radio.Button>
        <Radio.Button value="smartchain">Smart Chain</Radio.Button>
        <Radio.Button value="heco">Heco</Radio.Button>
        <Radio.Button value="tron">Tron</Radio.Button>
      </Radio.Group>
    </div>
    <div style={{marginTop: 15, marginBottom: 15, textAlign: 'center'}}>
      <Paragraph copyable>{value}</Paragraph>
    </div>

    <div style={{marginTop: 15, textAlign: 'center'}}>
      <Alert
        message={intl.formatMessage({id: 'app.recharge.alert'})}/></div>

  </Modal>
}

export default RechargeView;
