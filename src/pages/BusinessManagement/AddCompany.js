import React, { Component } from 'react';
import { Button, Form, Row, Col, Input, Select, DatePicker, Icon, Divider, message } from 'antd';
import SelectPlatform from '@/components/Platform/SelectPlatform';
import SelectArea from '@/components/Platform/SelectArea';
import { isEmpty } from '@/utils/utils';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
import styles from './Common.less';
const { TextArea } = Input;
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
@Form.create()
@connect(({ business, loading, itemUpdate }) => ({
  business,
  loading: loading.effects['business/fetchAddBusiness'],
}))
export default class AddCompany extends Component {
  // 获取企业详情
  componentDidMount() {
    this.fetchBusinessListDetail();
  }
  // 企业信息描述
  fetchBusinessListDetail = () => {
    const { dispatch } = this.props;
    const corpJid = this.props.location.query.corpJid;
    dispatch({
      type: 'business/fetchBusinessListDetail',
      payload: {
        corpJid: corpJid,
      },
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        const { dispatch } = this.props;
        const corpJid = this.props.location.query.corpJid;
        values.corpJid = corpJid;
        values.areaCode = values.areaCode[values.areaCode.length - 1];
        dispatch({
          type: 'business/fetchAddBusiness',
          payload: values,
          callback: res => {
            console.log(res);
            if (res.state == 1) {
              message.success('提交成功');
              // history.go(-1);
              router.push(`/business`);
            } else {
              message.error(res.message);
            }
          },
        });
      }
    });
  };
  cancel = () => {
    history.go(-1);
  };

  render() {
    const formItemLayout = {
      //调整输入框label和输入框的比例
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { business, loading } = this.props;
    let { businessListDetail } = business;
    const corpJid = this.props.location.query.corpJid;
    if (isEmpty(corpJid)) {
      businessListDetail = {};
    }
    return (
      <div className={styles.content}>
        <Form onSubmit={this.handleSubmit} layout="vertical" className={styles.Form}>
          <Row gutter={24} className={styles.FormContent}>
            <Col span={24} className={styles.FormTitle}>
              <p>企业基本信息</p>
              <p>
                <span style={{ color: 'red' }}>*</span>
                为必填项
              </p>
            </Col>
            <Divider />
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="企业名称">
                {getFieldDecorator('corpName', {
                  initialValue: businessListDetail.corpName,
                  rules: [{ required: true, message: '请填写企业名称' }],
                })(<Input placeholder="请填写企业名称" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="统一社会信用代码">
                {getFieldDecorator('corpCode', {
                  initialValue: businessListDetail.corpCode,
                  rules: [{ required: true, message: '请填写统一社会信用代码!' }],
                })(<Input placeholder="请填写统一社会信用代码" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="企业登记注册类型">
                {getFieldDecorator('corpType', {
                  initialValue: businessListDetail.corpTypeStr,
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
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="工商营业执照注册号">
                {getFieldDecorator('licenseNum', {
                  initialValue: businessListDetail.licenseNum,
                })(<Input placeholder="请填写工商营业执照注册号" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* <Form.Item  className={styles.Formbox}  label="注册地区">
                {getFieldDecorator('areaCode',{
                  //  initialValue:itemUpdate.teamInfo.responsiblePersonIDCardType
                  rules: [{ required: true, message: '请填写注册地区编码!' }]
                })(
                    <Input placeholder="请填写注册地区编码" />
                )}
              </Form.Item>      */}
              <SelectArea
                getFieldDecorator={getFieldDecorator}
                label={'注册地区编码'}
                required={true}
                width={'80%'}
                areaCodeStr={['zhejiang', 'hangzhou', 'xihu']}
              />
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="企业营业地址">
                {getFieldDecorator('address', {
                  initialValue: businessListDetail.address,
                  rules: [{ required: true, message: '请填写企业营业地址!' }],
                })(<Input placeholder="请填写责任人证件号码" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="邮政编码">
                {getFieldDecorator('zipCode', {
                  initialValue: businessListDetail.zipCode,
                })(<Input placeholder="请填写邮政编码" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="法定代表人姓名">
                {getFieldDecorator('legalMan', {
                  initialValue: businessListDetail.legalMan,
                })(<Input placeholder="请填写法定代表人姓名" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="法定代表人职务">
                {getFieldDecorator('legalManDuty', {
                  initialValue: businessListDetail.legalManDuty,
                })(<Input placeholder="请填写法定代表人职务" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="法定代表人职称">
                {getFieldDecorator('legaManProTitle', {
                  initialValue: businessListDetail.legaManProTitle,
                })(<Input placeholder="请填写法定代表人职称" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="法定代表人证件类型">
                {getFieldDecorator('legalManIdCardType', {
                  initialValue: businessListDetail.legalManIdCardTypeStr,
                })(
                  <Select placeholder="请选择">
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
                {getFieldDecorator('legalManIdCardNumber', {
                  initialValue: businessListDetail.legalManIdCardNumber,
                })(<Input placeholder="请填写法定代表人证件号码" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="注册资本（万元）">
                {getFieldDecorator('regCapital', {
                  initialValue: businessListDetail.regCapital,
                })(<Input placeholder="请填写注册资本" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="实收资本（万元）">
                {getFieldDecorator('factRegCapital', {
                  initialValue: businessListDetail.factRegCapital,
                })(<Input placeholder="请填写实收入资本" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="资本币种">
                {getFieldDecorator('capitalCurrencyType', {
                  initialValue: businessListDetail.capitalCurrencyTypeStr,
                })(
                  <Select
                    placeholder="请选择资本币种"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="1">人民币</Option>
                    <Option value="2">美元</Option>
                    <Option value="3">日元</Option>
                    <Option value="4">欧元</Option>
                    <Option value="5">港币</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="注册日期">
                {getFieldDecorator('registerDate', {
                  initialValue:
                    businessListDetail.registerDate == undefined
                      ? null
                      : moment(businessListDetail.registerDate),
                  rules: [{ required: true, message: '请选择注册日期!' }],
                })(
                  <DatePicker placeholder="请选择" format={dateFormat} style={{ width: '100%' }} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="成立日期">
                {getFieldDecorator('establishDate', {
                  initialValue:
                    businessListDetail.establishDate == undefined
                      ? null
                      : moment(businessListDetail.establishDate),
                })(
                  <DatePicker placeholder="请选择" format={dateFormat} style={{ width: '100%' }} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="办公电话">
                {getFieldDecorator('officePhone', {
                  initialValue: businessListDetail.officePhone,
                })(<Input placeholder="请填写办公电话" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="传真号码">
                {getFieldDecorator('faxNumber', {
                  initialValue: businessListDetail.faxNumber,
                })(<Input placeholder="请填写传真号码" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="联系人姓名">
                {getFieldDecorator('linkman', {
                  initialValue: businessListDetail.linkman,
                })(<Input placeholder="请填写联系人姓名" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="联系人电话">
                {getFieldDecorator('linkTel', {
                  initialValue: businessListDetail.linkPhoneSecret,
                })(<Input placeholder="请填写联系人电话" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="企业邮箱">
                {getFieldDecorator('email', {
                  initialValue: businessListDetail.email,
                })(<Input placeholder="请填写企业邮箱" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="企业网址">
                {getFieldDecorator('website', {
                  initialValue: businessListDetail.website,
                })(<Input placeholder="请填写企业网址" />)}
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={24}>
            <Col span={8} offset={8} style={{textAlign:'center'}}>将数据同步到全国建筑工人管理服务信息平台</Col>
          </Row> */}
          <div className={styles.btnContent}>
            <Button type="primary" className={styles.btn1} htmlType="submit" loading={loading}>
              提交
            </Button>
            <Button className={styles.btn2} onClick={this.cancel}>
              取消
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
