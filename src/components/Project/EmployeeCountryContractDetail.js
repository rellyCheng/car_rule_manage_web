import React, { Component } from 'react';
import { connect } from 'dva'; 
import {Table,Modal} from 'antd';
import { isEmpty} from '@/utils/utils';
export default class EmployeeCountryContractDetail extends Component {
  render() {
      //考勤
    const columns = [{
        title: '合同期限类型',
        dataIndex: 'contractPeriodType',
        key: 'contractPeriodType',
        render: (text, record) => {
            return record.contractPeriodType == '0'?'固定期限合同':'以完成一定工作为期限的合同'
        },
      }, {
        title: '生效日期',
        dataIndex: 'startDate',
        key: 'startDate',
      },{
        title: '失效日期',
        dataIndex: 'endDate',
        key: 'endDate',
      },{
        title: '证件类型',
        dataIndex: 'idCardType',
        key: 'idCardType',
        render: (text, record) => {
            return record.idCardType=='01'?'身份证':'---'
        },
      },{
        title: '计量单位',
        dataIndex: 'unit',
        key: 'unit',
        render: (text, record) => {
            return record.unit == '80'?'米':(record.unit == 81)?'平方米':'立方米'
        },
      },{
        title: '计量单价',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
      },{
        title: '合同附件',
        dataIndex: 'attachments',
        key: 'attachments',
        render: attachments => (
            attachments.map((item,index)=>{
              return  <a href={item.url}>查看附件</a>
           })
        ),
      }
    ];
    const {data,loading} = this.props;
    console.log(data);
    console.log(data.ContractList);
    return (
      <div>
          <Table
            dataSource={data.ContractList.result}
            style={{ marginBottom: 24 }}
            pagination={{
              current:data.ContractList.current,
              pageSize:data.ContractList.size,
              total: parseInt(data.ContractList.total),
              showTotal:()=>{
                  return `共${data.ContractList.total}条`
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


