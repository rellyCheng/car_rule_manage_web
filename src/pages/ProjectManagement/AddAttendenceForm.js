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
  Upload,
  Icon,
  Checkbox,
} from 'antd';
import styles from './Common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import { connect } from 'dva';
const Option = Select.Option;
import { isEmpty } from '@/utils/utils';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const confirm = Modal.confirm;
import token from '@/utils/token';
@Form.create()
@connect(({ loading, project, projectLocalUpload }) => ({
  project,
  projectLocalUpload,
  loading: loading.effects['projectLocalUpload/AddAttendenceForm'],
}))
export default class AddAttendenceForm extends Component {
  state = {
    AttendenceInfos: [],
    record: '',
    workerList: [],
    teamJid: '',
    teamName: '',
    // checkNick: false,
  };
  componentDidMount() {
    this.fetchTeamMasterList();
    // this.checkboxClick();
  }
  // checkboxClick=()=>{
  //   this.setState({
  //     checkNick:true
  //   })
  // }
  //获取班组编号
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
  //选择班组
  handleChange = e => {
    let teamJid = e.key;
    let teamName = e.label;
    this.setState({
      teamJid: teamJid,
      teamName: teamName,
    });
    this.fetchWorkerList(teamJid);
  };
  handleCheckChange = e => {
    this.setState(
      {
        checkNick: e.target.checked,
      },
      () => {
        this.props.form.validateFields(['uploadMohurd'], { force: true });
      }
    );
  };
  //获取班组人员
  fetchWorkerList = teamJid => {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchWorkerList',
      payload: {
        teamJid: teamJid,
        current: 1,
        size: 10,
      },
      callback: res => {
        console.log(res.result);
        this.setState({
          workerList: res.result,
        });
      },
    });
  };
  // 添加考勤
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        const { dispatch } = this.props;
        const projectJid = this.props.location.query.projectJid;
        values.projectJid = projectJid;
        console.log(this.state.AttendenceInfos);
        values.dataList = this.state.AttendenceInfos;
        values.teamJid = values.teamJid.key;
        console.log(values);
        dispatch({
          type: 'projectLocalUpload/fetchAddAttendenceForm',
          payload: values,
          callback: res => {
            console.log(res);
            if (res.state == 1) {
              message.success('添加成功');
              history.go(-1);
            } else {
              message.error(res.message);
            }
          },
        });
      }
    });
  };
  //删除人员
  handleDelAttendence = record => {
    let AttendenceInfos = this.state.AttendenceInfos;
    AttendenceInfos.map((item, index) => {
      if (item.id == record.id) {
        console.log(item);
        console.log(record);
        AttendenceInfos.splice(index, 1);
        this.setState({
          AttendenceInfos: AttendenceInfos,
        });
      }
    });
    console.log(AttendenceInfos);
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

  // 单个添加的点击事件
  handleAdd = () => {
    const teamName = this.state.teamName;
    if (!isEmpty(teamName)) {
      this.setState({
        openAddAttendence: true,
      });
    } else {
      message.error('请选择班组编号');
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '工人名称',
        dataIndex: 'workerName',
        key: 'workerName',
      },
      {
        title: '刷卡时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '进出方向',
        dataIndex: 'directionLabel',
        key: 'directionLabel',
      },
      {
        title: '通道名称',
        dataIndex: 'channel',
        key: 'channel',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.handleDelAttendence(record)}>
              删除
            </a>
          </span>
        ),
      },
    ];
    const { project, loading } = this.props;
    console.log(project);
    const teamMasterList = project.teamMasterList.result || [];
    // alert(this.state.checkNick)
    return (
      <div className={styles.content}>
        <PageHeaderWrapper>
          <Form onSubmit={this.handleSubmit} layout="vertical" className={styles.Form}>
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>工人考勤</p>
                <p>
                  <span style={{ color: 'red' }}>*</span>
                  为必填项
                </p>
              </Col>
              <Divider />
              <Col span={8}>
                <Form.Item label="班组编号">
                  {getFieldDecorator('teamJid', {
                    rules: [{ required: true, message: '请选择班组编号' }],
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择班组编号"
                      onChange={this.handleChange}
                      labelInValue
                    >
                      {teamMasterList.map((item, index) => {
                        return (
                          <Option key={index} value={item.jid}>
                            {item.teamName}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>考勤列表</p>
                <p>
                  <Button onClick={() => this.handleAdd()}>单个添加</Button>
                </p>
              </Col>
              <Divider />
              <Table
                dataSource={this.state.AttendenceInfos}
                columns={columns}
                rowKey="id"
                pagination={false}
              />
            </Row>
            <Form.Item style={{ textAlign: 'center' }}>
              {getFieldDecorator('uploadMohurd', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>是否同步到全国建筑工人平台</Checkbox>)}
            </Form.Item>
            <Modal
              title="添加工人考勤"
              visible={this.state.openAddAttendence}
              onOk={this.handleOk}
              onCancel={() => {
                this.setState({
                  openAddAttendence: false,
                });
              }}
              destroyOnClose={true}
              footer={null}
              maskClosable={false}
            >
              <AddAttendence _this={this} record={this.state.record} />
            </Modal>

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

@Form.create()
class AddAttendence extends Component {
  state = {
    fileList: [],
  };

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let arr = this.props._this.state.AttendenceInfos;
        console.log(values);
        values.workerName = values.worker.label;
        values.workerJid = values.worker.key;
        values.direction = values.directionType.key;
        values.directionLabel = values.directionType.label;
        // 对时间的处理
        if (!isEmpty(values.date)) {
          values.date = values.date.format('YYYY-MM-DD HH:mm:ss');
        } else {
          values.date = null;
        }
        values.image = values.imageUrl;
        arr.push(values);
        arr.map((item, index) => {
          item.id = index + 1;
          return item;
        });
        this.props._this.setState({
          AttendenceInfos: arr,
          openAddAttendence: false,
        });
      }
    });
  };
  //上传附件
  fetchFileUpload = file => {
    let fileList = file.fileList;
    if (file.file.status === 'done') {
      const { form } = this.props;
      form.setFieldsValue({
        imageUrl: file.file.response.data.path,
      });
      this.setState({
        fileList: file.fileList,
      });
    } else if (file.file.status === 'error') {
      message.error(`文件上传失败`);
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const params = {
      name: 'file',
      action: '/worker/manage/api/basicData/file/upload',
      headers: { Authorization: 'Bearer ' + token.get() },
    };
    const { record } = this.props;
    const workerList = this.props._this.state.workerList || [];
    return (
      <div>
        <Form>
          <Form.Item label="工人名称" {...formItemLayout}>
            {getFieldDecorator('worker', {
              rules: [{ required: true, message: '请选择工人名称' }],
            })(
              <Select style={{ width: '100%' }} placeholder="请选择工人名称" labelInValue>
                {workerList.map((item, index) => {
                  return (
                    <Option key={index} value={item.workerJid}>
                      {item.workerName}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="刷卡时间" {...formItemLayout}>
            {getFieldDecorator('date', {
              rules: [{ required: true, message: '请选择刷卡时间' }],
            })(
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
            )}
          </Form.Item>
          <Form.Item label="刷卡进出方向" {...formItemLayout}>
            {getFieldDecorator('directionType', {
              rules: [{ required: true, message: '请填写刷卡进出方向' }],
            })(
              <Select placeholder="请选择刷卡进出方向" labelInValue>
                <Option value="01">入场</Option>
                <Option value="02">出场</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="刷卡近照" {...formItemLayout}>
            {getFieldDecorator('image', {
              rules: [{ required: false, message: '请填写刷卡近照' }],
            })(
              <Upload {...params} onChange={file => this.fetchFileUpload(file)}>
                {this.state.fileList.length >= 1 ? null : (
                  <Button>
                    <Icon type="upload" />
                    上传刷卡近照
                  </Button>
                )}
              </Upload>
            )}
          </Form.Item>
          <Form.Item style={{ display: 'none' }}>
            {getFieldDecorator('imageUrl')(<Input />)}
          </Form.Item>
          <Form.Item label="通道名称" {...formItemLayout}>
            {getFieldDecorator('channel', {
              rules: [{ required: false, message: '请填写通道名称' }],
            })(<Input placeholder="请填写通道名称" />)}
          </Form.Item>
          <Form.Item label="通行方式" {...formItemLayout}>
            {getFieldDecorator('attendType', {
              rules: [{ required: false, message: '请填写通行方式' }],
            })(
              <Select
                placeholder="请选择通行方式"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="001">人脸识别</Option>
                <Option value="002">虹膜识别</Option>
                <Option value="003">指纹识别</Option>
                <Option value="004">掌纹识别</Option>
                <Option value="005">身份证识别</Option>
                <Option value="006">实名卡</Option>
                <Option value="007">
                  异常清退（适用于人员没有通过闸机系统出工地而导致人员状态不一致的情况）
                </Option>
                <Option value="008">一键开闸(需要与闸机交互)</Option>
                <Option value="009">应急通道(不需要与闸机交互)</Option>
                <Option value="010">二维码识别</Option>
                <Option value="011">其他方式</Option>
              </Select>
            )}
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={() => this.handleSubmit()}>
              保存
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
