import React, { Component } from 'react';
import { Card,List } from 'antd';
import { connect } from 'dva';
@connect(({ login, loading }) => ({
  login,
}))
export default class Index extends Component {
  
  render() {
    const userInfo = this.props.login.userInfo;
    const data = [
      {
        title: '安全驾驶',
        content:<div><a target="_blank" href="http://aqcx.122.cn/c/2016-06-07/613511.shtml"> 汛期暴雨多发 暴雨天行车应该注意</a><br/><a target="_blank" href="http://aqcx.122.cn/c/2015-07-31/609464.shtml">雨天也能让你的爱车安全“着陆”</a><br/><a target="_blank" href="http://aqcx.122.cn/c/2016-06-13/730403.shtml">暴雨来了 这份行车安全指南很重要</a></div>
      },
      {
        title: '文明出行',
        content:<div><a target="_blank" href="http://aqcx.122.cn/c/2016-02-09/679487.shtml">勿当儿戏！高速公路行车注意事项</a><br/><a target="_blank" href="http://aqcx.122.cn/c/2015-11-13/502886.shtml">教你五招躲避高速隐形杀手</a><br/><a target="_blank" href="http://aqcx.122.cn/c/2016-04-09/480434.shtml">高速公路大雾天气安全行车注意事项</a></div>
      },
      {
        title: '事故解析',
        content:<div><a target="_blank" href="http://aqcx.122.cn/c/2014-12-01/396390.shtml">新手在山区路行车时的安全注意事项</a><br/><a target="_blank" href="http://aqcx.122.cn/c/2015-05-29/501203.shtml">从恶习改起 新手上路安全驾车攻略</a><br/><a target="_blank" href="http://aqcx.122.cn/c/2014-07-15/405079.shtml">新手看过来 教你怎么开车不跑偏</a></div>
      },
      {
        title: '安全提示',
        content:<div><a target="_blank" href="http://aqcx.122.cn/c/2016-03-17/668712.shtml">雾霾天安全驾车指南 注意及时开雾灯</a><br/><a target="_blank" href="http://aqcx.122.cn/c/2016-10-09/749369.shtml">雾天行车注意警惕这五类危险路段</a><br/><a target="_blank" href="http://aqcx.122.cn/c/2016-01-15/638716.shtml">雾天行车需要牢记这9点安全原则</a></div>
      },
    ];
    const data1 = [
      {
        title: '安全驾驶',
        content:<div><a target="_blank" href="http://jgzx.122.cn/c/2015-05-08/567962.shtml"><img src="http://www.122.cn/upload/resources/image/2016/06/16/1920412.jpg"/></a></div>
      },
      {
        title: '文明出行',
        content:<div><a target="_blank" href="http://jgzx.122.cn/c/2014-12-22/484886.shtml"><img src="http://www.122.cn/upload/resources/image/2016/06/16/1920410.jpg"/></a></div>
      },
      {
        title: '事故解析',
        content:<div><a target="_blank" href="http://jgzx.122.cn/c/2014-12-22/484886.shtml">       <img src="http://www.122.cn/upload/resources/image/2019/05/10/14231756.jpg"/></a></div>
      },
      {
        title: '安全提示',
        content:<div><a target="_blank" href="http://zixun.122.cn/xwzx/jj/jjzt/ertonganquan.shtml"><img src="http://www.122.cn/upload/resources/image/2019/03/19/14231090.jpg"/></a></div>
      },
    ];
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


          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Card title={item.title}>{item.content}</Card>
              </List.Item>
            )}
            
          />

          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={data1}
            renderItem={item => (
              <List.Item>
                <Card>{item.content}</Card>
              </List.Item>
            )}
            
          />
        </div>

    )
  }
}
