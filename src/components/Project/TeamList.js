import React, { Component } from 'react';
import {Table, Modal,Divider,message,Popconfirm} from 'antd';
import Link from 'umi/link';
import  { hideColumn } from '@/utils/utils';
import TeamDetail from '@/components/Project/TeamDetail'
import TeamOut from './TeamOut'
import {connect} from 'dva'
import router from 'umi/router';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';

let Authorized = RenderAuthorized(getAuthority());

@connect(({globalProject,projectLocalUpload}) => ({
  globalProject,
  projectLocalUpload
}))

export default class TeamList extends Component {
  
  state={
    exitvisible:false
  }
  handleViewDetail=(record)=>{
    this.setState({
      record:record,
      openDetail:true
    })
  }

  handleModifyCountry=(record)=>{
    const { globalProject } = this.props;
    globalProject.teamInfo_Country=record;
    const projectCode = this.props._this.props.location.query.projectCode;
    const projectJid = this.props._this.props.location.query.projectJid;
    router.push(`${window.location.pathname}/projectTeamForm?projectJid=${projectJid}&projectCode=${projectCode}`);
  }
  handleModifyLocal=(record)=>{
    console.log(record)
    const { globalProject } = this.props;
    globalProject.teamInfo_Local=record;
    const projectJid = this.props._this.props.location.query.projectJid;
    router.push(`/project/addprojectteamform?projectJid=${projectJid}&teamJid=${record.jid}&mohurdData=${record.mohurdData}`);
  }
  //上传
  handleUploadLocal=(record)=>{
    console.log(record.jid)
    const projectJid = this.props._this.props.location.query.projectJid
    const {dispatch} = this.props;
    dispatch({
      type:'projectLocalUpload/fetchUploadTeam',
      payload: {
          projectJid:projectJid,
          jid:record.jid
      },
      callback:res=>{
        if(res.state ==1){
          message.success("上传成功!")
          this.props.fetchList()
        }else{
          message.error(res.message)
        }
      }
    }); 
  }
  //删除
  handleDelLocal=(record)=>{
    this.fetchDelTeam(record)
  }
  //删除班组
  fetchDelTeam=(record)=>{
    console.log(record)
    const {dispatch} = this.props
    const values = {}
    values.projectJid = record.projectJid,
    values.teamJid =  record.jid,
    dispatch({
      type:'projectLocalUpload/fetchDelTeam',
      payload:values,
      callback:res=>{
        if(res.state==1){
          message.success('删除成功！')
          this.props.fetchList()
        }
      }
    })
  }
  //退场
  handleExitLocal=(record)=>{
    this.setState({
      exitvisible:true
    })
  }
  render() {
    //班组列表
    const columns = [{
      title: '班组名称',
      dataIndex: 'teamName',
      key: 'teamName',
      render: (text, record) => (
        <span>
        <a href="javascript:;" onClick={()=> this.handleViewDetail(record)}>{text}</a>
        </span>
      ),
      }, {
      title: '进场日期',
      dataIndex: 'entryTime',
      key: 'entryTime',
      },{
      title: '退场日期',
      dataIndex: 'exitTime',
      key: 'exitTime',
      },{
      title:"所属企业",
      dataIndex: 'corpName',
      key: 'corpName',
      },{
      title:"责任人姓名",
      dataIndex: 'name',
      key: 'name',
      },{
      title:"责任人联系电话",
      dataIndex: 'linkPhone',
      key: 'linkPhone',
      },{
      title:"上传状态",
      dataIndex: 'status',
      key: 'status',
      show:this.props.portType=='国家'?false:true,
      render: (text, record) => (
        <span>{
          record.uploadState==0?'未上传':record.uploadState==1?'上传中':record.uploadState==2?'上传成功':record.uploadState==9?'上传失败':''
        }</span>
      )
      },
      // {
      // title: '班组详情',
      // key: 'teamDetail',
      // render: (text, record) => (
      //     <span>
      //     <a href="javascript:;" onClick={()=> this.handleViewDetail(record)}>查看</a>
      //     </span>
      // ),
      // },
      {
        title:'操作',
        key:'action',
        show:this.props.portType=='国家'?true:false,
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={()=> this.handleViewDetail(record)}>查看</a> 
          </span>
        )
      },
      {
        title:'操作',
        key:'action',
        show:(this.props.portType=='本地'&& this.props.mohurdData==true)?true:false,
        render: (text, record) => (
          <span>
            <Authorized authority={['A_super','B_winshe_super','A_worker']}>
              <a href="javascript:;" onClick={()=> this.handleModifyLocal(record)}>编辑</a>
              <span style={{display:record.mohurdData==false&&record.verified==true?'inline-block':'none'}}>
                <Divider type="vertical" />
                <a  href="javascript:;" onClick={()=> this.handleUploadLocal(record)}>上传</a>
              </span>
              <span style={{display:record.mohurdData==false?'inline-block':'none'}}>
                <Divider type="vertical" />
                <Popconfirm title="确认删除？" okText="确定" cancelText="取消"  onConfirm={() => this.handleDelLocal(record)}>
                  <a href="javascript:;">删除</a>
                </Popconfirm>
              </span>
              <Divider type="vertical" style={{display:'none'}}/>
              <a href="javascript:;" style={{display:'none'}} onClick={()=> this.handleExitLocal(record)}>退场</a>
            </Authorized>
          </span>
        )
      }
    ];
      hideColumn(columns);
      const {data,loading} = this.props;
    return (
      <div>
          <Table
              dataSource={data.teamMasterList.result}
              style={{ marginBottom: 24 }}
              pagination={{
              current:data.teamMasterList.current,
              pageSize:data.teamMasterList.size,
              total: parseInt(data.teamMasterList.total),
              showTotal:()=>{
                  return `共${data.teamMasterList.total}条`
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
              rowKey="jid"
              columns={columns} 
          />
            <Modal
              title="班组详情"
              width="65%"
              visible={this.state.openDetail}
              onCancel={()=>{
                this.setState({
                  openDetail:false
                })
              }}
              footer={null}
              maskClosable={false}
              destroyOnClose
            >
              <TeamDetail data={this.state.record}/>
            </Modal>
            <Modal
            title="班组退场"
            visible={this.state.exitvisible}
            onCancel={()=>{
              this.setState({
                exitvisible:false
              })
            }}
            footer={null}
          >
            <TeamOut _this={this}/>
          </Modal>
      </div>
    )
  }
}
