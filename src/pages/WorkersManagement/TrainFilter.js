import React, { Fragment } from 'react';
import { Form, Input, Button, message,Select,Col,Row,DatePicker} from 'antd';
import {isEmpty} from '@/utils/utils';
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
const Option = Select.Option;

@Form.create()
class TrainFilter extends React.PureComponent {
  
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            if(!isEmpty(values.trainingDate)){
                values.trainingDateFrom = values.trainingDate[0].format('YYYY-MM-DD');
                values.trainDateUtil = values.trainingDate[1].format('YYYY-MM-DD');
            }
            else{
                values.trainingDateFrom = null;
                values.trainDateUtil = null;
            }           
            this.props._this.requestPeiXun(1,values);
          }
        });
    }
  render() {
    const { form,permission } = this.props;
    const { getFieldDecorator, validateFields } = form;
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
      <Fragment>
        <Form  onSubmit={this.handleSubmit} hideRequiredMark>
            <Row gutter={24}>
                <Col span={6} >
                    <Form.Item {...formItemLayout}  label="项目名称">
                        {getFieldDecorator('projectName')(
                            <Input placeholder="请输入项目名称"/>
                        )}   
                    </Form.Item>
                </Col>                     
                <Col span={6} >
                    <Form.Item {...formItemLayout}  label="培训日期">
                        {getFieldDecorator('trainingDate')(
                            <RangePicker onChange={this.onChange}   format={dateFormat}/>
                        )}   
                    </Form.Item>
                </Col>   
                <Col span={6} >
                    <Form.Item {...formItemLayout}  label="培训类型">
                        {getFieldDecorator('trainingTypeEnum')(
                            <Select
                                placeholder="请选择"             
                            >
                                <Option value='0'>全部</Option>
                                <Option value='1'>安全教育</Option>
                                <Option value='2'>入场教育</Option>
                                <Option value='3'>退场教育</Option>
                                <Option value='4'>技能培训</Option>
                            </Select>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={6} >
                    <Button htmlType="submit" type="primary">
                        查询
                    </Button>
                </Col>     
            </Row>      
        </Form>
      </Fragment>
    );
  }
}

export default TrainFilter;
