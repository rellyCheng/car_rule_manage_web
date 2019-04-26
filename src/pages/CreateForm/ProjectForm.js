import React, { Component } from 'react'
import { Form, Input, Button, message,Select,Col,Row,DatePicker,Cascader,Icon,InputNumber } from 'antd';
import MultiForm from './MultiForm';
import AreaCode from './AreaCode';
import {isEmpty} from '@/utils/utils'
import { connect } from 'dva';
const Option = Select.Option;
let id = 0;
@Form.create()
@connect(({ createForm,global,loading }) => ({
    createForm,
    global,
    loading:loading.effects['createForm/fetchAES'],
}))
export default class ProjectForm extends Component {
    state={
        textValue:'',
        buildPlanNum:false
    }
    
    componentDidMount(){
        this.add();
        const { dispatch }=this.props;
        dispatch({
            type: 'global/fetchbasicData',
        });
    }
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        }
    
        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
      }
      add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });
      }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            if(values.builderLicenseNum||values.builderLicenseNumSecret){
                if(isEmpty(values.builderLicenseNum)){
                    message.error("请输入施工许可证编号!");
                    return;
                }
                if(isEmpty(values.builderLicenseNumSecret)){
                    message.error("请输入施工许可证编号密钥!")
                    return;
                }
            }
            if(values.buildPlanNum||values.buildPlanNumSecret){
                if(isEmpty(values.buildPlanNum)){
                    message.error("请输入建设用地规划许可证编号!");
                    return;
                }
                if(isEmpty(values.buildPlanNumSecret)){
                    message.error("请输入建设用地规划许可证编号密钥!")
                    return;
                }
            }
            if(values.prjPlanNum||values.prjPlanNumSecret){
                if(isEmpty(values.prjPlanNum)){
                    message.error("请输入建设工程规划许可证编号!");
                    return;
                }
                if(isEmpty(values.prjPlanNumSecret)){
                    message.error("请输入建设工程规划许可证编号密钥!")
                    return;
                }
            }
            let arr = [];
            
            values.aa.map((item,index1)=>{
                let obj = {};
                obj.prjName = item;
                values.bb.map((item,index)=>{
                    if(index==index1){
                        obj.builderLicenseNum = item;
                    }
                    values.bbSecret.map((item,index)=>{
                        if(index==index1){
                            obj.builderLicenseNumSecret = item;
                        }
                    })
                })
                arr.push(obj)
            })
            values.builderLicenses = arr;
            delete values.aa;
            delete values.bb;
            delete values.bbSecret;
            delete values.keys;
            console.log(values);
            //aes加密建设用地规划许可证编号
            if(values.buildPlanNumSecret&&values.buildPlanNum ){
                this.fetchBuildPlanNumAES(values)
            }
            if(values.prjPlanNumSecret&&values.prjPlanNum){
                this.fetchPrjPlanNumAES(values)
            }
            if(values.builderLicenses.length>0){
                this.fetchBuilderLicensesNumAES(values)
            }
            this.setState({
                textValue:JSON.stringify(values)
            })
          }
        });
      }
      fetchBuilderLicensesNumAES=(values)=>{
        const { dispatch } = this.props;
        values.builderLicenses.map((item,index)=>{
            dispatch({
                type: 'createForm/fetchAES',
                payload: {
                    secretKey:item.builderLicenseNumSecret ,
                    content:item.builderLicenseNum 
                },
                callback: (res) => {
                    item.builderLicenseNum = res;
                    delete item.builderLicenseNumSecret;
                    this.setState({
                        textValue:JSON.stringify(values)
                    })
                }
            });
        })
      }
      fetchBuildPlanNumAES=(values)=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'createForm/fetchAES',
            payload: {
                secretKey:values.buildPlanNumSecret ,
                content:values.buildPlanNum 
            },
            callback: (res) => {
                values.buildPlanNum = res;
                delete values.buildPlanNumSecret;
                this.setState({
                    textValue:JSON.stringify(values)
                })
            }
        });
      }

      fetchPrjPlanNumAES=(values)=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'createForm/fetchAES',
            payload: {
                secretKey:values.prjPlanNumSecret ,
                content:values.prjPlanNum 
            },
            callback: (res) => {
                values.prjPlanNum = res;
                delete values.prjPlanNumSecret;
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
      checkbbSecret(rule,value,callback){
        if(!isEmpty(value)){
            if (value.length<32) { 
                callback('长度32位');
            }
        }
      
        callback();
        
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
      const {loading,global}=this.props;
    const { getFieldDecorator, validateFields,getFieldValue } = this.props.form;
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
    const formItemLayout1 = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
        };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
        <div key={index}>
            <Row gutter={24}>
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout1 : formItemLayoutWithOutLabel)}
                        label={index === 0 ? '工程名称' : ''}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`aa[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input placeholder="工程名称" style={{ width: '80%', marginRight: 8 }} />
                        )}
                        {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                        ) : null}
                    </Form.Item>
                </Col> 
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? '施工许可证编号' : ''}
                        required={true}
                        key={k}
                        >
                        {/* <Input.Group compact> */}
                        {getFieldDecorator(`bb[${k}]`, {
                        validateTrigger: ['onChange'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input placeholder="施工许可证编号" style={{ width: '100%'}} />
                        )}
                        </Form.Item>
                        </Col>
                        <Col span={8} >  
                        <Form.Item  {...formItemLayout} >
                        {getFieldDecorator(`bbSecret[${k}]`, {
                        validateTrigger: ['onChange'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        },{
                            validator:this.checkbbSecret.bind(this)
                        }],
                        })(
                        <Input placeholder="密钥" style={{ width: '100%'}} />
                        )}
                        {/* </Input.Group> */}
                    </Form.Item>
                </Col>
            </Row>
         </div>
    ));
    function filter(inputValue, path) {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }
    return (
         <Form  onSubmit={this.handleSubmit} >
            <Row gutter={24}>
                {/* <Col span={8} >
                    <Form.Item {...formItemLayout}  label="总承包单位统一社会信用代码">
                        {getFieldDecorator('contractorCorpCode' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Input placeholder="如果无统一社会信用代码，则用组织机构代码 "/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="总承包单位名称">
                        {getFieldDecorator('contractorCorpName' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Input placeholder="总承包单位名称"/>
                        )}   
                    </Form.Item>
                </Col>               
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="项目名称">
                        {getFieldDecorator('name' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                           <Input placeholder="项目名称 "/>
                        )}   
                    </Form.Item>
                </Col>                     
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="项目所在地">
                        <Input.Group compact>
                            <Input style={{width:'65%'}} placeholder="参考行政区划字典表" onChange={this.handleAreaCode}/>
                            {getFieldDecorator('areaCode' ,{
                                rules: [{ required: true, message: 'Please input!' }],
                            })(
                                <Input style={{width:'35%'}}  placeholder="areaCode" disabled/>
                            )}
                        </Input.Group>
                    </Form.Item>
                </Col>  */}
                {/* <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业注册地区编码">
                            {getFieldDecorator('areaCode' ,{
                                rules: [{ required: true, message: 'Please input!' }],
                            })(
                                <Cascader  showSearch={{ filter }} options={global.provinceCity}  placeholder="企业注册地区编码" />
                            )}
                    </Form.Item>
                </Col> */}
                {/* <Col span={8} >
                    <Form.Item {...formItemLayout}  label="项目分类">
                        {getFieldDecorator('category' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Select
                                placeholder="请选择项目分类"
                                allowClear  
                                showSearch 
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                            >
                                <Option value='01'>房屋建筑工程</Option>
                                <Option value='02'>市政公用工程</Option>
                                <Option value='03'>机电安装工程</Option>
                                <Option value='04'>铁路工程</Option>
                                <Option value='05'>公路工程</Option>
                                <Option value='06'>港口与航道工程</Option>
                                <Option value='07'>水利水电工程</Option>
                                <Option value='08'>电力工程</Option>
                                <Option value='09'>矿山工程</Option>
                                <Option value='10'>冶炼工程</Option>
                                <Option value='11'>化工石油工程</Option>
                                <Option value='12'>通信工程</Option>
                                <Option value='99'>其他</Option>
                            </Select>
                        )}   
                    </Form.Item>
                </Col>                */}           
                 <Col span={8} >
                    <Form.Item {...formItemLayout}  label="项目状态">
                        {getFieldDecorator('prjStatus' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Select
                                placeholder="请选择项目状态"
                                allowClear  
                                showSearch 
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                            >
                                <Option value='001'>筹备</Option>
                                <Option value='002'>立项</Option>
                                <Option value='003'>在建</Option>
                                <Option value='004'>完工</Option>
                                <Option value='005'>停工</Option>
                            </Select>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="建设单位统一社会信用代码 ">
                        {getFieldDecorator('buildCorpCode' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="如果无统一社会信用代码，则用组织机构代码"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="国籍或地区">
                        {getFieldDecorator('nationNum' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Select
                                placeholder="请选择国籍"
                                allowClear  
                                showSearch 
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                            >
                                <Option value='156'>中国</Option>
                            </Select>
                        )}   
                    </Form.Item>
                </Col>


                {/* 注释 */}
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="建设用地规划许可证编号 ">
                        <Input.Group compact>
                            {getFieldDecorator('buildPlanNum' ,{
                                rules: [{ required: false, message: 'Please input!' }],
                            })(
                            <Input 
                            // onChange = {this.handleChangebuildPlanNum}
                            style={{ width: '50%' }}
                            placeholder="建设用地规划许可证编号"/>
                            )}   
                            {getFieldDecorator('buildPlanNumSecret' ,{
                                rules: [{ required: false, message: 'Please input!' }],
                            })(
                            <Input 
                            // onChange = {this.handleChangebuildPlanNum}
                            style={{ width: '50%' }}
                            placeholder="密钥"/>
                            )} 
                        </Input.Group>
                    </Form.Item>
                </Col>                   
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="建设工程规划许可证编号 ">
                        <Input.Group compact>
                            {getFieldDecorator('prjPlanNum' ,{
                                rules: [{ required: false, message: 'Please input!' }],
                            })(
                                <Input   style={{ width: '50%' }} placeholder="建设工程规划许可证编号  "/>
                            )}
                            {getFieldDecorator('prjPlanNumSecret' ,{
                                rules: [{ required: false, message: 'Please input!' }],
                            })(
                                <Input   style={{ width: '50%' }} placeholder="密钥  "/>
                            )}
                        </Input.Group>   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="项目编码">
                        {getFieldDecorator('projectCode' ,{
                            rules: [{ required:true, message: 'Please input!' }],
                        })(
                           <Input placeholder="项目编码"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="项目简介">
                        {getFieldDecorator('description' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="项目简介"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="总投资 ">
                        {getFieldDecorator('invest' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                           <InputNumber style={{width:'100%'}} placeholder="单位：（万元）"/>
                        )}   
                    </Form.Item>
                </Col>       
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="总面积">
                        {getFieldDecorator('buildingArea' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <InputNumber style={{width:'100%'}} placeholder="单位：平方米"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="总长度">
                        {getFieldDecorator('buildingLength' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <InputNumber style={{width:'100%'}} placeholder="总长度"/>
                        )}   
                    </Form.Item>
                </Col>               
                {/* <Col span={8} >
                    <Form.Item {...formItemLayout}  label="开工日期 ">
                        {getFieldDecorator('startDate' ,{
                            rules: [{ required: false, message: 'Please input!' },
                            {
                                validator:this.checkRegisterDate
                            }],
                        })(
                           <Input placeholder="精确到天，格式：yyyy-MM-dd"/>
                        )}   
                    </Form.Item>
                </Col>       
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="竣工日期">
                        {getFieldDecorator('completeDate' ,{
                            rules: [{ required: false, message: 'Please input!' },
                            {
                                validator:this.checkRegisterDate
                            }],
                        })(
                            <Input placeholder="精确到天，格式：yyyy-MM-dd "/>
                        )}   
                    </Form.Item>
                </Col> */}

                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="联系人姓名 ">
                        {getFieldDecorator('linkMan' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="联系人姓名"/>
                        )}   
                    </Form.Item>
                </Col>               
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="联系人办公电话">
                        {getFieldDecorator('linkPhone' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                           <Input placeholder="联系人办公电话"/>
                        )}   
                    </Form.Item>
                </Col>       

                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="建设单位名称 ">
                        {getFieldDecorator('buildCorpName' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                           <Input placeholder="建设单位名称"/>
                        )}   
                    </Form.Item>
                </Col>       

                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="WGS84经度">
                        {getFieldDecorator('lat' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <InputNumber style={{width:'100%'}} placeholder="WGS84经度 "/>
                        )}   
                    </Form.Item>
                </Col>               
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="WGS84纬度 ">
                        {getFieldDecorator('lng' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                           <InputNumber style={{width:'100%'}} placeholder="WGS84纬度 "/>
                        )}   
                    </Form.Item>
                </Col>       
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="项目地点">
                        {getFieldDecorator('address' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="项目地点"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="立项文号">
                        {getFieldDecorator('approvalNum' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Input placeholder="立项文号"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="立项级别 ">
                        {getFieldDecorator('approvalLevelNum' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Select
                                placeholder="请选择立项级别"
                                allowClear      
                                showSearch 
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}            
                            >
                                <Option value='001'>部级</Option>
                                <Option value='002'>省级</Option>
                                <Option value='003'>地市级</Option>
                                <Option value='004'>区县级</Option>
                                <Option value='005'>国家级</Option>
                                <Option value='006'>其他</Option>
                            </Select>
                        )}   
                    </Form.Item>
                </Col> 

                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="建设规模">
                        {getFieldDecorator('prjSize' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Select
                                placeholder="请选择建设规模"
                                allowClear  
                                showSearch 
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                            >
                                <Option value='01'>大型</Option>
                                <Option value='02'>中型</Option>
                                <Option value='03'>小型</Option>
                            </Select>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="建设性质">
                        {getFieldDecorator('propertyNum' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Select
                                placeholder="请选择建设性质"
                                allowClear 
                                showSearch 
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                 
                            >
                                <Option value='001'>新建</Option>
                                <Option value='002'>改建</Option>
                                <Option value='003'>扩建</Option>
                                <Option value='004'>恢复</Option>
                                <Option value='005'>迁建</Option>
                                <Option value='006'>拆除</Option>
                                <Option value='099'>其他</Option>
                            </Select>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="工程用途 ">
                        {getFieldDecorator('functionNum' ,{
                            rules: [{ required: false, message: 'Please input!' }],
                        })(
                            <Select
                                placeholder="请选择工程用途"
                                allowClear   
                                showSearch 
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}               
                            >
                                <Option value='100'>居住建筑</Option>
                                <Option value='200'>居住建筑配套工程</Option>
                                <Option value='300'>公共建筑</Option>
                                <Option value='301'>办公建筑</Option>
                                <Option value='302'>商业建筑</Option>
                                <Option value='303'>旅游建筑</Option>
                                <Option value='304'>科教文卫建筑</Option>
                                <Option value='305'>交通运输类</Option>
                                <Option value='306'>通信建筑</Option>
                                <Option value='307'>公共建筑配套工程</Option>
                                <Option value='400'>商住楼</Option>
                                <Option value='500'>农业建筑</Option>
                                <Option value='600'>农业建筑配套工程</Option>
                                <Option value='700'>工业建筑</Option>
                                <Option value='800'>工业建筑配套工程</Option>
                                <Option value='999'>其他</Option>
                                <Option value='010'>给水</Option>
                                <Option value='011'>排水</Option>
                            </Select>
                        )}   
                    </Form.Item>
                </Col> 
            </Row>
           
            {/* <Row gutter={24}>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> 添加工程名称和施工许可证编号。
                </Button>
                </Form.Item>
               
            </Row> */}
            <Row gutter={24}>
                <Input.TextArea value={this.state.textValue} rows={4} />          
            </Row>
            <div style={{textAlign:'center'}} >
                <Button loading={loading} type="primary" htmlType="submit">Submit</Button>
            </div>
        </Form> 
    )
  }
}
