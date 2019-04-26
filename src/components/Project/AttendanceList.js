import React, { Component } from 'react'
import {Card,Button,Tabs,Row,Col,Table,Modal, Divider,Select} from 'antd';
const Option = Select.Option;
import  { hideColumn } from '@/utils/utils';
import AttendanceNumber from './AttendanceNumber';
import AttendanceListDetails from './AttendanceListDetails';
import { connect } from 'dva'; 
import Link from 'umi/link';
export default class AttendanceList extends Component {
  state ={
    openAttendanceListDetails:false,
    record:''
  }
  handleDetails=(record)=>{
    this.setState({
      openAttendanceListDetails:true,
      record:record
    })
  }
  //上传
  handleuploadLocal=(record)=>{
    const projectJid = this.props._this.props.location.query.projectJid
    const {dispatch} = this.props;
    dispatch({
      type:'projectLocalUpload/fetchUploadWorkerAttendance',
      payload: {
          projectJid:projectJid
      },
    }); 
  }
  render() {
    //考勤
    const columns = [{
      title: '考勤日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '考勤人数',
      dataIndex: 'workerNumber',
      key: 'workerNumber',
    },{
      title: '管理人员',
      dataIndex: 'managerNumber',
      key: 'managerNumber',
    },{
      title: '建筑工人',
      dataIndex: 'builderNumber',
      key: 'builderNumber',
    },{
      title: '所属参建单位',
      dataIndex: 'corpName',
      key: 'corpName',
    },{
      title: '所属班组',
      dataIndex: 'teamName',
      key: 'teamName',
    },{
      title: '操作',
      dataIndex: 'action',
      show:this.mohurdData==true?true:false,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleDetails(record)}>查看</a>
          <Divider/>
          <a href="javascript:;"  style={{display:record.verified || record.uploadState==0 || record.uploadState==9?'inline-block':'none'}}  onClick={()=> this.handleuploadLocal(record)}>上传</a>
        </span>
      ),
    },
  ];
    hideColumn(columns);
    const {data,loading } = this.props;
    // console.log(data)
    console.log(data.attendanceList)
    return (
      <div>
        <AttendanceNumber/>
        {/* <Button onClick={()=> this.handleDetails()}>查看</Button> */}
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
                this.props.fetchList(current)
              },
            }}
            loading={loading}
            rowKey="labourJid"
            columns={columns} 
          />
          <Modal
            title="考勤人员明细"
            width="65%"
            visible={this.state.openAttendanceListDetails}
            onCancel={()=>{
              this.setState({
                openAttendanceListDetails:false
              })
            }}
            footer={null}
            maskClosable={false}
          >
            <AttendanceListDetails record={this.state.record}/>
          </Modal>
      </div>
    )
  }
}
