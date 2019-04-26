import React, { Component } from 'react'
import {Form,Input,Button,message} from 'antd'
import router from 'umi/router';
import {connect} from 'dva'

@Form.create()
@connect(({modPassword})=>({
  modPassword
}))
export default class ModifyPassWord extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values)
          const { dispatch } = this.props;
          dispatch({
            type:'modPassword/featchModPassword',
            payload:values,
            callback:res=>{
              if(res.state == 1){
                message.success("修改成功")
                this.props._this.setState({
                  pwsvisible:false
                })
                setTimeout(()=>{
                  router.push('/user/login')
                },2000)
              }else{
                message.error(res.message)
              }
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
        sm: { span: 4 },
      },
      wrapperCol: { 
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            label="原密码" {...formItemLayout}
            >  
            {getFieldDecorator('oldPassword', {  
                rules: [{
                required: true, message: '请输入原密码',
                }]
            })(
                <Input placeholder="请输入原密码"/>
            )}
          </Form.Item>
          <Form.Item
            label="新密码" {...formItemLayout}
            >  
            {getFieldDecorator('newPassword', {  
                rules: [{
                required: true, message: '请输入新密码',
                }]
            })(
                <Input placeholder="请输入新密码"/>
            )}
          </Form.Item>
          <div style={{textAlign:'right'}}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
