import React, {useRef, useState} from 'react';
import {Button, Dropdown, Menu} from 'antd';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {appMe} from "@/services/ant-design-pro/App";
import {useIntl} from 'umi';
import CreateView from './components/CreateView';
import ModifyView from './components/ModifyView';
import type {MenuInfo} from 'rc-menu/lib/interface';
import RenewalsView from './components/RenewalsView';
import RechargeView from './components/RechargeView';

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
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [isModalModifyVisible, setIsModalModifyVisible] = useState(false);


  const [isModalRechargeVisible, setIsModalRechargeVisible] = useState(false);
  const [isModalRenewalsVisible, setIsModalRenewalsVisible] = useState(false);

  const [data, setData] = useState<API.App>();
  const intl = useIntl();


  const columns: ProColumns<API.App>[] = [
    {
      title: 'APP ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'SECRET',
      dataIndex: 'secret',
      ellipsis: true,
      copyable: true,
    },
    {
      title: intl.formatMessage({id: 'blockchain.name'}),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({id: 'app.note'}),
      dataIndex: 'note',
      ellipsis: true,
      copyable: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({id: 'app.ethereum'}),
      dataIndex: 'ethereum',
      ellipsis: true,
      copyable: true,
    }, {
      title: intl.formatMessage({id: 'app.tron'}),
      dataIndex: 'tron',
      ellipsis: true,
      copyable: true,
    },


    {
      title: intl.formatMessage({id: 'app.expire_at'}),
      dataIndex: 'expire_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '',
      valueType: 'option',
      align: 'center',
      render: (text, record, _, action) => [
        <Dropdown key={'option'} overlay={<Menu onClick={(event: MenuInfo) => {
          const {key} = event;
          setData(record)
          switch (key) {
            case 'modify':
              setIsModalModifyVisible(true)
              break;
            case 'recharge':
              setIsModalRechargeVisible(true)
              break;
            case 'renewals':
              setIsModalRenewalsVisible(true)
              break;
            default:
              break;
          }
        }}>
          <Menu.Item key="modify">
            {intl.formatMessage({id: 'app.modify'})}
          </Menu.Item>
          <Menu.Item key="recharge">
            {intl.formatMessage({id: 'app.recharge'})}
          </Menu.Item>
          <Menu.Divider/>
          <Menu.Item key="renewals">{intl.formatMessage({id: 'app.renewals'})}</Menu.Item>
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
          return appMe({
            ...params
          });
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
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
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setIsModalCreateVisible(true)}>
            {intl.formatMessage({id: 'app.create'})}
          </Button>,
        ]}
      />
      <CreateView isModalVisible={isModalCreateVisible} setIsModalVisible={setIsModalCreateVisible}
                  onComplete={() => actionRef.current?.reload()}/>
      <ModifyView data={data} isModalVisible={isModalModifyVisible} setIsModalVisible={setIsModalModifyVisible}
                  onComplete={() => actionRef.current?.reload()}/>

      <RenewalsView data={data} isModalVisible={isModalRenewalsVisible} setIsModalVisible={setIsModalRenewalsVisible}/>
      <RechargeView data={data} isModalVisible={isModalRechargeVisible} setIsModalVisible={setIsModalRechargeVisible}/>
    </>
  );
};
