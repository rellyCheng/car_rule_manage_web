import React, { Fragment } from 'react';
import { Form, Input, Button, message, Select, Col, Row, DatePicker, Cascader, Icon ,Modal} from 'antd';
import { isEmpty,delNullObj} from '@/utils/utils';
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
const Option = Select.Option;
import { connect } from 'dva';
import router from 'umi/router';
import SelectArea from  '@/components/Platform/SelectArea';
import AddProject from '@/pages/CorporateAccount/AddProject';
@connect(({  item }) => ({
  item,
}))
@Form.create()
class ProjectFilter extends React.PureComponent {
  state = {};
  // // 简化的查询
  // simpleForm() {
  //   const {
  //     form: { getFieldDecorator },
  //   } = this.props;
  //   const formItemLayout = {
  //     labelCol: {
  //       xs: { span: 24 },
  //       sm: { span: 8 },
  //     },
  //     wrapperCol: {
  //       xs: { span: 24 },
  //       sm: { span: 16 },
  //     },
  //   };
  //   return (
  //     <Form onSubmit={this.handleSearch}>
  //       <Row gutter={24}>
  //         <Col span={6}>
  //           <Form.Item {...formItemLayout}  label="项目名称">
  //             {getFieldDecorator('name')(<Input placeholder="请输入项目名称" allowClear />)}
  //           </Form.Item>
  //         </Col>
  //         <Col span={6}>
  //           <Form.Item {...formItemLayout}  label="总承包单位">
  //             {getFieldDecorator('contractorCorpName')(
  //               <Input placeholder="请输入总承包单位名称" allowClear/>
  //             )}
  //           </Form.Item>
  //         </Col>
  //         <Col span={6}>
  //           <Form.Item {...formItemLayout} label="项目状态">
  //             {getFieldDecorator('prjStatus')(
  //               <Select placeholder="请选择项目状态" allowClear>
  //                 <Option value="0">筹备</Option>
  //                 <Option value="1">在建</Option>
  //                 <Option value="2">完工</Option>
  //                 <Option value="3">停工</Option>
  //               </Select>
  //             )}
  //           </Form.Item>
  //         </Col>
  //         <Col span={6}>
  //           <span>
  //             <Button type="primary" htmlType="submit">
  //               查询
  //             </Button>
  //             <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
  //               重置
  //             </Button>
  //             <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleAddProject}>
  //               添加
  //             </Button>
  //             <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
  //               展开 <Icon type="down" />
  //             </a>
  //           </span>
  //         </Col>
  //       </Row>
  //     </Form>
  //   );
  // }
  // 整个表单
  totalForm() {
    const { form, global } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    console.log(global);
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item {...formItemLayout} label="项目名称" >
              {getFieldDecorator('name')(<Input placeholder="请输入项目名称" allowClear/>)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...formItemLayout} label="总承包单位" >
              {getFieldDecorator('contractorCorpName')(
                <Input placeholder="请输入总承包单位名称" allowClear />
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...formItemLayout} label="项目状态">
              {getFieldDecorator('prjStatus')(
                <Select placeholder="请选择项目状态" allowClear>
                  <Option value="0">筹备</Option>
                  <Option value="1">在建</Option>
                  <Option value="2">完工</Option>
                  <Option value="3">停工</Option>
                  <Option value="4">立项</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...formItemLayout} label="开工日期">
              {getFieldDecorator('date')(<RangePicker format={dateFormat} />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            {/* <Form.Item {...formItemLayout} label="项目所在地">
              {getFieldDecorator('areaCode')(
                <Cascader options={global.provinceCity} placeholder="请选择项目所在地" />
              )}
            </Form.Item> */}
            <SelectArea getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
          </Col>
          {/* <Col span={6}>
            <Form.Item {...formItemLayout} label="是否投诉">
              {getFieldDecorator('haveComplain')(
                <Select placeholder="请选择">
                  <Option value="true">有</Option>
                  <Option value="false">无</Option>
                </Select>
              )}
            </Form.Item>
          </Col> */}
          {/* <Col span={6}>
            <Form.Item {...formItemLayout} label="排序方式">
              {getFieldDecorator('orderType')(
                <Select placeholder="请选择排序方式">
                  <Option value="1">按在岗人数从高到低</Option>
                  <Option value="2">按在册人数从高到低</Option>
                </Select>
              )}
            </Form.Item>
          </Col> */}
          <Col span={6}>
            <span>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起
                <Icon type="up" /> 
              </a>*/}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 查询
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!isEmpty(values.date)) {
          values.startDate = values.date[0].format('YYYY-MM-DD');
          values.endDate = values.date[1].format('YYYY-MM-DD');
        } else {
          values.startDate = null;
          values.endDate = null;
        }
        if(!isEmpty( values.areaCode)){
          values.areaCode = values.areaCode[values.areaCode.length - 1]; 
        }           
        delNullObj(values);
        this.props._this.requestList(1, values);
      }
    });
  };
  // 收起
  // toggleForm = () => {
  //   const { expandForm } = this.state;
  //   this.setState({
  //     expandForm: !expandForm,
  //   });
  // };
  renderForm() {
    // const { expandForm } = this.state;
    // return expandForm ? this.totalForm() : this.simpleForm();
    return this.totalForm()
  }
  // 重置
  handleFormReset = () => {
    this.props.form.resetFields();
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator, validateFields } = form;
    return <div>
        {this.renderForm()}
    </div>;
  }
}
export default ProjectFilter;
