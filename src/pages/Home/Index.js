import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
@connect(({ login, loading }) => ({
  login,
}))
export default class Index extends Component {
  
  render() {
    const userInfo = this.props.login.userInfo;
    return (
        <div>
          <Card
            // title={`欢迎：${sessionStorage.getItem("name")}`}
            style={{ width: '100%',background:'#9E9E9E' }}
          >
            <div>
            <span style={{marginLeft:20}}>姓名：{userInfo.name} </span>
            <span style={{marginLeft:20}}>用户名：{userInfo.userName} </span>   
            <span  style={{marginLeft:20}}>年龄：{userInfo.age}</span>
            <span  style={{marginLeft:20}}>驾驶证号码：{userInfo.driverCardNumber}</span>
            <span  style={{marginLeft:20}}>驾驶证到期时间：{userInfo.driverCardNumberDate}</span>
            <span  style={{marginLeft:20}}>驾驶证剩余分数：{userInfo.points}</span>
            </div>
          </Card>
          <Card
            title="资讯"
            extra={<a target='_blank' href="http://www.122.cn/">更多</a>}
            style={{ width: '100%' }}
          >
          <iframe 
                style={{width:'100%', height:1000, overflow:'visible'}}
                ref="iframe" 
                src="http://www.122.cn/" 
                width="100%" 
                frameBorder="0"
            />
              </Card>
        </div>
    )
  }
}
