import React, { Component } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Modal,
  message,
  Divider,
  Card,
  Table,
  Checkbox,
} from 'antd';
import styles from './Common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import { isEmpty } from '@/utils/utils';
import { connect } from 'dva';
// import lrz from 'lrz';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const confirm = Modal.confirm;
@Form.create()
@connect(({ loading, project, projectLocalUpload, globalProject }) => ({
  project,
  projectLocalUpload,
  addloading: loading.effects['projectLocalUpload/fetchAddProjectManageCorp'],
  modifyloading: loading.effects['projectLocalUpload/fetchProjectCorpUpdate'],
  globalProject,
}))
export default class AddProjectCorpForm extends Component {
  state = {
    // checkNick: false,
  };

  // handleChange = (e) => {
  //   this.setState({
  //     checkNick: e.target.checked,
  //   })
  // }

  componentDidMount() {
    // this.fetchBusinessList();
    const jid = this.props.location.query.jid;
    this.fetchCropProjectDetail(jid);
    this.props.form.setFieldsValue({
      // uploadMohurd:true
    });
  }

  //获取企业列表
  // fetchBusinessList=()=>{
  //   const { dispatch } = this.props;
  //   const projectJid = this.props.location.query.projectJid;
  //   dispatch({
  //       type: 'projectLocalUpload/fetchBusinessList',
  //       payload: {
  //         projectJid:projectJid,
  //         current:1,
  //         size:10
  //       },
  //   });
  // }
  //获取项目参建单位详情
  fetchCropProjectDetail = jid => {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchCropProjectDetail',
      payload: {
        jid: jid,
      },
    });
  };
  //参建单位列表
  requestCorpList = (current = 1) => {
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchCorpList',
      payload: {
        projectJid: projectJid,
        current: current,
        size: 10,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const jid = this.props.location.query.jid;
        const corpJid = this.props.location.query.corpJid;
        console.log(values);
        const { dispatch } = this.props;
        if (!isEmpty(values.entryTime)) {
          values.entryTime = values.entryTime.format('YYYY-MM-DD HH:mm:ss');
        }
        if (!isEmpty(values.exitTime)) {
          values.exitTime = values.exitTime.format('YYYY-MM-DD HH:mm:ss');
        }
        const projectJid = this.props.location.query.projectJid;
        if (!jid) {
          //添加
          values.projectJid = projectJid;
          dispatch({
            type: 'projectLocalUpload/fetchAddProjectManageCorp',
            payload: values,
            callback: res => {
              console.log(res);
              if (res.state == 1) {
                message.success('添加成功');
                this.requestCorpList();
                history.go(-1);
              } else {
                message.error(res.message);
              }
            },
          });
        } else {
          //编辑
          values.jid = jid;
          (values.corpJid = corpJid), (values.projectJid = projectJid);
          dispatch({
            type: 'projectLocalUpload/fetchProjectCorpUpdate',
            payload: values,
            callback: res => {
              if (res.state == 1) {
                message.success('修改成功');
                this.requestCorpList();
                history.go(-1);
              } else {
                message.error(res.message);
              }
            },
          });
        }
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
    const { project, projectLocalUpload, globalProject, addloading, modifyloading } = this.props;
    // console.log(projectLocalUpload)
    console.log(globalProject);
    console.log(project.cropProjectDetail);
    const businessList = projectLocalUpload.businessList || [];
    return (
      <div className={styles.content}>
        <PageHeaderWrapper>
          <Form onSubmit={this.handleSubmit} layout="vertical" className={styles.Form}>
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>参建单位信息上传</p>
                <p>
                  <span style={{ color: 'red' }}>*</span>
                  为必填项
                </p>
              </Col>
              <Divider />
              <Col span={8}>
                <Form.Item label="参建企业名称" className={styles.Formbox}>
                  {getFieldDecorator('corpName', {
                    initialValue: project.cropProjectDetail.corpName,
                    rules: [{ required: true, message: '请填写企业名称!' }],
                  })(
                    // <Select placeholder="请选择企业名称"
                    //   labelInValue
                    //   >
                    //     {
                    //       businessList.map((item,index)=>{
                    //         return <Option key={index} value={item.jid}>{item.corpName}</Option>
                    //       })
                    //     }
                    // </Select>
                    <Input placeholder="请填写企业名称!" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="参建企业统一社会信用代码" className={styles.Formbox}>
                  {getFieldDecorator('corpCode', {
                    initialValue: project.cropProjectDetail.corpCode,
                    rules: [{ required: true, message: '请填写参建企业统一社会信用代码!' }],
                  })(<Input placeholder="请填写参建企业统一社会信用代码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="参建企业类型" className={styles.Formbox}>
                  {getFieldDecorator('corpType', {
                    initialValue: project.cropProjectDetail.corpType,
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
                      project.cropProjectDetail.entryTime == undefined
                        ? null
                        : moment(project.cropProjectDetail.entryTime),
                  })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="退场时间" className={styles.Formbox}>
                  {getFieldDecorator('exitTime', {
                    initialValue:
                      project.cropProjectDetail.exitTime == undefined
                        ? null
                        : moment(project.cropProjectDetail.exitTime),
                  })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="项目经理名称" className={styles.Formbox}>
                  {getFieldDecorator('pmName', {
                    initialValue: project.cropProjectDetail.pmName,
                  })(<Input placeholder="请填写项目经理姓名" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="项目经理联系电话" className={styles.Formbox}>
                  {getFieldDecorator('pmPhone', {
                    initialValue: project.cropProjectDetail.pmPhone,
                  })(<Input placeholder="请填写项目经理联系电话" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="项目经理证件类型" className={styles.Formbox}>
                  {getFieldDecorator('pmIdCardType', {
                    initialValue: project.cropProjectDetail.pmIdCardTypeStr,
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
                  {getFieldDecorator('pmIdCardNumber', {
                    initialValue: project.cropProjectDetail.pmIdCardNumber,
                  })(<Input placeholder="请填写项目经理证件号码" />)}
                </Form.Item>
              </Col>
            </Row>
            <div className={styles.btnContent}>
              <Form.Item style={{ textAlign: 'center' }}>
                {getFieldDecorator('uploadMohurd', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>是否同步到全国建筑工人平台</Checkbox>)}
              </Form.Item>
              <Button
                className={styles.btn1}
                type="primary"
                htmlType="submit"
                loading={addloading || modifyloading}
              >
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
