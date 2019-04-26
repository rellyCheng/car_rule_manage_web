import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, DatePicker, Button, Upload, Icon } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { isEmpty } from '@/utils/utils';
import moment from 'moment';
import { connect } from 'dva';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
@Form.create()
@connect(({ item, loading }) => ({
  item,
  loading: loading.effects['item/fetchAddWorkerContract'],
}))
export default class EmployeeCountryContractForm extends Component {
  state = {
    fileList: [],
    attachments: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch, record } = this.props;
        console.log(record);
        // 对时间的处理
        if (!isEmpty(values.startDate)) {
          values.startDate = moment(values.startDate).format('YYYY-MM-DD');
        } else {
          values.startDate = null;
        }
        if (!isEmpty(values.endDate)) {
          values.endDate = moment(values.endDate).format('YYYY-MM-DD');
        } else {
          values.endDate = null;
        }
        let contractList = [];
        values.corpName = record.corpName;
        values.corpCode = record.corpCode;
        values.idCardNumber = record.idCardNumber;
        values.idCardType = record.idCardType;
        contractList.push(values);
        let param = {};
        param.projectCode = record.projectCode;
        param.contractList = contractList;
        console.log(param);
        dispatch({
          type: 'item/fetchAddWorkerContract',
          payload: param,
          callback: res => {
            if (res.state == 1) {
              this.props._this.setState({
                openCountryEmployeeContractForm: false,
              });
            }
          },
        });
      }
    });
  };

  handleCancle = () => {
    history.go(-1);
  };

  handleChangeBase64 = file => {
    let attachments = [];
    if (file.fileList.length == 0) {
      form.setFieldsValue({
        ['attachments']: [],
      });
    }
    this.setState({
      fileList: file.fileList,
    });
    file.fileList.map((item, index) => {
      this.getBase64(item.originFileObj, imageUrl => {
        let imgObj = {};
        imgObj.name = file.file.name;
        imgObj.data = imageUrl;
        attachments.push(imgObj);
        const { form } = this.props;
        form.setFieldsValue({
          ['attachments']: attachments,
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ clear: 'both' }}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="合同期限类型">
                {getFieldDecorator('contractPeriodType', {
                  rules: [
                    {
                      required: true,
                      message: '请选择合同期限类型',
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }} placeholder="请选择合同期限类型">
                    <Option value="0">固定期限合同</Option>
                    <Option value="1">以完成一定工作为期限的合同</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="生效日期">
                {getFieldDecorator('startDate', {
                  rules: [{ required: true, message: '请选择生效日期' }],
                })(
                  <DatePicker
                    placeholder="请选择生效日期"
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="失效日期">
                {getFieldDecorator('endDate', {
                  rules: [{ required: true, message: '请选择失效日期' }],
                })(
                  <DatePicker
                    placeholder="请选择失效日期"
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="计量单位">
                {getFieldDecorator('unit', {
                  rules: [
                    {
                      required: false,
                      message: '请选择计量单位',
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }} placeholder="请选择计量单位">
                    <Option value="80">米</Option>
                    <Option value="81">平方米</Option>
                    <Option value="82">立方米</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="计量单价">
                {getFieldDecorator('unitPrice', {
                  rules: [
                    {
                      required: false,
                      pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                      message: '请填写计量单价',
                    },
                  ],
                  getValueFromEvent: event => {
                    return event.target.value.replace(/\D/g, '');
                  },
                })(<Input placeholder="请填写计量单价 单位：元" />)}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="合同附件">
                {getFieldDecorator('attachments', {
                  rules: [{ required: false, message: '请选择合同附件' }],
                })(
                  <Upload onChange={file => this.handleChangeBase64(file)} action="1">
                    {this.state.fileList.length >= 1 ? null : (
                      <Button>
                        <Icon type="upload" />
                        上传附件
                      </Button>
                    )}
                  </Upload>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8} offset={8} style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                提交
              </Button>
              <Button onClick={this.handleCancle}>取消</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
