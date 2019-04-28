import React, { Component } from 'react'
import { Form,Input, Row, Col, Button } from 'antd';

@Form.create()
export default class UserListFilter extends Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values)
            this.props._fetchList(1,values);
        })
    }
  render() {
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row span={24}>
                <Col span={6}>
                    <Form.Item
                    label="姓名" 
                    >  
                    {getFieldDecorator('name', {  
                      
                    })(
                        <Input placeholder="请输入姓名" />
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                    label="用户名" 
                    >  
                    {getFieldDecorator('userName', {  
                      
                    })(
                        <Input placeholder="请输入用户名" />
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                    label="驾驶证" 
                    >  
                    {getFieldDecorator('driverCardNumber', {  
                      
                    })(
                        <Input placeholder="请输入驾驶证号码" />
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                    >  
                    <Button style={{marginLeft:'10px'}} htmlType="submit">查询</Button>
                    </Form.Item>
                </Col>
                </Row>
            </Form>
      </div>
    )
  }
}
