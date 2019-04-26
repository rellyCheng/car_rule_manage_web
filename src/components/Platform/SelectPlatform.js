import React, { Component } from 'react';
import { Select,Form } from 'antd';
const Option = Select.Option;
import { connect } from 'dva';
@Form.create()
@connect(({ global, loading }) => ({
    global,
    submitting: loading.effects['global/fetchAppList'],
}))
export default class SelectPlatform extends Component {
   componentDidMount(){
       this.fetchAppList();
   } 
   fetchAppList=()=>{
    const { dispatch } = this.props;
    dispatch({
        type:'global/fetchAppList',
        payload:{
            accountJid:sessionStorage.getItem("accountJid")
        }   
    })
   }
  render() {
    const { getFieldDecorator } = this.props;
    console.log(this.props.global.appList);
    const appList = this.props.global.appList;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
      };
    return (
        <Form.Item {...formItemLayout} label="对接地区" >
        {
            getFieldDecorator('appJid', {
            rules: [
                {
                    required: true, message: '请选择对接地区',
                }
            ],
            })(
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择对接地区"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                            {
                        
                        appList.map((item,index)=>{
                            return <Option key={index} value={item.jid}>{item.areaCodeStr}</Option>
                        })
                    }
                </Select>
            )
        }
        </Form.Item>
    )
  }
}

