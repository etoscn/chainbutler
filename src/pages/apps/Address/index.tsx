import React, {useRef, useState} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {useIntl, useRequest} from 'umi';
import {appAddress, appExportMnemonic, appMe} from '@/services/ant-design-pro/App';
import {Dropdown, Menu, message, Space, Table} from 'antd';
import TotpPassword from '@/components/TotpPassword';
import {MenuInfo} from "rc-menu/lib/interface";
import RechargeView from "./components/RechargeView";

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};


export default () => {
  const actionRef = useRef<ActionType>();
  const {data}: { data: API.App[] } = useRequest(() => appMe());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<number[]>([]);
  const [address, setAddress] = useState<API.Address>();
  const [isModalRechargeVisible, setIsModalRechargeVisible] = useState(false);
  const intl = useIntl();


  const valueEnum = {}

  data?.forEach(v => {
    if (v.id) {
      const text = v?.name
      valueEnum[v.id] = {text}
    }
  })

  const onFinish = (values: { totp_password: string }) => {
    setLoading(true)
    appExportMnemonic({id, totp_password: values.totp_password}, {responseType: 'blob'}).then(blob => {
      message.success('success');
      const href = window.URL.createObjectURL(blob)
      window.open(href, "_top");
      setIsModalVisible(false)
    }).catch(() => {
      message.error('error');
    }).finally(() => {
      setLoading(false)
    })
  }


  const columns: ProColumns<API.App>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'APP',
      dataIndex: 'app_id',
      valueEnum,
    },
    {
      title: intl.formatMessage({id: 'address.ethereum'}),
      dataIndex: 'ethereum',
      ellipsis: true,
      copyable: true,
    }, {
      title: intl.formatMessage({id: 'address.tron'}),
      dataIndex: 'tron',
      ellipsis: true,
      copyable: true,
    }, {
      title: '',
      valueType: 'option',
      align: 'center',
      render: (text, record, _, action) => [
        <Dropdown key={'option'} overlay={<Menu onClick={(event: MenuInfo) => {
          const {key} = event;
          setAddress(record)
          switch (key) {
            case 'recharge':
              setIsModalRechargeVisible(true)
              break;
            default:

          }

        }}>
          <Menu.Item key="recharge">
            {intl.formatMessage({id: 'app.address.recharge'})}
          </Menu.Item>

        </Menu>} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {intl.formatMessage({id: 'pages.searchTable.titleOption'})}
          </a>
        </Dropdown>
      ],
    },
  ];
  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return appAddress({
            current: params.current,
            pageSize: params.pageSize
          }, {...params, app_id: Number(params?.app_id)});
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertRender={({selectedRowKeys, selectedRows, onCleanSelected}) => (
          <Space size={24}>
          <span>
            {intl.formatMessage({id: 'selected'})} {selectedRowKeys.length}
            <a style={{marginLeft: 8}} onClick={onCleanSelected}>
            {intl.formatMessage({id: 'cleanselected'})}
            </a>
          </span>
          </Space>
        )}
        tableAlertOptionRender={({selectedRows}) => {
          const id = selectedRows.map(v => v.id)

          return (
            <Space size={16}>
              <a onClick={() => {
                setId(id)
                setIsModalVisible(true)
              }}>{intl.formatMessage({id: 'address.export.mnemonic'})}</a>
            </Space>
          );
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
      />
      <TotpPassword loading={loading} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                    onFinish={onFinish}/>
      <RechargeView data={address} isModalVisible={isModalRechargeVisible}
                    setIsModalVisible={setIsModalRechargeVisible} />
    </>
  );
};
