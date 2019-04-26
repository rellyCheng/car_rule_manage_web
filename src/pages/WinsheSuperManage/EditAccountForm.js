import React, { Component } from 'react';
import { Form, Input,Button} from 'antd';
@Form.create()
export default class EditAccountForm extends Component {
    // 查询结果
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
            console.log('Received values of form: ', values);
            }
        });
    }
    // 取消
    handleCancle=(e)=>{
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
                <Form  onSubmit={this.handleSubmit}>                   
                    <Form.Item label="住建部登录账号" {...formItemLayout}>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: '请输入住建部登录账号',}],
                        })(
                            <Input placeholder="请输入住建部登录账号"/>
                        )}
                    </Form.Item>
                    <Form.Item label="住建部登录密码" {...formItemLayout}>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: '请输入住建部登录密码',}],
                        })(
                            <Input placeholder="请输入住建部登录密码"/>
                        )}
                    </Form.Item>
                    <Form.Item style={{textAlign:'center'}}>
                       <Button style={{margin:'0 50px 0 0'}} onClick={()=>this.handleCancle()}>取消</Button>
                       <Button type="primary" htmlType="submit">确定</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
