import React, { Component } from 'react'
import { Form, Input, Button, message,Select,Col,Row,DatePicker,Cascader,Icon,InputNumber } from 'antd';
@Form.create()
export default class UploadTeamInfo extends Component {
  
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
               <Col span={12} >
                   <Form.Item {...formItemLayout}  label="平台为项目分配的接入编号">
                       {getFieldDecorator('projectCode' ,{
                           rules: [{ required: true, message: 'Please input!' }],
                       })(
                           <Input placeholder="平台为项目分配的接入编号"/>
                       )}   
                   </Form.Item>
               </Col>
               <Col span={12} >
                   <Form.Item {...formItemLayout}  label="企业统一社会信用代码">
                       {getFieldDecorator('corpCode' ,{
                           rules: [{ required: true, message: 'Please input!' }],
                       })(
                           <Input placeholder="所在企业统一社会信用代码，如果无统一社会信用代码，则用组织机构代码"/>
                       )}   
                   </Form.Item>
               </Col>    
               </Row>           
               <Row gutter={24}>
               <Col span={12} >
                   <Form.Item {...formItemLayout}  label="企业名称">
                       {getFieldDecorator('corpName' ,{
                           rules: [{ 
                               required: true,
                               message: 'Please input!' 
                           }],
                           
                       })(
                           <Input placeholder="所在企业名称"/>
                       )}   
                   </Form.Item>
               </Col>   
               <Col span={12} >
                   <Form.Item {...formItemLayout}  label=" 班组名称">
                       {getFieldDecorator('teamName' ,{
                           rules: [{ 
                               required: true,
                               message: 'Please input!' 
                           }],
                           
                       })(
                           <Input placeholder="班组名称，同一个项目下面不能重复"/>
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
