import React, { Component } from 'react';
import { Form, Input, Button, Select, List, Checkbox, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { connect } from 'dva';
const { TextArea } = Input;
const Option = Select.Option;
@Form.create()
@connect(({ account, loading }) => ({
  account,
  loading: loading.effects['account/assignedToProject2'],
}))
export default class ProjectAssignPermission extends Component {
  state = {
    selectedItems: [],
    submitButton: true,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { account } = this.props;
    dispatch({
      type: 'account/fetchAlreadyExsitAccountList',
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
          obj.companyJid = sessionStorage.getItem('companyJid');
          obj.authList = authList;
          return obj;
        });
        console.log(list);
        this.setState({
          selectedItems: list,
        });
      },
    });
  }
  handleChange = selectedItems => {
    let newlist = this.state.selectedItems;
    let flag = newlist.map(item => {
      if (item.key !== selectedItems.key) {
        return true;
      }
    });
    if (flag) {
      newlist.push(selectedItems);
    }
    this.setState({
      selectedItems: newlist,
      submitButton: false,
    });
  };
  handleDeselect = selectedItems => {
    let newlist = this.state.selectedItems;
    newlist.map((item, index) => {
      if (item.key == selectedItems.key) {
        newlist.splice(index, 1); //从index开始的第一个元素
      }
    });
    this.setState({
      selectedItems: newlist,
      submitButton: false,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        let arrList = [];
        this.state.selectedItems.map((item, index) => {
          if (item.authList != null) {
            item.userRoleJid = item.key;
            arrList.push(item);
          }
        });
        console.log(arrList);
        const values = {};
        (values.userDTOList = arrList), (values.projectJid = this.props.account.singleproject.jid);
        dispatch({
          type: 'account/assignedToProject2',
          payload: values,
          callback: res => {
            if (res.state == 1) {
              this.props._this.setState({
                visible2: false,
              });
              message.success('添加成功');
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

    // let arr =this.state.authList;
    let obj = {};
    obj.canEdit = canEdit;
    obj.canView = canView;
    obj.userRoleJid = option.key;

    this.state.selectedItems.map(item => {
      if (item.key == obj.userRoleJid) {
        item.canEdit = obj.canEdit;
        item.canView = obj.canView;
        item.companyJid = sessionStorage.getItem('companyJid');
        item.authList = e;
        return item;
      }
    });
    this.setState({
      submitButton: false,
    });
  };
  render() {
    const { account, loading } = this.props;
    console.log(account.allWorkerList);
    const { getFieldDecorator } = this.props.form;
    const { selectedItems } = this.state;
    const options = ['编辑权', '查看权'];
    let arrObj = [];
    account.alreadyExsitAccountList.map((item, index) => {
      let obj = {};
      obj.key = item.userRoleJid;
      obj.label = item.userName;
      arrObj.push(obj);
    });
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <p>将项目管理权分配给以下角色</p>
          <Form.Item>
            {getFieldDecorator('work', {
              initialValue: arrObj,
            })(
              <Select
                labelInValue
                placeholder="请选择角色"
                mode="multiple"
                onSelect={this.handleChange}
                onDeselect={this.handleDeselect}
                style={{ width: '100%' }}
              >
                {account.allWorkerList.map((item, index) => {
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
              dataSource={selectedItems}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <a>
                      {getFieldDecorator(`workChecked[${index}]`, {
                        initialValue: item.authList,
                      })(
                        <Checkbox.Group
                          options={options}
                          onChange={e => this.onChangeCheckBox(e, item)}
                        />
                      )}
                    </a>,
                  ]}
                >
                  <List.Item.Meta title={'角色名：' + item.label} />
                </List.Item>
              )}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                disabled={this.state.submitButton}
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
