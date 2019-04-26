import React, { Component } from 'react'
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CreateAccount from './CreateAccount'
import ToViewAccount from './ToViewAccount'
import { Form ,Select,Input,Row,Col,Button, Table,Divider, Modal,message,Card,Popconfirm } from 'antd';
import { connect } from 'dva';
const { Option } = Select;
@Form.create()
@connect (({account,loading})=>({
  account,
  loading: loading.effects['account/fetchUserAccount'],
}))
export default class UserAccountManagement extends Component {
  state={
    visible:false,
    editorvisible:false,
    toViewvisible:false,
    data:[],
    current:1,
    filterVal:{pageIndex:1}
  }
  handleCreateAccount = () => {
    this.setState({
      visible: true,
    });
    const {account} = this.props;
    account.accountInfo={}
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
      editorvisible:false,
      toViewvisible:false
    });
  }
  handleToview=(record)=>{
    const {account,dispatch} = this.props;
    account.accountInfo=record;
    dispatch({
      type:'account/fetchLookUserAccount',
      payload:record
    })
    this.setState({
      toViewvisible:true
    })
  }
  handleEditor=(record)=>{
    const { account } = this.props;
    console.log(record)
    account.accountInfo=record;
    this.setState({
      editorvisible:true
    })
  }
  //查询
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      //  const {account} = this.props;
      //  account.saveQueryContent = values
      this.setState({
        filterVal:values
      })
      this.fetchUserAccount(1,values)
      }
    });
  } 
  handleRemoved=(record)=>{
    console.log(record)
   // 移出账号
    this.fetchRemoveAccount(record)
  }
  componentDidMount(){
    this.fetchUserAccount()
  }
  fetchUserAccount=(current= this.state.filterVal.pageIndex,values=this.state.filterVal)=>{
    const {dispatch} = this.props
    values.pageIndex = current;
    values.pageSize = 10;
    dispatch({
      type:'account/fetchUserAccount',
      payload:values
    })
    this.setState({
      filterVal:values
    })
  }
  //移出账号
  fetchRemoveAccount=(value)=>{
    console.log(value)
    const {dispatch} = this.props;
    dispatch({
      type:'account/fetchRemoveAccount',
      payload:value,
      callback:res=>{
        if(res.state==1){
          message.success("删除成功")
          const {account} = this.props
          this.fetchUserAccount()
        }else{
          message.error(res.message)
        }
      }
    })
  }
  
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
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '账号名称',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '姓名',
      dataIndex: 'realname',
      key: 'realname',
    }, {
      title: '绑定企业',
      dataIndex: 'companyName',
      key: 'companyName',
    }, {
      title: '登录手机号',
      dataIndex: 'phone',
      key: 'phone',
    },{
      title: '监管区域',
      dataIndex: 'areaName',
      key: 'areaName',
    }, {
      title: '账号类型',
      dataIndex: 'roleJid',
      key: 'roleEnum ',
      render:(roleJid)=>{
       return <span>{roleJid==1?'企业超级管理员账号':roleJid==4?'监管型账号':roleJid==3?'匀视超级管理员':'区域监管账号'}</span>
      }  
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
          <span>
          {/* <a href="javascript:;" onClick={()=>{this.handleToview(record)}}>查看</a>
          <Divider type="vertical" /> */}
          <a href="javascript:;" onClick={()=>{this.handleEditor(record)}}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确认删除？" okText="确定" cancelText="取消"  onConfirm={() => this.handleRemoved(record)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
          </span>
      ),
    }];
    const {account,loading} = this.props;
    // console.log(this.props.account.saveUserAccount.result)
    return (
      <div>
        <PageHeaderWrapper title="用户账号管理">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={5}>
              <Form.Item label="账号名称" {...formItemLayout}>
                {getFieldDecorator('userName')(
                    <Input placeholder="请输入账号名称"/>
                )}
              </Form.Item>
              </Col>
              <Col span={5}>
              <Form.Item label="姓名" {...formItemLayout}>
                {getFieldDecorator('realname')(
                    <Input placeholder="请输入姓名"/>
                )}
              </Form.Item>
              </Col>
              <Col span={5}>
              <Form.Item label="手机号" {...formItemLayout}>
                {getFieldDecorator('phone')(
                    <Input placeholder="请输入手机号"/>
                )}
              </Form.Item>
              </Col>
              <Col span={5}>
              <Form.Item label="账号类型" {...formItemLayout}>
                {getFieldDecorator('roleEnum')(
                    <Select placeholder="请选择账号类型 " allowClear>
                      <Option value="1">企业超级管理员账号</Option>
                      <Option value="4">监管型账号</Option>
                      <Option value="5">区域监管账号</Option>
                    </Select>
                )}
              </Form.Item>
              </Col>
              <Col span={2} style={{marginLeft:'10px'}}>
                  <Form.Item>
                  <Button type="primary" htmlType='submit'>查询</Button>
                  </Form.Item>
              </Col>
            </Row>
            <Row style={{marginBottom:'10px'}}>
              <Col span={2}>
                <Button type="primary" onClick={this.handleCreateAccount}>创建账号</Button> 
              </Col>
            </Row>
          </Form>
          <Table
          rowKey='userRoleJid'
          columns={columns}
          dataSource={this.props.account.saveUserAccount.result}
          pagination={{
            current:this.props.account.saveUserAccount.current,
            pageSize:this.props.account.saveUserAccount.size,
            total:this.props.account.saveUserAccount.total,
            showTotal:()=>{
              return `共${this.props.account.saveUserAccount.total}条`
            },
            showQuickJumper:true,
            onChange:(current)=>{
              this.setState({
                current:current
              })
              this.fetchUserAccount(current)
            }
          }}
          loading={loading}
        />
        </Card>
        </PageHeaderWrapper>
        <Modal
          title="创建账号"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <CreateAccount _this={this}/>
        </Modal>

        <Modal
          title="账号信息"
          visible={this.state.toViewvisible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          >
           <ToViewAccount/>
        </Modal>

        <Modal
          title="编辑账号"
          visible={this.state.editorvisible}
          onCancel={this.handleCancel}
          destroyOnClose
          footer={null}
          maskClosable={false}>
          <CreateAccount _this={this}/>
        </Modal>
      </div>
    )
  }
}

