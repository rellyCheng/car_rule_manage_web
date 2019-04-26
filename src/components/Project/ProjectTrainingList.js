import React, { Component } from 'react'
import {Table, Modal} from 'antd';
import  { hideColumn } from '@/utils/utils';
import ProjectTraniningDetail from "@/components/Project/projectTraniningDetail"
import { connect } from 'dva';
@connect(({item})=>{
  item
})
export default class ProjectTrainingList extends Component {
  state = { visible: false }

  //详情跳转
  handleProjectTrainingDetail=(record)=>{
    // router.push(`/project/projectDetails/trainlist?trainingSysNo=${record.sysNo}`);
      this.setState({
        record:record,
        visible: true,
      });
      
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    //培训记录
    const columns3 = [{
      title: '培训日期',
      dataIndex: 'trainingDate',
      key: 'trainingDate',
    },
    {
      title: '培训时长',
      dataIndex: 'trainingDuration',
      key: 'trainingDuration',
      show:this.props.portType==1?true:false
    },
    {
      title: '课程名称',
      dataIndex: 'trainingName',
      key: 'trainingName',
    },
    {
      title: '培训类型',
      dataIndex: 'trainingTypeCode',
      key: 'trainingTypeCode',
    },
    {
      title: '培训人',
      dataIndex: 'trainer',
      key: 'trainer',
    },
    {
      title: '培训机构',
      dataIndex: 'trainingOrg',
      key: 'trainingOrg',
      show:this.props.portType==1?true:false
    },
    {
      title: '培训详情',
      key: 'trainDetail',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleProjectTrainingDetail(record)}>查看详情</a>
        </span>
      ),
    },
    // {
    //   title:"同步状态",
    //   dataIndex:'syncStatus',
    //   key:'syncStatus',
    //   width:'10%',
    //   show:this.props.portType==1?false:true
    //   },
      // {
      //   title:'操作',
      //   key:'action',
      //   show:this.props.portType==1?false:true,
      //   render: (text, record) => (
      //     <span>
      //       <a href="javascript:;" onClick={()=> this.handleViewFailReason(record)}>查看失败原因</a>
      //       <a href="javascript:;" onClick={()=> this.handleUpdate(record)}>重新上传</a>
      //     </span>
      //   )
      //   }
      ];
    hideColumn(columns3);
    const {data,loading}=this.props;
    return (
      <div>
        {/* 项目培训 */}
        <Table
            dataSource={data.projectTrainingList.result}
            style={{ marginBottom: 24 }}
            pagination={{
              current:data.projectTrainingList.current,
              pageSize:data.projectTrainingList.size,
              total: parseInt(data.projectTrainingList.total),
              showTotal:()=>{
                  return `共${data.projectTrainingList.total}条`
              },
              showQuickJumper:true,
              onChange:(current)=>{
                this.setState({
                  current:current
                })
                this.props.fetchList(current);
              },
            }}
            loading={loading}
            rowKey="projectJid"
            columns={columns3} 
          />
          <Modal
            title="项目培训详情"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
            width={900}
            maskClosable={false}
          >
            <ProjectTraniningDetail data={this.state.record}/>
          </Modal>
      </div>
    )
  }
}