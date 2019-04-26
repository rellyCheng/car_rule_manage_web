import React, { Component, isValidElement } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Button,
  Upload,
  Icon,
  Divider,
  Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import SelectPlatform from '@/components/Platform/SelectPlatform';
import SelectBanklist from '@/components/Platform/SelectBanklist';
import { isEmpty } from '@/utils/utils';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import moment from 'moment';
const confirm = Modal.confirm;
import { connect } from 'dva';
import styles from './Common.less';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';
@connect(({ item, loading }) => ({
  item,
  loading: loading.effects['item/fetchAddPayRoll'],
}))
@Form.create()
export default class WageForm extends Component {
  state = {
    fileList: [],
    attachments: [],
  };
  componentDidMount() {
    this.fetchTeamList();
  }

  //获取班组列表
  fetchTeamList = (page = 1) => {
    const { dispatch } = this.props;
    const projectCode = this.props.location.query.projectCode;
    dispatch({
      type: 'item/fetchTeamList',
      payload: {
        projectCode: projectCode,
        current: page,
        size: 10,
      },
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        const { dispatch, item } = this.props;
        const projectCode = this.props.location.query.projectCode;
        values.projectCode = projectCode;
        // 对时间的处理
        if (!isEmpty(values.payMonth, values.balanceDate, values.backPayMonth)) {
          values.payMonth = moment(values.payMonth).format('YYYY-MM');
          values.balanceDate = moment(values.balanceDate).format('YYYY-MM-DD');
          values.backPayMonth = moment(values.backPayMonth).format('YYYY-MM');
        } else {
          values.payMonth = null;
          values.balanceDate = null;
          values.backPayMonth = null;
        }
        let param = {};
        let arr = [];
        arr.push(values);
        param.detailList = arr;
        console.log(values);
        dispatch({
          type: 'item/fetchAddPayRoll',
          payload: values,
        });
      }
    });
  };

  cancel = () => {
    this.props.form.resetFields();
    history.go(-1);
  };
  handleCancle = () => {
    confirm({
      title: '放弃提交?',
      onOk() {
        history.go(-1);
      },
      onCancel() {},
    });
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
    const { item, loading } = this.props;
    console.log(item);
    let teamMasterList = item.teamMasterList.result || [];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.content}>
        <PageHeaderWrapper title="">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>工人工资</p>
                <p>
                  <span style={{ color: 'red' }}>*</span>
                  为必填项
                </p>
              </Col>
              <Divider />
              <Col span={8}>
                <Form.Item label="工人所属企业统一社会信用代码" className={styles.Formbox}>
                  {getFieldDecorator('corpCode', {
                    rules: [
                      {
                        required: true,
                        message:
                          '请输入工人所属企业统一社会信用代码，如果无统一社会信用代码，则填写组织机构代码',
                      },
                    ],
                  })(
                    <Input placeholder="请输入工人所属企业统一社会信用代码，如果无统一社会信用代码，则填写组织机构代码" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="工人所属企业名称" className={styles.Formbox}>
                  {getFieldDecorator('corpName', {
                    rules: [{ required: true, message: '请输入工人所属企业名称' }],
                  })(<Input placeholder="请输入工人所属企业名称" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="平台为班组分配的接入编号" className={styles.Formbox}>
                  {getFieldDecorator('teamSysNo', {
                    rules: [
                      {
                        required: true,
                        message: '请选择平台为班组分配的接入编号',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择平台为班组分配的接入编号">
                      {teamMasterList.map((item, index) => {
                        return (
                          <Option key={index} value={item.teamSysNo}>
                            {item.teamName}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="发放工资的月份" className={styles.Formbox}>
                  {getFieldDecorator('payMonth', {
                    // initialValue:
                    rules: [{ required: true, message: '请选择发放工资的月份' }],
                  })(
                    <MonthPicker
                      placeholder="请选择月份"
                      format={monthFormat}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="证件类型" className={styles.Formbox}>
                  {getFieldDecorator('idCardType', {
                    initialValue: '01',
                    rules: [{ required: true, message: '请选择证件类型' }],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择证件类型">
                      <Option value="01">身份证</Option>
                      <Option value="02">军官证</Option>
                      <Option value="03">武警警官证</Option>
                      <Option value="04">士兵证</Option>
                      <Option value="05">香军队离退休干部证</Option>
                      <Option value="06">残疾证</Option>
                      <Option value="07">残疾军人证（1-8级）</Option>
                      <Option value="08">护照</Option>
                      <Option value="09">港澳同胞回乡证</Option>
                      <Option value="10">港澳居民来往内地通行证</Option>
                      <Option value="11">中华人民共和国往来港澳通行证</Option>
                      <Option value="12">台湾居民来往大陆通行证</Option>
                      <Option value="13">大陆居民往来台湾通行证</Option>
                      <Option value="14">外交官证</Option>
                      <Option value="15">领事馆证</Option>
                      <Option value="16">海员证</Option>
                      <Option value="17">香港身份证</Option>
                      <Option value="18">台湾身份证</Option>
                      <Option value="19">澳门身份证</Option>
                      <Option value="20">外国人身份证件</Option>
                      <Option value="21">高校毕业生自主创业证</Option>
                      <Option value="22">就业失业登记证</Option>
                      <Option value="23">台胞证</Option>
                      <Option value="24">退休证</Option>
                      <Option value="25">离休证</Option>
                      <Option value="99">其他证件</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="证件号码" className={styles.Formbox}>
                  {getFieldDecorator('idCardNumber', {
                    rules: [{ required: true, message: '请填写证件号码' }],
                  })(<Input placeholder="请填写证件号码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="出勤天数（单位：天）" className={styles.Formbox}>
                  {getFieldDecorator('days', {
                    rules: [{ required: false, message: '请填写出勤天数' }],
                  })(<Input placeholder="请填写出勤天数" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="总工时（单位：小时）" className={styles.Formbox}>
                  {getFieldDecorator('workHours', {
                    rules: [{ required: false, message: '请填写总工时' }],
                  })(<Input placeholder="请填写总工时" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="工人工资卡号" className={styles.Formbox}>
                  {getFieldDecorator('payRollBankCardNumber', {
                    rules: [{ required: true, message: '请填写工人工资卡号' }],
                  })(<Input placeholder="请填写工人工资卡号" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                {/* 工人工资卡银行代码 */}
                <SelectBanklist
                  required={true}
                  getFieldDecorator={getFieldDecorator}
                  width={'80%'}
                  label="工人工资卡银行代码"
                />
              </Col>
              <Col span={8}>
                <Form.Item label="工人工资卡开户行名称" className={styles.Formbox}>
                  {getFieldDecorator('payRollBankName', {
                    rules: [{ required: true, message: '请填写工人工资卡开户行名称' }],
                  })(<Input placeholder="请填写工人工资卡开户行名称" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="工资代发银行卡号" className={styles.Formbox}>
                  {getFieldDecorator('payBankCardNumber', {
                    rules: [{ required: true, message: '请填写工资代发银行卡号' }],
                  })(<Input placeholder="请填写工资代发银行卡号" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="工资代发银行代码" className={styles.Formbox}>
                  {getFieldDecorator('payBankCode', {
                    rules: [{ required: true, message: '请填写工资代发银行代码' }],
                  })(<Input placeholder="请填写工资代发银行代码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="工资代发开户行名称" className={styles.Formbox}>
                  {getFieldDecorator('payBankName', {
                    rules: [{ required: true, message: '请填写工资代发开户行名称' }],
                  })(<Input placeholder="请填写工资代发开户行名称" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="应发金额（单位：元）" className={styles.Formbox}>
                  {getFieldDecorator('totalPayAmount', {
                    rules: [{ required: true, message: '请填写应发金额' }],
                  })(<Input placeholder="请填写应发金额" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="实发金额（单位：元）" className={styles.Formbox}>
                  {getFieldDecorator('actualAmount', {
                    rules: [{ required: true, message: '请填写实发金额' }],
                  })(<Input placeholder="请填写实发金额" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="是否为补发" className={styles.Formbox}>
                  {getFieldDecorator('isBackPay', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Select style={{ width: '100%' }} placeholder="请选择平台为班组分配的接入编号">
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="发放日期" className={styles.Formbox}>
                  {getFieldDecorator('balanceDate', {
                    rules: [{ required: true, message: '请选择发放日期' }],
                  })(
                    <DatePicker
                      placeholder="请选择发放日期"
                      format={dateFormat}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="补发月份" className={styles.Formbox}>
                  {getFieldDecorator('backPayMonth', {
                    rules: [{ required: false, message: '请选择补发月份' }],
                  })(
                    <MonthPicker
                      placeholder="请选择月份"
                      format={monthFormat}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="第三方工资单编号" className={styles.Formbox}>
                  {getFieldDecorator('thirdPayRollCode', {
                    rules: [{ required: true, message: '请填写第三方工资单编号' }],
                  })(<Input placeholder="请填写第三方工资单编号" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="工资单附件" className={styles.Formbox}>
                  {getFieldDecorator('attachments', {
                    rules: [{ required: true, message: '请选择工资单附件' }],
                  })(
                    <Upload onChange={file => this.handleChangeBase64(file)} action="1">
                      {this.state.fileList.length >= 5 ? null : (
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
            {/* <Row gutter={24} className={styles.FormContent}>
                            <Col span={24} className={styles.FormTitle}>
                                <p>将数据同步到全国建筑工人管理服务信息平台</p>
                            </Col>
                            <Divider/>
                            <Col span={8}>
                                <SelectPlatform getFieldDecorator={getFieldDecorator} />
                            </Col>
                        </Row> */}
            <div style={{ textAlign: 'center' }}>
              <Button
                style={{ margin: '0 100px 0 0', width: '100px' }}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                提交
              </Button>
              <Button style={{ width: '100px' }} onClick={() => this.handleCancle()}>
                取消
              </Button>
            </div>
          </Form>
        </PageHeaderWrapper>
      </div>
    );
  }
}
