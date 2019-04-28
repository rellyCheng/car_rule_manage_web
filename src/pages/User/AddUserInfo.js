import React, { Component } from 'react'
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {Form,Input,Button,message,Select,InputNumber,Row,Col,Card,DatePicker,Upload,Icon } from 'antd'
import { connect } from 'dva';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

@Form.create()
@connect(({userManage}) => ({
  userManage,
}))
export default class AddUserInfo extends Component {
  state={
    fileList:[]
  }
  fetchFileUpload = (file) => {
    if (file.file.status == 'done') {
      this.setState({
        fileList: file.fileList.length == 0 ? [] : file.fileList,
      });
    }
  }
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    this.setState({
      fileList: e.fileList,
    });
    return e && e.fileList;
  };
  handleSubmit = (e) => {
    e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        const {dispatch} = this.props;
        if(values.image.length>0){
          values.image = values.image[0].response.data.path
        }
        dispatch({
          type:'userManage/fetchAddUserInfo',
          payload:values
        })
      });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
    const params = {
      name: 'file',
      action:'/api/qiNiu/upload',
      // headers:{'Authorization':'Bearer '+token.get()},
    };
    return (
      <div>
          <PageHeaderWrapper title="添加用户信息">
          <Card>
          <Form onSubmit={this.handleSubmit}>
            <Row span={24}>
              <Col span={8}>
                <Form.Item
                  label="姓名" {...formItemLayout}
                  >  
                  {getFieldDecorator('name', {  
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
                    
                  })(
                    <InputNumber min={18} max={80}  style={{ width: 240 }}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="用户名" {...formItemLayout}
                  >  
                  {getFieldDecorator('userName', {  
                      // rules: [{
                      // required: true, message: '请输入用户名',
                      // }]
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
                      // rules: [{
                      // required: true, message: '请输入用户名',
                      // }]
                  })(
                      <Input placeholder="请输入密码"  style={{ width: 240 }}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="头像" {...formItemLayout}
                  >  
                  {getFieldDecorator('image', {  
                      initialValue: this.state.fileList,
                      getValueFromEvent: e => this.normFile(e),
                      rules: [{required:false, message: '请选择头像'}],
                  })(
                    <Upload 
                      onChange={(file)=>this.fetchFileUpload(file)}
                      data={{
                        desFileSize:50
                      }}
                      {...params}>
                          {
                              this.state.fileList.length >= 1 ? null :    
                              <Button>
                              <Icon type="upload" />上传头像
                              </Button>
                          }
                    </Upload>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="驾驶证号码" {...formItemLayout}
                  >  
                  {getFieldDecorator('driverCardNumber;', {  
                      rules: [{
                      required: true, message: '请输入驾驶证号码',
                      }]
                  })(
                      <Input placeholder="请输入驾驶证号码"  style={{ width: 240 }}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="驾驶证有效期" {...formItemLayout}
                  >  
                  {getFieldDecorator('driverCardNumberDate', {  
                      rules: [{
                      required: true, message: '请输入驾驶证有效期',
                      }]
                  })(
                    <DatePicker format={dateFormat}  placeholder="请输入驾驶证有效期"/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="备注" {...formItemLayout}
                  >  
                  {getFieldDecorator('remark', {  
                      // rules: [{
                      // required: true, message: '备注',
                      // }]
                  })(
                      <Input placeholder="备注"  style={{ width: 240 }}/>
                  )}
                </Form.Item>
              </Col>
                <div style={{textAlign:'center'}}>
                  <Button type="primary" htmlType="submit">
                    确定
                  </Button>
                </div>
            </Row>
          </Form>
          </Card>
          </PageHeaderWrapper>
      </div>
    )
  }
}
