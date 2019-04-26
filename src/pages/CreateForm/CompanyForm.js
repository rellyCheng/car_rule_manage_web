import React, { Component } from 'react'
import { Form, Input, Button, message,Select,Col,Row,DatePicker,Cascader,Icon,InputNumber } from 'antd';
import AreaCode from './AreaCode';
import { callbackify } from 'util';
import AreaOption from './AreaOption';
import AES from '@/utils/aes'
const Option = Select.Option;
import { connect } from 'dva';
import {isEmpty} from '@/utils/utils'

@Form.create()
@connect(({ createForm,global,loading }) => ({
    createForm,
    global,
    loading:loading.effects['createForm/fetchAES'],
}))
export default class CompanyForm extends Component {

    componentDidMount(){
        const { dispatch }=this.props;
        dispatch({
            type: 'global/fetchbasicData',
        });
    }

    state={
        textValue:''
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { dispatch } = this.props;
            console.log('Received values of form: ', values);
            if(values.legalManIDCardNumber||values.legalManIDCardNumberSecret){
                if(isEmpty(values.legalManIDCardNumber)){
                    message.error("请输入法定代表人证件号码!");
                    return;
                }
                if(isEmpty(values.legalManIDCardNumberSecret)){
                    message.error("请输入法定代表人证件号码密钥!")
                    return;
                }
            }
            if(values.legalManIDCardNumber&&values.legalManIDCardNumberSecret){
                this.fetchAES(values);
            }
            this.setState({
                textValue:JSON.stringify(values)
            })
          }
        });
      }
      fetchAES=(values)=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'createForm/fetchAES',
            payload: {
                secretKey:values.legalManIDCardNumberSecret,
                content:values.legalManIDCardNumber
            },
            callback: (res) => {
                values.legalManIDCardNumber = res;
                delete values.legalManIDCardNumberSecret;
                this.setState({
                    textValue:JSON.stringify(values)
                })
            }
        });
      }
      handleAreaCode = (e)=>{
        console.log(AreaCode[e.target.value]);
        this.props.form.setFieldsValue({
            areaCode:AreaCode[e.target.value]
        })
      }
      checkRegisterDate=(rule,value,callback)=>{
        var a = /^(\d{4})-(\d{2})-(\d{2})$/
        if(!isEmpty(value)){
            if (!a.test(value)) { 
                callback('日期格式不正确!例:YYYY-MM-DD');
            }
        }
        callback();
      }
  render() {
    const { global } = this.props;
    const { getFieldDecorator, validateFields } = this.props.form;
    const formItemLayout = {
        labelCol: {
        xs: { span: 24 },
        sm: { span:  10},
        },
        wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        },
    };
    function filter(inputValue, path) {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }
    return (
         <Form  onSubmit={this.handleSubmit} >
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业统一社会信用代码">
                        {getFieldDecorator('corpCode' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Input placeholder="如果无统一社会信用代码，则用组织机构代码 "/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业名称">
                        {getFieldDecorator('corpName' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Input placeholder="企业名称"/>
                        )}   
                    </Form.Item>
                </Col>               
               
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="注册日期">
                        {getFieldDecorator('registerDate' ,{
                            rules: [{ 
                                required: true,
                                message: 'Please input!' 
                            },
                            {
                                validator:this.checkRegisterDate
                            }],
                            
                        })(
                            <Input placeholder="注册日期"/>
                        )}   
                    </Form.Item>
                </Col>     
            </Row>
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="法定代表人姓名">
                        {getFieldDecorator('legalMan' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="法定代表人姓名"/>
                        )}   
                    </Form.Item>
                </Col>   
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业注册地区编码">
                        <Input.Group compact>
                            <Input  style={{ width: '70%' }} onChange={this.handleAreaCode} placeholder="参考行政区划字典表"/>
                            {getFieldDecorator('areaCode' ,{
                                rules: [{ required: true, message: 'Please input!' }],
                            })(
                                <Input  style={{ width: '30%' }} disabled  placeholder="areaCode"/>
                            )}
                        </Input.Group>
                    </Form.Item>
                </Col>  
                  {/* <Col span={8} >
                  <Form.Item {...formItemLayout}  label="企业注册地区编码">
                            {getFieldDecorator('areaCode' ,{
                                rules: [{ required: true, message: 'Please input!' }],
                            })(
                                <Cascader  showSearch={{ filter }} options={global.provinceCity}  placeholder="企业注册地区编码" />
                            )}
                    </Form.Item>
                </Col>   */}
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业营业地址 ">
                        {getFieldDecorator('address' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                           <Input placeholder="企业营业地址"/>
                        )}   
                    </Form.Item>
                </Col>       
            </Row>
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="邮政编码 ">
                        {getFieldDecorator('zipCode' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <InputNumber style={{width:'100%'}} placeholder="邮政编码  "/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="工商营业执照注册号">
                        {getFieldDecorator('licenseNum' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="工商营业执照注册号 "/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="法定代表人职务 ">
                        {getFieldDecorator('legalManDuty' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                           <Input placeholder="法定代表人职务"/>
                        )}   
                    </Form.Item>
                </Col>       
            </Row>
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="法定代表人职称 ">
                        {getFieldDecorator('legaManProTitle' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="法定代表人职称  "/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="法定代表人证件类型">
                        {getFieldDecorator('legalManIDCardType' ,{
                            initialValue:'01',
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Select
                                placeholder="请选择证件类型"
                                allowClear  
                                showSearch 
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}             
                            >
                                <Option value='01'>身份证</Option>
                                <Option value='02'>军官证</Option>
                                <Option value='03'>武警警官证</Option>
                                <Option value='04'>士兵证</Option>
                                <Option value='05'>香军队离退休干部证</Option>
                                <Option value='06'>残疾证</Option>
                                <Option value='07'>残疾军人证（1-8级）</Option>
                                <Option value='08'>护照</Option>
                                <Option value='09'>港澳同胞回乡证</Option>
                                <Option value='10'>港澳居民来往内地通行证</Option>
                                <Option value='11'>中华人民共和国往来港澳通行证</Option>
                                <Option value='12'>台湾居民来往大陆通行证</Option>
                                <Option value='13'>大陆居民往来台湾通行证</Option>
                                <Option value='14'>外交官证</Option>
                                <Option value='15'>领事馆证</Option>
                                <Option value='16'>海员证</Option>
                                <Option value='17'>香港身份证</Option>
                                <Option value='18'>台湾身份证</Option>
                                <Option value='19'>澳门身份证</Option>
                                <Option value='20'>外国人身份证件</Option>
                                <Option value='21'>高校毕业生自主创业证</Option>
                                <Option value='22'>就业失业登记证</Option>
                                <Option value='23'>台胞证</Option>
                                <Option value='24'>退休证</Option>
                                <Option value='25'>离休证</Option>
                                <Option value='99'>其他证件</Option>
                            </Select>
                        )}   
                    </Form.Item>
                </Col>      
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="法定代表人证件号码 ">
                    <Input.Group compact>
                        {getFieldDecorator('legalManIDCardNumber' ,{
                            rules: [{ required: false, message: 'Please input IDCardNumber!' }],
                        })(
                           <Input 
                           style={{ width: '50%' }}
                           placeholder="法定代表人证件号码"/>
                        )}   
                        {getFieldDecorator('legalManIDCardNumberSecret' ,{
                            rules: [{ required: false, message: 'Please input secret!' }],
                        })(
                           <Input 
                           style={{ width: '50%' }}
                           placeholder="密钥"/>
                        )} 
                    </Input.Group>
                    </Form.Item>
                </Col>             
            </Row>
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="注册资本（万元)">
                        {getFieldDecorator('regCapital' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <InputNumber style={{width:'100%'}} placeholder="注册资本（万元)"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="实收资本(万元) ">
                        {getFieldDecorator('factRegCapital' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <InputNumber style={{width:'100%'}} placeholder="实收资本(万元) "/>
                        )}   
                    </Form.Item>
                </Col>               
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="注册资本币种 ">
                        {getFieldDecorator('capitalCurrencyType' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Select
                            placeholder="请选择币种类型"
                            allowClear    
                            showSearch 
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}              
                        >
                            <Option value='CNY'>人民币</Option>
                            <Option value='USD'>美元</Option>
                            <Option value='JPY'>日元</Option>
                            <Option value='EUR'>欧元</Option>
                            <Option value='HKD'>港币</Option>
                        </Select>
                        )}   
                    </Form.Item>
                </Col>       
            </Row>
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="单位性质">
                        {getFieldDecorator('corpType' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                           <Input placeholder="单位性质"/>
                        )}   
                    </Form.Item>
                </Col>  
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="成立日期 ">
                        {getFieldDecorator('establishDate' ,{
                            rules: [{ 
                                required: false, message: 'Please input!'
                            },
                            {
                                validator:this.checkRegisterDate
                            }],
                        })(
                            <Input placeholder="成立日期"/>
                        )}   
                    </Form.Item>
                </Col>               
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="办公电话">
                        {getFieldDecorator('officePhone' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                           <Input placeholder="办公电话"/>
                        )}   
                    </Form.Item>
                </Col>       
            </Row>
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="传真号码">
                        {getFieldDecorator('faxNumber' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="传真号码"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="联系人姓名">
                        {getFieldDecorator('linkman' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="联系人姓名 "/>
                        )}   
                    </Form.Item>
                </Col>               
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="联系人办公电话">
                        {getFieldDecorator('linkTel' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                           <Input placeholder="联系人办公电话"/>
                        )}   
                    </Form.Item>
                </Col>       
            </Row>
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业联系邮箱">
                        {getFieldDecorator('email' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="企业联系邮箱"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业网址">
                        {getFieldDecorator('website' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="企业网址"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业备注 ">
                        {getFieldDecorator('remark' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="企业备注"/>
                        )}   
                    </Form.Item>
                </Col> 
            </Row>
            <Row gutter={24}>
                <Input.TextArea value={this.state.textValue} rows={4} />          
                <div style={{textAlign:'center'}} >
                <Button type="primary" htmlType="submit">Submit</Button>
                </div>               
            </Row>
        </Form> 
    )
  }
}
