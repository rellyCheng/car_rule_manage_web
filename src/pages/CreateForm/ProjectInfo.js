import React, { Component } from 'react';
import { Form, Input, Button, message,Select,Col,Row,DatePicker,Cascader,Icon,InputNumber } from 'antd';



@Form.create()
export default class ProjectInfo extends Component {

   state={

   }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({
              textValue:JSON.stringify(values)
          })
        }
      });
    }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const formItemLayout = {
        labelCol: {
        xs: { span: 24 },
        sm: { span:  10},
        },
        wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        },
    };
    return (
      <div>
         <Form  onSubmit={this.handleSubmit} >
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="pageIndex">
                        {getFieldDecorator('pageIndex' ,{
                            initialValue:0,
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Input placeholder="pageIndex "/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="pageSize">
                        {getFieldDecorator('pageSize' ,{
                            initialValue:10,
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Input placeholder="pageSize"/>
                        )}   
                    </Form.Item>
                </Col>               
               
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="contractorCorpCode">
                        {getFieldDecorator('contractorCorpCode' ,{
                            rules: [{ 
                                required: true,
                                message: 'Please input!' 
                            }],
                            
                        })(
                            <Input placeholder="contractorCorpCode"/>
                        )}   
                    </Form.Item>
                </Col>     
            </Row>
           
            <Row gutter={24}>
                <Input.TextArea value={this.state.textValue} rows={4} />          
                <div style={{textAlign:'center'}} >
                <Button type="primary" htmlType="submit">Submit</Button>
                </div>               
            </Row>
        </Form> 
      </div>
    )
  }
}
