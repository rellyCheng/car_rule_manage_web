import React, { Component } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {Table,Card,Divider,Popconfirm, message,Button, Modal, Form} from 'antd';
import BrokeInfoForm from "./BrokeInfoForm"
import { connect } from 'dva';
@connect(({brokeManage}) => ({
  brokeManage
}))
export default class UserManage extends Component {
  // #TODO 1.违章列表 2.违章详情 弹窗 3.处理违章 点击处理 弹出选择用户页面 4.删除违章 5.修改违章
  state={
    openBrokeInfo:false,
    openEditBrokeInfo:false,
    filterVal:{}
  }
  componentDidMount(){
    this.fetchList();
  }
  fetchList=(current =1)=>{
    const {dispatch} = this.props;
    dispatch({
      type:'brokeManage/fetchBrokeList',
      payload:{
        current:current,
        size:2
      }
    })
  }
  editorBrokeInfo=(record)=>{
    this.setState({
      openEditBrokeInfo:true,
      record
    })
  }
  addBrokeInfo=()=>{
    this.setState({
      openBrokeInfo:true
    })
  }
  handleDelBrokeInfo=(record)=>{
    const {dispatch} = this.props;
    dispatch({
      type:'brokeManage/fetchDelBrokeInfo',
      payload:{
        brokeInfoId:record.id
      }
    })
    this.fetchList();
  }
  render() {
    const columns = [{
      title: '违章地址',  
      dataIndex: 'address',
      key: 'address',
    },{
      title: '违章日期',
      dataIndex: 'date',
      key: 'date',
    },{
      title: '违章车牌号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    },{
      title: '违章罚款金额',
      dataIndex: 'money',
      key: 'money',
    },{
      title: '违章类型',
      dataIndex: 'type',
      key: 'type',
    },{
      title: '违章等级',
      dataIndex: 'level',
      key: 'level',
    },{
      title: '扣除驾照的积分',
      dataIndex: 'points',
      key: 'points',
    },{
      title: '操作',
      key:'actiion',
      render: (text, record) => (
        <span>
           <a href="javascript:;" onClick={()=> this.editorBrokeInfo(record)}>编辑</a>
           <Divider type="vertical" />
           <a href="javascript:;" onClick={()=> this.dealBrokeInfo(record)}>处理违章</a>
            <Divider type="vertical" />
            <Popconfirm title="确认删除？" okText="确定" cancelText="取消"  onConfirm={() => this.handleDelBrokeInfo(record)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>  
      ),
    }];
    const {brokeManage} = this.props;
    console.log(brokeManage.brokeList.pageData)
    return (
      <div>
        <PageHeaderWrapper>
          <Card>
            <Card>
              {/* <UserListFilter _fetchList = {this.fetchList}/> */}
              <Button type="primary" onClick={this.addBrokeInfo}>添加违章</Button>
            </Card>
            <Table 
            dataSource={brokeManage.brokeList.pageData} 
            columns={columns} 
            rowKey="id"
            // loading={userListloading}
            pagination={{
              current: brokeManage.brokeList.pageCurrent,
              pageSize: brokeManage.brokeList.pageSize,
              total: brokeManage.brokeList.rowCount,
              showTotal: () => {
                return `共${brokeManage.brokeList.rowCount}条`;
              },
              showQuickJumper: true,
              onChange: current => {
                this.fetchList(current);
              }
            }}
            />
          </Card>
        </PageHeaderWrapper>

         <Modal
          title="添加违章信息"
          visible={this.state.openBrokeInfo}
          onCancel={()=>{
            this.setState({
              openBrokeInfo:false
            })
          }}
          width={1000}
          footer={null}
          destroyOnClose={true}
        >
         <BrokeInfoForm _this={this}/>
        </Modal>

        <Modal
          title="编辑违章信息"
          visible={this.state.openEditBrokeInfo}
          onCancel={()=>{
            this.setState({
              openEditBrokeInfo:false
            })
          }}
          width={1000}
          footer={null}
          destroyOnClose={true}
        >
         <BrokeInfoForm _this={this} record={this.state.record}/>
        </Modal>
      </div>
    );
  }
}
