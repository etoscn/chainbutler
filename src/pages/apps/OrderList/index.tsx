import React, {useRef, useState} from 'react';
import {Avatar, Space} from 'antd';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {getBlockchainType} from "@/services/ant-design-pro/BlockChain";
import {API_URL} from "../../../../config/app";
import {useIntl, useRequest} from 'umi';
import {appMe, appSearchOrder} from "@/services/ant-design-pro/App";


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
  const {data: apps}: { data: API.App[] } = useRequest(() => appMe());
  const intl = useIntl();

  const valueEnum = {}

  apps?.forEach(v => {
    if (v.id) {
      const text = v?.name
      valueEnum[v.id] = {text}
    }
  })


  const columns: ProColumns<API.Tx>[] = [
      {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
      }, {
        title: 'APP',
        dataIndex: 'app_id',
        valueEnum,
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
        title: intl.formatMessage({id: 'app.status'}),
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          failed: {
            text: intl.formatMessage({id: 'app.status.failed'}),
            status: 'Error',
          },
          success: {
            text: intl.formatMessage({id: 'app.status.success'}),
            status: 'Success',
          },
          running: {
            text: intl.formatMessage({id: 'app.status.running'}),
            status: 'Processing',
          },
          waiting: {
            text: intl.formatMessage({id: 'app.status.waiting'}),
            status: 'Processing',
          },
        },
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
        title: intl.formatMessage({id: 'app.order.internal'}),
        dataIndex: 'internal',
        valueType: 'select',
        hideInSearch: true,
        valueEnum: {
          true: {
            status: 'Success',
          },
          false: {
            status: 'Processing',
          },
        },
      },
      {
        title: intl.formatMessage({id: 'app.notify'}),
        dataIndex: 'notify',
        hideInSearch: true,
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
      {
        title: intl.formatMessage({id: 'app.order.description'}),
        dataIndex: 'description',
        ellipsis: true,
        copyable: true,
      },
      {
        title: intl.formatMessage({id: 'app.order.out_trade_no'}),
        dataIndex: 'out_trade_no',
        ellipsis: true,
        copyable: true,
      },
      /* {
        title: '',
        valueType: 'option',
        align: 'right',
        render: (text, record, _, action) => [
          <a href={`${type?.explorer_tx}${record.tx}`} target="_blank" rel="noopener noreferrer" key="explorer">
            {intl.formatMessage({id: 'blockchain.explorer'})}
          </a>
        ],
      }, */
    ]
  ;
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params, sort, filter) => {
        return appSearchOrder({
          current: params.current,
          pageSize: params.pageSize
        }, {...params, blockchain});
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
