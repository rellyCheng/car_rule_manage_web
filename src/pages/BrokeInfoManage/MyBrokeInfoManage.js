import React, { Component } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {Table,Card,Divider,Popconfirm, message,Button, Modal, Form} from 'antd';
import BrokenInfoFilter from './BrokeInfoFilter'
import { connect } from 'dva';
import BrokeInfoDetail from "./BrokeInfoDetail"
@connect(({brokeManage,loading}) => ({
  brokeManage,
  brokeListLoading:loading.effects['brokeManage/fetchBrokeList']
}))
export default class MyBrokeInfoManage extends Component {
    //  #TODO
    //     1.我的违章列表
    //     2.违章详情 
  state={
    current:1,
    filterVal:{},
    openBrokeDetailInfo:false
  }
  componentDidMount(){
    this.fetchList();
  }
  fetchList=(current = this.state.current,values = this.state.filterVal)=>{
    const {dispatch} = this.props;
    values.current = current;
    values.size = 10
    console.log(sessionStorage.getItem.userId)
    values.userId = sessionStorage.getItem('userId')
    dispatch({
      type:'brokeManage/fetchBrokeList',
      payload:values
    })
    this.setState({
      current,
      filterVal:values
    })
  }
  handleBrokeInfoDetail=(record)=>{
    this.setState({
       openBrokeDetailInfo:true,
       record
    })
   }
  render() {
    const columns = [{
      title: '违章地址',  
      dataIndex: 'address',
      key: 'address',
      render:(text,record)=>{
        return <span><a href='javascript:' onClick={()=>{this.handleBrokeInfoDetail(record)}}>{text}</a></span>
      }
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
    }];
    const {brokeManage,brokeListLoading} = this.props;
    console.log(brokeManage.brokeList.pageData)
    return (
      <div>
        <PageHeaderWrapper>
          <Card>
            <Card>
              <BrokenInfoFilter _fetchList = {this.fetchList}/>
            </Card>
            <Table 
            dataSource={brokeManage.brokeList.pageData} 
            columns={columns} 
            rowKey="id"
            loading={brokeListLoading}
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
          title="违章详情"
          visible={this.state.openBrokeDetailInfo}
          onCancel={()=>{
            this.setState({
              openBrokeDetailInfo:false
            })
          }}
          width={1000}
          footer={null}
          destroyOnClose={true}
        >
        <BrokeInfoDetail _this={this} record={this.state.record}/>
        </Modal>
      </div>
    );
  }
}
