import React, { Component } from 'react';
import { Button, Form, Row, Col, Input, Select, DatePicker, Modal, Divider, message } from 'antd';
import styles from './Common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SelectPlatform from '@/components/Platform/SelectPlatform';
import moment from 'moment';
import { connect } from 'dva';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const confirm = Modal.confirm;
@Form.create()
@connect(({ item, loading, itemUpdate }) => ({
  item,
  itemUpdate,
  loading: loading.effects['item/fetchAddProjectCorp'],
}))
export default class ProjectCorpForm extends Component {
  componentDidMount() {
    this.fetchCompanyUploadlist();
  }
  //获取企业列表
  fetchCompanyUploadlist = () => {
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'itemUpdate/fetchCompanyUploadlist',
      payload: {
        projectJid: projectJid,
        current: 1,
        size: 10,
      },
    });
  };
  //获取参建单位列表
  fetchCorpList = (page = 1) => {
    const { dispatch } = this.props;
    const projectCode = this.props.location.query.projectCode;
    dispatch({
      type: 'item/fetchCorpList',
      payload: {
        projectCode: projectCode,
        current: page,
        size: 50,
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
        values.projectJid = item.projectJid;
        dispatch({
          type: 'item/fetchAddProjectCorp',
          payload: values,
          callback: res => {
            console.log(res);
            if (res.state == 1) {
              message.success('添加成功');
              this.fetchCorpList(); //更新参加单位列表
              history.go(-1);
            } else {
              message.error(res.message);
            }
          },
        });
      }
    });
  };
  // 选择企业的点击事件
  handleCorpName = e => {
    console.log(e);
    form.setFieldsValue({
      corpCode: e.key,
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
    const { item, itemUpdate, loading } = this.props;
    console.log(itemUpdate);
    const companyUploadList = itemUpdate.companyUploadList.result || [];
    return (
      <div className={styles.content}>
        <PageHeaderWrapper title="">
          <Form onSubmit={this.handleSubmit} layout="vertical" className={styles.Form}>
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>参建单位信息</p>
                <p>
                  <span style={{ color: 'red' }}>*</span>
                  为必填项
                </p>
              </Col>
              <Divider />
              <Col span={8}>
                <Form.Item label="参建企业名称" className={styles.Formbox}>
                  {getFieldDecorator('corpName', {
                    initialValue: item.projectCorpDetail.corpName,
                    rules: [{ required: true, message: '请填写企业名称!' }],
                  })(<Input placeholder="请填写企业名称" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="统一社会信用代码" className={styles.Formbox}>
                  {getFieldDecorator('corpCode', {
                    initialValue: item.projectCorpDetail.corpCode,
                    rules: [{ required: true, message: '请填写统一社会信用代码!' }],
                  })(<Input placeholder="请填写统一社会信用代码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="参建企业类型" className={styles.Formbox}>
                  {getFieldDecorator('corpType', {
                    initialValue: item.projectCorpDetail.corpType,
                    rules: [{ required: true, message: '请选择企业类型!' }],
                  })(
                    <Select placeholder="请选择企业类型">
                      <Option value="001">专业分包</Option>
                      <Option value="002">设备分包</Option>
                      <Option value="003">材料分包</Option>
                      <Option value="004">后勤服务</Option>
                      <Option value="005">特殊设备</Option>
                      <Option value="006">劳务分包</Option>
                      <Option value="007">监理</Option>
                      <Option value="008">建设单位</Option>
                      <Option value="009">总承包单位</Option>
                      <Option value="010">勘察</Option>
                      <Option value="011">设计单位</Option>
                      <Option value="012">其它</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="进场时间" className={styles.Formbox}>
                  {getFieldDecorator('entryTime', {
                    initialValue:
                      item.projectCorpDetail.entryTime == undefined
                        ? null
                        : moment(item.projectCorpDetail.entryTime),
                  })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="退场时间" className={styles.Formbox}>
                  {getFieldDecorator('exitTime', {
                    initialValue:
                      item.projectCorpDetail.exitTime == undefined
                        ? null
                        : moment(item.projectCorpDetail.exitTime),
                  })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="项目经理名称" className={styles.Formbox}>
                  {getFieldDecorator('pmName', {
                    initialValue: item.projectCorpDetail.pmName,
                  })(<Input placeholder="请填写项目经理姓名" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="项目经理联系电话" className={styles.Formbox}>
                  {getFieldDecorator('pmPhone', {
                    initialValue: item.projectCorpDetail.pmPhone,
                  })(<Input placeholder="请填写项目经理联系电话" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="项目经理证件类型" className={styles.Formbox}>
                  {getFieldDecorator('pmIDCardType', {
                    initialValue: item.projectCorpDetail.pmIDCardType,
                  })(
                    <Select placeholder="请选择证件类型">
                      <Option value="01">身份证</Option>
                      <Option value="02">军官证</Option>
                      <Option value="03">武警警官证</Option>
                      <Option value="04">士兵证</Option>
                      <Option value="05">香军队离退休干部证</Option>
                      <Option value="06">残疾人证</Option>
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
                <Form.Item label="项目经理证件号码" className={styles.Formbox}>
                  {getFieldDecorator('pmIDCardNumber', {
                    initialValue: item.projectCorpDetail.pmIdCardNumber,
                  })(<Input placeholder="请填写项目经理证件号码" />)}
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
            <div className={styles.btnContent}>
              <Button className={styles.btn1} type="primary" htmlType="submit" loading={loading}>
                提交
              </Button>
              <Button className={styles.btn2} onClick={() => this.handleCancle()}>
                取消
              </Button>
            </div>
          </Form>
        </PageHeaderWrapper>
      </div>
    );
  }
}
