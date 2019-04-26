import React, { Component, Suspense } from 'react';
import {Card,Button,Tabs,Row,Col,Table,DatePicker} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AttendanceListCountry from '@/components/Project/AttendanceListCountry';//考勤统计
import WagesList from '@/components/Project/WagesList';//工资统计
import ProjectCorpList from '@/components/Project/ProjectCorpList';//参建单位
import TeamList from '@/components/Project/TeamList';//班组信息
import ProjectEmployeeList from '@/components/Project/ProjectEmployeeList';//工人信息
import ProjectTrainingList from '@/components/Project/ProjectTrainingList';//项目培训
import LabourPackageList from '@/components/Project/LabourPackageList';//专业分包
import ProjectBuilderLicenseList from '@/components/Project/ProjectBuilderLicenseList';//施工许可证
import ProjectInfo from '@/components/Project/ProjectInfo';
import ProjectInfoDetail from '@/components/Project/ProjectInfoDetail';
import styles from './Common.less';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
const TabPane = Tabs.TabPane;

@connect(({item,loading,itemUpdate}) => ({
  item,
  fetchCorpListLoading:loading.effects['item/fetchCorpList'],
  fetchTeamListLoading:loading.effects['item/fetchTeamList'],
  fetchProjectEmployeeListLoading:loading.effects['item/fetchProjectEmployeeList'],
  fetchWorkerAttendanceListLoading:loading.effects['item/fetchWorkerAttendanceList'],
  fetchTrainingListLoading:loading.effects['item/fetchTrainingList'],
  itemUpdate,
  fetchSubmitProjectDetailsLoading:loading.effects['item/fetchSubmitProjectDetails']
}))
export default class ProjectDetails extends React.Component {
  state ={
    attendanceDate:moment().format('YYYY-MM-DD'),
  }

  componentDidMount(){
    const projectJid = this.props.location.query.projectJid;
    if(projectJid){
      this.fetchDetails(projectJid);
    }
    const {item} = this.props
    if(projectJid !==item.projectJid){
      item.projectJid = projectJid;
      item.tabNum = "1"
    }
  }


  //获取项目详情
  fetchDetails = (projectJid) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'item/fetchSubmitProjectDetails',
      payload: {
        projectJid: projectJid,
      },
    }); 
  };

    //获取参建单位列表
    fetchCorpList= (page = 1) => {
      const { dispatch } = this.props;
      const projectCode = this.props.location.query.projectCode;
      dispatch({
        type:'item/fetchCorpList',
        payload: {
            projectCode:projectCode,
            current:page,
            size:10
        },
      }); 
    };
    //获取班组列表
    fetchTeamList= (page = 1) => {
      const { dispatch } = this.props;
      const projectCode = this.props.location.query.projectCode;
      dispatch({
        type:'item/fetchTeamList',
        payload: {
            projectCode:projectCode,
            current:page,
            size:10
        },
      }); 
    };
    //获取人员列表
    fetchProjectEmployeeList=(page = 1)=>{
      const { dispatch } = this.props;
      const projectCode = this.props.location.query.projectCode;
      dispatch({
        type:'item/fetchProjectEmployeeList',
        payload: {
            projectCode:projectCode,
            current:page,
            size:10
        },
      }); 
    }
    //列表 人员考勤
    fetchWorkerAttendanceList= (page = 1,date=this.state.attendanceDate) => {
      const { dispatch } = this.props;
      const projectCode = this.props.location.query.projectCode;
      dispatch({
        type:'item/fetchWorkerAttendanceList',
        payload: {
            projectCode:projectCode,
            current:page,
            size:10,
            date:date
        },
      }); 
    };
    fetchTrainingList= (page = 1) => {
      const { dispatch } = this.props;
      const projectCode = this.props.location.query.projectCode;
      dispatch({
        type:'item/fetchTrainingList',
        payload: {
            projectCode:projectCode,
            current:page,
            size:10,
        },
      }); 
    };

   //跳转添加班组信息页
    ProjectTeamForm=()=>{
      const { itemUpdate } = this.props;
      const {item} = this.props; 
      itemUpdate.teamInfo={};
      itemUpdate.teamInfo= item.projectDetail.contractorCorpName;
      const projectCode = this.props.location.query.projectCode;
      const projectJid = this.props.location.query.projectJid;  
      router.push(`${window.location.pathname}/projectTeamForm?projectJid=${projectJid}&projectCode=${projectCode}`);
    }

  handleOnTab = (val)=>{
    const {item} = this.props
    if(val==2){
      //考勤统计
      this.fetchWorkerAttendanceList();
    }
    if(val==3){
      //工资统计
    }
    if(val==4){
      this.fetchCorpList(); //参建单位     
    }
    if(val==5){
      this.fetchTeamList(); //班组信息     
    }
    if(val==6){
      this.fetchProjectEmployeeList();   //工人信息   
    }
    if(val==7){
      this.fetchTrainingList();  //项目培训    
    }
   item.tabNum=val;
   this.setState({
    tabNum:val
   })
  }
  handleChangeDate=(date,dateString)=>{
    this.fetchWorkerAttendanceList(1,dateString);
  }

  render() {
    
    const {item,fetchCorpListLoading,fetchTeamListLoading,fetchProjectEmployeeListLoading,fetchWorkerAttendanceListLoading,fetchTrainingListLoading,fetchSubmitProjectDetailsLoading} = this.props;  
    const projectCode = this.props.location.query.projectCode;
    return (          
        <div className={styles.content}>
            <PageHeaderWrapper>
                <ProjectInfoDetail  data = {item} loading={fetchSubmitProjectDetailsLoading}/> 
                <div className={styles.tab}> 
                    <Tabs onTabClick={this.handleOnTab} activeKey={item.tabNum}>
                        <TabPane tab="项目信息" key="1">
                            <ProjectInfo  data = {item} loading={fetchSubmitProjectDetailsLoading}/>                          
                        </TabPane>
                        <TabPane tab={<span>考勤统计</span>} key="2">
                          <div style={{margin:"10px",overflow:'hidden'}}>
                            <div style={{float:'left',margin:'0 20px 0 0'}}>
                                每日考勤情况： <DatePicker defaultValue={moment(this.state.attendanceDate, "YYYY-MM-DD")} onChange={this.handleChangeDate} />
                            </div>
                            {/* <Link to={`${window.location.pathname}/attendenceFrom?projectCode=${projectCode}`}>
                              <Button type="primary">添加考勤</Button>
                            </Link> */}
                          </div>
                          <AttendanceListCountry fetchList = {this.fetchWorkerAttendanceList} loading={fetchWorkerAttendanceListLoading} data = {item} portType={"国家"}/>
                        </TabPane>
                        {/* <TabPane tab={<span>工资统计()</span>} key="3">
                          <Link to={`${window.location.pathname}/wageFrom?projectCode=${projectCode}`}>
                            <Button type="primary">添加工资</Button>
                          </Link>
                           <WagesList  data = {item} portType={"国家"}/>
                        </TabPane> */}
                        <TabPane tab={<span>参建单位</span>} key="4">
                        {/* <Button>批量上传参建单位</Button> */}
                          {/* <Link to={`${window.location.pathname}/projectCorpForm?projectCode=${projectCode}`}>
                            <Button>添加参建单位</Button>
                          </Link> */}
                           <ProjectCorpList loading={fetchCorpListLoading} data={item} fetchList = {this.fetchCorpList} portType={"国家"}/>                      
                        </TabPane>
                        <TabPane tab={<span>班组信息</span>} key="5"> 
                        {/* <Button>批量上传班组信息</Button> */}
                            {/* <Button onClick={this.ProjectTeamForm}>添加班组信息</Button> */}
                            <TeamList fetchList = {this.fetchTeamList} loading={fetchTeamListLoading}  _this={this} data = {item} portType={"国家"}/>
                        </TabPane>
                        <TabPane tab={<span>工人信息</span>} key="6">
                        {/* <Button>批量上传工人信息</Button> */}
                            {/* <Link to={`${window.location.pathname}/projectEmployeeForm?projectCode=${projectCode}`}>
                                <Button>添加工人信息</Button>
                            </Link> */}
                            <ProjectEmployeeList fetchList = {this.fetchProjectEmployeeList} loading={fetchProjectEmployeeListLoading} data = {item} portType={"国家"}/>
                        </TabPane>
                        {/* <TabPane tab={<span>项目培训()</span>} key="7">
                        <Link to={`${window.location.pathname}/projectTrainingForm?projectCode=${projectCode}`}>
                        <Button>添加项目培训信息</Button>
                        </Link>
                            <ProjectTrainingList fetchList = {this.fetchTrainingList}  loading={fetchTrainingListLoading}  data = {item} portType={"国家"}/>
                        </TabPane> */}
                        {/* <TabPane tab={<span>专业分包()</span>} key="8">
                            <LabourPackageList  data = {item}/>
                        </TabPane> */}
                    </Tabs>
                </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
