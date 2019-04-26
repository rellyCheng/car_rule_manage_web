import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, DatePicker, Button, Upload, Icon } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { isEmpty } from '@/utils/utils';
import moment from 'moment';
import token from '@/utils/token';
import { connect } from 'dva';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
@Form.create()
@connect(({ projectLocalUpload, loading }) => ({
  projectLocalUpload,
  loading: loading.effects['projectLocalUpload/fetchAddWorkerContract'],
}))
export default class EmployeeContractForm extends Component {
  state = {
    fileList: [],
    attachments: [],
  };

  fetchFileUpload = (file) => {
    console.log(file)
    if (file.file.status == 'done') {
      this.setState({
        fileList: file.fileList.length == 0 ? [] : file.fileList,
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {dispatch,record} = this.props;
        console.log(values)
        // console.log(record)
         // 对时间的处理
        if (!isEmpty(values.startDate)) {
            values.startDate = moment(values.startDate).format('YYYY-MM-DD');
        } else {
            values.startDate = null;
        }
        if (!isEmpty(values.endDate)) {
            values.endDate = moment(values.endDate).format('YYYY-MM-DD');
        } else {
            values.endDate  = null;
        }
        if(values.attachUrl.length){
          values.attachName = values.attachUrl[0].originFileObj.name
          values.attachUrl = values.attachUrl[0].response.data.path
        }
        values.teamJid = record.teamJid;
        values.workerJid = record.workerJid;
        values.projectJid = record.projectJid;
        values.corpJid = record.corpJid;
        values.projectCode = record.projectCode;
        values.corpCode = record.corpCode;
        values.corpName = record.corpName;
        values.idCardType= record.idCardType;
        values.idCardNumber= record.idCardNumber;
        values.projectWorkerJid = record.jid
        dispatch({
             type:'projectLocalUpload/fetchAddWorkerContract',
             payload:values,
             callback:(res)=>{
                if(res.state==1){
                    this.props._this.setState({
                        openEmployeeContractForm:false,
                    })
                }
             }
        })
      }
    });
  };

  handleCancle = () => {
    history.go(-1);
  };
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    this.setState({
      fileList: e.fileList,
    });
    return e && e.fileList;
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
    const params = {
      name: 'file',
      action:'/worker/manage/api/basicData/file/upload/compress',
      headers:{'Authorization':'Bearer '+token.get()},
    };
    const { getFieldDecorator } = this.props.form;
    const { record, loading } = this.props;
    console.log();
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
                {getFieldDecorator('attachUrl', {
                  initialValue: this.state.fileList,
                  getValueFromEvent: e => this.normFile(e),
                  rules: [{ required: false, message: '请选择合同附件' }],
                })(
                  <Upload 
                  onChange={(file)=>this.fetchFileUpload(file)}
                  data={{
                    desFileSize:50
                   }}
                  {...params}>
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
