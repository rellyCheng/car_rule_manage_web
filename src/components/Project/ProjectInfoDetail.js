import React, { Component } from 'react';
import { Button,message,Skeleton} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from './Common.less';
import router from 'umi/router';
import { connect } from 'dva';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';

let Authorized = RenderAuthorized(getAuthority());
const { Description } = DescriptionList;
@connect(({ globalProject,loading,project}) => ({
  globalProject,
  syncLoading:loading.effects['globalProject/fetchProjectSync'],
  project
}))
export default class ProjectInfoDetail extends Component {
  handleOnClick = () => {
    const { projectJid } = this.props;
    router.push(`/project/addProduct?projectJid=${projectJid}`);
  };
  handleSync = () => {
    const { projectJid, dispatch,project} = this.props;
    console.log(project.tabNum)
    dispatch({
      type: 'globalProject/fetchProjectSync',
      payload: projectJid,
      callback:res=>{
        if(res.state==1){
          message.success("同步成功");
          dispatch({
            type: 'project/fetchCountLabel',
            payload: {
              projectJid:projectJid,
            },
          });
         if(project.tabNum=="4"){
          dispatch({
            type: 'project/fetchCorpList',
            payload: {
              projectJid:projectJid,
              current:1,
              size:10
            },
          });
          }else if(project.tabNum=="5"){
            dispatch({
              type: 'project/fetchTeamMasterList',
              payload: {
                projectJid:projectJid,
                current:1,
                size:10
              },
           });
          }else if(project.tabNum=="6"){
            dispatch({
              type: 'project/fetchProjectEmployeeList',
              payload: {
                projectJid:projectJid,
                current:1,
                size:10
              },
            });
          }
        }else{
          message.error(response.message)
        }
      }
    });
  };
  handleLink=()=>{
    const { projectJid} = this.props;
    window.open(`/BI/projectDetails.html?projectJid=${projectJid}`);
  }
  render() {
    const { data, mohurdData ,syncLoading,loading} = this.props;
    const projectDetail = data.projectDetail || {};
    console.log(projectDetail);
    console.log(this.props.portType)
    return (
      <div className={styles.content}>
        <Skeleton loading={loading} active>
        <div>
          <div className={styles.headerbox}>
            <div>
              <h3>{projectDetail.name}</h3>
              <div style={{display:this.props.portType == '本地'?'inline-block':'none'}}>
                  <Button type='primary'  onClick = {()=>this.handleLink()} style={{margin:'5px 0 0 10px'}}>项目监控平台</Button>
              </div>
              
            </div>
            <Authorized authority={['A_super', 'A_worker', 'B_winshe_super']}>
              <div
                style={{
                  display:
                    projectDetail.mohurdData == false || this.props.portType !== '本地'
                      ? 'none'
                      : 'inline-block',
                }}
              >
                <Button style={{ marginRight: '10px' }} type="primary" onClick={this.handleSync}  loading={syncLoading}>
                  一键更新项目
                </Button>
                <Button
                  type="primary"
                  onClick={this.handleOnClick}
                  style={{ display: projectDetail.canEdit ? 'inline-block' : 'none' }}
                >
                  编辑
                </Button>
              </div>
            </Authorized>
          </div>
            <DescriptionList size="small" style={{ marginBottom: 20 }} title="">
              <Description term="项目编码">{projectDetail.code}</Description>
              <Description term="项目所在地">{projectDetail.areaCodeStr}</Description>
              <Description term="项目分类">{projectDetail.categoryStr}</Description>
              <Description term="项目状态">{projectDetail.prjStatusStr}</Description>
              <Description term="建设性质">{projectDetail.propertyNumStr}</Description>
              <Description term="工程用途">{projectDetail.prjNumStr}</Description>
              {/* <Description term="在岗工人"><span className={styles.span}>{projectDetail.currentWorkerNumber}</span>/{projectDetail.registWorkerNumber}</Description>
                    <Description term="工资异常">{projectDetail.payRollErrorNumber}</Description>
                    <Description term="工人投诉">{projectDetail.workerComplainNumber}</Description> */}
            </DescriptionList>
        </div>
        </Skeleton>
      </div>
    );
  }
}
