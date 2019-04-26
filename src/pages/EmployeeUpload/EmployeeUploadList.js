import React, { Component } from 'react'
import {Card,Button,Divider,Tag,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import WorkersFilter from '../WorkersManagement/WorkersFilter'
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ employeeUpload,loading }) => ({
  employeeUpload,
  loading: loading.effects['worker/fetchWorkerList'],
}))
export default class EmployeeUploadList extends Component {
  componentDidMount(){
    //获取人员列表
   this.fetchEmployeeList();
  }
  
  fetchEmployeeList=(page = 1)=>{
    // const { dispatch } = this.props;
    // dispatch({
    //   type:'employeeUpload/fetchProjectEmployeeList',
    //   payload: {
    //       projectCode:"33028320190301400028",
    //       current:page,
    //       size:10
    //   },
    // }); 
  }
  render() {
    const columns4 = [{
      title: '工人姓名',
      dataIndex: 'workerName',
      key: 'workerName',
      render: (text, record) => (
        <Link to={`/employeeUpload/employeeDetail?idCardNumber=${record.idCardNumber}`}>{record.workerName}</Link>
    ),
    },{
      title:'进场时间',
      dataIndex: 'entryTime',
      key: 'entryTime',
    },{
      title:'退场时间',
      dataIndex: 'exitTime',
      key: 'exitTime',
    },{
      title:'人员类型',
      dataIndex: 'personnelType',
      key: 'personnelType',
    },{
      title:'所属企业',
      dataIndex: 'corpName',
      key: 'corpName',
    },{
      title: '劳动合同详情',
      key: 'contractDetails',
      show:this.props.portType==1?true:false,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleEmployeeDetail(record)}>查看</a>
        </span>
      ),
    },{
      title: '进退场详情',
      key: 'entryExitDetails',
      show:this.props.portType==1?true:false,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleEmployeeDetail(record)}>查看</a>
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
            <a href="javascript:;" onClick={()=> this.handleModify(record)}>编辑</a>
          </span>
        )
        }];
      const {employeeUpload,loading } = this.props;
      console.log(employeeUpload)
      const projectEmployeeList = employeeUpload.projectEmployeeData.result
    return (
      <div>
       <PageHeaderWrapper >
                <Card> 
                    <WorkersFilter _this={this}/>
                </Card>        
                <div> 
                <Table
                  dataSource={projectEmployeeList}
                  style={{ marginBottom: 24 }}
                  pagination={{
                    current:employeeUpload.projectEmployeeData.current,
                    pageSize:employeeUpload.projectEmployeeData.size,
                    total: parseInt(employeeUpload.projectEmployeeData.total),
                    showTotal:()=>{
                        return `共${employeeUpload.projectEmployeeData.total}条`
                    },
                    showQuickJumper:true,
                    onChange:(current)=>{
                      this.setState({
                        current:current
                      })
                      this.fetchProjectEmployeeList(current);
                    },
                  }}
                  loading={loading}
                  rowKey="idCardNumber"
                  columns={columns4} 
                />
                </div>
            </PageHeaderWrapper>
      </div>
    )
  }
}
