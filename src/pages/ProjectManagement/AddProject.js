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
  Divider,
  Checkbox,
  Cascader,
  Modal,
  Table,
  InputNumber,
  message
} from 'antd';
import SelectArea from '@/components/Platform/SelectArea';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import router from 'umi/router';
import { isEmpty } from '@/utils/utils';
import { connect } from 'dva';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;
const { TextArea } = Input;
let id = 0;
@Form.create()
@connect(({ project, global, loading }) => ({
  project,
  global,
  loading: loading.effects['project/fetchSaveProject'],
}))
export default class addProject extends Component {
  state = {
    openBuilderLicensesForm: false,
    builderLicenses: [],
    record: '',
  };
  componentDidMount() {
    this.fetchProjectDetail();
    this.requestBuilderLicenseList();
  }
  // 获取项目详情
  fetchProjectDetail = () => {
    const { dispatch, project } = this.props;
    const projectJid = this.props.location.query.projectJid;
    if (!projectJid) {
      project.projectDetail = [];
    }
    dispatch({
      type: 'project/fetchProjectDetail',
      payload: {
        projectJid: projectJid,
      },
    });
  };
  //获取项目许可证
  requestBuilderLicenseList = () => {
    const projectJid = this.props.location.query.projectJid;
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchBuilderLicenseList',
      payload: {
        projectJid: projectJid,
      },
      callback: res => {
        console.log(res);
        this.setState({
          builderLicenses: res,
        });
      },
    });
  };
  //删除施工许可证
  handleDelBuilderLicenses = record => {
    let builderLicenses = this.state.builderLicenses;
    builderLicenses.map((item, index) => {
      if (item.id == record.id) {
        builderLicenses.splice(index, 1);
        this.setState({
          builderLicenses: builderLicenses,
        });
      }
    });
  };
  //编辑施工许可证
  handleEditBuilderLicenses = record => {
    this.setState({
      openBuilderLicensesForm: true,
      record: record,
    });
  };

  // 提交
  handleSubmit = e => {
    e.preventDefault();
    const projectJid = this.props.location.query.projectJid;
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        console.log(values);
        if (!isEmpty(values.startDate)) {
          values.startDate = moment(values.startDate).format('YYYY-MM-DD');
        }
        if (!isEmpty(values.completeDate)) {
          values.completeDate = moment(values.completeDate.format('YYYY-MM-DD'));
        }
        values.builderLicenses = this.state.builderLicenses;
        values.areaCode = values.areaCode[values.areaCode.length - 1];
        //保存数据
        if (!isEmpty(projectJid)) {
          //编辑项目
          values.projectJid = projectJid;
          const{dispatch}= this.props;
          dispatch({
            type: 'project/fetchUpdateProject',
            payload: values,
            callback:res=>{
              if(res.state ==1){
                message.success('编辑成功！')
                history.go(-1);
              }else{
                message.error(res.message)
              }
            }
          });

        } else {
          //创建项目
          const { dispatch } = this.props;
          dispatch({
            type: 'project/fetchSaveProject',
            payload: values,
          });
        }
      }
    });
  };

  // //选择经纬度
  // handleChange = () => {
  //   window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html');
  // };

  // 添加施工许可证
  handleAddBuilderLicenses = e => {
    this.setState({
      openBuilderLicensesForm: true,
    });
  };
  render() {
    const columns = [
      {
        title: '工程名称',
        dataIndex: 'projectName',
        key: 'projectName',
      },
      {
        title: '施工许可证编号',
        dataIndex: 'builderLicenseNum',
        key: 'builderLicenseNum',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.handleEditBuilderLicenses(record)}>
              编辑
            </a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.handleDelBuilderLicenses(record)}>
              删除
            </a>
          </span>
        ),
      },
    ];
    const { project, global, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const projectDetail = project.projectDetail; //详情
    console.log(projectDetail);
    return (
      <div className={styles.content}>
      <PageHeaderWrapper>
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <Row gutter={24} className={styles.FormContent}>
            <Col span={24} className={styles.FormTitle}>
              <p>项目基本信息</p>
              <p>
                <span style={{ color: 'red' }}>*</span>
                为必填项
              </p>
            </Col>
            <Divider />
            <Col span={8}>
              <Form.Item label="项目名称" className={styles.Formbox}>
                {getFieldDecorator('name', {
                  initialValue: projectDetail.name,
                  rules: [{ required: true, message: '请输入项目名称' }],
                })(<Input placeholder="请输入项目名称" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <SelectArea
                getFieldDecorator={getFieldDecorator}
                required={true}
                width={'80%'}
                areaCodeStr={projectDetail.areaCodeList}
              />
            </Col>
            <Col span={8}>
              <Form.Item label="项目状态" className={styles.Formbox}>
                {getFieldDecorator('prjStatus', {
                  initialValue: projectDetail.prjStatus,
                  rules: [{ required: true, message: '请选择项目状态' }],
                })(
                  <Select
                    placeholder="请选择项目状态"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="001">筹备</Option>
                    <Option value="002">立项</Option>
                    <Option value="003">在建</Option>
                    <Option value="004">完工</Option>
                    <Option value="005">停工</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="总承包单位统一社会信用代码" className={styles.Formbox}>
                {getFieldDecorator('contractorCorpCode', {
                  initialValue: projectDetail.contractorCorpCode,
                  rules: [{ required: true, message: '总承包单位统一社会信用代码' }],
                })(<Input placeholder="请填写总承包单位统一社会信用代码" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="总承包单位名称" className={styles.Formbox}>
                {getFieldDecorator('contractorCorpName', {
                  initialValue: projectDetail.contractorCorpName,
                  rules: [{ required: true, message: '请填写总承包单位名称' }],
                })(<Input placeholder="请填写总承包单位名称" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="项目分类" className={styles.Formbox}>
                {getFieldDecorator('category', {
                  initialValue: projectDetail.category,
                  rules: [{ required: true, message: 'Please input!' }],
                })(
                  <Select
                    placeholder="请选择项目分类"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="01">房屋建筑工程</Option>
                    <Option value="02">市政公用工程</Option>
                    <Option value="03">机电安装工程</Option>
                    <Option value="04">铁路工程</Option>
                    <Option value="05">公路工程</Option>
                    <Option value="06">港口与航道工程</Option>
                    <Option value="07">水利水电工程</Option>
                    <Option value="08">电力工程</Option>
                    <Option value="09">矿山工程</Option>
                    <Option value="10">冶炼工程</Option>
                    <Option value="11">化工石油工程</Option>
                    <Option value="12">通信工程</Option>
                    <Option value="99">其他</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="建设单位统一社会信用代码" className={styles.Formbox}>
                {getFieldDecorator('buildCorpCode', {
                  initialValue: projectDetail.buildCorpCode,
                })(<Input placeholder="如果无统一社会信用代码，则用组织机构代码" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="建设单位名称" className={styles.Formbox}>
                {getFieldDecorator('buildCorpName', {
                  initialValue: projectDetail.buildCorpName,
                })(<Input placeholder="请填写建设单位名称" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="总投资(万元)" className={styles.Formbox}>
                {getFieldDecorator('invest', {
                  initialValue: projectDetail.invest,
                })(
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    placeholder="请填写总投资"
                    allowClear
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="总面积(平方米)" className={styles.Formbox}>
                {getFieldDecorator('buildingArea', {
                  initialValue: projectDetail.buildingArea,
                })(
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    placeholder="请填写总面积"
                    allowClear
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="总长度(米)" className={styles.Formbox}>
                {getFieldDecorator('buildingLength', {
                  initialValue: projectDetail.buildingLength,
                })(
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    placeholder="请填写总长度"
                    allowClear
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开工日期" className={styles.Formbox}>
                {getFieldDecorator('startDate', {
                  rules: [{ required: false, message: '请选择开工日期' }],
                  initialValue:
                    projectDetail.startDate == undefined ? null : moment(projectDetail.startDate),
                })(
                  <DatePicker
                    format={dateFormat}
                    style={{ width: '100%' }}
                    placeholder="请选择开工日期！"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="竣工日期" className={styles.Formbox}>
                {getFieldDecorator('completeDate', {
                  initialValue:
                    projectDetail.completeDate == undefined
                      ? null
                      : moment(projectDetail.completeDate),
                })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="联系人姓名" className={styles.Formbox}>
                {getFieldDecorator('linkMan', {
                  initialValue: projectDetail.linkMan,
                })(<Input placeholder="请填写联系人姓名" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="联系人办公电话" className={styles.Formbox}>
                {getFieldDecorator('linkPhone', {
                  initialValue: projectDetail.linkPhone,
                })(<Input placeholder="请填写联系人办公电话" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="项目经纬度" className={styles.Formbox}>
                {getFieldDecorator('projectlat', {
                  initialValue: projectDetail.projectlat,
                })(
                  <Input
                    placeholder="请填写项目经纬度"
                    allowClear
                    // style={{ width: '60%', marginRight: '10px' }}
                  />
                )}
                {/* <Button type="ghost" onClick={this.handleChange}>
                选择
              </Button> */}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="项目地点" className={styles.Formbox}>
                {getFieldDecorator('address', {
                  initialValue: projectDetail.address,
                })(<Input placeholder="请填写项目地点" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="建设性质" className={styles.Formbox}>
                {getFieldDecorator('propertyNum', {
                  initialValue: projectDetail.propertyNum,
                })(
                  <Select
                    placeholder="请选择建设性质"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="001">新建</Option>
                    <Option value="002">改建</Option>
                    <Option value="003">扩建</Option>
                    <Option value="004">恢复</Option>
                    <Option value="005">迁建</Option>
                    <Option value="006">拆除</Option>
                    <Option value="099">其他</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="建设规模" className={styles.Formbox}>
                {getFieldDecorator('prjSize', {
                  initialValue: projectDetail.prjSize,
                })(
                  <Select
                    placeholder="请选择建设规模"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="01">大型</Option>
                    <Option value="02">中型</Option>
                    <Option value="03">小型</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="立项文号" className={styles.Formbox}>
                {getFieldDecorator('approvalNum', {
                  initialValue: projectDetail.approvalNum,
                })(<Input placeholder="请填写立项文号" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="立项级别" className={styles.Formbox}>
                {getFieldDecorator('approvalLevelNum', {
                  initialValue:
                    projectDetail.approvalLevelNum == '001'
                      ? '部级'
                      : projectDetail.approvalLevelNum == '002'
                        ? '省级'
                        : projectDetail.approvalLevelNum == '003'
                          ? '地市级'
                          : projectDetail.approvalLevelNum == '004'
                            ? '区县级'
                            : projectDetail.approvalLevelNum,
                })(
                  <Select
                    placeholder="请选择立项级别"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="001">部级</Option>
                    <Option value="002">省级</Option>
                    <Option value="003">地市级</Option>
                    <Option value="004">区县级</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="工程用途" className={styles.Formbox}>
                {getFieldDecorator('functionNum', {
                  initialValue: projectDetail.functionNum,
                })(
                  <Select
                    placeholder="请选择工程用途"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="100">居住建筑</Option>
                    <Option value="200">居住建筑配套工程</Option>
                    <Option value="300">公共建筑</Option>
                    <Option value="301">办公建筑</Option>
                    <Option value="302">商业建筑</Option>
                    <Option value="303">旅游建筑</Option>
                    <Option value="304">科教文卫建筑</Option>
                    <Option value="305">交通运输类</Option>
                    <Option value="306">通信建筑</Option>
                    <Option value="307">公共建筑配套工程</Option>
                    <Option value="400">商住楼</Option>
                    <Option value="500">农业建筑</Option>
                    <Option value="600">农业建筑配套工程</Option>
                    <Option value="700">工业建筑</Option>
                    <Option value="800">工业建筑配套工程</Option>
                    <Option value="999">其他</Option>
                    <Option value="10">给水</Option>
                    <Option value="11">排水</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="国籍或地区" className={styles.Formbox}>
                {getFieldDecorator('nationNum', {
                  initialValue: projectDetail.nationNum,
                })(
                  <Select
                    placeholder="请选择国籍"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="156">中国</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="建设用地规划许可证编号" className={styles.Formbox}>
                {getFieldDecorator('buildPlanNum', {
                  initialValue: projectDetail.buildPlanNum,
                })(<Input placeholder="请填写建设用地规划许可证编号" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="建设工程规划许可证编号" className={styles.Formbox}>
                {getFieldDecorator('prjPlanNum', {
                  initialValue: projectDetail.prjPlanNum,
                })(<Input placeholder="请填写建设工程规划许可证编号" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="项目简介" style={{ width: '90%' }}>
                {getFieldDecorator('description', {
                  initialValue: projectDetail.description,
                })(<TextArea rows={4} placeholder="请输入项目简介" allowClear />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.FormContent}>
            <Col span={24} className={styles.FormTitle}>
              <p>施工许可证</p>
              <Button type="dashed" onClick={this.handleAddBuilderLicenses}>
                {' '}
                <Icon type="plus" />
                添加施工许可证
              </Button>
            </Col>
            <Divider />
            <Table
              dataSource={this.state.builderLicenses}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
            <Modal
              title="添加施工许可证"
              visible={this.state.openBuilderLicensesForm}
              onCancel={() => {
                this.setState({ openBuilderLicensesForm: false });
              }}
              footer={null}
              maskClosable={false}
              destroyOnClose={true}
            >
              <BuilderLicensesForm _this={this} record={this.state.record} />
            </Modal>
          </Row>
          <div className={styles.btnContent}>
            <Form.Item>
              {getFieldDecorator('uploadMohurd', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>是否同步到全国建筑工人平台</Checkbox>)}
            </Form.Item>
            <Button className={styles.btn1} type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
            <Button className={styles.btn2} onClick={() => history.go(-1)}>
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
class BuilderLicensesForm extends Component {
  state = {};
  handleSaveSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let arr = this.props._this.state.builderLicenses;
        arr.push(values);
        arr.map((item, index) => {
          item.id = index + 1;
          return item;
        });
        this.props._this.setState({
          builderLicenses: arr,
          openBuilderLicensesForm: false,
        });
      }
    });
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
    const { record, project } = this.props;
    console.log(record);
    console.log(project);
    // const builderLicenseList = project.builderLicenseList || [];
    return (
      <div>
        <Form>
          <Form.Item label="工程名称">
            {getFieldDecorator('projectName', {
              initialValue: record.projectName,
              rules: [{ required: true, message: '请输入项目名称' }],
            })(<Input placeholder="请输入项目名称" />)}
          </Form.Item>
          <Form.Item label="施工许可证编号">
            {getFieldDecorator('builderLicenseNum', {
              initialValue: record.builderLicenseNum,
              rules: [{ required: true, message: '请输入项目名称' }],
            })(<Input placeholder="请输入项目名称" />)}
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={() => this.handleSaveSubmit()}>
              保存
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
