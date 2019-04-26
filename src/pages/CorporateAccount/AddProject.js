import React, { Component } from 'react';
import { Form, Button, Input, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { connect } from 'dva';
@Form.create()
@connect(({ globalProject, loading }) => ({
  globalProject,
  loading: loading.effects['globalProject/fetchAddProject'],
}))
export default class AddProject extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.fetchAddProject(values);
      }
    });
  };
  fetchAddProject = values => {
    console.log(11);
    const { dispatch } = this.props;
    dispatch({
      type: 'globalProject/fetchAddProject',
      payload: values,
      callback: res => {
        console.log(res);
        if (res.state == 1) {
          message.success('添加成功');
          this.props._this.setState({
            projectvisible: false,
          });

          this.props._this.props._this.requestList();
        }
      },
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="平台项目编号" {...formItemLayout}>
            {getFieldDecorator('projectCode', {
              rules: [
                {
                  required: true,
                  message: '请输入平台项目编号',
                },
              ],
            })(<Input placeholder="请输入平台项目编号" />)}
          </Form.Item>
          <Form.Item label="项目密钥" {...formItemLayout}>
            {getFieldDecorator('key', {
              rules: [
                {
                  len: 32,
                  required: true,
                  message: '请输入32位项目密钥',
                },
              ],
            })(<Input placeholder="请输入项目密钥" />)}
          </Form.Item>
          <Form.Item label="总承包社会信用代码" {...formItemLayout}>
            {getFieldDecorator('corpCode', {
              rules: [
                {
                  required: true,
                  message: '请输入总承包单位社会统一信用代码',
                },
              ],
            })(<Input placeholder="请输入总承包单位社会统一信用代码" />)}
          </Form.Item>
          <span>温馨提示：平台项目编号和项目密钥请联系当地的项目监管部门获取</span>
          <div style={{ textAlign: 'center', padding: '20px 0 0 0' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                确定
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}
