import React, { Component } from 'react'
import { Select,Form,Cascader} from 'antd';
const Option = Select.Option;
import { connect } from 'dva';
@Form.create()
@connect(({ global, loading }) => ({
    global,
    submitting: loading.effects['global/fetchbasicData'],
}))
//用于搜索
export default class SelectAreaFilter extends Component {
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
        console.log(this.props.required);
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span:  8},
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        return (
            <Form.Item label={this.props.label||"项目所在地"}  {...formItemLayout}>
                {
                    getFieldDecorator('areaCode', {
                    rules: [
                        {
                            required: this.props.required, message: `请选择`,
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
