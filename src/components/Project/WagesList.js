import React, { Component } from 'react'
import { Table } from 'antd';
import  { hideColumn } from '@/utils/utils'

export default class WagesList extends Component {
  render() {
    //工资统计
    const columns = [{
      title: '参建单位',
      dataIndex: 'aaa',
      key: 'aaa',
      }, {
      title: '工资月份',
      dataIndex: 'bbb',
      key: 'bbb',
      },{
      title: '工人人数',
      dataIndex: 'ccc',
      key: 'ccc',
      },{
      title:'应发金额（元）',
      dataIndex: 'ddd',
      key: 'ddd',
      },{
      title:'实发金额（元）',
      dataIndex: 'eee',
      key: 'eee',
      },{
      title:'发放日期',
      dataIndex:'fff',
      key:'fff',
      },{
      title: '工资单',
      key: 'hhh',
      width:'10%',
      render: (text, record) => (
          <span>
          <a href="javascript:;" onClick={()=> this.handleViewDetail(record)}>查看</a>
          </span>
      ),
      },{
      title:"同步状态",
      dataIndex:'syncStatus',
      key:'syncStatus',
      show:this.props.portType==1?false:true
      },{
      title:'操作',
      key:'action',
      show:this.props.portType==1?false:true,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleViewFailReason(record)}>查看失败原因</a>
          <a href="javascript:;" onClick={()=> this.handleUpload(record)}>重新上传</a>
        </span>
      ),
      }];
    hideColumn(columns);
    return (
      <Table
        columns={columns}
      />
    )
  }
}
