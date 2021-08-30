import React, {useRef} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {useIntl, useRequest} from 'umi';
import {appBalance, appMe} from '@/services/ant-design-pro/App';

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

  const intl = useIntl();


  const valueEnum = {}

  data?.forEach(v => {
    if (v.id) {
      const text = v?.name
      valueEnum[v.id] = {text}
    }
  })


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
      title: intl.formatMessage({id: 'balance.address'}),
      dataIndex: 'address',
      ellipsis: true,
      copyable: true,
    }, {
      title: intl.formatMessage({id: 'balance.chain_balance'}),
      dataIndex: 'chain_balance',
      hideInSearch: true
    },
    {
      title: intl.formatMessage({id: 'balance.balance'}),
      dataIndex: 'balance',
      hideInSearch: true
    }
    , {
      title: intl.formatMessage({id: 'balance.symbol'}),
      dataIndex: 'symbol',
    }

    , {
      title: intl.formatMessage({id: 'balance.contract'}),
      dataIndex: 'contract',
      ellipsis: true,
      copyable: true,
    }
    , {
      title: intl.formatMessage({id: 'balance.blockchain'}),
      dataIndex: 'blockchain',
      valueEnum: {
        ethereum: {text: 'Ethereum'},
        smartchain: {text: 'Smart Chain'},
        tron: {text: 'Tron'},
        heco: {text: 'Heco'}
      },
    }
  ];
  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return appBalance({
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
    </>
  );
};
