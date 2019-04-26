import React, { Component } from 'react';
import { Button, Form, Row, Col, Input, Select, DatePicker, Modal, message, Divider } from 'antd';
// import styles from './unitinfo.less';
import styles from './Common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import { connect } from 'dva';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const confirm = Modal.confirm;
@Form.create()
@connect(({ loading, projectLocalUpload }) => ({
  projectLocalUpload,
  loading: loading.effects['projectLocalUpload/fetchAddProjectManageCorp'],
}))
export default class ProjectCropForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        const { dispatch } = this.props;
        const projectJid = this.props.location.query.projectJid;
        values.projectJid = projectJid;
        dispatch({
          type: 'projectLocalUpload/fetchAddProjectManageCorp',
          payload: values,
          callback: res => {
            console.log(res);
            if (res.state == 1) {
              message.success('添加成功');
            } else {
              message.error(res.message);
            }
          },
        });
      }
    });
  };

  cancel = () => {
    this.props.form.resetFields();
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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    function showConfirm() {
      confirm({
        title: '放弃提交?',
        onOk() {
          history.go(-1);
        },
        onCancel() {},
      });
    }
    const { item, loading } = this.props;
    console.log(item.projectCorpDetail);
    return (
      <div className={styles.content}>
        <PageHeaderWrapper title="参建单位信息上传">
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Row gutter={24} type="flex" justify="space-around">
              <Col span={8}>
                <Form.Item label="参建企业名称">
                  {getFieldDecorator('corpName', {
                    initialValue: item.projectCorpDetail.corpName,
                    rules: [{ required: true, message: '请填写企业名称!' }],
                  })(<Input placeholder="请填写企业名称" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="统一社会信用代码">
                  {getFieldDecorator('corpCode', {
                    initialValue: item.projectCorpDetail.corpCode,
                    rules: [{ required: true, message: '请填写统一社会信用代码!' }],
                  })(<Input placeholder="请填写统一社会信用代码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="参建企业类型">
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
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="进场时间">
                  {getFieldDecorator('entryTime', {
                    initialValue:
                      item.projectCorpDetail.entryTime == undefined
                        ? null
                        : moment(item.projectCorpDetail.entryTime),
                  })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="退场时间">
                  {getFieldDecorator('exitTime', {
                    initialValue:
                      item.projectCorpDetail.exitTime == undefined
                        ? null
                        : moment(item.projectCorpDetail.exitTime),
                  })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="项目经理名称">
                  {getFieldDecorator('pmName', {
                    initialValue: item.projectCorpDetail.pmName,
                  })(<Input placeholder="请填写项目经理姓名" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="项目经理联系电话">
                  {getFieldDecorator('pmPhone', {
                    initialValue: item.projectCorpDetail.pmPhone,
                  })(<Input placeholder="请填写项目经理联系电话" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="项目经理证件类型">
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
                <Form.Item label="项目经理证件号码">
                  {getFieldDecorator('pmIDCardNumber', {
                    initialValue: item.projectCorpDetail.pmIdCardNumber,
                  })(<Input placeholder="请填写项目经理证件号码" />)}
                </Form.Item>
              </Col>
            </Row>
            {/* <Row>
              <Col span={8} offset={4}>将数据同步到全国建筑工人管理服务信息平台</Col>
              <Col span={8}>
                <SelectPlatform getFieldDecorator={getFieldDecorator} />
              </Col>
            </Row> */}
            <Divider dashed />
            <div className={styles.btnContent}>
              <Button className={styles.btn1} type="primary" htmlType="submit" loading={loading}>
                提交
              </Button>
              <Button className={styles.btn2} onClick={showConfirm}>
                取消
              </Button>
            </div>
          </Form>
        </PageHeaderWrapper>
      </div>
    );
  }
}
