import React, { Component } from 'react'
import {Card,Button,Tabs,Row,Col,Table,Modal} from 'antd';
import  { hideColumn } from '@/utils/utils';
// import AttendanceNumber from './AttendanceNumber';
import AttendanceCountryDetail from './AttendanceCountryDetail';
import { connect } from 'dva'; 
import Link from 'umi/link';
export default class AttendanceListCountry extends Component {
  state={
    openAttendanceDetail:false,
    record:''
  }
  handleDetails=(record)=>{
    this.setState({
      openAttendanceDetail:true,
      record:record
    })
  }
  render() {
    //考勤
    const columns = [{
      title: '刷卡时间',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '刷卡进出方向',
      dataIndex: 'direction',
      render: (text, record) => (
        <span>{record.direction=='01'?'入场':'出场'}</span>
      ),
    },{
      title: '证件类型',
      dataIndex: 'idCardType',
      render: (text, record) => (
        <span>身份证</span>
      ),
    },{
      title: '证件号码',
      dataIndex: 'idCardNumber',
      key: 'idCardNumber',
    },
    {
      title: '考勤详情',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleDetails(record)}>查看详情</a>
        </span>
      ),
    },
  ];
    hideColumn(columns);
    const {data,loading } = this.props;
    console.log(data)
    console.log(data.attendanceList)
    return (
      <div>
        {/* <AttendanceNumber/> */}
        <Table
            dataSource={data.attendanceList.result}
            style={{ marginBottom: 24 }}
            pagination={{
              current:data.attendanceList.current,
              pageSize:data.attendanceList.size,
              total: parseInt(data.attendanceList.total),
              showTotal:()=>{
                  return `共${data.attendanceList.total}条`
              },
              showQuickJumper:true,
              onChange:(current)=>{
                this.setState({
                  current:current
                })
                this.fetchWorkerAttendanceList(current);
              },
            }}
            loading={loading}
            rowKey="labourJid"
            columns={columns} 
          />
          <Modal
            title="考勤详情"
            width="65%"
            visible={this.state.openAttendanceDetail}
            onCancel={()=>{
              this.setState({
                openAttendanceDetail:false
              })
            }}
            footer={null}
            maskClosable={false}
          >
            <AttendanceCountryDetail record={this.state.record}/>
          </Modal>
      </div>
    )
  }
}
