import React, { Component } from 'react'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import AddCarInfoFrom from './AddCarInfoFrom'
import AddRepairFrom from './AddRepairFrom'
import LookRepairInfo from './LookRepairInfo'
import {connect} from 'dva'
import {Card, Table,Button,Divider,Modal,Popconfirm, message} from 'antd'

@connect(({ carManage }) => ({
  carManage
}))
export default class CarManage extends Component {
  state={
    openAddCarInfo:false,
    current:1,
    openAddRepairInfo:false,
    openLookRepairInfo:false
  }
  componentDidMount(){
    this.fetchList()
  }
  fetchList=(current = this.state.current)=>{
    console.log(current)
    const {dispatch} = this.props
    let values = {}
    values.current = current
    values.size = 10
    dispatch({
      type:'carManage/fetchCarInfoList',
      payload:values
    })
  }
  handleAddCarInfo=()=>{
    this.setState({
      openAddCarInfo:true
    })
  }
  handleEditorCarInfo=(record)=>{
    this.setState({
      record
    })
  }
  handleRemoveCarInfo=(record)=>{
    console.log(record.id)
    const {dispatch} = this.props;
    dispatch({
      type:'carManage/fetchDelCarInfo',
      payload:record.id,
      callback:res=>{
        if(res.state =="OK"){
          message.success("删除成功")
          this.fetchList()
        }else{
          message.error(res.message)
        }
      }
    })
  }
  handleAddRepair=(record) =>{//添加
    this.setState({
      openAddRepairInfo:true,
      record
    })
  }

  handleLookRepair=(record) =>{//查看
    this.setState({
      openLookRepairInfo:true,
      record
    })
  }
  render() {
    // 用户车辆管理
    // #TODO
    // 增删改查
    // 车辆详情维修记录
    const columns = [{
      title: '品牌',
      dataIndex: 'sign',
      key: 'sign',
    }, {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
    }, {
      title: '荷载人数',
      dataIndex: 'seatNum',
      key: 'seatNum',
    }, {
      title: '购买日期',
      dataIndex: 'buyDate',
      key: 'buyDate',
    },{
      title: '车辆类型',
      dataIndex: 'carType',
      key: 'carType',
    },{
      title: '车牌号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    },{
      title: '维修纪录',
      key: 'repair',
      render:(text,record)=>(
        <span>
          <a href="javascrip:" onClick = {()=>this.handleAddRepair(record)}>添加</a>
          <Divider type="vertical"/>
          <a href="javascrip:" onClick = {()=>this.handleLookRepair(record)}>查看</a>
        </span>
      )
    },{
      title: '操作',
      key: 'action',
      render:(text,record)=>(
        <span>
          {/* <a href='javascrip:' onClick={()=>this.handleEditorCarInfo(record)}>编辑</a>
          <Divider type="vertical" /> */}
          <Popconfirm title="你确定要删除?" onConfirm={()=>this.handleRemoveCarInfo(record)}  okText="是" cancelText="否">
            <a href='javascrip:'>删除</a>
          </Popconfirm>
        </span>
      )
    }];    
    const {carManage} = this.props
    return (
      <div>
         <PageHeaderWrapper>
           <Card>
              <Card>
                <Button type="primary" onClick={this.handleAddCarInfo}>添加车辆</Button>
              </Card>
              <Table 
               dataSource={carManage.carInfoList.pageData}
               rowKey="id"
               columns={columns}
               pagination={{
                 current:carManage.carInfoList.pageCurrent,
                 pageSize:carManage.carInfoList.size,
                 total: carManage.carInfoList.rowCount,
                 showTotal: () => {
                   return `共${carManage.carInfoList.rowCount}条`;
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
          title="添加车辆信息"
          visible={this.state.openAddCarInfo}
          onCancel={()=>{
            this.setState({
              openAddCarInfo:false
            })
          }}
          footer={null}
          destroyOnClose = {true}
          width={1000}
        >
          <AddCarInfoFrom _this={this} record={this.state.record}/>
        </Modal>

        <Modal
          title="添加维修记录"
          visible={this.state.openAddRepairInfo}
          onCancel={()=>{
            this.setState({
              openAddRepairInfo:false
            })
          }}
          footer={null}
          destroyOnClose = {true}
        >
          <AddRepairFrom _this={this} record={this.state.record}/>
        </Modal>

        <Modal
          title="查看维修记录"
          visible={this.state.openLookRepairInfo}
          onCancel={()=>{
            this.setState({
              openLookRepairInfo:false
            })
          }}
          footer={null}
          destroyOnClose = {true}
          width={700}
        >
          <LookRepairInfo record={this.state.record} />
        </Modal>
      </div>
    )
  }
}
