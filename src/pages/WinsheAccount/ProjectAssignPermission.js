import React, { Component } from 'react';
import { Form, Input, Button, Select, List, Icon, Checkbox, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { connect } from 'dva';
import { allResolved } from 'q';
const { TextArea } = Input;
const Option = Select.Option;
@Form.create()
@connect(({ account, loading }) => ({
  account,
  loading: loading.effects['account/fetchassignedToProject'],
}))
export default class ProjectAssignPermission extends Component {
  state = {
    data: [],
    authList: [],
    submitButton: true,
  };
  componentDidMount() {
    const { dispatch, account } = this.props;
    dispatch({
      type: 'account/fetchProjectAssignedAccountList',
      payload: account.singleproject.jid,
      callback: res => {
        let list = res.map((item, index) => {
          let authList = [];
          let obj = {};
          obj.key = item.userRoleJid;
          obj.label = item.userName;
          if (item.selectPermission == 1) {
            authList.push('查看权');
            obj.canView = 1;
          }
          if (item.updatePermission == 1) {
            authList.push('编辑权');
            obj.canEdit = 1;
          }
          obj.authList = authList;
          return obj;
        });
        console.log(list);
        this.setState({
          data: list,
        });
      },
    });
  }
  handleChange = data => {
    let newlist = this.state.data;
    let flag = newlist.map(item => {
      if (item.key !== data.key) {
        return true;
      }
    });
    if (flag) {
      newlist.push(data);
    }
    this.setState({
      data: newlist,
      submitButton: false,
    });
  };

  handleDeselect = data => {
    let newlist = this.state.data;
    newlist.map((item, index) => {
      if (item.key == data.key) {
        newlist.splice(index, 1); //从index开始的第一个元素
      }
    });
    this.setState({
      data: newlist,
      submitButton: false,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        console.log(this.state.data);
        console.log(this.state.authList);

        const { dispatch } = this.props;
        let values = {};
        let arrList = [];
        this.state.authList.map((item, index) => {
          if (item !== null) {
            arrList.push(item);
          }
        });
        this.state.data.map((item, index) => {
          if (item.authList != null) {
            item.userRoleJid = item.key;
            arrList.push(item);
          }
        });
        (values.userDTOList = arrList), (values.projectJid = this.props.account.singleproject.jid);
        dispatch({
          type: 'account/fetchassignedToProject',
          payload: values,
          callback: res => {
            if (res.state == 1) {
              message.success('添加成功');
              this.props._this.setState({
                visible: false,
              });
            } else {
              message.error(res.message);
            }
          },
        });
      }
    });
  };
  onChangeCheckBox = (e, option) => {
    let canEdit = 0;
    let canView = 0;
    e.map((item, index) => {
      if (item === '编辑权') {
        canEdit = 1;
      }
      if (item === '查看权') {
        canView = 1;
      }
    });

    let obj = {};
    obj.canEdit = canEdit;
    obj.canView = canView;
    obj.userRoleJid = option.key;

    this.state.data.map(item => {
      console.log(item);
      if (item.key == obj.userRoleJid) {
        item.canEdit = obj.canEdit;
        item.canView = obj.canView;
        item.authList = e;
        return item;
      }
    });
    this.setState({
      submitButton: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;
    const { account, loading } = this.props;
    const plainOptions = ['编辑权', '查看权'];
    let arrObj = [];
    account.projectAssignedAccountList.map((item, index) => {
      let obj = {};
      obj.key = item.userRoleJid;
      obj.label = item.userName;
      arrObj.push(obj);
    });
    console.log(data);

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <p>将项目管理权限分配给以下员工</p>
          <Form.Item>
            {getFieldDecorator('work', {
              initialValue: arrObj,
            })(
              <Select
                labelInValue
                onSearch={this.handleOnSearch}
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择员工"
                onSelect={this.handleChange}
                onDeselect={this.handleDeselect}
              >
                {account.saveSuperviseList.map((item, index) => {
                  return (
                    <Option key={index} value={item.userRoleJid}>
                      {item.userName}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <List
              size="small"
              dataSource={this.state.data}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <a>
                      {getFieldDecorator(`workChecked[${index}]`, {
                        initialValue: item.authList,
                      })(
                        <Checkbox.Group
                          options={plainOptions}
                          onChange={e => this.onChangeCheckBox(e, item)}
                        />
                      )}
                    </a>,
                  ]}
                >
                  <List.Item.Meta title={item.label} />
                </List.Item>
              )}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Button
                disabled={this.state.submitButton}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                确定
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
