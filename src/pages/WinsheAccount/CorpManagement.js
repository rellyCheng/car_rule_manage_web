import React, { Component } from 'react'
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CorpAssignPermission from './CorpAssignPermissions'
import { Form ,Input,Button, Row,Col, Select,Table,Modal,Cascader, Alert,Card,Divider} from 'antd';
import {connect} from 'dva';
import SelectArea from  '@/components/Platform/SelectArea';
import { isEmpty } from '@/utils/utils';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';

const Authorized = RenderAuthorized(getAuthority());
const {Option}=Select
@Form.create()

@connect(({ account,global,loading}) => ({
  account,
  global,
  loading: loading.effects['account/fetchCorpList'],
}))
export default class CorpManagement extends Component {
  state={
     visible:false,
     filterVal:{}
  }
  componentDidMount(){
    this.requestList();
    this.fetchbasicData();
  }
  requestList=(current=1,values=this.state.filterVal)=>{
    const { dispatch } = this.props;
    values.size = 10;
    values.current = current;
    dispatch({
      type: 'account/fetchCorpList',
      payload: values
    });                             
  }

  fetchbasicData=()=>{
    const { dispatch } = this.props;
    dispatch({
        type:'global/fetchbasicData',
    })
   }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  showModal = (record) => {
    const {dispatch} = this.props;
    const { account } = this.props;
    account.singleproject=record;
    dispatch({
      type:'account/fetchAreaSuperviseList'
    })
    this.setState({
      visible: true,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.setState({
        filterVal:values
      })
      if (!err) {
        values.area = !isEmpty(values.areaCode) ?  values.areaCode[values.areaCode.length - 1] : null ;
        this.requestList(1,values)  
      }
    });
  }
  handleaddCorpInfo=()=>{
    router.push(`${window.location.pathname}/addcompany`)
  }
  //进入企业详情页面
  businessdetails=(record)=>{
    console.log(record)
    router.push(`/business/businessdetails?corpJid=${record.jid}`)
  }
  // 编辑企业
  // handleEdit=(record)=>{
  //   router.push(`/business/addcompany?corpJid=${record.jid}`); 
  // }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: { 
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const columns = [{
      title: '企业名称',
      dataIndex: 'corpName',
      key: 'corpName',
      // render: (text, record) => 
      // <a href="javascript:;" 
      //  onClick={()=>this.businessdetails(record)} >
      //    {text}
      // </a>,
    }, {
      title: '企业登记注册类型',
      dataIndex: 'corpTypeStr',
      key: 'corpTypeStr',
    }, {
      title: '注册所在地',
      dataIndex: 'registPlace',
      key: 'registPlace',
    }, {
      title: '参建项目',
      dataIndex: 'joinProjectNumber',
      key: 'joinProjectNumber',
    },{
      title:'联系人姓名',
      dataIndex:'linkMan',
      key:'linkMan'
    },{
      title:'联系人电话',
      dataIndex:'linkPhone',
      key:'linkPhone'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
            <a href="javascript:;" style={{display:(account.saveCorpList.result.canView)==0?'none':'inline-block'}} onClick={()=> this.businessdetails(record)}>
            查看
            <Divider type='vertical'/>
            </a>
           <span >
            {/* <a href="javascript:;" onClick={()=> this.handleEdit(record)}>编辑</a>
            <Divider type='vertical'/> */}
            <Authorized authority="B_winshe_super">
            <a href="javascript:;" onClick={()=>this.showModal(record)}>分配给</a>
            </Authorized>
           </span>
        </span>
      ),
    }];
    const {account,loading} = this.props
    console.log(account.saveCorpList)
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <PageHeaderWrapper title="企业管理">
          <Card bordered={false} >
           <Form onSubmit={this.handleSubmit}>
             <Row>
               <Col span={6}>
                <Form.Item label="企业名称" {...formItemLayout}>
                  {getFieldDecorator('corpName')(
                      <Input placeholder="请输入企业名称"/>
                  )}
                </Form.Item>
               </Col>
               <Col span={6}>
                  {/* <SelectArea   getFieldDecorator={getFieldDecorator}/> */}
                  <SelectArea label = {"企业所在地"} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
               </Col>
               
               <Authorized authority="D_area_supervise" >
                <Col span={6}>
                  <Form.Item label="来源" {...formItemLayout}>
                    {getFieldDecorator('sourceType')(
                        <Select placeholder="请选择注册来源" allowClear>
                          <Option value="1">注册地在本区域内</Option>
                          <Option value="2">项目在本区域内</Option>
                          <Option value="3">系统分配</Option>
                        </Select>
                    )}
                  </Form.Item>
                </Col>
               </Authorized>               
               <Col span={6} style={{paddingLeft:'20px'}}>
                  <Button type="primary" htmlType='submit' style={{marginRight:'20px'}}>查询</Button>
                  {/* <Button type="primary" onClick={this.handleaddCorpInfo}>添加企业信息</Button> */}
               </Col>
             </Row>
           </Form>
           <Table columns={columns}
              dataSource={account.saveCorpList.result}
              pagination={{
                current:account.saveCorpList.current,
                pageSize:account.saveCorpList.size,
                total:parseInt(account.saveCorpList.total),
                showTotal:()=>{
                    return `共${account.saveCorpList.total}条`
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
              />
            </Card>
           <Modal
            title="分配权限"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
            destroyOnClose={true}
            maskClosable={false}
          >
            <CorpAssignPermission _this={this}/>
          </Modal>
        </PageHeaderWrapper>
      </div>
    )
  }
}
