import React, { Component } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  InputNumber,
  Row,
  Col,
  Card,
  DatePicker,
  Modal,
  Upload ,
  Icon
} from "antd";
import { connect } from "dva";
import moment from "moment";
const Option = Select.Option;
const dateFormat = "YYYY-MM-DD HH:mm:ss";
import {isEmpty} from "@/utils/utils"
@Form.create()
@connect(({ brokeManage }) => ({
  brokeManage
}))
export default class BrokeInfoForm extends Component {
  state = {
    fileList: []
  };
  handleChange = ({ fileList }) => {
    console.log(fileList)
    this.setState({
      fileList
    });
  };
  componentDidMount() {
    const {record} = this.props;
    let imgList = [];
    console.log(record)
    if (!isEmpty(record)) {
      record.imgList.map((item,index)=>{
        let img = {};
        img.url = "http://file.1024sir.com/" + item;
        img.uid = index;
        img.name = "图片";
        img.status = "done";
        imgList.push(img);
      })
      this.setState({
        fileList: imgList
      });
    }
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      const { dispatch } = this.props;
      const record = this.props.record;
      let key = "";
      let key1 = [];
      if (values.imgList) {
        console.log(this.state.fileList)
        this.state.fileList.map(item=>{
          if(item.response){
            key = item.response.data.key;
            key1.push(key)
          }
        })
        if(record.imgList){
          // key1.push(record.imgList)
          record.imgList.map(item=>{
            key1.push(item)
          })
        }
        // this.state.fileList.map(item => {
        //   key = item.response.data.key;
        //   key1.push(key);
        // });
      }
      values.imgList = key1;
      values.date = moment(values.date).format(dateFormat);
      values.id = record.id;
      if(!isEmpty(record)){
        //修改
        dispatch({
          type:'brokeManage/fechUpdateBrokenInfo',
          payload:values,
          callback:res=>{
            if(res.state =='OK'){
              message.success('修改成功');
              this.props._this.setState({
                openEditBrokeInfo:false
              })
              this.props._this.fetchList();
            }else{
              message.error(res.message)
            }
          }
        })
      }else{
        //增加
        dispatch({
          type:'brokeManage/fechAddBrokenInfo',
          payload:values,
          callback:res=>{
            if(res.state =='OK'){
              message.success('添加成功');
              this.props._this.setState({
                openBrokeInfo:false
              })
              this.props._this.fetchList();
            }else{
              message.error(res.message)
            }
          }
        })
      }
    
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    const props = {
      name: "file",
      action: "/api/qiNiu/upload"
    };
    const record = this.props.record || {};
    const {fileList} = this.state
    console.log(this.props.record)
    return (
      <div>
        <Card>
          <Form onSubmit={this.handleSubmit}>
           <Row span={24}>
           <div style={{ marginLeft: "120px" }}>
              {getFieldDecorator("imgList", {
                initialValue: record.imgList,
                rules: [
                  {
                    required: true,
                    message: "请上传违章图"
                  }
                ]
              })(
                <Upload
                  {...props}
                  listType="picture-card"
                  fileList={fileList}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 6 ? null : (
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  )}
                </Upload>
              )}
            </div>
           </Row>
            <Row span={24}>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="违章地址">
                  {getFieldDecorator("address", {
                    initialValue: record.address,
                    rules: [
                      {
                        required: true,
                        message: "请输入违章地址"
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入违章地址"
                      style={{ width: 240 }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="违章日期" {...formItemLayout}>
                  {getFieldDecorator("date", {
                    initialValue:record.date? moment(record.date):undefined,
                    rules: [
                      {
                        required: true,
                        message: "请输入违章日期"
                      }
                    ]
                  })(
                    <DatePicker
                      format={dateFormat}
                      style={{ width: 240 }}
                      placeholder="请输入违章日期"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row span={24}>
              <Col span={12}>
                <Form.Item label="违章车牌号" {...formItemLayout}>
                  {getFieldDecorator("cardNumber", {
                    initialValue: record.cardNumber,
                    rules: [
                      {
                        required: true,
                        message: "请输入违章车牌号"
                      }
                    ]
                  })(
                    <Input placeholder="请输入违章车牌号" style={{ width: 240 }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="违章罚款金额" {...formItemLayout}>
                  {getFieldDecorator("money", {
                    initialValue: record.money,
                    rules: [
                      {
                        required: true,
                        message: "请输入违章罚款金额"
                      }
                    ]
                  })(<Input placeholder="请输入违章罚款金额" style={{ width: 240 }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row span={24}>
              <Col span={12}>
                <Form.Item label="违章类型" {...formItemLayout}>
                  {getFieldDecorator("type", {
                    initialValue: record.type,
                    rules: [
                      {
                        required: true,
                        message: "请输入违章类型"
                      }
                    ]
                  })(
                    <Select style={{ width: 240 }} placeholder="请选择违章类型">
                      <Option value="一般违章">一般违章</Option>
                      <Option value="严重违章">严重违章</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="违章等级" {...formItemLayout}>
                  {getFieldDecorator("level", {
                    initialValue: record.level,
                    rules: [
                      {
                        required: true,
                        message: "请输入违章等级"
                      }
                    ]
                  })(
                    <InputNumber  style={{ width: 240 }} placeholder="请选择违章等级"/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row span={24}>
              <Col span={12}>
                <Form.Item label="扣除驾照的积分" {...formItemLayout}>
                {getFieldDecorator("points", {
                  initialValue: record.points,
                  rules: [{
                  required: true, message: '请输入扣除的驾照积分',
                  }]
                })(
                  <Input
                    placeholder="请输入扣除的驾照积分"
                    style={{ width: 240}}
                  />
                )}
              </Form.Item>
              </Col>
            </Row>
            <div style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}
