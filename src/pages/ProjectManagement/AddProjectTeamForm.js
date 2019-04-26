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
  message,
  Modal,
  Checkbox,
} from 'antd';
// import SelectPlatform from '@/components/Platform/SelectPlatform'
const Option = Select.Option;
import { isEmpty } from '@/utils/utils';
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm;
import styles from './Common.less';
const { TextArea } = Input;
import { connect } from 'dva';
import moment from 'moment';
import token from '@/utils/token';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
@Form.create()
@connect(({ projectLocalUpload, loading, project }) => ({
  projectLocalUpload,
  project,
  addloading: loading.effects['projectLocalUpload/fetchAddProjectManageTeam'],
  modifyloading: loading.effects['project/fetchUpdateTeamMasterInfo'],
}))
export default class AddProjectTeamForm extends Component {
  state = {
    fileList1: [],
    fileList2: [],
    // checkNick: false,
  };
  // check = () => {
  //   this.props.form.validateFields(
  //     (err) => {
  //       if (!err) {
  //         console.info('success');
  //       }
  //     },
  //   );
  // }

  // handleChange = (e) => {
  //   this.setState({
  //     checkNick: e.target.checked,
  //   }, () => {
  //     this.props.form.validateFields(['uploadMohurd'], { force: true });
  //   });
  // }

  componentDidMount() {
    this.fetchPlatformCorpList();
    const teamJid = this.props.location.query.teamJid;
    if (!isEmpty(teamJid)) {
      this.fetchTeamMasterInfo(teamJid);
    }
    this.checkboxClick();
  }
  checkboxClick = () => {
    this.setState({
      checkNick: true,
    });
  };
  //获取平台上的参建单位
  fetchPlatformCorpList = (current = 1) => {
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchPlatformCorpList',
      payload: {
        projectJid: projectJid,
        current: current,
        size: 10,
      },
    });
  };

  //班组信息
  fetchTeamMasterList = (pageCurrent = 1) => {
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchTeamMasterList',
      payload: {
        projectJid: projectJid,
        current: pageCurrent,
        size: 10,
      },
    });
  };

  fetchTeamMasterInfo = teamJid => {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchTeamMasterInfo',
      payload: teamJid,
      callback: res => {
        let fileList1 = [];
        if (res.data.entryAttachments.length) {
          res.data.entryAttachments.map((item, index) => {
            let file1 = {};
            file1.url = SERVER_IP.FTP_IP + item.url;
            file1.uid = index;
            file1.name = `进场附件${index + 1}`;
            fileList1.push(file1);
          });
        }

        let fileList2 = [];
        if (res.data.exitAttachments.length) {
          res.data.exitAttachments.map((item, index) => {
            let file2 = {};
            file2.url = SERVER_IP.FTP_IP + item.url;
            file2.uid = index;
            file2.name = `退场附件${index + 1}`;
            fileList2.push(file2);
          });
        }
        this.setState({
          fileList1: fileList1,
          fileList2: fileList2,
        });
      },
    });
  };

  // 同步班组
  // fetchUpdateTeam=(pageCurrent=1)=>{
  //   const { dispatch,project } = this.props;
  //   const projectJid = this.props.location.query.projectJid;
  //   dispatch({
  //     type: 'project/fetchUpdateTeam',
  //     payload: {
  //       projectJid:projectJid
  //     },
  //     callback:res=>{
  //       if(res.state==1){
  //         message.success("添加成功");
  //       }else{
  //         message.error(res.message);
  //       }
  //     }
  //   });
  // }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (!values.entryAttachments) {
          let fileList = values.entryAttachments;
          let entryAttachments = [];
          fileList = fileList.map(file => {
            let obj = {};
            if (file.response) {
              obj.url = file.response.data.path;
              obj.name = file.response.data.sourceName;
              entryAttachments.push(obj);
            }
          });
          values.entryAttachments = entryAttachments;
        } else {
          values.entryAttachments = this.state.fileList1;
        }
        if (!values.exitAttachments) {
          let fileList = values.exitAttachments;
          let exitAttachments = [];
          fileList = fileList.map(file => {
            let obj = {};
            if (file.response) {
              obj.url = file.response.data.path;
              obj.name = file.response.data.sourceName;
              exitAttachments.push(obj);
            }
          });
          values.exitAttachments = exitAttachments;
        } else {
          values.exitAttachments = this.state.fileList2;
        }
        if (!isEmpty(values.exitTime)) {
          values.exitTime = values.exitTime.format('YYYY-MM-DD');
        } else {
          values.entryTime = null;
        }
        if (!isEmpty(values.entryTime)) {
          values.entryTime = values.entryTime.format('YYYY-MM-DD');
        } else {
          values.entryTime = null;
        }
        const { dispatch } = this.props;
        const projectJid = this.props.location.query.projectJid;
        values.projectJid = projectJid;
        values.corpName = values.corp.label;
        values.corpJid = values.corp.key;
        if (isEmpty(values.teamJid)) {
          this.fetchAddTeamMasterInfo(values);
        } else {
          //更新班组
          const mohurdData = this.props.location.query.mohurdData;
          if (mohurdData == 'true') {
            this.fetchUpdateCountryTeamMasterInfo(values);
          } else {
            this.fetchUpdateTeamMasterInfo(values);
          }
        }
      }
    });
  };

  // 上传
  fetchAddTeamMasterInfo = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectLocalUpload/fetchAddProjectManageTeam',
      payload: values,
      callback: res => {
        console.log(res);
        if (res.state == 1) {
          // this.fetchUpdateTeam();//同步班组
          message.success('添加成功');
          this.fetchTeamMasterList();
          history.go(-1);
        } else {
          message.error(res.message);
        }
      },
    });
  };

  //更新管工平台班组
  fetchUpdateTeamMasterInfo = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchUpdateTeamMasterInfo',
      payload: values,
      callback: res => {
        console.log(res);
        if (res.state == 1) {
          message.success('修改成功');
          this.fetchTeamMasterList();
          history.go(-1);
        }
      },
    });
  };

  //更新国家平台班组
  fetchUpdateCountryTeamMasterInfo = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchUpdateCountryTeamMasterInfo',
      payload: values,
      callback: res => {
        console.log(res);
        if (res.state == 1) {
          message.success('修改成功');
          this.fetchTeamMasterList();
          history.go(-1);
        }
      },
    });
  };


  cancel = () => {
    this.props.form.resetFields();
    history.go(-1);
  };
  //取消
  handleCancle = () => {
    confirm({
      title: '放弃提交?',
      onOk() {
        history.go(-1);
      },
      onCancel() {},
    });
  };

  fetchFileUpload = (file, num) => {
    let fileList = file.fileList;
    // const path = file.file.response.data.path;
    console.log(file);
    if (file.file.status === 'done') {
      const { form } = this.props;
      if (num === '1') {
        form.setFieldsValue({
          ['entryAttachments']: fileList,
        });
        this.setState({
          fileList1: file.fileList.length == 0 ? [] : file.fileList,
        });
      } else {
        form.setFieldsValue({
          ['exitAttachments']: fileList,
        });
        this.setState({
          fileList2: file.fileList.length == 0 ? [] : file.fileList,
        });
      }
    } else if (file.file.status === 'error') {
      message.error(`文件上传失败`);
    }
  };
  normFile = (e, num) => {
    // if (Array.isArray(e)) {
    //   return e;
    // }
    if (num === '1') {
      this.setState({
        fileList1: e.fileList,
      });
    }
    if (num === '2') {
      this.setState({
        fileList2: e.fileList,
      });
    }

    return e && e.fileList;
  };
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    console.log(this.state.fileList1);
    const params = {
      name: 'file',
      action: '/worker/manage/api/basicData/file/upload',
      headers: { Authorization: 'Bearer ' + token.get() },
    };
    const { project, addloading, modifyloading } = this.props;
    const platformCorpList = project.platformCorpList.result || [];
    console.log(project);
    const teamJid = this.props.location.query.teamJid;
    let teamMasterInfo = {};
    if (!isEmpty(teamJid)) {
      teamMasterInfo = project.teamMasterInfo;
    }
    console.log(teamMasterInfo);

    return (
      <div className={styles.content}>
      <PageHeaderWrapper >
        <Form onSubmit={this.handleSubmit} layout="vertical" className={styles.Form}>
          <Row gutter={24} className={styles.FormContent}>
            <Col span={24} className={styles.FormTitle}>
              <p>添加班组</p>
              <p>
                <span style={{ color: 'red' }}>*</span>
                为必填项
              </p>
            </Col>
            <Divider />
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="班组名称">
                {getFieldDecorator('teamName', {
                  initialValue: teamMasterInfo.teamName,
                  rules: [{ required: true, message: '请填写班组名称' }],
                })(<Input placeholder="请填写班组名称" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="班组所在企业名称">
                {getFieldDecorator('corp', {
                  initialValue: { key: teamMasterInfo.corpJid, label: teamMasterInfo.corpName },
                  rules: [{ required: true, message: '请选择参建单位！' }],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder="请选择参见单位"
                    labelInValue={true}
                  >
                    {platformCorpList.map((item, index) => {
                      return (
                        <Option key={index} value={item.corpJid}>
                          {item.corpName}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="企业社会信用代码">
                {getFieldDecorator('corpCode', {
                  initialValue: teamMasterInfo.corpCode,
                  rules: [{ required: false, message: '请选择参建单位!' }],
                })(<Input placeholder="请选择参建单位" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="责任人姓名">
                {getFieldDecorator('responsiblePersonName', {
                  initialValue: teamMasterInfo.responsiblePersonName,
                })(<Input placeholder="请输入责任人姓名" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="责任人联系电话">
                {getFieldDecorator('responsiblePersonPhone', {
                  initialValue: teamMasterInfo.responsiblePersonPhone,
                })(<Input placeholder="请填写责任人联系电话" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="责任人证件类型">
                {getFieldDecorator('responsiblePersonIDCardType', {
                  initialValue: teamMasterInfo.responsiblePersonIdCardType,
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
                  initialValue: teamMasterInfo.responsiblePersonIdNumber,
                })(<Input placeholder="请输入责任人证件号码" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="进场日期">
                {getFieldDecorator('entryTime', {
                  initialValue:
                    teamMasterInfo.entryTime == undefined
                      ? null
                      : moment(project.teamMasterInfo.entryTime),
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
                  initialValue:
                    teamMasterInfo.exitTime == undefined
                      ? null
                      : moment(project.teamMasterInfo.exitTime),
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
                  initialValue: teamMasterInfo.remark,
                })(<TextArea placeholder="请填写备注信息" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="进场附件">
                {getFieldDecorator('entryAttachments', {
                  initialValue: this.state.fileList1,
                  valuePropName: 'fileList',
                  getValueFromEvent: e => this.normFile(e, '1'),
                  rules: [{ required: false, message: '请上传进场附件' }],
                })(
                  <Upload
                    // defaultFileList={
                    //   teamMasterInfo.entryAttachUrl?
                    //   [
                    //     {
                    //       name : '进场附件',
                    //       uid : index,
                    //       url : teamMasterInfo.entryAttachUrl
                    //     }
                    //   ]:undefined
                    // }
                    {...params}
                    onChange={file => this.fetchFileUpload(file, '1')}
                  >
                    {this.state.fileList1.length >= 5 ? null : (
                      <Button>
                        <Icon type="upload" />
                        上传进场附件
                      </Button>
                    )}
                  </Upload>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className={styles.Formbox} label="退场附件">
                {getFieldDecorator('exitAttachments', {
                  initialValue: this.state.fileList2,
                  valuePropName: 'fileList',
                  getValueFromEvent: e => this.normFile(e, '1'),
                  rules: [{ required: false, message: '请上传退场附件' }],
                })(
                  <Upload
                    // defaultFileList={
                    //   teamMasterInfo.exitAttachUrl?
                    //   [
                    //     {
                    //       name : '退场附件',
                    //       uid : index,
                    //       url : teamMasterInfo.exitAttachUrl
                    //     }
                    //   ]:undefined
                    // }
                    onChange={file => this.fetchFileUpload(file, '2')}
                    {...params}
                  >
                    {this.state.fileList2.length >= 5 ? null : (
                      <Button>
                        <Icon type="upload" />
                        上传退场附件
                      </Button>
                    )}
                  </Upload>
                )}
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={24}>
            <Col span={8} offset={8} style={{textAlign:'center'}}>将数据同步到全国建筑工人管理服务信息平台</Col>
          </Row> */}
          <div className={styles.btnContent}>
            <Form.Item label="">
              {getFieldDecorator('teamJid', {
                initialValue: teamJid,
              })(<Input style={{ display: 'none' }} />)}
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              {getFieldDecorator('uploadMohurd', {
                initialValue: teamMasterInfo.mohurdData || true,
                valuePropName: 'checked',
              })(<Checkbox>是否同步到全国建筑工人平台</Checkbox>)}
            </Form.Item>
            <Button
              type="primary"
              className={styles.btn1}
              htmlType="submit"
              loading={addloading || modifyloading}
            >
              提交
            </Button>
            <Button className={styles.btn2} onClick={this.handleCancle}>
              取消
            </Button>
          </div>
        </Form>
        </PageHeaderWrapper>
      </div>
    );
  }
}
