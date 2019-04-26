import React, { Component} from 'react'
import {Table,Modal,Divider,message,Popconfirm} from 'antd';
import  { hideColumn } from '@/utils/utils'
import router from 'umi/router';
import { connect } from 'dva';
import ProjectCorpDetail from '@/components/Project/ProjectCorpDetail'
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';

let Authorized = RenderAuthorized(getAuthority());
@connect(({ item,globalProject,projectLocalUpload,project}) => ({
  item,
  globalProject,
  projectLocalUpload,
  project
}))

export default class ProjectCorpList extends Component {
  state={
    projectCorpDetail:{}
  }
  //国家
  // handleLookCountry=(record)=>{
  //   console.log(record)
  // }
  //本地
  handleModifyLocal=(record)=>{
    const { globalProject } = this.props;
    globalProject.corpListInfo_Local=record;
    const projectJid = this.props._this.props.location.query.projectJid;
    router.push(`/project/addprojectcorpform?projectJid=${projectJid}&jid=${record.jid}&corpJid=${record.corpJid}`);
  }
  //上传
  handleuploadLocal=(record)=>{
    const projectJid = this.props._this.props.location.query.projectJid
    const {dispatch} = this.props;
    dispatch({
      type:'projectLocalUpload/fetchUploadContractor',
      payload: {
          projectJid:projectJid,
          jid:record.jid,
      },
      callback:res=>{
        if(res.state==1){
          message.success("上传成功")
          this.props.fetchList()
        }else{
          message.error(res.message)
        }
      }
    }); 
  }
  //删除
  handleDelLocal=(record)=>{
    this.fetchDelProjectCorpInfo(record)
  }
  //删除参建单位
  fetchDelProjectCorpInfo=(record)=>{
    console.log(record)
    const {dispatch} = this.props;
    const values={}
    values.projectJid = record.projectJid;
    values.projectCorpJid=record.jid
    dispatch({
      type:'projectLocalUpload/fetchDelProjectCorpInfo',
      payload:values,
      callback:res=>{
        if(res.state==1){
          message.success("删除成功!")
          this.props.fetchList()
        }
      }
    })
  }
  // 参建单位详情跳转
  handleCreateUnitDetail=(record)=>{
    console.log(record)
    this.setState({
      openCorpDetail:true,
      projectCorpDetail:record,
    })
  }

  
  // 参建单位修改跳转
  handleModify=(record)=>{
    router.push(`${window.location.pathname}/projectCorpForm?jid=${record.jid}`);
    const { item } = this.props;
    item.projectCorpDetail=record;
  }

  render() {
    // 参建单位
    const columns = [{
      title: '参建企业名称',
      dataIndex: 'corpName',
      key: 'corpName',
      render: (text, record) => (
      <span>
        <a href="javascript:;" onClick={()=> this.handleCreateUnitDetail(record)}>{text}</a>
      </span>
    ),
    },{
      title: '进场时间',
      dataIndex: 'entryTime',
      key: 'entryTime',
      },{
      title: '退场时间',
      dataIndex: 'exitTime',
      key: 'exitTime',
      },{
      title: '参建企业类型',
      key: 'corpType',
      render: (text, record) => (
        <span>{
          record.corpType=="001"?'专业分包':(record.corpType=="002")?"设备分包"
          :(record.corpType=="003")?"材料分包":(record.corpType=="004")?"后勤服务"
          :(record.corpType=="005")?"特殊设备":(record.corpType=="006")?"劳务分包"
          :(record.corpType=="007")?"监理":(record.corpType=="008")?"建设单位"
          :(record.corpType=="009")?"总承包单位":(record.corpType=="010")?"勘察"
          :(record.corpType=="011")?"设计单位":(record.corpType=="010")?'其它':''
        }</span>
      ),
     },{
      title: '上传状态',
      dataIndex: 'status',
      key: 'status',
      show:this.props.portType=='国家'?false:true,
      render: (text, record) =>(
        <span>{
          record.uploadState==0?'未上传':record.uploadState==1?'上传中':record.uploadState==2?'上传成功':record.uploadState==9?'上传失败':''
        }</span>
      )
      },
      // {
      //   title: '详情 ',
      //   key: 'details',
      //   // show:this.props.portType==1?true:false,
      //   render: (text, record) => (
      //     <span>
      //       <a href="javascript:;" onClick={()=> this.handleCreateUnitDetail(record)}>查看</a>
      //     </span>
      //   ),
      // },
    // {
    // title:"同步状态",
    // dataIndex:'syncStatus',
    // key:'syncStatus',
    // show:this.props.portType==1?false:true
    // },
    {
    title:'操作',
    key:'action',
    show:this.props.portType=='国家'?true:false,
    render: (text, record) => (
      <span>
        <a href="javascript:;" onClick={()=> this.handleCreateUnitDetail(record)}>查看</a>
      </span>
    ),
    },
    {
      
    title:'操作',
    key:'action',
    show:(this.props.portType=='本地'&& this.props.mohurdData==true)?true:false,
    render: (text, record) => (
      <span>
        {/* <a href="javascript:;" onClick={()=> this.handleViewFailReason(record)}>查看失败原因</a> */}
        <Authorized authority={['A_super','B_winshe_super','A_worker']}>
        <a href="javascript:;" onClick={()=> this.handleModifyLocal(record)}>编辑</a>
        {/* style={{display:record.verified ?'none':'inline-block'}} */}
        <span  style={{display:record.mohurdData==false&&record.verified==true?'inline-block':'none'}}>
          <Divider type="vertical" />
          <a  href="javascript:;" onClick={()=> this.handleuploadLocal(record)}>上传</a>
        </span>
        <span  style={{display:record.mohurdData?'none':'inline-block'}}>
          <Divider type="vertical" />
          <Popconfirm title="确认删除？" okText="确定" cancelText="取消"  onConfirm={() => this.handleDelLocal(record)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </span>
        </Authorized>
      </span>
    ),
    }
  ];
  hideColumn (columns)
  const { data,loading,item} = this.props;  
  console.log(data.projectDetail);
    return (
      <div>
         <Table
            dataSource={data.corpList.result}
            style={{ marginBottom: 24 }}
            pagination={{
              current:data.corpList.current,
              pageSize:data.corpList.size,
              total: parseInt(data.corpList.total),
              showTotal:()=>{
                  return `共${data.corpList.total}条`
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
            title="参建单位详情"
            width="65%"
            visible={this.state.openCorpDetail}
            onCancel={()=>{
              this.setState({
                openCorpDetail:false
              })
            }}
            footer={null}
            maskClosable={false}
          >
            <ProjectCorpDetail data={this.state.projectCorpDetail}/>
        </Modal>
    
      </div>
    )
  }
}
