import React, { Component } from 'react'
import { Select,Form,Cascader} from 'antd';
import { connect } from 'dva';
@Form.create()
@connect(({ global, loading }) => ({
    global,
    submitting: loading.effects['global/fetchbasicData'],
}))
export default class SelectArea extends Component {
    state={}
    componentDidMount(){
        this.fetchbasicData();
    } 
    fetchbasicData=()=>{
     const { dispatch } = this.props;
     dispatch({
         type:'global/fetchbasicData',
     })
    }
    onChange=(value)=>{
       
        this.setState({
            value: value[value.length - 1]
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props;
        console.log(this.props.global);
        // console.log(this.props.required);
        // console.log(this.props.areaCodeStr)
        return (
            <Form.Item label={this.props.label||"项目所在地"} {...this.props.formItemLayout} style={{width:this.props.width||"100%"}}>
                {
                    getFieldDecorator('areaCode', {
                    initialValue:this.props.areaCodeStr,
                    rules: [
                        {
                            required: this.props.required, message: '请选择',                     
                        }
                    ],
                    })(
                        <Cascader onChange={this.onChange} options={this.props.global.provinceCity}  placeholder={`请选择`} />
                    )
                }
            </Form.Item>
        )
    }
}
