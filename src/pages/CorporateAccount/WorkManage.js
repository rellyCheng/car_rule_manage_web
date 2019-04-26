import React, { Component } from 'react'
import router from 'umi/router';
import { Button,Input,Row,Col,Table, Modal, Form,Divider,message,Card,Popconfirm} from 'antd';
import {connect} from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddWork from './AddWork'
import LookWorker from './LookWorker'
@Form.create()
@connect(({accountManage})=>({
  accountManage
}))
export default class WorkManage extends Component {
  state = {
    visible: false,
    editorvisible:false,
    data:[],
    Lookvisible:false,
    filterVal:{pageIndex:1}
  }
  componentDidMount(){
    this.fetchWorkerList()
  }

  fetchWorkerList=(current=this.state.filterVal.pageIndex,values=this.state.filterVal)=>{
    const {dispatch} = this.props;
    values.pageIndex = current,
    values.pageSize = 10
    dispatch({
      type:'accountManage/fetchWorkerList',
      payload:values
    })
    this.setState({
      filterVal:values
    })
  }

  handleCreateAccount=()=>{
    const {accountManage} = this.props
    accountManage.accountManage={}
    this.setState({
      visible: true,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
      editorvisible:false,
      Lookvisible:false
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log( values);
        this.setState({
          filterVal:values
        })
        this.fetchWorkerList(1,values)
        // this.fetchSearchList(values)
        // const {dispatch} = this.props;
        // dispatch({
        //   type:'accountManage/fetchWorkerList',
        //   payload:{
        //     pageIndex:1,
        //     pageSize:10,
        //     realnameOrPhone:values
        //   }
        // })
      }
    });
  }
  fetchDelteWorker=(values)=>{
    console.log(values)
    const {dispatch} = this.props
    dispatch({
      type:'accountManage/fetchDelteWorker',
      payload:values,
      callback:res=>{
        if(res.state == 1){
          message.success("删除成功")
          this.fetchWorkerList()
        }
      }
    })
}
//查看
  handleLookWorker=(record)=>{
    console.log(record)
    const {dispatch} = this.props;
    dispatch({
      type:'accountManage/fetchLookWorker',
      payload:record
    })
    this.setState({
      Lookvisible:true
    })
  }
  //编辑
  handleEditor=(record)=>{
    const {accountManage} = this.props;
    accountManage.accountManage=record;
    this.setState({
      editorvisible:true
    })
  }
  //删除
  handleDelWorker=(record)=>{
    this.fetchDelteWorker(record)
  }
  render() {
    const columns = [{
        title: '员工姓名',
        dataIndex: 'realname',
        key:'realname'
      }, {
        title: '手机号码',  
        dataIndex: 'phone',
        key:'phone'
      }, {
        title: '所属角色',
        dataIndex: 'roleJid',
        key:'roleJid',
        render: (roleJid) => (
          <span>{roleJid=="2"?'一般管理员':roleJid=="1"?'超级管理员':roleJid=="3"?'匀视超级管理员':roleJid}</span>
        ),
      }, {
        title: '备注',
        dataIndex: 'remark',
        key:'remark'
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
            {/* <a href="javascript:;" onClick={()=>this.handleLookWorker(record)}>查看</a>
            <Divider type="vertical" /> */}
              <div style={{display:record.roleJid=="1"?'none':'block'}}>
                <a href="javascript:;" onClick={()=>this.handleEditor(record)} >编辑</a>  
                <Divider type="vertical" />
                <Popconfirm title="确认删除？" okText="确定" cancelText="取消"  onConfirm={() => this.handleDelWorker(record)}>
                <a href="javascript:;" >删除</a>
                </Popconfirm>
              </div>
            </span>
        ),
      }];   
    const { getFieldDecorator } = this.props.form;
    const {accountManage} = this.props;
    console.log(accountManage.saveWorkerList)
    return (
      <div>
          <PageHeaderWrapper title="员工管理">
          <Card bordered={false}>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span={5}>
                <Form.Item>  
                  {getFieldDecorator('realnameOrPhone')(
                      <Input placeholder="手机/姓名"/>
                  )}
                </Form.Item>
                </Col>
                <Col span={2} style={{marginLeft:'20px'}}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">搜索</Button>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={2}>
                  <Form.Item>
                  <Button type="primary"  onClick={this.handleCreateAccount}>创建账号</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Table 
            columns={columns} 
            rowKey="jid"
            dataSource={accountManage.saveWorkerList.result}
            pagination={{
              current:accountManage.saveWorkerList.current,
              pageSize:accountManage.saveWorkerList.size,
              total:accountManage.saveWorkerList.total,
              showTotal:()=>{
                return `共${accountManage.saveWorkerList.total}条`
              },
              showQuickJumper:true,
              onChange:(current)=>{
                this.setState({
                  current:current
                })
                this.fetchWorkerList(current);
              }
            }}
            />
          </Card>
          </PageHeaderWrapper>
          <Modal
            title="创建员工"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
            destroyOnClose
            maskClosable={false}
          >
            <AddWork _this={this}/>
          </Modal>

          <Modal
            title="编辑账号"
            visible={this.state.editorvisible}
            onCancel={this.handleCancel}
            footer={null}
            destroyOnClose
            maskClosable={false}
          >
             <AddWork _this={this}/>
          </Modal>

          <Modal
            title="查看"
            visible={this.state.Lookvisible}
            onCancel={this.handleCancel}
            footer={null}
            maskClosable={false}
          >
            <LookWorker/>
          </Modal>
      </div>
    )
  }
}
