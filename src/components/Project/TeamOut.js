import React, { Component } from 'react'
import {Form,Input,Button,Upload,Icon } from 'antd'
import { format } from 'd3-format';

@Form.create()
export default class TeamOut extends Component {
  render() {
    const {getFieldDecorator} = this.props.form;
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
    return (
      <div>
         <Form onSubmit={this.handleSubmit} {...formItemLayout}>
            <Form.Item  label="退场日期">
              {getFieldDecorator('exitDate',{
                rules: [{ required: true, message: '请选择退场日期' }],
              })(<Input placeholder="请选择退场日期" />)}
            </Form.Item>
            <Form.Item  label="退场附件">
              {getFieldDecorator('eixtFile')(
                <Upload>
                  <Button>
                    <Icon type="upload" /> 请选择退场附件
                  </Button>
                </Upload>
              )}
            </Form.Item>
            <div style={{textAlign:"right"}}>
              <Button type="primary" >确定</Button>
            </div>
         </Form>
      </div>
    )
  }
}
