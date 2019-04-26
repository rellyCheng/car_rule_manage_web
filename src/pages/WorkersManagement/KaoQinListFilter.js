import React, { Fragment } from 'react';
import { Form, Input, Button, message,Select,Col,Row,DatePicker} from 'antd';
import {isEmpty} from '@/utils/utils';
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
const Option = Select.Option;

@Form.create()
class KaoQinListFilter extends React.PureComponent {
  
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            if(!isEmpty(values.date)){
                values.startDateFrom = values.date[0].format('YYYY-MM-DD');
                values.startDateUntil = values.date[1].format('YYYY-MM-DD');
            }
            else{
                values.startDateFrom = null;
                values.startDateUntil = null;
            }           
            this.props._this.requestList(1,values);
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
                    <Form.Item {...formItemLayout}  label="考勤日期">
                        {getFieldDecorator('date')(
                            <RangePicker onChange={this.onChange}   format={dateFormat}/>
                        )}   
                    </Form.Item>
                </Col>   
                <Col span={6} >
                    <Form.Item {...formItemLayout}  label="排序方式">
                        {getFieldDecorator('orderType')(
                            <Select
                                placeholder="请选择"             
                            >
                                <Option value='1'>按在岗人数从高到低</Option>
                                <Option value='2'>按在岗人数从低到高</Option>
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

export default KaoQinListFilter;
