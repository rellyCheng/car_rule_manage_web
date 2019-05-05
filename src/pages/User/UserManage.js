import React, { Component } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {
  Table,
  Card,
  Divider,
  Popconfirm,
  message,
  Button,
  Modal,
  Form
} from "antd";
import { connect } from "dva";
import router from "umi/router";
import UserInfoForm from "./AddUserInfo";
import UserListFilter from "./UserListFilter";
@connect(({ userManage, loading }) => ({
  userManage,
  userListloading: loading.effects["userManage/fetchUserInfo"]
}))
export default class UserManage extends Component {
  state = {
    filterVal: {},
    current: 1
  };
  componentDidMount() {
    this.fetchList();
  }

  fetchList = (current = this.state.current, values = this.state.filterVal) => {
    const { dispatch } = this.props;
    values.current = current;
    values.size = 5;
    dispatch({
      type: "userManage/fetchUserInfo",
      payload: values
    });
    this.setState({
      current,
      filterVal: values
    });
  };
  handleDelUserInfo = record => {
    const { dispatch } = this.props;
    dispatch({
      type: "userManage/fetchDelUserInfo",
      payload: record.id,
      callback: res => {
        if (res.state == "OK") {
          this.fetchList();
        }
      }
    });
  };
  addUserInfo = () => {
    this.setState({
      openAddUserForm: true
    });
  };
  editorUserInfo = record => {
    this.setState({
      openEditUserForm: true,
      record
    });
  };
  render() {
    // 用户管理页面/只有拥有admin权限的才可以看到
    // #TODO
    // 1.用户列表
    // 2.删除用户
    // 3.编辑用户
    // 4.添加用户
    // 5.用户详情 弹窗
    // 5-1.用户违章记录

    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "性别",
        dataIndex: "sex",
        key: "sex"
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "用户名",
        dataIndex: "userName",
        key: "userName"
      },
      {
        title: "驾照分数",
        dataIndex: "points",
        key: "points"
      },
      {
        title: "操作",
        key: "actiion",
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.editorUserInfo(record)}>
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => this.handleDelUserInfo(record)}
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];
    const { userManage, userListloading } = this.props;
    console.log(userManage);

    return (
      <div>
        <PageHeaderWrapper>
          <Card>
            <Card>
              <UserListFilter _fetchList={this.fetchList} />
              <Button type="primary" onClick={this.addUserInfo}>
                添加用户
              </Button>
            </Card>

            <Table
              dataSource={userManage.userInfo.pageData}
              columns={columns}
              rowKey="id"
              loading={userListloading}
              pagination={{
                current: userManage.userInfo.pageCurrent,
                pageSize: userManage.userInfo.pageSize,
                total: userManage.userInfo.rowCount,
                showTotal: () => {
                  return `共${userManage.userInfo.rowCount}条`;
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
          title="添加用户"
          visible={this.state.openAddUserForm}
          onCancel={() => {
            this.setState({
              openAddUserForm: false
            });
          }}
          width={1000}
          footer={null}
          destroyOnClose={true}
        >
          <UserInfoForm _this={this} />
        </Modal>

        <Modal
          title="编辑用户"
          visible={this.state.openEditUserForm}
          onCancel={() => {
            this.setState({
              openEditUserForm: false
            });
          }}
          width={1000}
          footer={null}
          destroyOnClose={true}
        >
          <UserInfoForm _this={this} record={this.state.record} />
        </Modal>
      </div>
    );
  }
}
