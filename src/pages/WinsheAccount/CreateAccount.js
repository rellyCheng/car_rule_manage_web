import React, { Component } from 'react';
import { Form, Select, Input, Button, Cascader, message } from 'antd';
import { connect } from 'dva';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import { isEmpty } from '@/utils/utils';
const { Option } = Select;
@Form.create()
@connect(({ account, global, loading }) => ({
  account,
  global,
  submitting: loading.effects['global/fetchbasicData'],
  addloading: loading.effects['account/fetchCreateAccount'],
  modifyloading: loading.effects['account/fetchUpdataAccout'],
}))
export default class CreateAccount extends Component {
  state = {
    displayregulatory: false,
    displaycorp: false,
    selectedItems: [],
    data: [],
    inputvalue: undefined,
    able: false,
  };
  componentDidMount() {
    this.fetchbasicData();
  }
  fetchbasicData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchbasicData',
    });
  };
  handleOnChange = e => {
    if (e === '5') {
      this.setState({
        displayregulatory: true,
        displaycorp: false,
      });
    } else if (e === '1') {
      //绑定企业
      this.setState({
        displaycorp: true,
        displayregulatory: false,
      });
    } else {
      this.setState({
        displaycorp: false,
        displayregulatory: false,
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.props.form.getFieldsValue().userRoleJid) {
      //编辑账号
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);
          this.fetchUpdataAccout(values);
        }
      });
    } else {
      //创建账号
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);
          this.fetchCreateAccout(values);
        }
      });
    }
  };
  handleChange = value => {
    console.log(value);
    this.fetchdropDownCorpList(value);
  };
  //获取企业列表
  fetchdropDownCorpList = value => {
    console.log(value);
    const { dispatch } = this.props;
    dispatch({
      type: 'account/fetchdropDownCorpList',
      payload: value,
    });
  };
  //创建账号
  fetchCreateAccout = values => {
    console.log(values);
    const { dispatch } = this.props;
    if (!isEmpty(values.company)) {
      values.companyJid = values.company.key;
      values.companyName = values.company.label;
    }

    if (!isEmpty(values.areaCode)) {
      let areaCode = values.areaCode;
      areaCode = areaCode[areaCode.length - 1];
      values.areaCode = areaCode;
    }
    if (!this.state.displaycorp) {
      delete values.company;
    }
    dispatch({
      type: 'account/fetchCreateAccount',
      payload: values,
      callback: res => {
        if (res.state == 1) {
          message.success('创建成功'),
            this.props._this.setState({
              visible: false,
            });
          const { dispatch } = this.props;
          this.fetchUserAccount();
        }
      },
    });
  };
  //修改账号
  fetchUpdataAccout = values => {
    const { dispatch, account } = this.props;
    values.companyJid = account.accountInfo.companyJid;
    values.userJid = account.accountInfo.jid;
    if (!isEmpty(values.company)) {
      values.companyJid = values.company.key;
      values.companyName = values.company.label;
    }
    if (!isEmpty(values.areaCode)) {
      let areaCode = values.areaCode;
      areaCode = areaCode[areaCode.length - 1];
      values.areaCode = areaCode;
    }
    if (!this.state.displaycorp) {
      delete values.company;
    }
    dispatch({
      type: 'account/fetchUpdataAccout',
      payload: values,
      callback: res => {
        if (res.state == 1) {
          message.success('修改成功'),
            this.props._this.setState({
              editorvisible: false,
            });
          const { dispatch, account } = this.props;
          this.props._this.fetchUserAccount();
        } else {
          message.error(res.message);
        }
      },
    });
  };
  handlePhoneChange = e => {
    const { dispatch } = this.props;
    const phone = e.target.value;
    if (phone.length == 11) {
      dispatch({
        type: 'account/fetchGetRealName',
        payload: phone,
        callback: res => {
          if (res.state == 1) {
            if (res.data !== null) {
              this.props.form.setFieldsValue({
                realname: res.data,
              });
            }
          }
        },
      });
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedItems } = this.state;
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
    const { account, addloading, modifyloading } = this.props;

    const options = account.dropDownCorpList.map(list => (
      <Option key={list.jid}>{list.companyName}</Option>
    ));
    let company = undefined;
    if (JSON.stringify(account.accountInfo) !== '{}') {
      company = { key: account.accountInfo.companyJid, label: account.accountInfo.companyName };
    }
    let accountInfo = account.accountInfo || {};
    let areaCodeList = accountInfo.areaCodeList || [];

    let displayAreaCode = false;
    if (this.state.displayregulatory || areaCodeList.length !== 0) {
      displayAreaCode = true;
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <span>基本信息</span>
          <Form.Item label="账号名称" {...formItemLayout}>
            {getFieldDecorator('userName', {
              initialValue: account.accountInfo.userName,
              rules: [
                {
                  required: true,
                  message: '请填写账号名称',
                },
              ],
            })(<Input placeholder="请填写账号名称" />)}
          </Form.Item>
          <Form.Item label="姓名" {...formItemLayout}>
            {getFieldDecorator('realname', {
              initialValue: account.accountInfo.realname,
              rules: [
                {
                  required: true,
                  message: '请填写使用人姓名',
                },
              ],
            })(<Input placeholder="请填写使用人姓名" />)}
          </Form.Item>
          <Form.Item label="登录手机号" {...formItemLayout}>
            {getFieldDecorator('phone', {
              initialValue: account.accountInfo.phone,
              rules: [
                {
                  len: 11,
                  required: true,
                  message: '请填写正确的手机号码',
                },
              ],
            })(<Input placeholder="请填写手机号码" onChange={this.handlePhoneChange} />)}
          </Form.Item>
          <span>账号属性</span>
          <Form.Item label="账号类型" {...formItemLayout}>
            {getFieldDecorator('roleJid', {
              initialValue: account.accountInfo.roleJid,
              rules: [
                {
                  required: true,
                  message: '请选择账号类型',
                },
              ],
            })(
              <Select
                placeholder="请选择账号类型"
                onChange={this.handleOnChange}
                disabled={account.accountInfo.roleJid ? true : false}
              >
                <Option value="1">企业超级管理员账号</Option>
                <Option value="4">监管型账号(个人或企业的监理)</Option>
                <Option value="5">区域监管账号(政府部门的监管)</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="监管区域"
            {...formItemLayout}
            style={{ display: displayAreaCode || areaCodeList.length !== 0 ? 'block' : 'none' }}
          >
            {getFieldDecorator('areaCode', {
              initialValue: displayAreaCode ? account.accountInfo.areaCodeList : undefined,
              rules: [
                {
                  required: this.state.displayregulatory,
                  message: '请选择监管区域',
                },
              ],
            })(<Cascader options={this.props.global.provinceCity} placeholder="请选择监管区域" />)}
          </Form.Item>
          <Form.Item
            label="绑定企业"
            {...formItemLayout}
            style={{
              display: this.state.displaycorp || account.accountInfo.companyName ? 'block' : 'none',
            }}
          >
            {getFieldDecorator('company', {
              initialValue: company,
              rules: [
                {
                  required: this.state.displaycorp || account.accountInfo.companyName,
                  message: '请填写绑定企业',
                },
              ],
            })(
              <Select
                placeholder="请搜索企业"
                labelInValue
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleChange}
                notFoundContent={null}
              >
                {options}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(
              'userRoleJid',
              {
                initialValue: account.accountInfo.userRoleJid,
              },
              {}
            )(<input style={{ display: 'none' }} />)}
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={addloading || modifyloading}>
                确定
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}
