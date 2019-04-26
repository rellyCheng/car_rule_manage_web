import React, { Component } from 'react'
import { Form, Input, Button, message,Select,Col,Row,DatePicker,Cascader,Icon,InputNumber } from 'antd';
@Form.create()
export default class TeamInfo extends Component {
  
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
                   <Form.Item {...formItemLayout}  label="pageIndex">
                       {getFieldDecorator('pageIndex' ,{
                           initialValue:0,
                           rules: [{ required: true, message: 'Please input!' }],
                       })(
                           <Input placeholder="pageIndex"/>
                       )}   
                   </Form.Item>
               </Col>
               <Col span={12} >
                   <Form.Item {...formItemLayout}  label="pageSize">
                       {getFieldDecorator('pageSize' ,{
                           initialValue:10,
                           rules: [{ required: true, message: 'Please input!' }],
                       })(
                           <Input placeholder="pageSize"/>
                       )}   
                   </Form.Item>
               </Col>    
               </Row>           
               <Row gutter={24}>
               <Col span={12} >
                   <Form.Item {...formItemLayout}  label="平台为项目分配的接入编号">
                       {getFieldDecorator('projectCode' ,{
                           rules: [{ 
                               required: true,
                               message: 'Please input!' 
                           }],
                           
                       })(
                           <Input placeholder="平台为项目分配的接入编号"/>
                       )}   
                   </Form.Item>
               </Col>   
               <Col span={12} >
                   <Form.Item {...formItemLayout}  label=" 企业统一社会信用代码">
                       {getFieldDecorator('corpCode' ,{
                           rules: [{ 
                               required: true,
                               message: 'Please input!' 
                           }],
                           
                       })(
                           <Input placeholder="所在企业统一社会信用代码，如果无统一社会信用代码，则用组织机构代码"/>
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
