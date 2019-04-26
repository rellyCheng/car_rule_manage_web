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
  message,
} from 'antd';
import { connect } from 'dva';
import styles from './Common.less';
const confirm = Modal.confirm;
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import SelectPlatform from '@/components/Platform/SelectPlatform'
import TextArea from 'antd/lib/input/TextArea';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
@Form.create()
@connect(({ item, loading }) => ({
  item,
  loading: loading.effects['item/fetchAddProjectEmployee'],
}))
export default class ProjectEmployeeForm extends Component {
  state = {
    fileList1: [],
    fileList2: [],
    fileList3: [],
    fileList4: [],
  };
  componentDidMount() {
    const projectCode = this.props.location.query.projectCode;
    if (projectCode) {
      this.fetchCorpList(projectCode);
    }
    if (projectCode) {
      this.fetchTeamList(projectCode);
    }
  }

  handleChangeBase64 = (file, num) => {
    console.log(file.file);

    this.getBase64(file.file.originFileObj, imageUrl => {
      const { form } = this.props;
      if (num === '1') {
        form.setFieldsValue({
          ['headImage']: imageUrl,
        });
        this.setState({
          fileList1: file.fileList.length == 0 ? [] : file.fileList,
        });
      } else if (num === '2') {
        form.setFieldsValue({
          ['positiveIDCardImage']: imageUrl,
        });
        this.setState({
          fileList2: file.fileList.length == 0 ? [] : file.fileList,
        });
      } else if (num === '3') {
        form.setFieldsValue({
          ['negativeIDCardImage']: imageUrl,
        });
        this.setState({
          fileList3: file.fileList.length == 0 ? [] : file.fileList,
        });
      } else if (num === '4') {
        form.setFieldsValue({
          ['issueCardPic']: imageUrl,
        });
        this.setState({
          fileList4: file.fileList.length == 0 ? [] : file.fileList,
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.fetchAddProjectEmployee(values);
      }
    });
  };
  //上传工人信息
  fetchAddProjectEmployee = values => {
    const workerList = new Array();
    const obj = new Object();
    const { dispatch } = this.props;
    const projectCode = this.props.location.query.projectCode;
    workerList.push(values);
    obj.workerList = workerList;
    obj.projectCode = projectCode;
    obj.corpName = values.corpName.label;
    obj.corpCode = values.corpName.key;
    obj.teamSysNo = values.teamName.key;
    obj.teamName = values.teamName.label;
    console.log(obj);
    dispatch({
      type: 'item/fetchAddProjectEmployee',
      payload: {
        obj: obj,
      },
      callback: res => {
        if (res.state == 1) {
          message.success('添加成功');
        }
      },
    });
  };

  fetchCorpList = projectCode => {
    const { dispatch } = this.props;
    dispatch({
      type: 'item/fetchCorpList',
      payload: {
        projectCode: projectCode,
        current: 1,
        size: 50,
      },
    });
  };

  fetchTeamList = projectCode => {
    const { dispatch } = this.props;
    dispatch({
      type: 'item/fetchTeamList',
      payload: {
        projectCode: projectCode,
        current: 1,
        size: 50,
      },
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

  // handleSelectName =(e)=>{
  //   console.log(e.key);
  //   this.props.form.setFieldsValue({
  //     corpCode:e.key
  //   })
  // }

  handleSelectTeam = e => {
    console.log(e.key);
    const { item } = this.props;
    let obj = {};
    item.teamMasterList.result.map((item, index) => {
      if (e.key == item.teamSysNo) {
        obj.corpCode = item.corpCode;
        obj.corpName = item.corpName;
      }
    });
    this.props.form.setFieldsValue({
      corpName: { key: obj.corpCode, label: obj.corpName },
    });
    console.log(obj);
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
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { item, loading } = this.props;
    console.log(item.teamMasterList);
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
    };
    const corpList = item.corpList.result || [];
    const teamMasterList = item.teamMasterList.result || [];
    return (
      <div className={styles.content}>
        <PageHeaderWrapper>
          <Form onSubmit={this.handleSubmit} layout="vertical" className={styles.Form}>
            {/* 基本信息 */}
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>基本信息</p>
                <p>
                  <span style={{ color: 'red' }}>*</span>
                  为必填项
                </p>
              </Col>
              <Divider />
              <Col span={8}>
                <Form.Item label="工人姓名" className={styles.Formbox}>
                  {getFieldDecorator('workerName', {
                    rules: [{ required: true, message: '请填写工人姓名!' }],
                  })(<Input placeholder="请填写工人姓名" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="所在企业名称">
                  {getFieldDecorator('corpName', {
                    rules: [{ required: true, message: '请选择企业名称！' }],
                  })(
                    <Select
                      disabled
                      placeholder="请选择企业名称"
                      labelInValue={true}
                      onChange={this.handleSelectName}
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
              {/* <Col span={8} >
                <Form.Item  className={styles.Formbox}  label="企业统一社会信用代码">
                  {getFieldDecorator('corpCode',{
                    rules: [{ required: true, message: '请填写企业统一社会信用代码' }]
                  })(
                    
                    <Input disabled placeholder="请填写企业统一社会信用代码" />
                  )}
                </Form.Item>
              </Col> */}
              <Col span={8}>
                <Form.Item label="班组名称" className={styles.Formbox}>
                  {getFieldDecorator('teamName', {
                    rules: [{ required: true, message: '请填写班组名称!' }],
                  })(
                    <Select
                      placeholder="请选择班组"
                      labelInValue={true}
                      onChange={this.handleSelectTeam}
                    >
                      {teamMasterList.map((item, index) => {
                        return (
                          <Option key={index} value={item.teamSysNo}>
                            {item.teamName}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              {/* <Col span={8} >
                <Form.Item  className={styles.Formbox}  label="班组编号">
                  {getFieldDecorator('teamSysNo',{
                    rules: [{ required: true, message: '请填写班组编号' }]
                  })(
                    
                    <Input disabled placeholder="请填写班组编号" />
                  )}
                </Form.Item>
              </Col> */}
              <Col span={8}>
                <Form.Item label="是否是班组长" className={styles.Formbox}>
                  {getFieldDecorator('isTeamLeader', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Select placeholder="请选择">
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="头像">
                  {getFieldDecorator('headImage', {
                    rules: [{ required: true, message: '请上传头像' }],
                  })(
                    <Upload onChange={file => this.handleChangeBase64(file, '1')} action="1">
                      {this.state.fileList1.length >= 1 ? null : (
                        <Button>
                          <Icon type="upload" />
                          上传头像
                        </Button>
                      )}
                    </Upload>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="当前工种">
                  {getFieldDecorator('workType', {
                    rules: [{ required: true, message: '请选择当前工种！' }],
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择"
                      allowClear
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="010">砌筑工</Option>
                      <Option value="020">钢筋工</Option>
                      <Option value="030">架子工</Option>
                      <Option value="040">混凝土工</Option>
                      <Option value="050">模板工</Option>
                      <Option value="060">机械设备安装工</Option>
                      <Option value="070">通风工</Option>
                      <Option value="080">安装起重工</Option>
                      <Option value="090">安装钳工</Option>
                      <Option value="100">电气设备安装调试工</Option>
                      <Option value="110">管道工</Option>
                      <Option value="120">变电安装工</Option>
                      <Option value="130">建筑电工</Option>
                      <Option value="140">司泵工</Option>
                      <Option value="150">挖掘铲运和桩工机械司机</Option>
                      <Option value="160">桩机操作工</Option>
                      <Option value="170">起重信号工</Option>
                      <Option value="180">建筑起重机械安装拆卸工</Option>
                      <Option value="190">装饰装修工</Option>
                      <Option value="200">室内成套设施安装工</Option>
                      <Option value="210">建筑门窗幕墙安装工</Option>
                      <Option value="220">幕墙制作工</Option>
                      <Option value="230">防水工</Option>
                      <Option value="240">木工</Option>
                      <Option value="250">石工</Option>
                      <Option value="270">电焊工</Option>
                      <Option value="280">爆破工</Option>
                      <Option value="290">除尘工</Option>
                      <Option value="300">测量放线工</Option>
                      <Option value="310">线路架设工</Option>
                      <Option value="320">古建筑传统石工</Option>
                      <Option value="330">古建筑传统瓦工</Option>
                      <Option value="340">古建筑传统彩画工</Option>
                      <Option value="350">古建筑传统木工</Option>
                      <Option value="360">古建筑传统油工</Option>
                      <Option value="380">金属工</Option>
                      <Option value="900">管理人员</Option>
                      <Option value="390">杂工</Option>
                      <Option value="1000">其它</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="工人类型">
                  {getFieldDecorator('workRole', {
                    initialValue: '20',
                    rules: [{ required: true, message: '请选择工人类型！' }],
                  })(
                    <Select placeholder="请选择工人类型">
                      <Option value="10">管理人员</Option>
                      <Option value="20">建筑工人</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="政治面貌">
                  {getFieldDecorator('politicsType', {
                    initialValue: '13',
                    rules: [{ required: true, message: '请选择政治面貌' }],
                  })(
                    <Select placeholder="请选择">
                      <Option value="01">中共党员</Option>
                      <Option value="02">中共预备党员</Option>
                      <Option value="03">共青团员</Option>
                      <Option value="04">民革党员</Option>
                      <Option value="05">民盟盟员</Option>
                      <Option value="06">民建会员</Option>
                      <Option value="07">民进会员</Option>
                      <Option value="08">农工党党员</Option>
                      <Option value="09">致公党党员</Option>
                      <Option value="10">九三学社社员</Option>
                      <Option value="11">台盟盟员</Option>
                      <Option value="12">无党派人士</Option>
                      <Option value="13">群众</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="文化程度">
                  {getFieldDecorator('cultureLevelType', {
                    rules: [{ required: true, message: '请选择文化程度' }],
                  })(
                    <Select placeholder="请选择">
                      <Option value="01">小学</Option>
                      <Option value="02">初中</Option>
                      <Option value="03">高中</Option>
                      <Option value="04">中专</Option>
                      <Option value="05">大专</Option>
                      <Option value="06">本科</Option>
                      <Option value="07">硕士</Option>
                      <Option value="08">博士</Option>
                      <Option value="99">其他</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="民族">
                  {getFieldDecorator('nation', {
                    initialValue: '汉族',
                    rules: [{ required: true, message: '请填写民族！' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="手机号码">
                  {getFieldDecorator('cellPhone', {
                    rules: [{ required: true, message: '请填写手机号码！' }],
                  })(<Input placeholder="请填写手机号码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="住址">
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: '请填写住址' }],
                  })(<Input placeholder="请填写住址" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>证件信息</p>
              </Col>
              <Divider />
              <Col span={8}>
                <Form.Item label="证件类型" className={styles.Formbox}>
                  {getFieldDecorator('idCardType', {
                    initialValue: '01',
                    rules: [{ required: true, message: '请选择证件类型' }],
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
              </Col>
              <Col span={8}>
                <Form.Item label="证件号码" className={styles.Formbox}>
                  {getFieldDecorator('idCardNumber', {
                    rules: [{ required: true, message: '请填写证件号码!' }],
                  })(<Input placeholder="请填写证件号码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发证机关">
                  {getFieldDecorator('grantOrg', {
                    rules: [{ required: true, message: '请填写身份证发证机关！' }],
                  })(<Input placeholder="请填写身份证发证机关" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="身份证正面照">
                  {getFieldDecorator('positiveIDCardImage', {
                    rules: [{ required: false, message: '请上传身份证正面照' }],
                  })(
                    <Upload
                      {...props}
                      onChange={file => this.handleChangeBase64(file, '2')}
                      action="1"
                    >
                      {this.state.fileList2.length >= 1 ? null : (
                        <Button>
                          <Icon type="upload" />
                          上传照片
                        </Button>
                      )}
                    </Upload>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="身份证反面照">
                  {getFieldDecorator('negativeIDCardImage', {
                    rules: [{ required: false, message: '请上传身份证反面照' }],
                  })(
                    <Upload onChange={file => this.handleChangeBase64(file, '3')} action="1">
                      {this.state.fileList3.length >= 1 ? null : (
                        <Button>
                          <Icon type="upload" />
                          上传照片
                        </Button>
                      )}
                    </Upload>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发证有效开始日期">
                  {getFieldDecorator('startDate')(
                    <DatePicker
                      format={dateFormat}
                      placeholder="请选择发证有效开始日期"
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发证有效结束日期">
                  {getFieldDecorator('expiryDate')(
                    <DatePicker
                      format={dateFormat}
                      placeholder="请选择发证有效结束日期"
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>其他信息</p>
              </Col>
              <Divider />
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="办卡采集照片">
                  {getFieldDecorator('issueCardPic', {
                    rules: [{ required: false, message: '请上传办卡采集照' }],
                  })(
                    <Upload onChange={file => this.handleChangeBase64(file, '4')} action="1">
                      {this.state.fileList4.length >= 1 ? null : (
                        <Button>
                          <Icon type="upload" />
                          上传照片
                        </Button>
                      )}
                    </Upload>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="考勤卡号">
                  {getFieldDecorator('cardNumber')(<Input placeholder="请填写考勤卡号" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发卡时间">
                  {getFieldDecorator('issueCardDate')(
                    <DatePicker format={dateFormat} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发放工资银行卡号">
                  {getFieldDecorator('payRollBankCardNumber')(
                    <Input placeholder="请填写发放工资银行卡号" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发放工资银行名称">
                  {getFieldDecorator('payRollBankName')(
                    <Input placeholder="请填写发放工资银行名称" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="工资卡银行联号">
                  {getFieldDecorator('bankLinkNumber')(<Input placeholder="请填写工资银行联号" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="是否购买工伤或意外伤害保险">
                  {getFieldDecorator('hasBuyInsurance')(
                    <Select placeholder="请选择">
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="加入工会时间">
                  {getFieldDecorator('joinedTime')(
                    <DatePicker
                      format={dateFormat}
                      placeholder="请选择加入工会时间"
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="特长">
                  {getFieldDecorator('Specialty')(<Input placeholder="请填写特长" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="是否有重大病史">
                  {getFieldDecorator('hasBadMedicalHistory')(
                    <Select placeholder="请选择">
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="紧急联系人姓名">
                  {getFieldDecorator('urgentLinkMan')(<Input placeholder="请填写紧急联系人姓名" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="紧急联系方式">
                  {getFieldDecorator('urgentLinkManPhone')(
                    <Input placeholder="请填写紧急联系方式" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="开始工作日期">
                  {getFieldDecorator('workDate')(
                    <DatePicker
                      format={dateFormat}
                      placeholder="请选择开始工作日期"
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="婚姻状况">
                  {getFieldDecorator('maritalStatus')(
                    <Select placeholder="请选择">
                      <Option value="01">未婚</Option>
                      <Option value="02">已婚</Option>
                      <Option value="03">离异</Option>
                      <Option value="04">丧偶</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="岗位类型">
                  {getFieldDecorator('jobType')(
                    <Select placeholder="请选择">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                    </Select>
                  )}
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
            <Row gutter={24} className={styles.btnContent}>
              <Button className={styles.btn1} type="primary" htmlType="submit" loading={loading}>
                提交
              </Button>
              <Button className={styles.btn2} onClick={() => this.handleCancle()}>
                取消
              </Button>
            </Row>
          </Form>
        </PageHeaderWrapper>
      </div>
    );
  }
}
