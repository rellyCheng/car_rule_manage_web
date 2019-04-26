import React, { Component } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Upload,
  Icon,
  Divider,
  Modal,
  message,
} from 'antd';
// import SelectPlatform from '@/components/Platform/SelectPlatform'
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm;
import styles from './Common.less';
const { TextArea } = Input;
import { connect } from 'dva';
import moment from 'moment';
import { isEmpty } from '@/utils/utils';
@Form.create()
@connect(({ item, loading, itemUpdate, globalProject }) => ({
  item,
  addloading: loading.effects['item/fetchAddProjectTeam'],
  modifyloading: loading.effects['itemUpdate/fetchUpdateProjectTeam'],
  itemUpdate,
  globalProject,
}))
export default class ProjectTeamForm extends Component {
  state = {
    fileList1: [],
    fileList2: [],
    entryAttachments: [],
    exitAttachments: [],
  };
  componentWillMount() {
    this.fetchCorpList();
  }
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
    console.log(this.props.form.getFieldsValue().teamSysNo);
    if (this.props.form.getFieldsValue().teamSysNo) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        const { teamInfo_Country } = this.props;
        if (!err) {
          console.log(values);
          console.log(globalProject.teamInfo_Country);
          const { dispatch } = this.props;
          const projectCode = this.props.location.query.projectCode;
          const projectJid = this.props.location.query.projectJid;
          values.projectCode = projectCode;
          values.projectJid = projectJid;
          values.corpName = globalProject.teamInfo_Country.corpName;
          values.corpCode = globalProject.teamInfo_Country.corpCode;

          values.entryTime = isEmpty(values.entryTime)
            ? null
            : moment(values.entryTime).format(dateFormat);
          values.exitTime = isEmpty(values.exitTime)
            ? null
            : moment(values.exitTime).format(dateFormat);
          dispatch({
            type: 'itemUpdate/fetchUpdateProjectTeam',
            payload: values,
            callback: res => {
              if (res.state == 1) {
                history.go(-1);
                this.fetchTeamList();
              }
            },
          });
        }
      });
    } else {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);
          const { dispatch } = this.props;
          const projectCode = this.props.location.query.projectCode;
          const projectJid = this.props.location.query.projectJid;
          values.projectCode = projectCode;
          values.projectJid = projectJid;
          values.corpName = values.corp.label;
          values.corpCode = values.corp.key;
          dispatch({
            type: 'item/fetchAddProjectTeam',
            payload: values,
            callback: res => {
              if (res.state == 1) {
                message.success('添加成功！');
                history.go(-1);
                this.fetchTeamList();
              }
            },
          });
        }
      });
    }
  };
  cancel = () => {
    history.go(-1);
  };

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
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

  handleChangeBase64 = (file, num) => {
    console.log(file.file);
    let entryAttachments = [];
    let exitAttachments = [];
    this.getBase64(file.file.originFileObj, imageUrl => {
      const { form } = this.props;
      if (num === '1') {
        this.setState({
          fileList1: file.fileList,
        });
        this.state.fileList1.map((item, index) => {
          this.getBase64(item.originFileObj, imageUrl => {
            let imgObj = {};
            imgObj.name = file.file.name;
            imgObj.data = imageUrl;
            entryAttachments.push(imgObj);
            const { form } = this.props;
            form.setFieldsValue({
              ['entryAttachments']: entryAttachments,
            });
          });
        });
      } else if (num === '2') {
        this.setState({
          fileList2: file.fileList,
        });
        this.state.fileList2.map((item, index) => {
          this.getBase64(item.originFileObj, imageUrl => {
            let imgObj = {};
            imgObj.name = file.file.name;
            imgObj.data = imageUrl;
            exitAttachments.push(imgObj);
            const { form } = this.props;
            form.setFieldsValue({
              ['exitAttachments']: exitAttachments,
            });
          });
        });
      }
    });
  };

  getBase64 = (img, callback) => {
    const render = new FileReader();
    render.addEventListener('load', () => {
      callback(render.result);
    });
    render.readAsDataURL(img);
  };
  beforeUpload = file => {
    console.log(file.type);
    // const isJPG = file.type === '.jpeg,.jpg,.png,.pdf,.doc,.docx,.xls,.xlsx';
    // if (!isJPG) {
    //   message.error('文件类型必须为jpg,png,pdf,doc,docx,xls,xlsx,jpeg');
    //   return false;
    // }
    const isLt50K = file.size / 1024 < 50;
    if (!isLt50K) {
      message.error('文件或图片大小不能超过50K!');
      return false;
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { globalProject, item, addloading, modifyloading } = this.props;
    const corpList = item.corpList.result || [];
    let corp = {};
    let teamInfo = globalProject.teamInfo_Country || {};
    corp.key = teamInfo.corpCode;
    corp.label = teamInfo.corpName;
    return (
      <div className={styles.content}>
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <Row gutter={24} className={styles.FormContent}>
            <Col span={24} className={styles.FormTitle}>
              <p>班组信息</p>
              <p>
                <span style={{ color: 'red' }}>*</span>
                为必填项
              </p>
            </Col>
            <Divider />
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="班组名称">
                {getFieldDecorator('teamName', {
                  initialValue: teamInfo.teamName,
                  rules: [{ required: true, message: '请填写班组名称' }],
                })(<Input placeholder="请填写班组名称" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="参建单位">
                {getFieldDecorator('corp', {
                  initialValue: corp,
                  rules: [{ required: true, message: '请选择参建单位!' }],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder="请选择参见单位"
                    labelInValue={true}
                  >
                    {corpList.map((item, index) => {
                      return (
                        <Option key={index} value={item.corpCode}>
                          {item.corpName}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="责任人姓名">
                {getFieldDecorator('responsiblePersonName', {
                  initialValue: teamInfo.responsiblePersonName,
                })(<Input placeholder="请输入责任人姓名" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="责任人联系电话">
                {getFieldDecorator('responsiblePersonPhone', {
                  initialValue: teamInfo.responsiblePersonPhone,
                })(<Input placeholder="请填写责任人联系电话" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="责任人证件类型">
                {getFieldDecorator('responsiblePersonIDCardType', {
                  initialValue: teamInfo.responsiblePersonIDCardType ,
                })(
                  <Select placeholder="请选择责任人证件类型">
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
              <Form.Item className={styles.Formbox} label="责任人证件号码">
                {getFieldDecorator('responsiblePersonIDNumber', {
                  initialValue: teamInfo.responsiblePersonIDNumber,
                })(<Input placeholder="请输入责任人证件号码" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="进场日期">
                {getFieldDecorator('entryTime', {
                  initialValue: teamInfo.entryTime,
                })(
                  <DatePicker
                    placeholder="请选择进场日期"
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="退场日期">
                {getFieldDecorator('exitTime', {
                  initialValue: teamInfo.exitTime,
                })(
                  <DatePicker
                    placeholder="请选择退场日期"
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="备注信息">
                {getFieldDecorator('remark', {
                  initialValue: teamInfo.remark,
                })(<TextArea placeholder="请填写备注信息" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="进场附件">
                {getFieldDecorator('entryAttachments', {
                  //  initialValue:teamInfo.entryAttachments
                })(
                  <Upload
                    onChange={file => this.handleChangeBase64(file, '1')}
                    action="1"
                    beforeUpload={this.beforeUpload}
                  >
                    {this.state.fileList1.length >= 1 ? null : (
                      <Button>
                        <Icon type="upload" />
                        上传附件
                      </Button>
                    )}
                  </Upload>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="退场附件">
                {getFieldDecorator('exitAttachments', {
                  initialValue: teamInfo.exitAttachments,
                })(
                  <Upload
                    onChange={file => this.handleChangeBase64(file, '2')}
                    action="1"
                    beforeUpload={this.beforeUpload}
                  >
                    {this.state.fileList2.length >= 1 ? null : (
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
          <Form.Item label="">
            {getFieldDecorator('teamSysNo', {
              initialValue: teamInfo.teamSysNo,
            })(<Input style={{ display: 'none' }} />)}
          </Form.Item>
          <div className={styles.btnContent}>
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
      </div>
    );
  }
}
