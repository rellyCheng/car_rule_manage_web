import React, { Component } from 'react';
import { connect } from 'dva'; 
import styles from './Common.less';
import {Modal,Table} from 'antd';
import moment from 'moment'

@connect(({projectLocalUpload})=>({
  projectLocalUpload
}))
export default class GoBackDetail extends Component {
  componentDidMount(){
    const {dispatch,record} = this.props
    const values = {}
    values.projectJid = record.projectJid,
    values.workerJid = record.workerJid,
    dispatch({
      type:'projectLocalUpload/fetchEntryExitDetail',
      payload:values
    })
  }
  render() {
      const columns = [
      //   {
      //   title: '项目编码',
      //   dataIndex: 'projectCode',
      //   key: 'projectCode',
      // }, {
      //   title: '统一社会信用代码',
      //   dataIndex: 'corpCode',
      //   key: 'corpCode',
      // },{
      //   title: '工人所属企业名称',
      //   dataIndex: 'corpName',
      //   key: 'corpName',
      // },
      {
        title: '班组编号',
        dataIndex: 'teamSysNo',
        key: 'teamSysNo',
      },
      {
        title: '证件类型',
        dataIndex: 'idCardType',
        key: 'idCardType',
        render: (text, record) => {
            return record.idCardType == '01'?'身份证':''
        },
      },
      // {
      //   title: '证件号码',
      //   dataIndex: 'idCardNumber',
      //   key: 'idCardNumber',
      // },
      {
        title: '进退场日期',
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => {
          let date = record.entryDate || record.exitDate
          return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          // return record.type == '0'?'退场':'进场'
          return record.exitDate ? '退场' : '进场' 
      },
      },
      {
        title: '凭证扫描件资源地址',
        dataIndex: 'exitVoucherUrl',
        key: '1',
        render: (text, record) => (
            record.exitVoucherUrl ? <span><a href={SERVER_IP.FTP_IP + record.exitVoucherUrl} target="_Blank" >退场附件详情</a></span>:
            record.entryVoucherUrl ? <span><a href={SERVER_IP.FTP_IP + record.entryVoucherUrl} target="_Blank" >进场附件详情</a></span>:'--'
        ),
      }
    ];
    const {data,loading,record,projectLocalUpload} = this.props;
    console.log(projectLocalUpload.entryExitDetail.data)
    // console.log(data);
    // console.log(record)
    
    return (
      <div>
          <Table
            dataSource={projectLocalUpload.entryExitDetail.data}
            // style={{ marginBottom: 24 }}
            // pagination={{
            //   current:data.WorkerEntryExitList.current,
            //   pageSize:data.WorkerEntryExitList.size,
            //   total: parseInt(data.WorkerEntryExitList.total),
            //   showTotal:()=>{
            //       return `共${data.WorkerEntryExitList.total}条`
            //   },
            //   showQuickJumper:true,
            //   onChange:(current)=>{
            //     this.setState({
            //       current:current
            //     })
            //     this.fetchWorkerAttendanceList(current);
            //   },
            // }}
            // loading={loading}
            // rowKey="key"
            columns={columns} 
          />            
      </div>
    )
  }
}


