import React, { Component } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {Table,Card,Divider,Popconfirm, message,Button} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
@connect(({userManage}) => ({
  userManage,
}))
export default class UserManage extends Component {
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type:'userManage/fetchUserInfo',
      payload:{
        current:1,
        size:10
      },
      callback:res=>{
        if(res.state ==1){
          message.success('删除成功')
        }else{
          message.error(res.message)
        }
      }
    })
  }
  handleDelUserInfo=(record)=>{
    const {dispatch} = this.props;
    dispatch({
      type:'userManage/fetchDelUserInfo',
      payload:record.userId
    })
  }
  addUserInfo=()=>{
    router.push('/userManage/addUserInfo')
  }
  editorUserInfo=(record)=>{
    router.push('/userManage/addUserInfo')  
  }
  render() {
    // 用户管理页面/只有拥有admin权限的才可以看到
    // #TODO
    // 1.用户列表
    // 2.删除用户
    // 3.编辑用户
    // 4.添加用户
    // 5.用户详情 弹窗
    // 5-1.用户违章记录

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },{
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },{
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },{
      title: '操作',
      key:'actiion',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.editorUserInfo(record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确认删除？" okText="确定" cancelText="取消"  onConfirm={() => this.handleDelUserInfo(record)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>  
      ),
    }];
    const {userManage} = this.props
    console.log(userManage.userInfo.pageData)
    return (
      <div>
        <PageHeaderWrapper>
          <Card>
           <Button type="primary" onClick={this.addUserInfo}>添加用户</Button>
            <Table 
            dataSource={userManage.userInfo.pageData} 
            columns={columns} 
            rowKey="id"/>
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}
