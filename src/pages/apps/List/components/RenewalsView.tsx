import React, {useEffect, useState} from 'react';
import {Alert, Col, InputNumber, Modal, Radio, Row, Typography} from 'antd';
import {useIntl} from 'umi';
// @ts-ignore
import QRCode from 'qrcode.react';
import currency from 'currency.js';
import configprice from '../../../../../config/price.json';
import {API_URL} from "../../../../../config/app";

const {Paragraph, Title} = Typography;

type P = {
  isModalVisible: boolean
  setIsModalVisible: (b: boolean) => void
  data?: API.App
}

const RenewalsView: React.FC<P> = ({data, isModalVisible, setIsModalVisible}) => {
  const [value, setValue] = useState<string>('');
  const [type, setType] = useState<string>('tron');
  const [moon, setMoon] = useState<number>(1);
  const [price, setPrice] = useState<{ price: number, discount: number, symbol: string }>(configprice);

  const intl = useIntl();


  useEffect(() => {
    if (data?.renewals_address) {
      switch (type) {
        case 'tron':
          data?.renewals_address?.tron && setValue(data?.renewals_address?.tron)
          break
        default:
          data?.renewals_address?.ethereum && setValue(data?.renewals_address.ethereum)

      }
    }

  }, [type, data]);
  useEffect(() => {
    setMoon(12)
    isModalVisible && fetch(
      `${API_URL}/assets/price.json`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setPrice(responseJson)
      })
      .catch((error) => {

      });

  }, [data, isModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSizeChange = e => {
    setType(e.target.value);
  };

  const amount = currency(price.price).multiply(moon).multiply(price.discount)

  return <Modal destroyOnClose title={intl.formatMessage({id: 'app.renewals'})} visible={isModalVisible}
                onOk={handleCancel} onCancel={handleCancel}>

    <Row justify='center'>
      <Col>
        <div style={{marginTop: 15, marginBottom: 15, textAlign: 'center'}}>
          <Title level={4}>{price.symbol} {parseFloat(amount.toString()).toString()}</Title>
        </div>
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
    <div style={{marginTop: 15, marginBottom: 15, textAlign: 'center'}}>
      <InputNumber min={1} value={moon} onChange={setMoon}/> {intl.formatMessage({id: 'app.moon'})}
    </div>
    <div style={{marginTop: 15, textAlign: 'center'}}>
      <Alert
        message={intl.formatMessage({id: 'app.renewals.alert'})}/></div>

  </Modal>
}

export default RenewalsView;
