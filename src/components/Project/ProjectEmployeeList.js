import React, { Component } from 'react'
import {Form,Card,Button,Tabs,Row,Col,Table, Divider, Modal,messageInput,message,Popconfirm} from 'antd';
import  { hideColumn } from '@/utils/utils';
import EmployeeContractDetail from '@/components/Project/EmployeeContractDetail';
import EmployeeCountryContractDetail from '@/components/Project/EmployeeCountryContractDetail';
import GoBackDetail from '@/components/Project/GoBackDetail';
import GoBackCountryDetail from '@/components/Project/GoBackCountryDetail';
import { isEmpty} from '@/utils/utils';
import GoBackForm from '@/components/Project/GoBackForm';
import GoBackCountryForm from '@/components/Project/GoBackCountryForm';
import EmployeeInfo from '@/components/Employee/EmployeeInfo';
import EmployeeCountryInfo from '@/components/Employee/EmployeeCountryInfo';
import EmployeeContractForm from'@/components/Project/EmployeeContractForm';
import EmployeeCountryContractForm from'@/components/Project/EmployeeCountryContractForm';
import router from 'umi/router';
import { connect } from 'dva'; 
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';

let Authorized = RenderAuthorized(getAuthority());
@connect(({item,itemUpdate,projectLocalUpload,project}) => ({
  item,
  itemUpdate,
  projectLocalUpload,
  project
}))
@Form.create()
export default class ProjectEmployeeList extends Component {
  state={
    openGoBackDetail:false,//管工查看进退场详情
    openCountryGoBackDetail:false,//国家查看进退场详情
    openContractDetail:false,//管工合同详情
    openCountryContractDetail:false,//国家合同详情
    openEmployeeDetail:false,//管工工人详情
    openCountryEmployeeDetail:false,//国家工人详情
    openEmployeeContractForm:false,
    openCountryEmployeeContractForm:false,
    openGoBackForm:false,
    openCountryGoBackForm:false,
    record:''
  }




  //查询合同列表（国家）
  fetchWorkerContractListCountry= (record) => {
    const {dispatch} = this.props;
    dispatch({
      type:'item/fetchWorkerContractList',
      payload: {
          projectCode:record.projectCode,
          idCardType:record.idCardType,
          idCardNumber:record.idCardNumber,
          current:1,
          size:10,
      },
    }); 
  };

  //查询进退场列表(国家)
  fetchWorkerEntryExitListCountry= (record) => {
    console.log(record)
    const {dispatch} = this.props;
    dispatch({
      type:'item/fetchWorkerEntryExitList',
      payload: {
          projectCode:record.projectCode,
          idCardType:record.idCardType,
          idCardNumber:record.idCardNumber,
          current:1,
          size:10,
      },
    }); 
  };

  //添加进退场（国家）
  handleAddGoBack_Country=(record)=>{  
    this.setState({
      openCountryGoBackForm:true,
      record:record
    })
  }
  //添加进退场（管工）
  handleAddGoBack_Local=(record)=>{
    //添加进退场
    this.setState({
      openGoBackForm:true,
      record:record
    })
  }

  //查看进退场详情（国家）
  handleViewGoBack_Country=(record)=>{
    this.setState({
      openCountryGoBackDetail:true,
    })
    console.log(record)
    this.fetchWorkerEntryExitListCountry(record);
  }
  //查看进退场详情(管工)
  handleViewGoBack_Local=(record)=>{
    this.setState({
      openGoBackDetail:true,
      record:record
    })
    console.log(record)
  }

  // 添加合同(国家)
  handleAddContract_Country=(record)=>{
    if (!isEmpty(record.entryTime)) {
        //添加合同
        this.setState({
          openCountryEmployeeContractForm:true,
          record:record
        })
    } else {
      message.error("请先添加进场时间")
    } 
  }
  // 添加合同(管工)
  handleAddContract_Local=(record)=>{
    this.setState({
      openEmployeeContractForm:true,
      record:record
    })
  }

  //查看合同详情(国家)
  handleViewContract_Country=(record)=>{  
    this.setState({
      openCountryContractDetail:true,
      record:record
    })
    this.fetchWorkerContractListCountry(record);
  }
  //查看合同详情(管工)
  handleViewContract_Local=(record)=>{
    this.setState({
      openContractDetail:true,
      record:record
    })
  }

  //查看工人信息详情（国家）
  handleViewEmployee_Country=(record)=>{  
    this.setState({
      openCountryEmployeeDetail:true,
      record:record
    })
  }
  //查看工人信息详情（管工）
  handleViewEmployee_Local=(record)=>{
    this.setState({
      openEmployeeDetail:true,
    })
    this.fetchProjectWorkerDetail(record.jid);
    this.fetchProjectEmployeeWorkerDetail(record.jid);
    this.fetchWorkerInfoWorkerDetail(record.jid);
  }

  //获取工人信息1
  fetchProjectWorkerDetail=(id)=>{
    const { dispatch} = this.props;
    dispatch({
      type: 'project/fetchProjectWorkerDetail',
      payload: {
        projectWorkerJid:id
      },
    });
  }
  //获取工人信息2
  fetchProjectEmployeeWorkerDetail=(id)=>{
    const { dispatch} = this.props;
    dispatch({
      type: 'project/fetchProjectEmployeeWorkerDetail',
      payload: {
        projectWorkerJid:id
      },
    });
  }
  //获取工人信息3
  fetchWorkerInfoWorkerDetail=(id)=>{
    const { dispatch} = this.props;
    dispatch({
      type: 'project/fetchWorkerInfoWorkerDetail',
      payload: {
        projectWorkerJid:id
      },
    });
  }




  // 编辑工人信息（国家）
  // handleEdit_Country=(record)=>{
  //   //修改工人信息
  //   router.push(`/countryPlatform/item/itemDetails/projectEmployeeForm?projectJid=${record.jid}`);
  // }

  // 编辑工人信息（管工）
  handleEdit_Local=(record)=>{  
    router.push(`/project/addprojectemployeeform?projectJid=${record.projectJid}&id=${record.jid}&workerJid=${record.workerJid}&mohurdData=${record.mohurdData}`);
  }
 
  //上传(管工)
  handleUpload=(record)=>{
    const projectJid = this.props._this.props.location.query.projectJid
    const {dispatch} = this.props;
    dispatch({
      type:'projectLocalUpload/fetchUploadProjectWorker',
      payload: {
          projectJid:projectJid
      },
    }); 
  }
  //删除（国家）
  handleDel_Country=(record)=>{

  }
  //删除（管工）
  handleDel_Local=(record)=>{
    console.log(record)
    this.fetchDelEmployee(record)
  }
  //删除工人
  fetchDelEmployee=(record)=>{
  
    const {dispatch} = this.props
    const values = {}
    values.projectJid = record.projectJid,
    values.workerJid = record.jid
    dispatch({
      type:'projectLocalUpload/fetchDelEmployee',
      payload:values,
      callback:res=>{
        if(res.state == 1){
          message.success("删除成功");
          this.props.fetchList()
        }
      }
    })
  }

 

  render() {
    const { getFieldDecorator} = this.props.form;
    //工人
    const columns4 = [
      {
      title: '工人姓名',
      dataIndex: 'workerName',
      key: 'workerName',
      show:this.props.portType=='国家'?true:false,
      // render: (text, record) => {
      //   return <a href="javascript:;" onClick={()=> this.handleViewEmployee_Country(record)}>{record.workerName}</a>
      // },
    },
    {
      title: '工人姓名',
      dataIndex: 'workerName',
      key: 'workerName',
      show:this.props.portType=='本地'?true:false,
      filterMultiple: false,
      sorter: (a, b) => {
        if( a.workerName>b.workerName) return 1;
        if( a.workerName<b.workerName) return -1;
      },  
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
          return <a href="javascript:;" onClick={()=> this.handleViewEmployee_Local(record)}>{record.workerName}</a>  
      },
    },
    {
      title:'进场时间',
      dataIndex: 'entryTime',
      key: 'entryTime',
    },
    {
      title:'退场时间',
      dataIndex: 'exitTime',
      key: 'exitTime',
    },
    {
      title:'工人类型',
      dataIndex: 'workerRoleStr',
      key: 'workerRoleStr',
      render: (text, record) => {
        return record.workerRoleStr ? record.workerRoleStr:'建筑工人'
      },
    },{
      title:'所属企业',
      dataIndex: 'corpName',
      key: 'corpName',
    },
    {
      title:'进退场信息',
      key:'GoBack',
      show:this.props.portType=='国家'?true:false,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleAddGoBack_Country(record)}>添加</a>
          <Divider type='vertical'/>
          <a href="javascript:;" onClick={()=> this.handleViewGoBack_Country(record)}>查看</a>
        </span>
      )
    },
    {
      title:'进退场',
      key:'GoBack',
      show:(this.props.portType=='本地'&& this.props.mohurdData==true)?true:false,
      render: (text, record) => (
        <span>
          <Authorized authority={['A_super','B_winshe_super','A_worker']}>
            <a href="javascript:;" onClick={()=> this.handleAddGoBack_Local(record)}>添加</a>
            <Divider type='vertical'/>
            <a href="javascript:;" onClick={()=> this.handleViewGoBack_Local(record)}>查看</a>
          </Authorized>
        </span>
      )
    },
    {
      title:'劳动合同',
      key:'contract',
      show:this.props.portType=='国家'?true:false,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleAddContract_Country(record)}>添加</a>
          <Divider type='vertical'/>
          <a href="javascript:;" onClick={()=> this.handleViewContract_Country(record)}>查看</a>
        </span>
      )
    },   
    {
      title:'劳动合同',
      key:'contract',
      show:(this.props.portType=='本地'&& this.props.mohurdData==true)?true:false,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleAddContract_Local(record)}>添加</a>
          <Divider type='vertical'/>
          <a href="javascript:;" onClick={()=> this.handleViewContract_Local(record)}>查看</a>
        </span>
      )
    },  
    {
      title:'上传状态',
      dataIndex: '',
      key: '',     
      show:this.props.portType=='本地'?true:false,
      render: (text, record) => (
        <span>{
          record.uploadState==0?'未上传':record.uploadState==1?'上传中':record.uploadState==2?'上传成功':record.uploadState==9?'上传失败':''
        }</span>
      )
    },  
    // {
    //   title:'操作',
    //   key:'action',
    //   show:this.props.portType=='国家'?true:false,
    //   render: (text, record) => {
    //     return <a href="javascript:;" onClick={()=> this.handleViewEmployee_Country(record)}>查看</a>
    //   },
    // }, 
    {
      title:'操作',
      key:'action',
      show:(this.props.portType=='本地'&& this.props.mohurdData==true)?true:false,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleEdit_Local(record)}>编辑</a>
          <span style={{display:record.mohurdData==false&&record.verified==true?'inline-block':'none'}}>
            <Divider type='vertical'/>  
            <a href="javascript:;" onClick={()=> this.handleUpload(record)}>上传</a>
          </span>
          <span style={{display:record.mohurdData?'none':'inline-block'}}>
            <Divider type='vertical'/>
            <Popconfirm title="确认删除？" okText="确定" cancelText="取消"  onConfirm={() => this.handleDel_Local(record)}>
            < a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        </span>
      )
    }, 
    ];
    hideColumn (columns4);
    const { data,loading,item,itemUpdate,project} = this.props;
    console.log(item)
    console.log(data.projectEmployeeList.result)
    return (
      <div>
        <Table
            dataSource={data.projectEmployeeList.result}
            style={{ marginBottom: 24 }}
            pagination={{
              current:data.projectEmployeeList.current,
              pageSize:data.projectEmployeeList.size,
              total: parseInt(data.projectEmployeeList.total),
              showTotal:()=>{
                  return `共${data.projectEmployeeList.total}条`
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
            rowKey="key"
            columns={columns4} 
        />
          {/* 国家进退场详情 */}
          <Modal title="进退场详情"  width="65%" maskClosable={false} visible={this.state.openCountryGoBackDetail} onCancel={()=>{this.setState({openCountryGoBackDetail:false})}} footer={null}>
            <GoBackCountryDetail data={item} _this={this} />           
          </Modal>
          {/* 管工进退场详情 */}
          <Modal title="进退场详情"  width="65%" maskClosable={false} visible={this.state.openGoBackDetail} onCancel={()=>{this.setState({openGoBackDetail:false})}} footer={null} destroyOnClose>
            <GoBackDetail data={item} _this={this} record={this.state.record}/>           
          </Modal>
          {/* 国家添加进退场弹窗 */}
          <Modal title="添加进退场"  destroyOnClose={true} maskClosable={false} visible={this.state.openCountryGoBackForm} onCancel={()=>{this.setState({openCountryGoBackForm:false})}} footer={null}>
            <GoBackCountryForm record={this.state.record} _this={this} fetchList={this.props.fetchList}/>
          </Modal>
          {/* 管工添加进退场弹窗 */}
          <Modal title="添加进退场"  destroyOnClose={true} maskClosable={false} visible={this.state.openGoBackForm} onCancel={()=>{this.setState({openGoBackForm:false})}} footer={null}>
            <GoBackForm record={this.state.record} _this={this} fetchList={this.props.fetchList}/>
          </Modal>

          {/* 国家合同详情*/}
          <Modal title="合同详情" width="65%" maskClosable={false} visible={this.state.openCountryContractDetail} onCancel={()=>{this.setState({openCountryContractDetail:false})}} footer={null} >
           <EmployeeCountryContractDetail data={item} _this={this} />
          </Modal>
          {/* 管工合同详情 */}
          <Modal title="合同详情" width="65%" destroyOnClose={true} maskClosable={false} visible={this.state.openContractDetail} onCancel={()=>{this.setState({openContractDetail:false})}} footer={null} >
           <EmployeeContractDetail data={item} _this={this} record={this.state.record}/>
          </Modal>
          {/* 国家添加合同 */}
          <Modal title="添加工人合同" maskClosable={false} destroyOnClose={true} width="50%" visible={this.state.openCountryEmployeeContractForm} onCancel={()=>{this.setState({openCountryEmployeeContractForm:false})}} footer={null} >
            <EmployeeCountryContractForm record={this.state.record} _this={this}/>
          </Modal>
          {/* 管工添加合同 */}
          <Modal title="添加工人合同" maskClosable={false} destroyOnClose={true} width="50%" visible={this.state.openEmployeeContractForm} onCancel={()=>{this.setState({openEmployeeContractForm:false})}} footer={null} >
            <EmployeeContractForm record={this.state.record} _this={this}/>
          </Modal>

          {/* 管工工人详情 */}
          <Modal title="工人信息详情" width="65%" maskClosable={false} visible={this.state.openCountryEmployeeDetail}onCancel={()=>{this.setState({openCountryEmployeeDetail:false})}} footer={null} >
          <EmployeeCountryInfo record={this.state.record}/>
          </Modal>
          {/* 国家工人详情 */}
          <Modal title="工人信息详情" width="65%" maskClosable={false} visible={this.state.openEmployeeDetail}onCancel={()=>{this.setState({openEmployeeDetail:false})}} footer={null} >         
            <EmployeeInfo data={data}/>
          </Modal>
      </div>
    )
  }
}
