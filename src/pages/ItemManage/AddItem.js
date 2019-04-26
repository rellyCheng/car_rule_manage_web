import React, { Component } from 'react';
import {Form,Row,Col,Input,Button,Icon,DatePicker,TimePicker,Select,Divider,Checkbox,Cascader,} from 'antd';
import { isEmpty,getAreaCode } from '@/utils/utils';
import SelectPlatform from '@/components/Platform/SelectPlatform';
import styles from './Common.less';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
const dateFormat = 'YYYY-MM-DD';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;
@Form.create()
@connect(({ item, global }) => ({
  item,
  global,
}))
export default class addProject extends Component {
  state = {
    areaCode: [],
  };
  componentDidMount() {
    this.add();
    this.fetchbasicData();
   
  }
  // //获取省市区
  fetchbasicData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchbasicData',
      callback: res => {
        this.setState({
          areaList: res
        })
        const projectJid = this.props.location.query.projectJid;
        if (projectJid !== undefined) {
          this.fetchDetails();
        }
      }
    });
  };
  //获取项目详情
  fetchDetails = () => {
    const { dispatch } = this.props;
    const projectJid = this.props.location.query.projectJid;
    let builderLicenses = [];
    dispatch({
      type: 'item/fetchSubmitProjectDetails',
      payload: {
        projectJid: projectJid,
      },
      callback: res => {
        builderLicenses = res.builderLicenses;
        this.setState({
          builderLicenses:builderLicenses
        })
        let areaData = getAreaCode(this.state.areaList,res.areaCode);
        const { form } = this.props;
        form.setFieldsValue({
          areaCode: areaData,
        });
      },
    });
  
   
  };
  // 提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 定义一个施工许可证数组(用于处理施工许可证)
        let rodeArr = [];
        values.prjName.map((item, index1) => {
          let obj = {};
          obj.prjName = item;
          values.builderLicenseNum.map((item, index) => {
            if (index == index1) {
              obj.builderLicenseNum = item;
            }
          });
          rodeArr.push(obj);
        });
        values.builderLicenses = rodeArr;
        //对日期的处理startDate completeDate
        if (!isEmpty(values.startDate)) {
          values.startDate = values.startDate.format('YYYY-MM-DD');
        } else {
          values.startDate = null;
        }
        if (!isEmpty(values.completeDate)) {
          values.completeDate = values.completeDate.format('YYYY-MM-DD');
        } else {
          values.completeDate = null;
        }

        // 对选择地区的处理
        values.areaCode = values.areaCode[values.areaCode.length - 1]; 
        //保存数据
        const { dispatch } = this.props;
        if (values.projectJid != null) {
          dispatch({
            type: 'item/fetchUpdateProject',
            payload: values,
          });
        } else {
          dispatch({
            type: 'item/fetchSubmitProject',
            payload: values,
          });
        }
       
      }
    });
  };

  //返回上一步
  handleBack = () => {
    window.history.back(-1);
  };
  //选择经纬度
  handleChange = () => {
    window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html');
  };

  //移除
  remove = k => {
    let builderLicenses = this.state.builderLicenses;
    builderLicenses.splice(k,1);
    this.setState({
      builderLicenses:builderLicenses
    })

  };
  // 添加
  add = e => {
    let obj = {
      builderLicenseNum:null,
      prjName:null
    }
    let builderLicenses = this.state.builderLicenses||[];
    builderLicenses.push(obj);
    this.setState({
      builderLicenses:builderLicenses
    })
  };
  render() {
    const { item, global } = this.props;
    const projectDetail = item.projectDetail;
    console.log(item)
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    let builderLicenses = this.state.builderLicenses || [];
    getFieldDecorator('keys', { initialValue: builderLicenses });
    const formItems = builderLicenses.map((item, index) => (
      <div key={index}>
        <Col span={8} offset={2}>
          <Form.Item {...formItemLayout2} label={'工程名称'} required={true} key={index}>
            {getFieldDecorator(`prjName[${index}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: !isEmpty(builderLicenses)
                ? item.builderLicenseNum
                : null,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入工程名称',
                },
              ],
            })(<Input placeholder="请输入工程名称" style={{ width: '90%', marginRight: 10 }} />)}
            {builderLicenses.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="close-circle"
                theme="twoTone"
                disabled={builderLicenses.length === 1}
                onClick={() => this.remove(index)}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item {...formItemLayout2} label={'施工许可证编号'} required={true} key={index}>
            {getFieldDecorator(`builderLicenseNum[${index}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: !isEmpty(builderLicenses) ? item.prjName : null,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入施工许可证编号',
                },
              ],
            })(
              <Input placeholder="请输入施工许可证编号" style={{ width: '90%', marginRight: 10 }} />
            )}
            {builderLicenses.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="close-circle"
                theme="twoTone"
                disabled={builderLicenses.length === 1}
                onClick={() => this.remove(index)}
              />
            ) : null}
          </Form.Item>
        </Col>
      </div>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* <Button type="primary" onClick={()=>this.handleBack()} >返回上一步</Button> */}
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="项目名称">
              {getFieldDecorator('name', {
                initialValue: item.submitProjectDetails.name,
                rules: [{ required: true, message: '请输入项目名称' }],
              })(<Input placeholder="请输入项目名称" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="项目所在地">
              {getFieldDecorator('areaCode', {
                rules: [{ required: true, message: '请选择项目所在地' }],
              })(<Cascader options={global.provinceCity} placeholder="请选择项目所在地" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="项目状态">
              {getFieldDecorator('prjStatus', {
                initialValue: item.submitProjectDetails.prjStatus,
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
                  <Option value='001'>筹备</Option>
                  <Option value='002'>立项</Option>
                  <Option value='003'>在建</Option>
                  <Option value='004'>完工</Option>
                  <Option value='005'>停工</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="总承包单位统一社会信用代码">
              {getFieldDecorator('contractorCorpCode', {
                initialValue: item.submitProjectDetails.contractorCorpCode,
                rules: [{ required: true, message: '总承包单位统一社会信用代码' }],
              })(<Input placeholder="请填写总承包单位统一社会信用代码" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="总承包单位名称">
              {getFieldDecorator('contractorCorpName', {
                initialValue: item.submitProjectDetails.contractorCorpName,
                rules: [{ required: true, message: '请填写总承包单位名称' }],
              })(<Input placeholder="请填写总承包单位名称" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="项目分类">
              {getFieldDecorator('category', {
                initialValue: item.submitProjectDetails.category,
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
            <Form.Item {...formItemLayout} label="建设单位统一社会信用代码">
              {getFieldDecorator('buildCorpCode', {
                initialValue: item.submitProjectDetails.buildCorpCode,
              })(<Input placeholder="如果无统一社会信用代码，则用组织机构代码" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="建设单位名称">
              {getFieldDecorator('buildCorpName', {
                initialValue: item.submitProjectDetails.buildCorpName,
              })(<Input placeholder="请填写建设单位名称" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="总投资(万元)">
              {getFieldDecorator('invest', {
                initialValue: item.submitProjectDetails.invest,
              })(<Input placeholder="请填写总投资" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="总面积(平方米)">
              {getFieldDecorator('buildingArea', {
                initialValue: item.submitProjectDetails.buildingArea,
              })(<Input placeholder="请填写总面积" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="总长度(米)">
              {getFieldDecorator('buildingLength', {
                initialValue: item.submitProjectDetails.buildingLength,
              })(<Input placeholder="请填写总长度" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="开工日期">
              {getFieldDecorator('startDate', {
                initialValue:item.submitProjectDetails.startDate == undefined? null: moment(item.submitProjectDetails.startDate, dateFormat),
              })(<DatePicker placeholder="请选择开工日期" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="竣工日期">
              {getFieldDecorator('completeDate', {
                initialValue:item.submitProjectDetails.completeDate == undefined? null: moment(item.submitProjectDetails.completeDate, dateFormat),
              })(<DatePicker placeholder="请选择竣工日期" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="联系人姓名">
              {getFieldDecorator('linkMan', {
                initialValue: item.submitProjectDetails.linkMan,
              })(<Input placeholder="请填写联系人姓名" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="联系人办公电话">
              {getFieldDecorator('linkPhone', {
                initialValue: item.submitProjectDetails.linkPhone,
              })(<Input placeholder="请填写联系人办公电话" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="项目经纬度">
              {getFieldDecorator('projectlat', {
                initialValue: item.submitProjectDetails.projectlat,
              })(
                <Input
                  placeholder="请填写项目经纬度"
                  style={{ width: '60%', marginRight: '10px' }}
                />
              )}
              <Button type="ghost" onClick={this.handleChange}>
                选择
              </Button>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="项目地点">
              {getFieldDecorator('address', {
                initialValue: item.submitProjectDetails.address,
              })(<Input placeholder="请填写项目地点" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="建设性质">
              {getFieldDecorator('propertyNum', {
                initialValue: item.submitProjectDetails.propertyNum,
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
            <Form.Item {...formItemLayout} label="建设规模">
              {getFieldDecorator('prjSize', {
                initialValue: item.submitProjectDetails.prjSize,
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
            <Form.Item {...formItemLayout} label="立项文号">
              {getFieldDecorator('approvalNum', {
                initialValue: item.submitProjectDetails.approvalNum,
              })(<Input placeholder="请填写立项文号" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="立项级别">
              {getFieldDecorator('approvalLevelNum', {
                initialValue: item.submitProjectDetails.approvalLevelNum,
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
            <Form.Item {...formItemLayout} label="工程用途">
              {getFieldDecorator('functionNum', {
                initialValue: item.submitProjectDetails.functionNum,
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
                  <Option value="010">给水</Option>
                  <Option value="011">排水</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="国籍或地区">
              {getFieldDecorator('nationNum', {
                initialValue: item.submitProjectDetails.nationNum,
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
            <Form.Item {...formItemLayout} label="建设用地规划许可证编号">
              {getFieldDecorator('buildPlanNum', {
                initialValue: item.submitProjectDetails.buildPlanNum,
              })(<Input placeholder="请填写建设用地规划许可证编号" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="建设工程规划许可证编号">
              {getFieldDecorator('prjPlanNum', {
                initialValue: item.submitProjectDetails.prjPlanNum,
              })(<Input placeholder="请填写建设工程规划许可证编号" />)}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item {...formItemLayout1} label="项目简介">
              {getFieldDecorator('description', {
                initialValue: item.submitProjectDetails.description,
              })(<TextArea rows={4} placeholder="请输入项目简介" />)}
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={24} style={{ clear: 'both' }}>
          <Col span={3} offset={1}>
            <h3>施工许可证</h3>
          </Col>
        </Row>
        <Row gutter={24} style={{ clear: 'both' }}>
          {formItems}
          <Col span={24}>
            <Form.Item style={{ textAlign: 'center', display: 'block', width: '100%' }}>
              <Button type="dashed" className={styles.addBtn} onClick={this.add}>
                <Icon type="plus" />
                添加施工许可证
              </Button>
            </Form.Item>
          </Col>
        </Row>
      <Row gutter={24}>
          {/* <Col span={10} offset={1}>
            <span style={{ lineHeight: '44px', fontSize: '16px' }}>
              将数据同步到全国建筑工人管理服务信息平台
            </span>
          </Col>
          <Col span={10}>
            <SelectPlatform getFieldDecorator={getFieldDecorator} />
          </Col> */}
          <Col span={24}>
            <Form.Item className={styles.form}>
              {getFieldDecorator('projectJid', {
                initialValue: item.submitProjectDetails.jid,
              })(<Input hidden />)}
            </Form.Item>
            <Form.Item className={styles.form}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={()=>history.go(-1)}>取消</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
