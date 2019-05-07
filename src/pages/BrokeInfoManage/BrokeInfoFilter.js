import React, { Component } from 'react'
import { Form,Input, Row, Col, Button,DatePicker } from 'antd';
import moment from 'moment'

const dateFormat ='YYYY-MM-DD hh:mm:ss'
@Form.create()
export default class BrokeInfoFilter extends Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values)
            if(values.date){
                values.startDate = moment(values.date).format("YYYY-MM-DD")+' '+'00:00:00'
                values.endDate = moment(values.date).format("YYYY-MM-DD") + " "+'23:59:59'
                values.date = moment(values.date).format(dateFormat);
             

            }
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
                    label="违章日期" 
                    >  
                    {getFieldDecorator('date', {  
                      
                    })(
                    <DatePicker
                        format={dateFormat}
                        placeholder="请输入违章日期"
                      />
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="违章类型" {...formItemLayout}>
                    {getFieldDecorator("type", {
                      rules: [
                        {
                          required: true,
                          message: "请输入违章类型"
                        }
                      ]
                    })(
                      <Select style={{ width: 240 }} placeholder="请选择违章类型">
                        <Option value="一闯红灯">闯红灯</Option>
                        <Option value="压线">压线</Option>
                        <Option value="占用应急车道">占用应急车道</Option>
                        <Option value="超速">超速</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                    label="违章车牌号" 
                    >  
                    {getFieldDecorator('cardNumber', {  
                      
                    })(
                        <Input placeholder="请输入违章车牌号" />
                    )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                    >  
                    <Button style={{marginLeft:'10px'}} htmlType="submit" type="primary">查询</Button>
                    </Form.Item>
                </Col>
                </Row>
            </Form>
      </div>
    )
  }
}
