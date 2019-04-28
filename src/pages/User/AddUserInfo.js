import React, { Component } from 'react'
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {Form,Input,Button,message,Select,InputNumber,Row,Col,Card,DatePicker,Upload,Icon, Divider,Modal  } from 'antd'
import { connect } from 'dva';
import moment from 'moment';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
import {isEmpty} from "@/utils/utils"
import { isArray } from 'util';

@Form.create()
@connect(({userManage}) => ({
  userManage,
}))
export default class AddUserInfo extends Component {
  state={
    fileList:[]
  }


  handleSubmit = (e) => {
    e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        const {dispatch} = this.props;
        console.log(this.props.record)
        if(isArray(values.image)){
          values.image = values.image[0].response.data.key
        }
        values.driverCardNumberDate = moment(values.driverCardNumberDate).format(dateFormat)
        if(this.props.record){
          //更新
          values.id = this.props.record.id;
          dispatch({
            type:'userManage/fetchEditUserInfo',
            payload:values,
            callback:res=>{
            this.props._this.setState({
              openEditUserForm:false
            })
            this.props._this.fetchList(this.props._this.state.current);
            }
          })
        }else{
         //添加
          dispatch({
            type:'userManage/fetchAddUserInfo',
            payload:values,
            callback:res=>{
            this.props._this.setState({
              openAddUserForm:false,
            })
            this.props._this.fetchList(1);
            }
          })
        }
      
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: { 
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const params = {
      name: 'file',
      action:'/api/qiNiu/upload',
    };

    
    const record = this.props.record || {};
    let imgList = [];
    if( !isEmpty(record)){
      let img = {};
      img.url = 'http://file.1024sir.com/'+record.image;
      img.uid = '1';
      img.name= '头像';
      img.status= 'done';
      imgList.push(img)
    }

    const fileList = this.props.fileList || imgList || undefined
    return (
      <div>
          <Card>
          <Form  onSubmit={this.handleSubmit}>
          <div >
                <Form.Item
                  >  
                  {getFieldDecorator('image', {  
                      initialValue: record.image,
                      rules: [{required:true, message: '请上传头像'}],
                  })(
                    <Upload 
                      onChange={(file)=>this.fetchFileUpload(file)}
                      listType="picture-card"
                      fileList={fileList}
                      {...params}>
                          {
                              fileList.length >= 1 ? null :    
                              <div>
                                <Icon type="plus" />
                                <div className="ant-upload-text">头像</div>
                              </div>
                           
                          }
                    </Upload>
                  )}
                </Form.Item>
          </div>
            <Row span={24}>
              <Col span={8}>
                <Form.Item
                {...formItemLayout}
                  label="姓名" 
                  >  
                  {getFieldDecorator('name', {  
                      initialValue: record.name,
                      rules: [{
                      required: true, message: '请输入姓名',
                      }]
                  })(
                      <Input placeholder="请输入姓名" style={{ width: 240 }}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="性别" {...formItemLayout}
                  >  
                  {getFieldDecorator('sex', {  
                    initialValue: record.sex,
                       rules: [{
                        required: true, message: '请选择性别',
                        }]
                  })(
                    <Select style={{ width: 240 }}>
                      <Option value="男">男</Option>
                      <Option value="女">女</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="年龄" {...formItemLayout}
                  >  
                  {getFieldDecorator('age', {  
                     initialValue: record.age,
                      rules: [{
                        required: true, message: '请选择性别',
                      }]
                  })(
                    <InputNumber min={18} max={80}  style={{ width: 240 }}/>
                  )}
                </Form.Item>
              </Col>
              </Row>
              <Row span={24}>
              <Col span={8}>
                <Form.Item
                  label="用户名" {...formItemLayout}
                  >  
                  {getFieldDecorator('userName', {  
                     initialValue: record.userName,
                      rules: [{
                      required: true, message: '请输入用户名',
                      }]
                  })(
                      <Input placeholder="请输入用户名"  style={{ width: 240 }}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="密码" {...formItemLayout}
                  >  
                  {getFieldDecorator('password', {  
                     initialValue: record.password,
                      rules: [{
                      required: true, message: '请输入密碼',
                      }]
                  })(
                      <Input placeholder="请输入密码"  style={{ width: 240 }}/>
                  )}
                </Form.Item>
              </Col>
              
              </Row>
              <Divider orientation="left">驾驶证信息</Divider>
              <Row span={24}>
              <Col span={12}>
                <Form.Item
                  label="驾驶证号码" 
                  >  
                  {getFieldDecorator('driverCardNumber', {  
                     initialValue: record.driverCardNumber,
                      rules: [{
                      required: true, message: '请输入驾驶证号码',
                      }]
                  })(
                      <Input placeholder="请输入驾驶证号码"  style={{ width: 240 }}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="驾驶证有效期" 
                  >  
                  {getFieldDecorator('driverCardNumberDate', {  
                     initialValue:record.driverCardNumberDate? moment(record.driverCardNumberDate):undefined,
                      rules: [{
                      required: true, message: '请输入驾驶证有效期',
                      }]
                  })(
                    <DatePicker format={dateFormat} style={{ width: 240 }}  placeholder="请输入驾驶证有效期"/>
                  )}
                </Form.Item>
              </Col>
              </Row>
                <Form.Item
                  label="备注" 
                  >  
                  {getFieldDecorator('remark', {  
                     initialValue: record.remark,
                      // rules: [{
                      // required: true, message: '备注',
                      // }]
                  })(
                      <Input.TextArea placeholder="备注" rows={4}  style={{ width: '90%' }}/>
                  )}
                </Form.Item>
                <div style={{textAlign:'center'}}>
                  <Button type="primary" htmlType="submit">
                    确定
                  </Button>
                </div>
          </Form>
          </Card>
      </div>
    )
  }
}
