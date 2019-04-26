import React, { Component } from 'react';
import { connect } from 'dva'; 
import styles from './Common.less';
import {Modal,Table} from 'antd';

@connect(({projectLocalUpload}) => ({
  projectLocalUpload
}))
export default class GoBackCountryDetail extends Component {
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
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          return record.type == '0'?'退场':'进场'
      },
      },
      {
        title: '凭证扫描件资源地址',
        dataIndex: 'voucher',
        key: '1',
        render: (text, record) => (
            <span>
            <a href={record.voucher}>附件详情</a>
            </span>
        ),
      }
    ];
    const {data,loading} = this.props;
    console.log(data);
    console.log(data.WorkerEntryExitList);
    return (
      <div>
          <Table
            dataSource={data.WorkerEntryExitList.result}
            style={{ marginBottom: 24 }}
            pagination={{
              current:data.WorkerEntryExitList.current,
              pageSize:data.WorkerEntryExitList.size,
              total: parseInt(data.WorkerEntryExitList.total),
              showTotal:()=>{
                  return `共${data.WorkerEntryExitList.total}条`
              },
              showQuickJumper:true,
              // onChange:(current)=>{
              //   this.setState({
              //     current:current
              //   })
              //   this.fetchWorkerAttendanceList(current);
              // },
            }}
            loading={loading}
            rowKey="key"
            columns={columns} 
          />            
      </div>
    )
  }
}


