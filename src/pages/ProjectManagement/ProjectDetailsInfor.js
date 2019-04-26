import React, { Component, Suspense } from 'react';
import {Card,Button,Tabs,Row,Col,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import styles from './Common.less';
import Link from 'umi/link';
import ProjectInfor from './ProjectInfor';
import { connect } from 'dva';
import router from 'umi/router';
const TabPane = Tabs.TabPane;
const { Description } = DescriptionList;
@connect(({ project,loading }) => ({
  project
}))
export default class ProjectDetails extends React.Component {
  state ={

  }
  handleBack = ()=>{
   
    window.history.back(-1);
}

  render() {
    
    const { project,loading } = this.props;  

    return (          
        <div className={styles.content}>
                <div>
                    <div className={styles.headerbox}>                     
                        <h3>{project.projectDetail.name}</h3>
                        {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                    </div>
                    <DescriptionList size="small" style={{ marginBottom: 20 }} title="">
                        <Description term="项目编码">{project.projectDetail.code}</Description>
                        <Description term="项目所在地">{project.projectDetail.areaCodeStr}</Description>
                        <Description term="项目分类">{project.projectDetail.categoryStr}</Description>
                        <Description term="项目状态">{project.projectDetail.prjStatusStr}</Description>
                        <Description term="建设性质">{project.projectDetail.propertyNumStr}</Description>
                        <Description term="工程用途">{project.projectDetail.prjNumStr}</Description>
                        <Description term="在岗工人"><span className={styles.span}>{project.projectDetail.currentWorkerNumber}</span>/{project.projectDetail.registWorkerNumber}</Description>
                        <Description term="工资异常">{project.projectDetail.payRollErrorNumber}</Description>
                        <Description term="工人投诉">{project.projectDetail.workerComplainNumber}</Description>
                    </DescriptionList>
                </div>         
        </div>
    );
  }
}
