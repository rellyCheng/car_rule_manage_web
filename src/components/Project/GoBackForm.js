import React, { Component } from 'react'
import {Form, Icon, Input, Button,Select,DatePicker,Upload,message} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { isEmpty} from '@/utils/utils';
import { connect } from 'dva'; 
const dateFormat = 'YYYY-MM-DD';
const Option=Select.Option;
import token from '@/utils/token';
@connect(({item,itemUpdate,projectLocalUpload}) => ({
  itemUpdate,
  item,
  projectLocalUpload
}))
@Form.create()
export default class GoBackForm extends Component {
  state={
    fileList:[]
  }
  fetchFileUpload = (file) => {
    console.log(file)
    if (file.file.status == 'done') {
      this.setState({
        fileList: file.fileList.length == 0 ? [] : file.fileList,
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const projectJid = this.props._this.props.data.projectJid;
      console.log(values)
      if (!err) {
        let value={}
        const {dispatch,record} = this.props
        value.projectJid=projectJid;
        value.corpJid = record.corpJid;
        value.teamJid = record.teamJid;
        value.workerJid = record.workerJid;
        value.idCardNumber = record.idCardNumber;
        value.idCardType = record.idCardType;
        value.date = values.date;
        if(values.voucherUrl.length>0){
          value.voucherUrl = values.voucherUrl[0].response.data.path
        }
        value.type = values.type
        console.log(value)
        dispatch({
          type:'projectLocalUpload/fetchEntryExit',
          payload:value,
          callback:res=>{
            if(res.state==1){
              message.success("添加成功！")
              this.props._this.setState({
                openGoBackForm:false
              })
            }else{
              message.error(res.message)
            }
          }
        })
      }
    });
  }

  handleCancle=()=>{
    this.props._this.setState({
      openGoBackForm:false,
     })
 }
 normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  this.setState({
    fileList: e.fileList,
  });
  return e && e.fileList;
};

  render() {
    const formItemLayout = {
      label: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapper: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const params = {
      name: 'file',
      action:'/worker/manage/api/basicData/file/upload/compress',
      headers:{'Authorization':'Bearer '+token.get()},
    };
    function beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'|| file.type ==='image/png';
      if (!isJPG) {
        message.error('只能上传JPG或png格式的图片!');
      }
      return isJPG;
    }
  const { getFieldDecorator } = this.props.form;
  const {record} = this.props;
  console.log(this.state.fileList)
    return (
      <div>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}> 
            <Form.Item label="类型">
                {getFieldDecorator('type', {
                    initialValue:isEmpty(this.props.record.entryTime)?"1":"0",
                    rules: [{
                    required: true, message: '请选择类型',
                    }],
                })(
                    <Select style={{ width: '100%' }} placeholder="请选择类型">
                      <Option value="0">退场</Option> 
                      <Option value="1">进场</Option>   
                    </Select>
                )}
            </Form.Item>       
            <Form.Item label="进退场日期">
                {getFieldDecorator('date', {
                    rules: [{required:true, message: '请选择进退场日期'}],
                })(
                    <DatePicker locale={locale}  placeholder="请选择进退场日期"  format={dateFormat} style={{width:"100%"}}/>
                )}
            </Form.Item>      
            <Form.Item label="凭证附件">
                {getFieldDecorator('voucherUrl', {
                   initialValue: this.state.fileList,
                   getValueFromEvent: e => this.normFile(e),
                    rules: [{required:false, message: '请选择凭证附件'}],
                })(
                    <Upload 
                    beforeUpload={beforeUpload}
                    onChange={(file)=>this.fetchFileUpload(file)}
                    data={{
                      desFileSize:50
                     }}
                    {...params}>
                        {
                            this.state.fileList.length >= 1 ? null :    
                            <Button>
                            <Icon type="upload" />上传附件
                            </Button>
                        }
                    </Upload>
                )}
            </Form.Item>    
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <Button type="primary" htmlType='submit'>提交</Button>
                <Button  onClick={this.handleCancle}>取消</Button>  
            </div>
        </Form>      
      </div>
    )
  }
}
