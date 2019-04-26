import React, { Component } from 'react'
import {connect} from 'dva'

@connect(({accountManage,})=>({
    accountManage,
  }))
export default class LookWorker extends Component {
  render() {
      const {accountManage} = this.props
      console.log(accountManage.saveLookWorker)
    return (
      <div>
         <p>用户名：<span>{accountManage.saveLookWorker.userName}</span></p>
         <p>姓名：<span>{accountManage.saveLookWorker.realname}</span></p>
         <p>手机号：<span>{accountManage.saveLookWorker.phone}</span></p>
         <p>全国平台账号名称：<span>{accountManage.saveLookWorker.accountName}</span></p>
         <p> 上次登录时间：<span>{accountManage.saveLookWorker.lastLoginTime}</span></p>
         <p> 上次登录IP：<span>{accountManage.saveLookWorker.lastLoginIp}</span></p>
         <p> 企业名称：<span>{accountManage.saveLookWorker.companyName}</span></p>
         <p> 企业类型：<span> {accountManage.saveLookWorker.companyType}</span></p>
         <p> 当前角色：<span>{accountManage.saveLookWorker.roleEnum}</span></p>
      </div>
    )
  }
}
