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
  Spin,
  Upload,
  Icon 
} from "antd";
import { connect } from "dva";
import moment from "moment";
const Option = Select.Option;
const dateFormat = "YYYY-MM-DD HH:mm:ss";
@Form.create()
@connect(({ carManage}) => ({
  carManage
}))
export default class AddCarInfoFrom extends Component {
  state = {
    fileList: [],
    fetching:false,
    fileList:[],
  };
  fetchUser=(value)=>{
    const {dispatch} = this.props
    setTimeout(function(){
        dispatch({
            type:'carManage/fetchCarUser',
            payload:value
        })
    },2000)
    this.setState({
        fetching: true,
    })
  }
  handleChange=(values)=>{
      this.props.form.setFieldsValue({
        userId:values.key
      })
  }
  handleUploadChange=(file)=>{
    console.log(file)
      this.setState({
        fileList:file.fileList,
      })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { dispatch } = this.props;
      let key1=[]
      if(values.imgList){
        let key=''
        this.state.fileList.map(item=>{
          key = item.response.data.key,
          key1.push(key)
        })
        values.imgList=key1
      }
      values.buyDate = moment(values.buyDate).format(dateFormat)
      values.userId = values.userId.key
      const record = this.props.record;
      if(record){
        //修改
        // dispatch({
        //   type:'carManage/fechUpdateCarInfo',
        //   payload:values,
        //   callback:res=>{
        //     if(res.state =='OK'){
        //       message.success('修改成功');
        //       this.props._this.setState({
        //         openAddCarInfo:false
        //       })
        //       this.props._this.fetchList();
        //     }else{
        //       message.error(res.message)
        //     }
        //   }
        // })
      }else{
        //增加
        dispatch({
          type:'carManage/fechAddCarInfo',
          payload:values,
          callback:res=>{
            if(res.state =='OK'){
              message.success('添加成功');
              this.props._this.setState({
                openAddCarInfo:false
              })
              this.props._this.fetchList();
            }else{
              message.error(res.message)
            }
          }
        })
      }
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
    const record = this.props.record || {};
    const {carManage} = this.props
    const {fileList } = this.state;
    console.log(carManage)
    let carUser = carManage.carUser || []
    const params={
      name: 'file',
      action:'/api/qiNiu/upload',
    }
    console.log(this.props.record)
    return (
      <div>
        <Card>
          <Form onSubmit={this.handleSubmit}>
          <div style={{marginLeft:'110px'}}>
            <Form.Item
              >  
              {getFieldDecorator('imgList', {  
                  // initialValue: record.image,
                  rules: [{required:true, message: '请上传图片'}],
              })(
                <Upload
                 {...params}
                  listType="picture-card"
                  fileList={fileList}
                  onChange={this.handleUploadChange}
                >
                  {fileList.length >= 6 ? null : 
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">图片</div>
                    </div>
                  }
                </Upload>
              )}
            </Form.Item>
          </div>
          <Row span ={24}>
            <Col span={12}>
             <Form.Item {...formItemLayout} label="车主">
                  {getFieldDecorator("userId", {
                    rules: [
                      {
                        required: true,
                        message: "请输入车的品牌"
                      }
                    ]
                  })(
                    <Select
                    showSearch
                      // value={value}
                      labelInValue
                      placeholder="请搜索用户"
                      notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                      filterOption={false}
                      onSearch={this.fetchUser}
                      onChange={this.handleChange}
                      style={{  width: 240 }}
                  >
                      {carUser.map(item => <Option key={item.id}>{item.name}</Option>)}
                  </Select>
                  )}
              </Form.Item>
            </Col>
          </Row>
            <Row span={24}>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="品牌">
                  {getFieldDecorator("sign", {
                    initialValue: record.sign,
                    rules: [
                      {
                        required: true,
                        message: "请输入车的品牌"
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入车的品牌"
                      style={{ width: 240 }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="颜色" {...formItemLayout}>
                  {getFieldDecorator("color", {
                    initialValue:record.color,
                    rules: [
                      {
                        required: true,
                        message: "请输入车的颜色"
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入车的颜色"
                      style={{ width: 240 }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row span={24}>
              <Col span={12}>
                <Form.Item label="载荷人数" {...formItemLayout}>
                  {getFieldDecorator("seatNum", {
                    initialValue: record.seatNum,
                    rules: [
                      {
                        required: true,
                        message: "请输入载荷人数"
                      }
                    ]
                  })(
                    <InputNumber placeholder="请输入载荷人数" min={2} style={{ width: 240 }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="购买日期" {...formItemLayout}>
                  {getFieldDecorator("buyDate", {
                    initialValue: record.buyDate ? moment(record.buyDate) : undefined,
                    rules: [
                      {
                        required: true,
                        message: "请选择购买日期"
                      }
                    ]
                  })(
                    <DatePicker
                      format={dateFormat}
                      style={{ width: 240 }}
                      placeholder="请选择购买日期"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row span={24}>
              <Col span={12}>
                <Form.Item label="车辆类型" {...formItemLayout}>
                  {getFieldDecorator("carType", {
                    initialValue: record.carType,
                    rules: [
                      {
                        required: true,
                        message: "请输入车辆类型"
                      }
                    ]
                  })(
                    <Select style={{ width: 240 }} placeholder="请选择车辆类型">
                      <Option value="轿车">轿车</Option>
                      <Option value="客车">客车</Option>
                      <Option value="货车">货车</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="车牌号" {...formItemLayout}>
                  {getFieldDecorator("cardNumber", {
                    initialValue: record.cardNumber,
                    rules: [
                      {
                        required: true,
                        message: "请输入车牌号"
                      }
                    ]
                  })(
                    <Input  style={{ width: 240 }} placeholder="请输入车牌号"/>
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
