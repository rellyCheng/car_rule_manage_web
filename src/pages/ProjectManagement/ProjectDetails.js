import React, { Component, Suspense } from 'react';
import {Card,Button,Tabs,Row,Col,Table,DatePicker} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AttendanceList from '@/components/Project/AttendanceList';//考勤统计
import WagesList from '@/components/Project/WagesList';//工资统计
import ProjectCorpList from '@/components/Project/ProjectCorpList';//参建单位
import TeamList from '@/components/Project/TeamList';//班组信息
import ProjectEmployeeList from '@/components/Project/ProjectEmployeeList';//工人信息
import ProjectTrainingList from '@/components/Project/ProjectTrainingList';//项目培训
import LabourPackageList from '@/components/Project/LabourPackageList';//专业分包
import ProjectBuilderLicenseList from '@/components/Project/ProjectBuilderLicenseList';//施工许可证
import ProjectInfo from '@/components/Project/ProjectInfo';
import ProjectInfoDetail from '@/components/Project/ProjectInfoDetail';
import EmployeeFilter from '@/components/Employee/EmployeeFilter';
import AttendanceFilter from '@/components/Project/AttendanceFilter';
import styles from './Common.less';
import Link from 'umi/link';
import moment from 'moment';
import { connect } from 'dva';
import router from 'umi/router';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';

let Authorized = RenderAuthorized(getAuthority());
const TabPane = Tabs.TabPane;
@connect(({ project,loading}) => ({
  project,
  fetchAttendanceListLoading:loading.effects['project/fetchAttendanceList'],
  requestCorpListLoading:loading.effects['project/fetchCorpList'],
  fetchTeamMasterListLoading:loading.effects['project/fetchTeamMasterList'],
  fetchProjectEmployeeListLoading:loading.effects['project/fetchProjectEmployeeList'],
  fetchProjectDetailLoading:loading.effects['project/fetchProjectDetail']
}))
export default class ProjectDetails extends React.Component {
  state ={
    attendanceDate:moment().format('YYYY-MM-DD'),
    filterVal:{pageCurrent:1}
  }

  componentDidMount(){
    this.fetchProjectDetail();
    const {project,dispatch} = this.props;
    const projectJid = this.props.location.query.projectJid
    if(projectJid !== project.projectJid){
      dispatch({
        type:'project/fetchTabNum',
        payload:projectJid,
      })
     
    }
  }
  requestList=(current=1)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchProjectList',
      payload: {
        current:current,
        size:20
      },
    });
  }
  // 项目详情
  fetchProjectDetail=()=>{
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchProjectDetail',
      payload: {
        projectJid:projectJid,
      },
    });
    dispatch({
      type: 'project/fetchCountLabel',
      payload: {
        projectJid:projectJid,
      },
    });
  }

  handleOnTab = (val)=>{
    console.log(val);
    const { dispatch,project } = this.props;
    if(val==2){
      //考勤统计
      this.fetchAttendanceList()//参建单位
      this.fetchAttendanceListCount()//考勤统计
      this.fetchPlatformTeamMasterList();//班组
      this.requestCorpList(1);
    }
    if(val==3){
      //工资统计
    }
    if(val==4){
      this.requestCorpList(1); //参建单位     
    }
    if(val==5){
      this.fetchTeamMasterList(1);  //班组信息
    }
    if(val==6){
      this.fetchProjectEmployeeList();   //工人   
    }
    if(val==7){
      this.fetchProjectTrainingList();  //项目培训    
    }
    if(val==8){
      this.requestLaoWuList(1); //专业分包
    }
    project.tabNum=val;
    this.setState({
      tabNum:val
    })
  }
   //人员考勤
   fetchAttendanceList= (page = this.state.filterVal.pageCurrent,values=this.state.filterVal) => {
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    values.projectJid = projectJid
    values.pageCurrent = page
    values.pageSize = 10 
    console.log(values)
    dispatch({
      type:'project/fetchAttendanceList',
      payload: values
    }); 
    this.setState({
      filterVal:values
    })
  };
  //考勤统计
  fetchAttendanceListCount=()=>{
    const projectJid = this.props.location.query.projectJid
    const {dispatch} = this.props
    dispatch({
      type:'project/fetchAttendanceListCount',
      payload:{
        projectJid:projectJid
      }
    })
  }
  // 参建单位
  requestCorpList=(current=1)=>{
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchCorpList',
      payload: {
        projectJid:projectJid,
        current:current,
        size:10
      },
    });
  }
   // 获取平台上传的班组列表
   fetchPlatformTeamMasterList = (pageCurrent = 1) => {
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchPlatformTeamMasterList',
      payload: {
        projectJid: projectJid,
        current: pageCurrent,
        size: 10,
      },
    });
  };
  // 工人信息
  fetchProjectEmployeeList=(pageCurrent=this.state.filterVal.pageIndex,values=this.state.filterVal)=>{
    const { dispatch,project } = this.props;
    const projectJid = project.projectDetail.jid;
    values.projectJid = projectJid,
    values.current = pageCurrent,
    values.size = 10
    console.log(values)
    dispatch({
      type: 'project/fetchProjectEmployeeList',
      payload: values,
    });
    this.setState({
      filterVal:values
    });
  }
  // 项目培训
  fetchProjectTrainingList=(pageCurrent=1)=>{
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchProjectTrainingList',
      payload: {
        projectJid:projectJid,
        current:pageCurrent,
        size:10
      },
    });
  }
  //班组信息
  fetchTeamMasterList=(pageCurrent=1)=>{
      const { dispatch } = this.props;
      const projectJid = this.props.location.query.projectJid;
      dispatch({
          type: 'project/fetchTeamMasterList',
          payload: {
            projectJid:projectJid,
            current:pageCurrent,
            size:10
          },
      });
  }
  // 施工许可证
  requestBuilderLicenseList=()=>{
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchBuilderLicenseList',
      payload: {
        projectJid:projectJid
      },
    });
  }
  //专业分包
  requestLaoWuList=(current)=>{
    const { dispatch } = this.props;
    if(current==null){
      current==1
    }
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchLaoWuList',
      payload: {
        projectJid:projectJid,
        current:current,
        size:10
      },
    });
  }
  
  handleChangeDate=(date,dateString)=>{
    //调取考勤的列表
    this.fetchAttendanceList(1,dateString);
  }
  render() {
    const { project,fetchAttendanceListLoading,requestCorpListLoading,fetchTeamMasterListLoading,fetchProjectEmployeeListLoading,fetchProjectDetailLoading} = this.props;  
    console.log(project.tabNum);
    console.log(project.countLabel)
    console.log(project.projectEmployeeList)
    const platformTeamMasterList = project.platformTeamMasterList.result || [];
    const corpList = project.corpList.result || [];
    const projectJid = this.props.location.query.projectJid;
    const mohurdData = project.projectDetail.mohurdData;
    return (          
        <div className={styles.content}>
            <PageHeaderWrapper>
                <ProjectInfoDetail data ={project} portType='本地' projectJid={projectJid} loading={fetchProjectDetailLoading}/> 
                <div className={styles.tab}> 
                    <Tabs onTabClick={this.handleOnTab} activeKey={project.tabNum} >
                        <TabPane tab="项目信息" key="1">
                            <ProjectInfo data ={project} loading={fetchProjectDetailLoading}/>                          
                        </TabPane>
                        <TabPane tab={<span>考勤统计()</span>} key="2">
                        <AttendanceFilter platformTeamMasterList={platformTeamMasterList} corpList={corpList} fetchList={this.fetchAttendanceList}/>
                          {/* <div style={{margin:"10px",overflow:'hidden'}}>
                            <div style={{float:'left',margin:'0 20px 0 0'}}>
                                每日考勤情况： <DatePicker defaultValue={moment(this.state.attendanceDate, "YYYY-MM-DD")} onChange={this.handleChangeDate} />
                            </div>
                            <Authorized authority={['A_super','B_winshe_super','A_worker']}>
                              <Link to={`/project/addattendenceform?projectJid=${projectJid}`} style={{display:mohurdData == false?'none':'inline-block'}}>  
                                <Button type="primary">添加考勤</Button>
                              </Link>
                            </Authorized>
                          </div> */}
                          <AttendanceList mohurdData={mohurdData} data ={project} portType={"本地"} loading={fetchAttendanceListLoading} fetchList={this.fetchAttendanceList}/>
                        </TabPane>
                        {/* <TabPane tab={<span>工资统计()</span>} key="3" >
                          <Link>  
                            <Button type="primary">添加工资</Button>
                          </Link>
                           <WagesList data ={project} portType={"本地"}/>
                        </TabPane> */}
                        <TabPane tab={<span>参建单位({project.countLabel.projectCorpNum})</span>} key="4">
                          <Authorized authority={['A_super','B_winshe_super','A_worker']}>
                          <Link to={`/project/addprojectcorpform?projectJid=${projectJid}`} style={{display:mohurdData == false?'none':'inline-block'}}>
                            <Button type="primary"  onClick={(e)=>{project.cropProjectDetail={}}}>添加参建单位</Button>
                          </Link>
                          </Authorized>
                           <ProjectCorpList _this={this} mohurdData={mohurdData} fetchList = {this.requestCorpList} data ={project} portType={"本地"} loading={requestCorpListLoading}/>
                        </TabPane>
                        <TabPane  tab={<span>班组信息({project.countLabel.teamNum})</span>} key="5">
                          <Authorized authority={['A_super','B_winshe_super','A_worker']}>
                            <Link to={`/project/addprojectteamform?projectJid=${projectJid}`} style={{display:mohurdData == false?'none':'inline-block'}}>
                              <Button type="primary">添加班组</Button>
                            </Link>
                          </Authorized>
                          {/* <Link to={`/project/project/addallprojectteamform?projectJid=${projectJid}`}>
                            <Button type="primary">批量上传班组</Button>
                          </Link> */}
                           <TeamList _this={this} mohurdData={mohurdData} fetchList = {this.fetchTeamMasterList} data ={project} portType={"本地"} loading={fetchTeamMasterListLoading}/>
                        </TabPane>
                        <TabPane tab={<span>工人信息({project.countLabel.projectEmployeeNum})</span>} key="6">                           
                            <EmployeeFilter fetchList = {this.fetchProjectEmployeeList} />
                            <Authorized authority={['A_super','B_winshe_super','A_worker']}>
                            <Link to={`/project/addprojectemployeeform?projectJid=${projectJid}`} style={{display:mohurdData == false?'none':'inline-block'}}>
                                <Button type="primary">添加工人</Button>
                            </Link>
                            </Authorized>
                            <ProjectEmployeeList mohurdData={mohurdData} fetchList = {this.fetchProjectEmployeeList} data ={project} portType={"本地"} loading={fetchProjectEmployeeListLoading}/>
                        </TabPane>
                        {/* <TabPane tab={<span>项目培训({project.countLabel.projectTrainingNum})</span>} key="7">
                            <Link to={`/item/projectTrainingForm?pageType=1`}>
                              <Button type="primary">添加项目培训信息</Button>
                            </Link>
                            <ProjectTrainingList fetchList = {this.fetchProjectTrainingList} data ={project} portType={"本地"}/>
                        </TabPane>
                        <TabPane tab={<span>专业分包({project.countLabel.projectLabourPackageNum})</span>} key="8">
                            <LabourPackageList fetchList = {this.requestLaoWuList} data ={project} portType={"本地"}/>
                        </TabPane> */}
                    </Tabs>
                </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
