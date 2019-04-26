import React, { Component, Suspense } from 'react';
import {Card,Button,Divider,Tag,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import ProjectFilter from './ProjectFilter';
import { connect } from 'dva';
import router from 'umi/router';

  
@connect(({ project, loading }) => ({
  project,
  loading: loading.effects['project/fetchProjectList'],
}))
export default class Project extends React.Component {
  
  state ={
    filterVal:{}
  }

  componentDidMount(){
    //返回上一页 TabPane组件tabNum 重新为1
    const { project } = this.props;
    project.tabNum = '1';

    this.requestList();
  }

  requestList=(current=1,values=this.state.filterVal)=>{
    const { dispatch } = this.props;
    if(current==null){
      current==1
    }
    values.current = current;
    values.size=10;
    dispatch({
      type: 'project/fetchProjectList',
      payload: values
    });
    this.setState({
      filterVal:values
    })
  }

  handleViewDetail=(record)=>{
    router.push(`/project/projectDetails?projectJid=${record.jid}`);
  }

  render() {
    const columns = [{
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      width:'20%'
    }, {
      title: '开工日期',
      dataIndex: 'startDate',
      key: 'startDate',
      width:'10%'
    }, {
      title: '项目地址',
      dataIndex: 'address',
      key: 'address',
      width:'15%'
    },
    {
      title: '总承包单位',
      dataIndex: 'contractorCorpName',
      key: 'contractorCorpName',
      width:'20%'     
    },
    {
      title: '项目状态',
      dataIndex: 'prjStatusStr',
      key: 'prjStatusStr',
      width:'8%'
    },
    {
        title: '操作',
        key: 'action',
        width:'8%',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={()=> this.handleViewDetail(record)}>查看详情</a>
          </span>
        ),
    }];
    const { project,loading } = this.props;
    console.log(project)
    return (          
        <div className={styles.content}>
            <PageHeaderWrapper>
            <div> 
                <ProjectFilter _this={this}/>
            </div>
            <div className={styles.tab}> 
              <Table
                dataSource={project.projectList}
                style={{ marginBottom: 24 }}
                pagination={{
                  current:project.current,
                  pageSize:project.size,
                  total: parseInt(project.total),
                  showTotal:()=>{
                      return `共${project.total}条`
                  },
                  showQuickJumper:true,
                  onChange:(current)=>{
                    this.setState({
                      current:current
                    })
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
