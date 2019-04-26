import React, { Component } from 'react';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
const Option = Select.Option;
import SelectArea from '@/components/Platform/SelectArea';
import { connect } from 'dva';
@connect(({ supermanage, loading }) => ({
  supermanage,
  loading: loading.effects['supermanage/fetchAddBuildAccount'],
}))
@Form.create()
export default class BindingAccountForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const { record } = this.props;
        values.areaCode = values.areaCode[values.areaCode.length - 1];
        values.platformAccountJid = record.jid;
        this.fetchAddBuildAccount(values);
      }
    });
  };

  fetchAddBuildAccount = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'supermanage/fetchAddBuildAccount',
      payload: values,
      callback: res => {
        if (res.state == 1) {
          message.success('添加成功');
          const { dispatch } = this.props;
          this.fetchBuildAccountList();
          this.props._this.setState({
            openBindingAccountForm: false,
          });
        }
      },
    });
  };
  // 更新列表
  fetchBuildAccountList = () => {
    const { dispatch, record } = this.props;
    dispatch({
      type: 'supermanage/fetchBuildAccountList',
      payload: {
        size: 10,
        current: 1,
        accountJid: record.jid,
        userJid: record.userJid,
      },
    });
  };

  // 取消
  handleCancle = e => {};
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
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
    const { loading } = this.props;
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <SelectArea getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} />
          <Form.Item label="对接类型">
            {getFieldDecorator('appType', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select placeholder="请选择">
                <Option value="1">劳务企业</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="账号">
            {getFieldDecorator('appId', {
              rules: [{ required: true, message: '请输入账号' }],
            })(<Input placeholder="请输入账号" />)}
          </Form.Item>
          <Form.Item label="秘钥">
            {getFieldDecorator('appSecret', {
              rules: [{ required: true, message: '请输入秘钥' }],
            })(<Input type="password" placeholder="请输入秘钥" />)}
          </Form.Item>
          <Form.Item label="数据提交地址">
            {getFieldDecorator('commitURL', {
              rules: [{ required: true, message: '请输入数据提交地址' }],
            })(<Input placeholder="请输入数据提交地址" />)}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button style={{ margin: '0 50px 0 0' }} onClick={() => this.handleCancle()}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
