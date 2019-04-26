import React, { Fragment } from 'react';
import { Form, Input, Button, message,Select,Row,Col,Cascader} from 'antd';
const Option = Select.Option;
import router from 'umi/router';
import { isEmpty } from '@/utils/utils';
import SelectArea from  '@/components/Platform/SelectArea';
import { connect } from 'dva';
@Form.create()

@connect(({business})=>({
    business
}))
class   BusinessFilter extends React.PureComponent {
  
    state ={

    }
    //查询
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            values.area = !isEmpty(values.areaCode) ?  values.areaCode[values.areaCode.length - 1] : null ;
            this.requestList(values)
          }
        });
    }
    //查询
    requestList=(values)=>{
        const { dispatch } = this.props;
        values.current=1,
        values.size=10
        dispatch({
          type: 'business/fetchBusinessList',
          payload: values
        });
      }
    //添加企业
    handleAddComany =()=>{
        router.push(`/business/addcompany`);
    }
    render() {
        const {form,global} = this.props;
        const { getFieldDecorator, validateFields } = form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 10},
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 14 },
            },
          };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                <Row gutter={24} >
                <Col  span={6}>
                    <Form.Item  label="企业名称"  >
                        {getFieldDecorator('corpName')(
                            <Input placeholder="请输入企业名称"/>
                        )}
                    </Form.Item>  
                </Col> 
                <Col span={6}>     
                    {/* <Form.Item  label="项目所在地"  {...formItemLayout}>
                        {getFieldDecorator('areaCode')(
                            <Cascader options={global.provinceCity}  placeholder="请选择项目所在地" />
                        )}
                    </Form.Item> */}
                    <SelectArea label="企业所在地" getFieldDecorator={getFieldDecorator}/>
                </Col> 
                <Col  span={6}>
                    <Form.Item  label="企业登记注册类型"  >
                        {getFieldDecorator('corpType')(
                            <Select
                                placeholder="请选择"
                                onChange = {this.onChangeExtraType}
                                allowClear                
                            >
                                <Option value='110'>国有企业</Option>
                                <Option value='140'>联营企业</Option>
                                <Option value='170'>私营企业</Option>
                                <Option value='150'>有限责任公司</Option>
                                <Option value='160'>股份有限公司</Option>
                            </Select>
                        )}
                    </Form.Item> 
                </Col>   
                <Col  span={6}>
                    <Button htmlType="submit" type="primary" >查询</Button>
                    <Button  onClick={()=>this.handleAddComany()} type="primary" style={{margin:'0 0 0 20px'}}>添加</Button>
                </Col>                     
            </Row>
            </Form>
        );
    }
}

export default BusinessFilter;
