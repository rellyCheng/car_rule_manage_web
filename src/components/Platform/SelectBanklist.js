import React, { Component } from 'react'
import { Select,Form,Cascader} from 'antd';
const Option = Select.Option;
import { connect } from 'dva';
@Form.create()
@connect(({ global, loading }) => ({
    global,
    submitting: loading.effects['global/fetchbankList'],
}))
export default class SelectBanklist extends Component {
    state={}
    componentDidMount(){
        this.fetchbankList();
    } 
    fetchbankList=()=>{
     const { dispatch } = this.props;
     dispatch({
         type:'global/fetchbankList',
     })
    }
    onChange=(value)=>{
        this.setState({
            value: value[value.length - 1]
        })
    }
    render() {
        const { getFieldDecorator } = this.props;
        //console.log(this.props.global.BankList);
        const BankList = this.props.global.BankList || [];
        //console.log(this.props.label);
        return (
            <Form.Item 
            label={this.props.label||"银行代码"}
            style={{width:this.props.width||"100%"}}
            >
                {
                    getFieldDecorator('bankCode', {
                    rules: [
                        {
                            required:this.props.required, message: `请选择`,
                        }
                    ],
                    })(
                        <Select placeholder="请选择企业名称" 
                            labelInValue={true}
                            onChange={this.handleSelectName}
                            >
                            {
                                BankList.map((item,index)=>{
                                    return <Option key={index} value={item.index}>{item.name}</Option>
                                })
                            }
                        </Select>
                    )
                }
            </Form.Item>
        )
    }
}
