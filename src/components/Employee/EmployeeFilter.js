import React, { Component } from 'react'
import {Form,Input,Row,Col,Select,DatePicker,Button,Upload,Icon} from 'antd';
const Option=Select.Option;
import router from 'umi/router';
@Form.create()
export default class EmployeeFilter extends Component {

  handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {              
               console.log(values) 
               this.props.fetchList(1,values)         
            } 
        });
  }
  render() {
    const {
        form: { getFieldDecorator },
      } = this.props;
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
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
            <Row gutter={24}> 
              <Col span={5}>
                <Form.Item  label="所属企业" {...formItemLayout}> 
                  {getFieldDecorator('corpName')(
                    <Input placeholder="请输入企业名称!" allowClear/>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item  label="工人名称" {...formItemLayout}>
                  {getFieldDecorator('workerName')(
                    <Input placeholder="请输入工人名称!" allowClear/>
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item    label="工人类型" {...formItemLayout}>
                  {getFieldDecorator('workerType')(
                      <Select placeholder="请选择企业类型" allowClear>
                        <Option value="10">管理人员</Option>
                        <Option value="20">建筑工人</Option>                        
                      </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item    label="是否在场" {...formItemLayout}>
                  {getFieldDecorator('hasPresnet')(
                      <Select placeholder="请选择" allowClear>
                        <Option value="001">在</Option>
                        <Option value="002">不在</Option>                        
                      </Select>
                  )}
                </Form.Item>
              </Col>            
              <Col  span={5}>
                <Button type="primary" htmlType='submit'>查询</Button>
              </Col>
            </Row>
          </Form>     
      </div>
    )
  }
}
