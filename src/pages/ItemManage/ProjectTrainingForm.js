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
  Upload,
  Icon,
  Divider,
  Table,
  Card,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import SelectPlatform from '@/components/Platform/SelectPlatform';
import TextArea from 'antd/lib/input/TextArea';
const Option = Select.Option;
const confirm = Modal.confirm;
import styles from './Common.less';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
import style from './Common.less';
import { connect } from 'dva';
@Form.create()
@connect(({ item, loading }) => ({
  item,
  loading: loading.effects['item/fetchAddTraining'],
}))
export default class ProjectTrainingForm extends Component {
  state = {
    fileList: [],
    workers: [],
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
  handleAttachments = file => {
    console.log(file.fileList);
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
        console.log(attachments);
        const { form } = this.props;
        form.setFieldsValue({
          ['attachments']: attachments,
        });
      });
    });
  };
  handleRemoveAttachments = file => {
    console.log(file);
  };
  getBase64 = (img, callback) => {
    const render = new FileReader();
    render.addEventListener('load', () => {
      callback(render.result);
    });
    render.readAsDataURL(img);
  };
  handleDelWorkers = record => {
    let workers = this.state.workers;
    workers.map((item, index) => {
      if (item.id == record.id) {
        console.log(item);
        console.log(record);
        workers.splice(index, 1);

        this.setState({
          workers: workers,
        });
      }
    });
    console.log(workers);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.workers = this.state.workers;
        console.log(values);
        const { dispatch } = this.props;
        const projectCode = this.props.location.query.projectCode;
        values.projectCode = projectCode;
        dispatch({
          type: 'item/fetchAddTraining',
          payload: values,
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    const columns = [
      {
        title: '证件号码',
        key: 'idCardNumber',
        dataIndex: 'idCardNumber',
      },
      {
        title: '证件类型',
        dataIndex: 'idCardType',
        key: 'idCardType',
      },
      {
        title: '是否合格',
        dataIndex: 'isPass',
        key: 'isPass',
      },
      {
        title: '培训得分',
        dataIndex: 'trainingScore',
        key: 'trainingScore',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.handleDelWorkers(record)}>
              删除
            </a>
          </span>
        ),
      },
    ];
    return (
      <div className={styles.content}>
        <PageHeaderWrapper title="添加项目培训">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>培训信息</p>
                <p>
                  <span style={{ color: 'red' }}>*</span>
                  为必填项
                </p>
              </Col>
              <Divider />
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="培训日期">
                  {getFieldDecorator('trainingDate', {
                    rules: [{ required: true, message: '请选择培训时间' }],
                  })(
                    <DatePicker
                      format={dateFormat}
                      placeholder="请选择培训日期"
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="培训名称">
                  {getFieldDecorator('trainingName', {
                    rules: [{ required: true, message: '请填写培训名称!' }],
                  })(<Input placeholder="请填写培训名称" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="培训时长">
                  {getFieldDecorator('trainingDuration', {
                    rules: [{ required: true, message: '请填写培训时长' }],
                  })(<Input placeholder="请填写培训时长(单位：小时)" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="培训类型">
                  {getFieldDecorator('trainingTypeCode', {
                    rules: [{ required: true, message: '请选择培训类型' }],
                  })(
                    <Select placeholder="请选择培训类型">
                      <Option value="003001">安全教育</Option>
                      <Option value="003002">入场教育</Option>
                      <Option value="003003">退场教育</Option>
                      <Option value="003004">技能培训</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="培训人">
                  {getFieldDecorator('trainer')(<Input placeholder="请填写培训人" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="培训机构">
                  {getFieldDecorator('trainingOrg')(<Input placeholder="请填写培训机构" />)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="培训地址">
                  {getFieldDecorator('trainingAddress')(<TextArea placeholder="请填写培训地址" />)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="培训简述">
                  {getFieldDecorator('description')(<TextArea placeholder="请填写培训简述" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="附件">
                  {getFieldDecorator('attachments', {
                    rules: [{ required: false, message: '附件' }],
                  })(
                    <Upload
                      onChange={this.handleAttachments}
                      onRemove={this.handleRemoveAttachments}
                      action="1"
                    >
                      {this.state.fileList.length >= 10 ? null : (
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
            <Row gutter={24} className={styles.FormContent}>
              <Card
                bordered={false}
                title="参与培训的人"
                extra={
                  <Button
                    style={{ float: 'right' }}
                    onClick={() => this.setState({ openAddWorker: true })}
                  >
                    单个添加
                  </Button>
                }
              >
                <Table
                  dataSource={this.state.workers}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
                />
              </Card>
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
          <Modal
            title="添加人员信息"
            visible={this.state.openAddWorker}
            onOk={this.handleOk}
            onCancel={() => {
              this.setState({
                openAddWorker: false,
              });
            }}
            destroyOnClose={true}
            footer={null}
            maskClosable={false}
          >
            <AddWorkerForm _this={this} />
          </Modal>
        </PageHeaderWrapper>
      </div>
    );
  }
}

@Form.create()
class AddWorkerForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        let arr = this.props._this.state.workers;
        arr.push(values);
        arr.map((item, index) => {
          item.id = index + 1;
          return item;
        });
        this.props._this.setState({
          workers: arr,
          openAddWorker: false,
        });
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="证件类型">
            {getFieldDecorator('idCardType', {
              initialValue: '01',
              rules: [{ required: true, message: '请选择证件类型!' }],
            })(
              <Select placeholder="请选择证件类型">
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
          <Form.Item {...formItemLayout} label="证件号码">
            {getFieldDecorator('idCardNumber', {
              rules: [{ required: true, message: '请填写证件号码!' }],
            })(<Input placeholder="请填写证件号码" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="是否合格">
            {getFieldDecorator('isPass', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select placeholder="请选择">
                <Option value={1}>是</Option>
                <Option value={0}>否</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="培训得分">
            {getFieldDecorator('trainingScore', {
              rules: [{ required: true, message: '请填写培训得分!' }],
            })(<Input placeholder="请填写培训得分" />)}
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
