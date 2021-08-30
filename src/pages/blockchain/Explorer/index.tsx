import React, {useRef, useState} from 'react';
import {Avatar, Space} from 'antd';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {getBlockchainTx, getBlockchainType} from "@/services/ant-design-pro/BlockChain";
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
  const {data}: { data: API.BlockChainType[] } = useRequest(() => getBlockchainType());
  const intl = useIntl();

  const type = data?.find(v => v.blockchain === blockchain)


  const columns: ProColumns<API.Tx>[] = [
      {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
      },
      {
        title: intl.formatMessage({id: 'blockchain.symbol'}),
        dataIndex: 'symbol',
        render: (dom, record) => (
          <Space>
            <Avatar
              src={`${API_URL}/assets/blockchains/${blockchain}${record.contract ? `/assets/${record.contract}/` : '/info/'}logo.png`}/>
            {record.symbol}
          </Space>
        ),
      },
      /* {
        title: intl.formatMessage({id: 'blockchain.number'}),
        dataIndex: 'number',
        valueType: 'digit'
      }, */
      /* {
        title: intl.formatMessage({id: 'blockchain.time'}),
        dataIndex: 'time',
        hideInSearch: true,
        valueType:'dateTime'
      }, */
      {
        title: intl.formatMessage({id: 'blockchain.hash'}),
        dataIndex: 'tx',
        ellipsis: true,
        copyable: true,
      },
      {
        title: intl.formatMessage({id: 'blockchain.from'}),
        dataIndex: 'from',
        ellipsis: true,
        copyable: true,
      },
      {
        title: intl.formatMessage({id: 'blockchain.to'}),
        dataIndex: 'to',
        ellipsis: true,
        copyable: true,
      },
      {
        title: intl.formatMessage({id: 'blockchain.value'}),
        dataIndex: 'value',
        hideInSearch: true,
        ellipsis: true,
        /* render: (dom, record) => {
           return <Space>
             {convertAmountFromRawNumber(record.value, record.decimal)}
           </Space>
         } */
      }
      ,
      {
        title: intl.formatMessage({id: 'blockchain.contract'}),
        dataIndex: 'contract',
        ellipsis: true,
        copyable: true,
      },
    {
      title: intl.formatMessage({id:'app.notify'}),
      dataIndex: 'notify',
      valueType: 'select',
      valueEnum: {
        true: {
          status: 'Success',
        },
        false: {
          status: 'Processing',
        },
      },
    },

      , {
        title: '',
        valueType: 'option',
        align: 'right',
        render: (text, record, _, action) => [
          <a href={`${type?.explorer_tx}${record.tx}`} target="_blank" rel="noopener noreferrer" key="explorer">
            {intl.formatMessage({id: 'blockchain.explorer'})}
          </a>
        ],
      },
    ]
  ;
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params, sort, filter) => {
        return getBlockchainTx({
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
            actionRef.current?.reset()
          },
        }
      }}

    />
  );
};
