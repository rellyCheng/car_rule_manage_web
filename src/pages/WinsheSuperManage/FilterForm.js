import React, { Component } from 'react';
import { Form, Input,Select,Button,Row,Col} from 'antd';
const Option = Select.Option;
import {delNullObj} from '@/utils/utils'
@Form.create()
export default class FilterForm extends Component {
    // 查询结果
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                delNullObj(values);
                this.props._this.requestList(1,values);
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
              sm: { span:  8},
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        return (
            <div>
                <Form {...formItemLayout}  onSubmit={this.handleSubmit}>
                    <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                        <Col md={6} sm={24} >
                            <Form.Item label="账号名称" >
                                {getFieldDecorator('accountName')(
                                    <Input placeholder="请输入账号名称" allowClear/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col md={6} sm={24} >
                            <Form.Item label="企业名称" >
                                {getFieldDecorator('corpName')(
                                    <Input placeholder="请输入企业名称" allowClear/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col md={6} sm={24} >
                            <Form.Item label="绑定状态" >
                                {getFieldDecorator('checkState')(
                                    <Select placeholder="请选择" allowClear>
                                        <Option value="0">申请中</Option>
                                        <Option value="1">审核通过</Option>
                                </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col md={6} sm={24} >
                            <Form.Item>
                                <Button type="primary" htmlType="submit">查询结果</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
