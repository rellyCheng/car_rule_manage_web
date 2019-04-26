import React, { Component } from 'react'
import {Table } from 'antd'
import Link from 'umi/link';
import { connect } from 'dva';

@connect(({ companyUpload,loading }) => ({
  companyUpload,
  loading: loading.effects['companyUpload/fetchCompanyUploadlist'],
}))
export default class CompanyList extends Component {

  render() {
    console.log(window.location)
    //企业列表
    const columns = [{
      title: '企业名称',
      dataIndex: 'corpName',
      key: 'corpName',
      render: (text, record) => (
          <Link to={`${window.location.pathname}/companyUploadDetail?corpJid=${record.jid}`}>{record.corpName}</Link>
      ),
      }, {
      title: '企业登记注册类型',
      dataIndex: 'corpTypeStr',
      key: 'corpTypeStr',
      },
      // {
      // title: '参建项目',
      // dataIndex: '',
      // key: '',
      // },{
      // title:'在场工人数',
      // dataIndex: '',
      // key: '',
      // },
      {
      title:'联系人姓名',
      dataIndex: 'linkman',
      key: 'linkman',
      },{
      title:'联系人电话',
      dataIndex:'linkTel',
      key:'linkTel',
      },
      // {
      // title:"同步状态",
      // dataIndex:'syncStatus',
      // key:'syncStatus',
      // show:this.props.portType==1?false:true
      // },
      // {
      // title:'操作',
      // key:'action',
      // show:this.props.portType==1?false:true,
      // render: (text, record) => (
      //   <span>
      //     <a href="javascript:;" onClick={()=> this.handleUpdate(record)}>修改</a>
      //     <a href="javascript:;" onClick={()=> this.handleViewFailReason(record)}>查看失败原因</a>
      //     <a href="javascript:;" onClick={()=> this.handleUpload(record)}>重新上传</a>
      //   </span>
      // ),
      // }
    ];
      const { data,loading } = this.props;
    return (
      <div>
          <Table
            dataSource={data.result}
            columns={columns}
            pagination={{
              current: data.current,
              pageSize: data.size,
              total: parseInt(data.total),
              showTotal: () => {
                return `共${data.total}条`;
              },
              showQuickJumper: true,
              onChange: current => {
                this.props.requestList(current);
              },
            }}
            loading={loading}
            rowKey="jid"
          />
      </div>
    )
  }
}
