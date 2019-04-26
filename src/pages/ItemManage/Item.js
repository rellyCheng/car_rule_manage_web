import React, { Component, Suspense } from 'react';
import { Card, Button, Divider, Tag, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import Filter from './Filter';
import { connect } from 'dva';
import router from 'umi/router';
@connect(({ item, loading }) => ({
  item,
  loading: loading.effects['item/fetchSubmitProjectlist'],
}))
export default class Item extends React.Component {
  state = {
    filterVal:{}
  };

  //   初始化
  componentDidMount() {
    this.requestList();
  }

  requestList = (current = 1, values = this.state.filterVal) => {
    const { dispatch } = this.props;
    values.current = current;
    values.size = 10;
    dispatch({
      type: 'item/fetchSubmitProjectlist',
      payload: values,
    });
    this.setState({
      filterVal:values
    })
  };

  //查看详情
  handleViewDetail = record => {
    router.push(`${window.location.pathname}/itemDetails?projectJid=${record.jid}&projectCode=${record.code}`);
  };

  //编辑
  // handleEdit = record => {
  //   // const {dispatch} = this.props;
  //   // dispatch({
  //   //   type:'',
  //   //   payload:{
  //   //     projectJid:record.jid
  //   //   }
  //   // })
  //   router.push(`${window.location.pathname}/addItem?projectJid=${record.jid}`);
  // };

  render() {
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: '开工日期',
        dataIndex: 'startDate',
        key: 'startDate',
        width: '10%',
      },
      {
        title: '项目状态',
        dataIndex: 'prjStatusStr',
        key: 'prjStatusStr',
        width: '8%',
      },
      {
        title: '项目地址',
        dataIndex: 'address',
        key: 'address',
        width: '15%',
      },
      // {
      //   title: '劳务包',
      //   dataIndex: 'labourPackageNumber',
      //   key: 'labourPackageNumber',
      //   width: '8%',
      // },
      // {
      //   title: '在岗工人',
      //   dataIndex: 'currentWorkerNumber',
      //   key: 'currentWorkerNumber',
      //   width: '10%',
      //   render: (text, record) => {
      //     return (
      //       <span>
      //         {record.currentWorkerNumber}/{record.registWorkerNumber}
      //       </span>
      //     );
      //   },
      // },
      {
        title: '总承包单位',
        dataIndex: 'contractorCorpName',
        key: 'contractorCorpName',
        width: '16%',
      },
     
      {
        title: '操作',
        key: 'action',
        width: '12%',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.handleViewDetail(record)}>
              查看详情
            </a>
            {/* <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.handleEdit(record)}>
              编辑
            </a> */}
          </span>
        ),
      },
    ];

    const { item, loading } = this.props;
    console.log(item);

    return (
      <div className={styles.content}>
        <PageHeaderWrapper>
          <div>
            <Filter _this={this} />
          </div>
          <div className={styles.tab}>
            <Table
              dataSource={item.submitList.result}
              style={{ marginBottom: 24 }}
              pagination={{
                current: item.submitList.current,
                pageSize: item.submitList.size,
                total: parseInt(item.submitList.total),
                showTotal: () => {
                  return `共${item.submitList.total}条`;
                },
                showQuickJumper: true,
                onChange: current => {
                  this.setState({
                    current: current,
                  });
                  this.requestList(current);
                },
              }}
              loading={loading}
              rowKey="jid"
              columns={columns}
            />
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}
