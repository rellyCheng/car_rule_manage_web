import React, { Fragment } from 'react';
import { Form, Input, Button, message,Select,Row,Col,Icon,InputNumber,DatePicker,Cascader} from 'antd';
import {isEmpty} from '@/utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
// import SelectArea from  '@/components/Platform/SelectArea';
@Form.create()
class WorkersFilter extends React.PureComponent {
  
  state ={
    expand: false,
  }
  // renderSimpleForm() {
  //   const {
  //     form: { getFieldDecorator },
  //   } = this.props;
  //   const formItemLayout = {
  //     labelCol: {
  //       xs: { span: 24 },
  //       sm: { span:  8},
  //     },
  //     wrapperCol: {
  //       xs: { span: 24 },
  //       sm: { span: 16 },
  //     },
  //   };
  //   return (
  //     <Form onSubmit={this.handleSearch} >
  //       <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
  //         <Col md={6} sm={24} >
  //           <FormItem label="工人姓名" {...formItemLayout}>
  //             {getFieldDecorator('workerName')(<Input placeholder="请输入工人姓名" />)}
  //           </FormItem>
  //         </Col>
  //         <Col md={6} sm={24}>
  //           <FormItem label="当前项目" {...formItemLayout}>
  //             {getFieldDecorator('currentProjName')(<Input placeholder="请输入项目名称" />)}
  //           </FormItem>
  //         </Col>          
  //         <Col xl={6} lg={24} md={24} sm={24} xs={24}>
  //           <FormItem label="当前聘用企业" {...formItemLayout}>
  //             {getFieldDecorator('currentCorpName')(<Input placeholder="请输入企业名称" />)}
  //           </FormItem>
  //         </Col>
  //         <Col md={6} sm={24}>
  //           <span >
  //             <Button type="primary" htmlType="submit">
  //               查询
  //             </Button>
  //             <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
  //               重置
  //             </Button>
  //             <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
  //               展开 <Icon type='down' />
  //             </a>
  //           </span>
  //         </Col>
  //       </Row>
  //     </Form>
  //   );
  // }

  renderAdvancedForm() {
    const {form,global } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form onSubmit={this.handleSearch} >
        <Row gutter={24} >
          <Col span={6}>
            <FormItem label="工人姓名" {...formItemLayout}>
              {getFieldDecorator('workerName')(<Input placeholder="请输入工人姓名" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="当前项目" {...formItemLayout}>
              {getFieldDecorator('currentProjName')(<Input placeholder="请输入项目名称" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="当前聘用企业" {...formItemLayout}>
              {getFieldDecorator('currentCorpName')(<Input placeholder="请输入企业名称" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="人员类型" {...formItemLayout}>
              {getFieldDecorator('workTypeCode')(
                <Select placeholder="请选择人员类型">
                  <Option value="10">企业职员</Option>
                  <Option value="20">建筑工人</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          </Row>
        <Row gutter={24} >
          <Col span={6}>
            <FormItem label="手机号码" {...formItemLayout}>
              {getFieldDecorator('cellPhone')(<Input placeholder="请输入手机号码" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="实名认证" {...formItemLayout}>
              {getFieldDecorator('certificateStatus')(
                <Select placeholder="请选择认证状态" >
                  <Option value="0">未实名认证</Option>
                  <Option value="1">已实名认证</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          {/* <Col xl={6} lg={24} md={24} sm={24} xs={24}>
             <SelectArea getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
          </Col> */}
          <Col span={6}>
            <div style={{ overflow: 'hidden' }}>
              {/* <div style={{float:'right'}}> */}
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  收起 <Icon type='up' />
                </a> */}
              {/* </div> */}
            </div>
          </Col>
        </Row>
        
      </Form>
    );
  }

  renderForm() {
    // const { expandForm } = this.state;
    // return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    return this.renderAdvancedForm();
  }
  // // 收起
  // toggleForm = () => {
  //   const { expandForm } = this.state;
  //   this.setState({
  //     expandForm: !expandForm,
  //   });
  // };
  // 查询
  handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props._this.requestList(1,values);
        }
      });
  };
  // 重置
  handleFormReset = () => {
    this.props.form.resetFields();
  };
  render() {
    const { form} = this.props;
    const { getFieldDecorator, validateFields } = form;
    return (
        <div>{this.renderForm()}</div>
    );
  }
}

export default WorkersFilter;
