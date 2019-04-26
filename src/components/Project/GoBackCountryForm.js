import React, { Component } from 'react';
import { Form, Icon, Input, Button, Select, DatePicker, Upload, message, Divider } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import moment from 'moment';
import { isEmpty } from '@/utils/utils';
import { connect } from 'dva';
const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;
@connect(({ item, loading }) => ({
  item,
  loading: loading.effects['item/fetchAddWorkerEntryExit'],
}))
@Form.create()
export default class GoBackCountryForm extends Component {
  state = {
    fileList: [],
    voucher: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch, record } = this.props;
        console.log(record);
        console.log(values);
        // 对时间的处理
        if (!isEmpty(values.date)) {
          values.date = moment(values.date).format('YYYY-MM-DD');
        } else {
          values.date = null;
        }
        let workerList = {};
        workerList.idCardType = record.idCardType;
        workerList.idCardNumber = record.idCardNumber;
        workerList.date = values.date;
        workerList.type = values.type;
        workerList.voucher = values.voucher;
        let param = {};
        param.projectCode = record.projectCode;
        param.corpCode = record.corpCode;
        param.corpName = record.corpName;
        param.teamSysNo = record.teamSysNo;
        param.workerList = workerList;
        console.log(values);
        dispatch({
          type: 'item/fetchAddWorkerEntryExit',
          payload: param,
          callback: res => {
            if (res.state == 1) {
              this.props._this.setState({
                openCountryGoBackForm: false,
              });
              this.props.fetchList();
            }
          },
        });
      }
    });
  };

  handleCancle = () => {
    this.props._this.setState({
      openGoBackForm: false,
    });
  };

  beforeUpload = file => {
    const isLt50k = file.size / 1024 < 50;
    console.log(file.size);
    console.log(file.size);
    if (!isLt50k) {
      message.error('图片大小不能超过50KB!');
    }
  };

  //上传附件
  handleChangeBase64 = file => {
    const { form } = this.props;
    let voucher = '';
    if (file.fileList.length == 0) {
      form.setFieldsValue({
        ['voucher']: '',
      });
    }
    this.setState({
      fileList: file.fileList,
    });
    file.fileList.map((item, index) => {
      this.getBase64(item.originFileObj, imageUrl => {
        form.setFieldsValue({
          ['voucher']: imageUrl,
        });
      });
    });
  };

  getBase64 = (img, callback) => {
    const render = new FileReader();
    render.addEventListener('load', () => {
      callback(render.result);
    });
    render.readAsDataURL(img);
  };

  render() {
    const formItemLayout = {
      label: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapper: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { record, loading } = this.props;
    console.log(record);
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="类型">
            {getFieldDecorator('type', {
              initialValue: isEmpty(this.props.record.entryTime) ? '1' : '0',
              rules: [
                {
                  required: true,
                  message: '请选择类型',
                },
              ],
            })(
              <Select style={{ width: '100%' }} placeholder="请选择类型">
                <Option value="0">退场</Option>
                <Option value="1">进场</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="进退场日期">
            {getFieldDecorator('date', {
              rules: [{ required: true, message: '请选择进退场日期' }],
            })(
              <DatePicker
                placeholder="请选择进退场日期"
                format={dateFormat}
                style={{ width: '100%' }}
              />
            )}
          </Form.Item>
          <Form.Item label="凭证附件">
            {getFieldDecorator('voucher', {
              rules: [{ required: false, message: '请选择凭证附件' }],
            })(
              <Upload
                beforeUpload={this.beforeUpload}
                onChange={file => this.handleChangeBase64(file)}
                action="1"
              >
                {this.state.fileList.length >= 1 ? null : (
                  <Button>
                    <Icon type="upload" />
                    上传附件
                  </Button>
                )}
              </Upload>
            )}
          </Form.Item>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={this.handleCancle}>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
