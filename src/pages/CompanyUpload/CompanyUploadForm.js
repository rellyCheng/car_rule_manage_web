import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  Divider,
  Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { isEmpty, getAreaCode } from '@/utils/utils';
import styles from './Common.less';
import { connect } from 'dva';
import Link from 'umi/link';
const confirm = Modal.confirm;
import SelectPlatform from '@/components/Platform/SelectPlatform';
import SelectArea from '@/components/Platform/SelectArea';
@Form.create()
@connect(({ companyUpload, global, loading }) => ({
  companyUpload,
  global,
  loading: loading.effects['companyUpload/fetchAddCompany'],
}))
export default class CompanyUploadForm extends Component {
  state = {};
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.areaCode = values.areaCode[values.areaCode.length - 1];
        if (!isEmpty(values.registerDate)) {
          values.registerDate = values.registerDate.format('YYYY-MM-DD');
        }
        const { dispatch } = this.props;
        dispatch({
          type: 'companyUpload/fetchAddCompany',
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const { global, loading } = this.props;
    return (
      <div className={styles.content}>
        <PageHeaderWrapper>
          <Form onSubmit={this.handleSubmit} className={styles.Form}>
            <div className={styles.FormContent}>
              <Row gutter={24}>
                <Col span={24} className={styles.FormTitle}>
                  <p>企业基本信息</p>
                  <p>
                    <span style={{ color: 'red' }}>*</span>
                    为必填项
                  </p>
                </Col>
                <Col span={8}>
                  <Form.Item label="企业名称" className={styles.Formbox}>
                    {getFieldDecorator('corpName', {
                      // initialValue: item.submitProjectDetails.name,
                      rules: [{ required: true, message: '请填写企业名称' }],
                    })(<Input placeholder="请填写企业名称" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="统一社会信用代码" className={styles.Formbox}>
                    {getFieldDecorator('corpCode', {
                      // initialValue: item.submitProjectDetails.name,
                      rules: [{ required: true, message: '请填写统一社会信用代码' }],
                    })(<Input placeholder="请填写统一社会信用代码" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="企业登记注册类型">
                    {getFieldDecorator('corpType', {
                      // initialValue: item.submitProjectDetails.name,
                    })(
                      <Select
                        placeholder="请选择企业登记注册类型"
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="100">内资企业</Option>
                        <Option value="110">国有企业</Option>
                        <Option value="120">集体企业</Option>
                        <Option value="130">股份合作企业</Option>
                        <Option value="140">联营企业</Option>
                        <Option value="141">国有联营企业</Option>
                        <Option value="142">集体企业</Option>
                        <Option value="143">国有与集体联营企业</Option>
                        <Option value="149">其他联营企业</Option>
                        <Option value="150">有限责任公司</Option>
                        <Option value="151">国有独资公司</Option>
                        <Option value="159">其他有限责任公司</Option>
                        <Option value="160">股份有限公司</Option>
                        <Option value="170">私营企业</Option>
                        <Option value="171">私营独资企业</Option>
                        <Option value="172">私营合伙企业</Option>
                        <Option value="173">私营有限责任公司</Option>
                        <Option value="174">私营股份有限公司</Option>
                        <Option value="190">其他企业</Option>
                        <Option value="200">港、澳、台商投资企业</Option>
                        <Option value="210">合资经营企业（港或澳、台资）</Option>
                        <Option value="220">合作经营企业（港或澳、台资）</Option>
                        <Option value="230">港、澳、台商独资经营企业</Option>
                        <Option value="240">港、澳、台商投资股份有限公司</Option>
                        <Option value="290">其他港、澳、台商投资企业</Option>
                        <Option value="300">外商投资企业</Option>
                        <Option value="310">中外合资经营企业</Option>
                        <Option value="320">中外合作经营企业</Option>
                        <Option value="330">外资企业</Option>
                        <Option value="340">外商投资股份有限公司</Option>
                        <Option value="390">其他外商投资企业</Option>
                        <Option value="810">军队单位</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="工商营业执照注册号">
                    {getFieldDecorator('licenseNum', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写工商营业执照注册号" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  {/* areaCodeStr={['zhejiang', 'hangzhou', 'xihu']} */}
                  <SelectArea
                    getFieldDecorator={getFieldDecorator}
                    label={'注册地区编码'}
                    required={true}
                    width={'80%'}
                  />
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="企业营业地址">
                    {getFieldDecorator('address', {
                      // initialValue: item.submitProjectDetails.name,
                      rules: [{ required: true, message: '请选择企业营业地址' }],
                    })(<Input placeholder="请填写企业营业地址" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="邮政编码">
                    {getFieldDecorator('zipCode', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写邮政编码" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="法定代表人姓名">
                    {getFieldDecorator('legalMan', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写法定代表人姓名" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="法定代表人职务">
                    {getFieldDecorator('legalManDuty', {
                      // initialValue: item.submitProjectDetails.name,
                      rules: [{ required: false, message: '请输入法定代表人职务' }],
                    })(<Input placeholder="请填写法定代表人职务" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="法定代表人职称">
                    {getFieldDecorator('legaManProTitle', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写法定代表人职称" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="法定代表人证件类型">
                    {getFieldDecorator('legalManIDCardType', {
                      // initialValue: item.submitProjectDetails.name,
                      // initialValue: '01',
                    })(
                      <Select placeholder="法定代表人证件类型">
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
                  <Form.Item className={styles.Formbox} label="法定代表人证件号码">
                    {getFieldDecorator('legalManIDCardNumber', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写法定代表人证件号码" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="注册资本（万元）">
                    {getFieldDecorator('regCapital', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写注册资本" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="实收资本（万元）">
                    {getFieldDecorator('factRegCapital', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写实收资金" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="资本币种">
                    {getFieldDecorator('capitalCurrencyType', {
                      // initialValue: item.submitProjectDetails.name,
                    })(
                      <Select
                        placeholder="请选择资本币种"
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="CNY">人民币</Option>
                        <Option value="USD">美元</Option>
                        <Option value="JPY">日元</Option>
                        <Option value="EUR">欧元</Option>
                        <Option value="HKD">港币</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="注册日期">
                    {getFieldDecorator('registerDate', {
                      // initialValue:item.submitProjectDetails.startDate == undefined? null: moment(item.submitProjectDetails.startDate, dateFormat),
                      rules: [{ required: true, message: '请填写注册日期' }],
                    })(<DatePicker placeholder="请选择注册日期" style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="成立日期">
                    {getFieldDecorator('establishDate', {
                      // initialValue:item.submitProjectDetails.startDate == undefined? null: moment(item.submitProjectDetails.startDate, dateFormat),
                    })(<DatePicker placeholder="请选择成立日期" style={{ width: '100%' }} />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="办公电话">
                    {getFieldDecorator('officePhone', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写办公电话" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="传真号码">
                    {getFieldDecorator('faxNumber', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写传真号码" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="联系人姓名">
                    {getFieldDecorator('linkman', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写联系人姓名" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="联系人电话">
                    {getFieldDecorator('linkTel', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写联系人电话" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="企业邮箱">
                    {getFieldDecorator('email', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写企业邮箱" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.Formbox} label="企业网址">
                    {getFieldDecorator('website', {
                      // initialValue: item.submitProjectDetails.name,
                    })(<Input placeholder="请填写企业网址" />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* <Row gutter={24}>
                <Col span={8} offset={4} style={{ lineHeight: '44px',color:'green',fontSize:'12px'}}>
                    将数据同步到全国建筑工人管理服务信息平台
                </Col>
                <Col span={8}>
                  <SelectPlatform getFieldDecorator={getFieldDecorator} />
                  <Form.Item className={styles.form}>
                  {getFieldDecorator('projectJid', {
                    // initialValue: item.submitProjectDetails.jid,
                  })(<Input hidden />)}
                </Form.Item>
                </Col>
            </Row> */}
              <Row gutter={24} className={styles.btnContent} style={{ textAlign: 'center' }}>
                <Button className={styles.btn1} type="primary" htmlType="submit" loading={loading}>
                  提交
                </Button>
                <Button className={styles.btn2} onClick={() => this.handleCancle()}>
                  取消
                </Button>
              </Row>
            </div>
          </Form>
        </PageHeaderWrapper>
      </div>
    );
  }
}
