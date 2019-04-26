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
  Checkbox,
} from 'antd';
import { connect } from 'dva';
import styles from './Common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import SelectPlatform from '@/components/Platform/SelectPlatform'
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from '@/utils/utils';
const confirm = Modal.confirm;
import moment from 'moment';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const dateFormat2 = 'YYYY-MM-DD HH:mm:ss'
import token from '@/utils/token';
@Form.create()
@connect(({ projectLocalUpload, project, loading }) => ({
  projectLocalUpload,
  project,
  addloading: loading.effects['projectLocalUpload/fetchAddProjectManageEmployeeForm'],
  modifyloading: loading.effects['project/fetchEmployeeFormUpdate'],
}))
export default class AddProjectEmployeeForm extends Component {
  state = {
    fileList1: [],
    fileList2: [],
    fileList3: [],
    fileList4: [],
    checked: false,
  };
  componentDidMount() {
    this.fetchPlatformTeamMasterList();
    let projectJid = this.props.location.query.id
    if(projectJid){
      this.fetchProjectWorkerDetail();
      this.fetchProjectEmployeeWorkerDetail();
      this.fetchWorkerInfoWorkerDetail();
    }
  
  }
  fetchFileUpload = (file, num) => {
    const { form } = this.props;
    console.log(file);
    if (file.file.status == 'done') {
      // console.log(file.file.response)
      const path = file.file.response.data.path;
      if (num === '1') {
        form.setFieldsValue({
          headImageUrl: path,
        });
        this.setState({
          fileList1: file.fileList.length == 0 ? [] : file.fileList,
        });
      } else if (num === '2') {
        form.setFieldsValue({
          ['positiveIDCardImageUrl']: path,
        });
        this.setState({
          fileList2: file.fileList.length == 0 ? [] : file.fileList,
        });
      } else if (num === '3') {
        form.setFieldsValue({
          ['negativeIDCardImageUrl']: path,
        });
        this.setState({
          fileList3: file.fileList.length == 0 ? [] : file.fileList,
        });
      } else if (num === '4') {
        form.setFieldsValue({
          ['issueCardPicUrl']: path,
        });
        this.setState({
          fileList4: file.fileList.length == 0 ? [] : file.fileList,
        });
      }
    }
  };
  //获取工人信息1
  fetchProjectWorkerDetail = () => {
    const { dispatch } = this.props;
    const id = this.props.location.query.id;
    dispatch({
      type: 'project/fetchProjectWorkerDetail',
      payload: {
        projectWorkerJid: id,
      },
      callback: res => {
        let fileList4 = [];
        if (res.data.issueCardPicUrl) {
          let file4 = {};
          file4.url = SERVER_IP.FTP_IP + res.data.issueCardPicUrl;
          file4.uid = '1';
          file4.name = '办卡采集照片';
          fileList4.push(file4);
        }
        this.setState({
          fileList4: fileList4,
        });
      },
    });
  };
  //获取工人信息2
  fetchProjectEmployeeWorkerDetail = () => {
    const { dispatch } = this.props;
    const id = this.props.location.query.id;
    dispatch({
      type: 'project/fetchProjectEmployeeWorkerDetail',
      payload: {
        projectWorkerJid: id,
      },
    });
  };
  //获取工人信息3
  fetchWorkerInfoWorkerDetail = () => {
    const { dispatch } = this.props;
    const id = this.props.location.query.id;
    dispatch({
      type: 'project/fetchWorkerInfoWorkerDetail',
      payload: {
        projectWorkerJid: id,
      },
      callback: res => {
        console.log(res.data);
        let fileList1 = [];

        if (res.data.headImageUrl != '') {
          let file1 = {};
          file1.url = SERVER_IP.FTP_IP + res.data.headImageUrl;
          file1.uid = '1';
          file1.name = '头像';
          fileList1.push(file1);
        }

        let fileList2 = [];
        if (res.data.positiveIdCardImageUrl != '') {
          let file2 = {};
          file2.url = SERVER_IP.FTP_IP + res.data.positiveIdCardImageUrl;
          file2.uid = '1';
          file2.name = '身份证正面照';
          fileList2.push(file2);
        }

        let fileList3 = [];
        if (res.data.negativeIdCardImageUrl != '') {
          let file3 = {};
          file3.url = SERVER_IP.FTP_IP + res.data.negativeIdCardImageUrl;
          file3.uid = '1';
          file3.name = '身份证反面照';
          fileList3.push(file3);
        }

        this.setState({
          fileList1: fileList1,
          fileList2: fileList2,
          fileList3: fileList3,
        });
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        const projectWorkerJid = this.props.location.query.id;
        const workerJid = this.props.location.query.workerJid;
        const { dispatch } = this.props;
        const projectJid = this.props.location.query.projectJid;
        let workDate;
        values.projectJid = projectJid;
        values.corpName = values.corp.label;
        values.corpJid = values.corp.key;
        values.teamName = values.team.label;
        values.teamJid = values.team.key;
        values.headImage = values.headImageUrl;
        values.positiveIDCardImage = values.positiveIDCardImageUrl;
        values.negativeIDCardImage = values.negativeIDCardImageUrl;
        values.issueCardPic = values.issueCardPicUrl;
        console.log(values);
        if (!isEmpty(values.startDate)) {
          values.startDate = values.startDate.format('YYYY-MM-DD');
        }
        if (!isEmpty(values.expiryDate)) {
          values.expiryDate = values.expiryDate.format('YYYY-MM-DD');
        }
        if (!isEmpty(values.issueCardDate)) {
          values.issueCardDate = values.issueCardDate.format('YYYY-MM-DD');
        }
        if (!isEmpty(values.joinedTime)) {
          values.joinedTime = values.joinedTime.format('YYYY-MM-DD');
        }
        if (!isEmpty(values.workDate)) {
          values.workDate = values.workDate.format('YYYY-MM-DD HH:mm:ss');
        }
        if(values.workDate){
          workDate = values.workDate
        }else{
          const date = new Date();
          workDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
          // value.date = moment(date).format('YYYY-MM-DD HH:mm:ss');
        }

        //添加进退场的value
        let value = {}
        value.projectJid = projectJid
        value.corpJid = values.corp.key
        value.teamJid = values.team.key
        value.idCardNumber = values.idCardNumber
        value.idCardType =values.idCardType
        value.date = workDate
        value.type = "1"


        if (!projectWorkerJid) {
          dispatch({
            type: 'projectLocalUpload/fetchAddProjectManageEmployeeForm',
            payload: values,
            callback: res => {
              console.log(res);
              if (res.state == 1) {
                message.success('添加成功');
                this.fetchEntryExit(value);//调用工人进退场接口
                history.go(-1);
                this.fetchProjectEmployeeList();
              } else {
                message.error(res.message);
              }
            },
          });
        } else {
          const mohurdData = this.props.location.query.mohurdData;
          values.projectWorkerJid = projectWorkerJid;
          values.workerJid = workerJid;
          console.log(mohurdData == 'true')
          if(mohurdData == 'true'){
            //国家平台工人编辑
            this.fetchCountryEmployeeFormUpdate(values);
          }else{
            //管工平台工人编辑
            this.fetchEmployeeFormUpdate(values,value);
          }
        }
      }
    });
  };

  //国家平台工人编辑
  fetchCountryEmployeeFormUpdate =(values)=>{
    const {dispatch}= this.props;
    dispatch({
      type: 'project/fetchCountryEmployeeFormUpdate',
      payload: values,
      callback: res => {
        console.log(res);
        if (res.state == 1) {
          message.success('编辑成功');
          this.fetchProjectEmployeeList();
          history.go(-1);
        } else {
          message.error(res.message);
        }
      },
    });
  }
  //调用工人进退场接口
  fetchEntryExit=(value)=>{
    const {dispatch} = this.props
    dispatch({
      type:'projectLocalUpload/fetchEntryExit',
      payload:value,
      callback:res=>{
        if(res.state==1){
          //不用提示
        }else{
          message.error(res.message)
        }
      }
    })
  }
  //管工平台工人编辑
  fetchEmployeeFormUpdate=(values,value)=>{
    const {dispatch}= this.props;
    dispatch({
      type: 'project/fetchEmployeeFormUpdate',
      payload: values,
      callback: res => {
        console.log(res);
        if (res.state == 1) {
          message.success('编辑成功');
          if(values.uploadMohurd){//勾选上传国家平台
            this.fetchEntryExit(value);//调用工人进退场接口
          }
          this.fetchProjectEmployeeList();
          history.go(-1);
        } else {
          message.error(res.message);
        }
      },
    });
  }



 


  //获取工人信息
  fetchProjectEmployeeList = (pageCurrent = 1) => {
    const { dispatch, project } = this.props;
    const jid = project.projectDetail.jid;
    dispatch({
      type: 'project/fetchProjectEmployeeList',
      payload: {
        projectJid: jid,
        current: pageCurrent,
        size: 10,
      },
    });
  };

  // 获取平台上传的班组列表
  fetchPlatformTeamMasterList = (pageCurrent = 1) => {
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    dispatch({
      type: 'project/fetchPlatformTeamMasterList',
      payload: {
        projectJid: projectJid,
        current: pageCurrent,
        size: 10,
      },
    });
  };

  handleSelectTeam = e => {
    console.log(e.key);
    const { project } = this.props;
    let obj = {};
    const platformTeamMasterList = project.platformTeamMasterList || [];
    console.log(platformTeamMasterList);
    platformTeamMasterList.result.map((item, index) => {
      if (e.key == item.jid) {
        console.log(item.jid);
        obj.corpJid = item.corpJid;
        obj.corpName = item.corpName;
      }
    });
    this.props.form.setFieldsValue({
      corp: { key: obj.corpJid, label: obj.corpName },
    });
    console.log(obj);
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

  handleChange = e => {
    this.setState(
      {
        checked: e.target.checked,
      },
      () => {
        this.props.form.validateFields(['uploadMohurd'], { force: true });
      }
    );
  };
  normFile = (e, num) => {
    if (Array.isArray(e)) {
      return e;
    }
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
    if (num === '3') {
      this.setState({
        fileList3: e.fileList,
      });
    }
    if (num === '4') {
      this.setState({
        fileList4: e.fileList,
      });
    }

    return e && e.fileList;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const params = {
      name: 'file',
      action:'/worker/manage/api/basicData/file/upload/compress',
      headers:{'Authorization':'Bearer '+token.get()}
    };
    const { project, addloading, modifyloading } = this.props;
    const corpList = project.corpList.result || [];
    const platformTeamMasterList = project.platformTeamMasterList.result || [];
    let projectWorkerDetail = project.projectWorkerDetail; //项目工人信息1(优先取这个里面的值)
    let ProjectEmployeeWorkerDetail = project.ProjectEmployeeWorkerDetail; //项目工人信息2
    let WorkerInfoWorkerDetail = project.WorkerInfoWorkerDetail; //项目工人信息3
    if (!this.props.location.query.id) {
      projectWorkerDetail = {};
      ProjectEmployeeWorkerDetail = {};
      WorkerInfoWorkerDetail = {};
    }
    console.log(this.state.fileList1);
    return (
      <div className={styles.content}>
        <PageHeaderWrapper>
          <Form onSubmit={this.handleSubmit} layout="vertical" className={styles.Form}>
            {/* 基本信息 */}
            <Row gutter={24} className={styles.FormContent}>
              <Col span={24} className={styles.FormTitle}>
                <p>添加人员</p>
                <p>
                  <span style={{ color: 'red' }}>*</span>
                  为必填项
                </p>
              </Col>
              <Divider />
              <Col span={8}>
                <Form.Item label="工人姓名" className={styles.Formbox}>
                  {getFieldDecorator('workerName', {
                    initialValue: projectWorkerDetail.workerName,
                    rules: [{ required: true, message: '请填写工人姓名!' }],
                  })(<Input placeholder="请填写工人姓名" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="所在企业名称">
                  {getFieldDecorator('corp', {
                    initialValue: {
                      key: projectWorkerDetail.corpJid,
                      label: projectWorkerDetail.corpName,
                    },
                    rules: [{ required: true, message: '请选择企业名称！' }],
                  })(
                    <Select
                      placeholder="请选择参建单位"
                      labelInValue={true}
                      disabled
                      onChange={this.handleSelectName}
                    >
                      {corpList.map((item, index) => {
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
                <Form.Item label="班组名称" className={styles.Formbox}>
                  {getFieldDecorator('team', {
                    initialValue: {
                      key: projectWorkerDetail.teamJid,
                      label: projectWorkerDetail.teamName,
                    },
                    rules: [{ required: true, message: '请填写班组名称!' }],
                  })(
                    <Select
                      placeholder="请选择班组"
                      labelInValue={true}
                      onChange={this.handleSelectTeam}
                    >
                      {platformTeamMasterList.map((item, index) => {
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
              <Col span={8}>
                <Form.Item label="是否是班组长" className={styles.Formbox}>
                  {getFieldDecorator('isTeamLeader', {
                    initialValue: projectWorkerDetail.teamLeader == true ? '1' : '0',
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
                    initialValue: this.state.fileList1,
                    valuePropName: 'fileList',
                    getValueFromEvent: e => this.normFile(e, '1'),
                    rules: [{ required: true, message: '请上传头像' }],
                  })(
                     <Upload 
                     onChange={(file)=>this.fetchFileUpload(file,"1")} 
                     data={{
                      desFileSize:50
                     }}
                     {...params}
                     >
                       {
                         this.state.fileList1.length >= 1? null :    
                         <Button>
                           <Icon type="upload" />上传
                         </Button>
                       }
                     </Upload>
                  )}
                </Form.Item>
                <Form.Item className={styles.Formbox} label="头像" style={{ display: 'none' }}>
                  {getFieldDecorator('headImageUrl', {
                    initialValue: WorkerInfoWorkerDetail.headImageUrl,
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="当前工种">
                  {getFieldDecorator('workType', {
                    initialValue: projectWorkerDetail.workType,
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
                    initialValue: projectWorkerDetail.workerRole ? projectWorkerDetail.workerRole+'':'20',
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
                    initialValue:
                      WorkerInfoWorkerDetail.politicsType == undefined ||
                      WorkerInfoWorkerDetail.politicsType == ''
                        ? '13'
                        : WorkerInfoWorkerDetail.politicsType,
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
                    initialValue:
                      WorkerInfoWorkerDetail.cultureLevelType == undefined ||
                      WorkerInfoWorkerDetail.cultureLevelType == ''
                        ? '02'
                        : WorkerInfoWorkerDetail.cultureLevelType,
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
                    initialValue:
                      WorkerInfoWorkerDetail.nation == undefined ||
                      WorkerInfoWorkerDetail.nation == ''
                        ? '汉'
                        : WorkerInfoWorkerDetail.nation,
                    rules: [{ required: true, message: '请填写民族！' }],
                  })(<Input placeholder="请填写民族" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="手机号码">
                  {getFieldDecorator('cellPhone', {
                    initialValue: WorkerInfoWorkerDetail.cellPhone,
                    rules: [{ required: true, message: '请填写手机号码！' }],
                  })(<Input placeholder="请填写手机号码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="住址">
                  {getFieldDecorator('address', {
                    initialValue: WorkerInfoWorkerDetail.address,
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
                    initialValue:
                      projectWorkerDetail.idCardType == undefined ||
                      projectWorkerDetail.idCardType == ''
                        ? '01'
                        : projectWorkerDetail.idCardType || '01',
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
                    initialValue: projectWorkerDetail.idCardNumber,
                    rules: [
                      {
                        max: 18,
                        min: 15,
                        required: true,
                        message: '请填写正确的证件号码!',
                      },
                    ],
                  })(<Input placeholder="请填写证件号码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发证机关">
                  {getFieldDecorator('grantOrg', {
                    initialValue:
                      WorkerInfoWorkerDetail.grantOrg == undefined ||
                      WorkerInfoWorkerDetail.grantOrg == ''
                        ? '公安局'
                        : WorkerInfoWorkerDetail.grantOrg,
                    rules: [{ required: true, message: '请填写身份证发证机关！' }],
                  })(<Input placeholder="请填写身份证发证机关" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="身份证正面照">
                  {getFieldDecorator('positiveIDCardImage', {
                    initialValue: this.state.fileList2,
                    valuePropName: 'fileList',
                    getValueFromEvent: e => this.normFile(e, '2'),
                    rules: [{ required: false, message: '请上传身份证正面照' }],
                  })(
                    <Upload 
                    onChange={(file)=>this.fetchFileUpload(file,"2")} 
                    data={{
                      desFileSize:500
                    }}
                    {...params}
                    >
                      {
                        this.state.fileList2.length >= 1? null :    
                        <Button>
                          <Icon type="upload" />
                          上传
                        </Button>
                      }
                    </Upload>
                  )}
                </Form.Item>
                <Form.Item
                  className={styles.Formbox}
                  label="身份证正面照"
                  style={{ display: 'none' }}
                >
                  {getFieldDecorator('positiveIDCardImageUrl', {})(<Input />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="身份证反面照">
                  {getFieldDecorator('negativeIDCardImage', {
                    rules: [{ required: false, message: '请上传身份证反面照' }],
                    initialValue: this.state.fileList3,
                    valuePropName: 'fileList',
                    getValueFromEvent: e => this.normFile(e, '3'),
                  })(
                    <Upload 
                    data={{
                      desFileSize:500
                    }}
                    onChange={(file)=>this.fetchFileUpload(file,"3")} 
                    {...params}
                    >
                      {
                        this.state.fileList3.length >= 1? null :    
                        <Button>
                          <Icon type="upload" />
                          上传
                        </Button>
                      }
                    </Upload>
                  )}
                </Form.Item>
                <Form.Item
                  className={styles.Formbox}
                  label="身份证反面照"
                  style={{ display: 'none' }}
                >
                  {getFieldDecorator('negativeIDCardImageUrl', {})(<Input />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发证有效开始日期">
                  {getFieldDecorator('startDate', {
                    initialValue:
                      WorkerInfoWorkerDetail.startDate == undefined
                        ? null
                        : moment(WorkerInfoWorkerDetail.startDate),
                  })(
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
                  {getFieldDecorator('expiryDate', {
                    initialValue:
                      WorkerInfoWorkerDetail.expiryDate == undefined
                        ? null
                        : moment(WorkerInfoWorkerDetail.expiryDate),
                  })(
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
                    initialValue: this.state.fileList4,
                    valuePropName: 'fileList',
                    getValueFromEvent: e => this.normFile(e, '4'),
                    rules: [{ required: false, message: '请上传办卡采集照' }],
                  })(
                    <Upload 
                    data={{
                      desFileSize:50
                    }}
                    onChange={(file)=>this.fetchFileUpload(file,"4")} 
                    {...params}
                    >
                      {
                        this.state.fileList4.length >= 1? null :    
                        <Button>
                          <Icon type="upload" />
                          上传
                        </Button>
                      }
                    </Upload>
                  )}
                </Form.Item>
                <Form.Item
                  className={styles.Formbox}
                  label="办卡采集照片"
                  style={{ display: 'none' }}
                >
                  {getFieldDecorator('issueCardPicUrl', {})(<Input />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="考勤卡号">
                  {getFieldDecorator('cardNumber', {
                    initialValue: projectWorkerDetail.cardNumber,
                  })(<Input placeholder="请填写考勤卡号" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发卡时间">
                  {getFieldDecorator('issueCardDate', {
                    initialValue:
                      projectWorkerDetail.issueCardDate == undefined
                        ? null
                        : moment(projectWorkerDetail.issueCardDate),
                  })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发放工资银行卡号">
                  {getFieldDecorator('payRollBankCardNumber', {
                    initialValue: projectWorkerDetail.payRollBankCardNumber,
                  })(<Input placeholder="请填写发放工资银行卡号" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="发放工资银行名称">
                  {getFieldDecorator('payRollBankName', {
                    initialValue: projectWorkerDetail.payRollBankName,
                  })(<Input placeholder="请填写发放工资银行名称" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="工资卡银行联号">
                  {getFieldDecorator('bankLinkNumber', {
                    initialValue: projectWorkerDetail.payRollBankName,
                  })(<Input placeholder="请填写工资银行联号" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="是否购买工伤或意外伤害保险">
                  {getFieldDecorator('hasBuyInsurance', {
                    initialValue: projectWorkerDetail.hasBuyInsurance == true ? '1' : '0',
                  })(
                    <Select placeholder="请选择">
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="加入工会时间">
                  {getFieldDecorator('joinedTime', {
                    initialValue:
                      WorkerInfoWorkerDetail.joinedTime == undefined
                        ? null
                        : moment(WorkerInfoWorkerDetail.joinedTime),
                  })(
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
                  {getFieldDecorator('specialty', {
                    initialValue: WorkerInfoWorkerDetail.specialty,
                  })(<Input placeholder="请填写特长" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="是否有重大病史">
                  {getFieldDecorator('hasBadMedicalHistory', {
                    initialValue: WorkerInfoWorkerDetail.hasBadMedicalHistory == true ? '1' : '0',
                  })(
                    <Select placeholder="请选择">
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="紧急联系人姓名">
                  {getFieldDecorator('urgentLinkMan', {
                    initialValue: WorkerInfoWorkerDetail.urgentLinkMan,
                  })(<Input placeholder="请填写紧急联系人姓名" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="紧急联系方式">
                  {getFieldDecorator('urgentLinkManPhone', {
                    initialValue: WorkerInfoWorkerDetail.urgentLinkManPhone,
                  })(<Input placeholder="请填写紧急联系方式" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="开始工作日期">
                  {getFieldDecorator('workDate', {
                    initialValue:
                      WorkerInfoWorkerDetail.workDate == undefined
                        ? null
                        : moment(WorkerInfoWorkerDetail.workDate),
                  })(
                    <DatePicker
                      format={dateFormat2}
                      placeholder="请选择开始工作日期"
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className={styles.Formbox} label="婚姻状况">
                  {getFieldDecorator('maritalStatus', {
                    initialValue: WorkerInfoWorkerDetail.maritalStatus,
                  })(
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
                  {getFieldDecorator('jobType', {
                    // initialValue:projectWorkerDetail.maritalStatus
                  })(
                    <Select placeholder="请选择">
                      <Option value="1">施工员</Option>
                      <Option value="2">质量员</Option>
                      <Option value="3">安全员</Option>
                      <Option value="4">标准员</Option>
                      <Option value="5">材料员</Option>
                      <Option value="6">机械员</Option>
                      <Option value="7">劳务员</Option>
                      <Option value="8">资料员</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            {/* <Row gutter={24} style={{textAlign:'center'}}>
                将数据同步到全国建筑工人管理服务信息平台
            </Row> */}
            <Row gutter={24} className={styles.btnContent}>
              <Form.Item>
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
            </Row>
          </Form>
        </PageHeaderWrapper>
      </div>
    );
  }
}
