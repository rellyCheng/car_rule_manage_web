import React, { Component } from 'react'
import { Upload, message, Button, Icon,Input,Form  } from 'antd';
import {isEmpty} from '@/utils/utils'
@Form.create()
export default class UploadExcel extends Component {
  state={}
  handleChange=(info)=>{
    console.log(info);
    if(isEmpty(this.state.appSecret)){
      message.error("请输入密钥!");
      return;
    }
    let response;
       if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
              response=JSON.stringify(info.file.response)
              this.setState({
                response:response
              })
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
              response=JSON.stringify(info.file.response)
              this.setState({
                response:response
              })
            message.error(`${info.file.name} file upload failed.`);
          }
  }
  checkbbSecret(rule,value,callback){
    if(!isEmpty(value)){
        if (value.length<32) { 
            callback('长度32位');
        }
    }
    callback();
  }

  render() {
    let response = '';
    const { getFieldDecorator, validateFields,getFieldValue } = this.props.form;
    return (
      <div>
        <Form>
            <Form.Item >
            {getFieldDecorator('aa' ,{
                rules: [{ required: true, message: 'Please input!' },
                {
                    validator:this.checkbbSecret
                }],
            })(
              <Input  placeholder="请输入密钥" onChange = {(e)=>this.setState({appSecret:e.target.value})}/>
            )}
            </Form.Item>
            <Upload 
              name= 'excel'
              action = {'/worker/manage/api/basicData/analyze/excel?appSecret='+this.state.appSecret}
              onChange={this.handleChange}
            >
                <Button>
                <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
            <Input.TextArea rows={20} style={{marginTop:"20px"}} value = {this.state.response}/>
            </Form>
      </div>
    )
  }
}
