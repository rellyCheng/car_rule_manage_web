import React, { Fragment } from 'react';
import { Form, Input, Button, message,Select,Col,Row,DatePicker} from 'antd';
import {isEmpty} from '@/utils/utils';
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
const Option = Select.Option;

@Form.create()
class GongZiFilter extends React.PureComponent {
  

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
            if(!isEmpty(values.payMonth)){
                values.payMonthFrom = values.payMonth[0].format('YYYY-MM-DD');
                values.payMonthUntil = values.payMonth[1].format('YYYY-MM-DD');
            }
            else{
                values.payMonthFrom = null;
                values.payMonthUntil = null;
            }      
            this.props._this.requestGongZi(1,values);
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
                    <Form.Item {...formItemLayout}  label="工资月份">
                        {getFieldDecorator('payMonth')(
                            <RangePicker format={dateFormat}/>
                        )}   
                    </Form.Item>
                </Col>   
                <Col span={6} >
                    <Form.Item {...formItemLayout}  label="状态">
                        {getFieldDecorator('statusEnum')(
                            <Select
                                placeholder="请选择"             
                            >
                                <Option value='0'>全部</Option>
                                <Option value='1'>待结算</Option>
                                <Option value='2'>逾期未发</Option>
                                <Option value='3'>已发（有扣减）</Option>
                                <Option value='4'>待发</Option>
                                <Option value='5'>足额已发</Option>
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

export default GongZiFilter;
