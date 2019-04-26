import React, { Component } from 'react'
import { Form, Input, Button, message,Select,Col,Row,DatePicker,Cascader,Icon,InputNumber } from 'antd';

@Form.create()
export default class UploadCJInfo extends Component {
  
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
                   <Form.Item {...formItemLayout}  label=" 参建类型">
                       {getFieldDecorator('corpType' ,{
                           rules: [{ 
                               required: true,
                               message: 'Please input!' 
                           }],
                           
                       })(
                        <Select
                            style={{ width: '80%' }}
                            placeholder="请选择"
                            allowClear  
                            showSearch 
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                        >
                            <Option value="001">专业分包</Option>
                            <Option value="002">设备分包</Option>
                            <Option value="003">材料分包</Option>
                            <Option value="004">后勤服务</Option>
                            <Option value="005">特殊设备</Option>
                            <Option value="006">劳务分包</Option>
                            <Option value="007">监理</Option>
                            <Option value="008">建设单位</Option>
                            <Option value="009">总承包单</Option>
                            <Option value="010">勘察</Option>
                            <Option value="011">设计单位</Option>
                            <Option value="012">其</Option>
                      </Select>
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
