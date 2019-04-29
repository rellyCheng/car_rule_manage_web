import React, { Component } from 'react'
import {Form,DatePicker,Input,Button,message} from 'antd'
import {connect} from 'dva'
import moment from 'moment'
const dateFormat = "YYYY-MM-DD hh:mm:ss"
@Form.create()
@connect(({ carManage }) => ({
  carManage
}))
export default class AddRepairFrom extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { dispatch } = this.props;
      values.date = moment(values.date).format(dateFormat)
      const {record} = this.props
      values.carId = record.id
      console.log(values)
      dispatch({
        type:'carManage/fechAddRepairInfo',
        payload:values,
        callback:res=>{
          if(res.state =='OK'){
            message.success('添加成功');
            this.props._this.setState({
              openAddRepairInfo:false
            })
            this.props._this.fetchList();
          }else{
            message.error(res.message)
          }
        }
      })
    })
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="维修日期" {...formItemLayout}>
            {getFieldDecorator("date", {
              rules: [
                {
                  required: true,
                  message: "请输入维修日期"
                }
              ]
            })(
              <DatePicker
                format={dateFormat}
                style={{ width: 240 }}
                placeholder="请输入维修日期"
              />
            )}
          </Form.Item>
        <Form.Item
          label="备注"  {...formItemLayout}
          >  
          {getFieldDecorator('remark', {  
              rules: [{
              required: true, message: '请输入备注',
              }]
          })(
              <Input.TextArea placeholder="请输入备注" rows={4}  style={{ width: 240 }}/>
          )}
        </Form.Item>
          <div style={{textAlign:'center'}}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
