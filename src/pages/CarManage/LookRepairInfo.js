import React, { Component } from 'react'
import {Table} from 'antd'
import {connect} from 'dva'

@connect(({carManage})=>({
    carManage
}))
export default class LookRepairInfo extends Component {
 componentDidMount(){
   this.fetchList()
 }
 fetchList=(current =1)=>{
    const {dispatch,record} = this.props
    let values = {}
    values.carId = record.id
    values.current=current
    values.size = 10
    dispatch({
       type:'carManage/fetchLookRepairInfo',
       payload:values
    })
 }
  render() {
    const columns = [{
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      }];
      const {carManage} = this.props
      console.log(carManage.repairInfo.pageData)
    return (
      <div>
          <Table
          dataSource={carManage.repairInfo.pageData}
          rowKey="id"
          columns={columns}
          pagination={{
              current:carManage.repairInfo.pageCurrent,
              pageSize:carManage.repairInfo.pageSize,
              total:carManage.repairInfo.totalPage,
              showTotal:()=>{
                  return `共${carManage.repairInfo.totalPage}条`
              },
              onChange:(current)=>{
                  this.fetchList(current)
              }
          }}
          />
      </div>
    )
  }
}
