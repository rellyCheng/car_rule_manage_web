import React, { Component } from 'react';
import { Select, Form, Input, Button, message } from 'antd';
import { connect } from 'dva';
@connect(({ global, loading, supermanage }) => ({
  global,
  supermanage,
  addloading: loading.effects['global/fetchAddPlatFormAccount'],
  modifyloading: loading.effects['global/fetchEditPlatFormAccount'],
}))
@Form.create()
export default class AddPlatFormAccountForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.corpName = sessionStorage.getItem('companyName');
        const { dispatch } = this.props;
        const record = this.props.record || {};
        values.accountJid = record.jid;
        if (record.jid != null) {
          this.fetchEditPlatFormAccount(values);
        } else {
          this.fetchAddPlatFormAccount(values);
        }
      }
    });
  };
  fetchEditPlatFormAccount = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchEditPlatFormAccount',
      payload: values,
      callback: res => {
        if (res.state == 1) {
          message.success('修改成功');
          const { dispatch } = this.props;
          this.fetchAllPlatFormAccountList();
          this.props._this.setState({
            openAddPlatFormAccount: false,
          });
        }
      },
    });
  };

  fetchAddPlatFormAccount = values => {
    console.log(values);
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchAddPlatFormAccount',
      payload: values,
      callback: res => {
        if (res.state == 1) {
          message.success('添加成功');
          dispatch({
            type: 'global/fetchPlatFormAccountList',
          });
          this.props._this.setState({
            openAddPlatFormAccount: false,
          });
        }
      },
    });
  };

  fetchAllPlatFormAccountList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'supermanage/fetchAllPlatFormAccountList',
      payload: {
        current: 1,
        size: 10,
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    const formTailLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12, offset: 6 },
    };
    const { global, supermanage, addloading, modifyloading } = this.props;
    const record = this.props.record || {};
    console.log(record);
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
          <Form.Item label="住建部登录账号">
            {getFieldDecorator('username', {
              initialValue: record.username,
              rules: [
                {
                  required: true,
                  message: 'Please input username',
                },
              ],
            })(<Input placeholder="住建部登录账号" />)}
          </Form.Item>
          <Form.Item label="住建部登录密码">
            {getFieldDecorator('password', {
              initialValue: record.password,
              rules: [
                {
                  required: true,
                  message: 'Please input password',
                },
              ],
            })(<Input type="password" placeholder="住建部登录密码" />)}
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={addloading || modifyloading}
            >
              提交申请
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
