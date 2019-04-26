import React, { Component } from 'react'
import {Form,Select,Input,Button,message}   from 'antd';
import {connect} from 'dva'
import Link from 'umi/link';
const { TextArea } = Input;
const { Option } = Select;
@Form.create()
@connect(({accountManage,})=>({
  accountManage,
}))
export default class AddWork extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    if(this.props.form.getFieldsValue().userJid){
      //修改账号
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.fetchUpdataAccount(values)
        }
      });
    }else{
      //创建账号
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.fetchCreateAccount(values)
        }
      });
    }
  }

  //创建账号
  fetchCreateAccount=(values)=>{
    const { dispatch } = this.props;
    dispatch({
      type:'accountManage/fetchCreateAccount',
      payload:values,
      callback:res=>{
        if(res.state == 1){
          message.success("创建成功！");
          this.props._this.setState({
            visible:false
          })
          this.props._this.fetchWorkerList()
        }else{
          message.error(res.message)
        }
      }
    })
  }
  //修改账号
  fetchUpdataAccount=(values)=>{
    const { dispatch,accountManage } = this.props;
    console.log(accountManage)
    values.userRoleJid = accountManage.accountManage.userRoleJid;
    dispatch({
      type:'accountManage/fetchUpdataAccount',
      payload:values,
      callback:res=>{
        if(res.state == 1){
          message.success("修改成功！");
          this.props._this.setState({
            editorvisible:false
          })
          const {dispatch} = this.props;
          this.props._this.fetchWorkerList()
        }else{
          message.error(res.message);
        }
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
    const {accountManage} = this.props
    return (
      <div>
         <Form onSubmit={this.handleSubmit}>
         <p>基本信息</p>
            <Form.Item
            label="手机号码" {...formItemLayout}
            >  
            {getFieldDecorator('phone', {  
                initialValue:accountManage.accountManage.phone,
                rules: [{
                required: true, 
                message: '请输入正确的手机号',
                len:11,
                }]
            })(
                <Input placeholder="请输入手机号"/>
            )}
            </Form.Item>
            <Form.Item
            label="员工姓名"  {...formItemLayout}
            >
            {getFieldDecorator('realname', {
              initialValue:accountManage.accountManage.realname,
                rules: [{ 
                required: true, message: '请输入员工姓名',
                }],
            })(
                <Input placeholder="请输入员工姓名"/>
            )}
            </Form.Item>
            <p>所属权限</p>
            <Form.Item
              label="所属角色"  {...formItemLayout}
              >
              {getFieldDecorator('roleJid', {
                initialValue:accountManage.accountManage.roleJid,
                  rules: [{
                  required: true, message: '请选择所属角色',
                  }],
              })( 
              <Select placeholder="请选择所属角色">
                  <Option value="2">一般管理员</Option>
                  {/* <Option value="002">高级管理员</Option> */}
              </Select>
              )}
            </Form.Item>
            <Form.Item
            label="备注"  {...formItemLayout}
            >
            {getFieldDecorator('remark',{
              initialValue:accountManage.accountManage.remark,
            }, {
            })(
               <TextArea rows={4} />
            )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('userJid',{
                initialValue:accountManage.accountManage.jid,
              }, {
              })(
               <input style={{display:'none'}}/>
              )}
            </Form.Item>
            <div style={{textAlign:'right'}}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              {/* <Link to='/'>
                <Button  style={{marginLeft:'20px'}}>取消</Button>
              </Link> */}
            </div>
        </Form>
      </div>
    )
  }
}
