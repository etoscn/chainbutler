import React, {useRef, useState} from 'react';
import {Avatar, Badge, Space} from 'antd';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {getBlockchain, getBlockchainType} from "@/services/ant-design-pro/BlockChain";
import {API_URL} from "../../../../config/app";
import {useIntl, useRequest} from 'umi';


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
  const [blockchain, setBlockchain] = useState<string>('ethereum');
  const {data} = useRequest(() => getBlockchainType());
  const intl = useIntl();

  const columns: ProColumns<API.BlockChain>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: intl.formatMessage({id: 'blockchain.name'}),
      dataIndex: 'name',
      hideInSearch: true,
      render: (dom, record) => (
        <Space>
          <Avatar
            src={`${API_URL}/assets/blockchains/${record.blockchain}${record.contract ? `/assets/${record.contract}/` : '/info/'}logo.png`}/>
          {record.name}
        </Space>
      ),
    },
    {
      title: intl.formatMessage({id: 'blockchain.symbol'}),
      dataIndex: 'symbol',
      filters: true,
      onFilter: true,
    },
    {
      title: intl.formatMessage({id: 'blockchain.decimals'}),
      dataIndex: 'decimals',
      filters: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({id: 'blockchain.type'}),
      dataIndex: 'type',
      filters: true,
      onFilter: true,
    },
    {
      title: intl.formatMessage({id: 'blockchain.active'}),
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      valueEnum: {
        active: {text: intl.formatMessage({id: 'blockchain.online'}), status: 'Success'},
        abandoned: {text: intl.formatMessage({id: 'blockchain.off'}), status: 'Error'},
      },
    },
    {
      title: intl.formatMessage({id: 'blockchain.contract'}),
      dataIndex: 'contract',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '',
      valueType: 'option',
      align: 'right',
      render: (text, record, _, action) => [
        <a href={record.explorer} target="_blank" rel="noopener noreferrer" key="explorer">
          {intl.formatMessage({id: 'blockchain.explorer'})}
        </a>
      ],
    },
  ];
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        return getBlockchain({
          blockchain,
          current: params.current,
          pageSize: params.pageSize
        }, {...params});
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
      toolbar={{
        menu: {
          type: 'tab',
          activeKey: blockchain,
          // @ts-ignore
          items: data?.map((v: API.BlockChainType) => {
            return {
              key: v.blockchain,
              label: <span>{v.name}</span>,
            }
          }),
          onChange: (key) => {
            setBlockchain(key as string);
            actionRef.current?.reload()
          },
        }
      }}

    />
  );
};
