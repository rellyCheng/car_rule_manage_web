import React, { Component } from 'react'
import {connect} from 'dva'
@connect(({account})=>({
  account
}))
export default class ToViewAccount extends Component {

  render() {
  const {account} = this.props;
  const roleEnum = account.saveLookUserAccount.roleEnum;
    return (
      <div>
        <p>账号名称：<span>{account.saveLookUserAccount.userName}</span></p>
        <p>姓名：<span>{account.saveLookUserAccount.realname}</span></p>
        <p>登录手机号：<span>{account.saveLookUserAccount.phone}</span></p>
        <p>账号类型：<span>{roleEnum==1?'企业超级管理员账号':roleEnum==4?'监管型账号(个人或企业的监理)':'区域监管账号(政府部门的监管)'}</span></p>
        <p style={{display: account.saveLookUserAccount.companyName?'block':'none'}}>企业名称：<span>{account.saveLookUserAccount.companyName}</span></p>
        <p style={{display: account.saveLookUserAccount.areaName?'block':'none' }}>监管区域名称：<span>{account.saveLookUserAccount.areaName }</span></p>
        <p style={{display: account.saveLookUserAccount.areaCode?'block':'none' }}>监管区域：<span>{account.saveLookUserAccount.areaCode  }</span></p>
      </div>
    )
  }
} 
