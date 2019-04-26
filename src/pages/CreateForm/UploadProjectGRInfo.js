import React, { Component } from 'react'
import { Form, Input, Button, message,Select,Col,Row,DatePicker,Cascader,Icon,InputNumber, Divider,Upload } from 'antd';
import MultiForm from './MultiForm';
import AreaCode from './AreaCode';
import {isEmpty} from '@/utils/utils'
import { connect } from 'dva';
const Option = Select.Option;
let id = 0;
@Form.create()
@connect(({ createForm }) => ({
    createForm,
}))
export default class UploadProjectGRInfo extends Component {
    state={
        textValue:'',
        buildPlanNum:false
    }
    
    componentDidMount(){
        this.add();
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
            // if(values.builderLicenseNum||values.builderLicenseNumSecret){
            //     if(isEmpty(values.builderLicenseNum)){
            //         message.error("请输入施工许可证编号!");
            //         return;
            //     }
            //     if(isEmpty(values.builderLicenseNumSecret)){
            //         message.error("请输入施工许可证编号密钥!")
            //         return;
            //     }
            // }
         
            let workerList = [];
            
            // values.aa.map((item,index1)=>{
            //     let obj = {};
            //     obj.prjName = item;
            //     values.bb.map((item,index)=>{
            //         if(index==index1){
            //             obj.builderLicenseNum = item;
            //         }
            //         values.bbSecret.map((item,index)=>{
            //             if(index==index1){
            //                 obj.builderLicenseNumSecret = item;
            //             }
            //         })
            //     })
            //     arr.push(obj)
            // })
            // values.builderLicenses = arr;
            // delete values.aa;
            // delete values.bb;
            // delete values.bbSecret;
            // delete values.keys;
            // console.log(values);
            //aes加密建设用地规划许可证编号
            // if(values.buildPlanNumSecret&&values.buildPlanNum ){
            //     this.fetchBuildPlanNumAES(values)
            // }
            values.address.map((item,index1)=>{
                let obj = {};
                obj.address = item;
                values.cellPhone.map((item,index)=>{
                    if(index==index1){
                        obj.cellPhone = item;
                    }
                    values.cultureLevelType.map((item,index)=>{
                        if(index==index1){
                            obj.cultureLevelType = item;
                        }
                        values.grantOrg.map((item,index)=>{
                          if(index==index1){
                              obj.grantOrg = item;
                          }
                          values.headImage.map((item,index)=>{
                            if(index==index1){
                                obj.headImage = item;
                            }
                            values.idCardType.map((item,index)=>{
                              if(index==index1){
                                  obj.idCardType = item;
                              }
                              values.isTeamLeader.map((item,index)=>{
                                if(index==index1){
                                    obj.isTeamLeader = item;
                                }
                                values.nation.map((item,index)=>{
                                  if(index==index1){
                                      obj.nation = item;
                                  }
                                  values.politicsType.map((item,index)=>{
                                    if(index==index1){
                                        obj.politicsType = item;
                                    }
                                    values.workRole.map((item,index)=>{
                                      if(index==index1){
                                          obj.workRole = item;
                                      }
                                      values.workType.map((item,index)=>{
                                        if(index==index1){
                                            obj.workType = item;
                                        }
                                        values.workerName.map((item,index)=>{
                                          if(index==index1){
                                              obj.workerName = item;
                                          }
                                          values.idCardNumber.map((item,index)=>{
                                            if(index==index1){
                                                obj.idCardNumber = item;
                                            }
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                    })
                })
                workerList.push(obj)
            })
            delete values.address;
            delete values.cellPhone;
            delete values.cultureLevelType;
            delete values.grantOrg;
            delete values.idCard;
            delete values.idCardNumber;
            delete values.idCardSecret;
            delete values.idCardType;
            delete values.isTeamLeader;
            delete values.keys;
            delete values.nation;
            delete values.workRole;
            delete values.workType;
            delete values.workerName;
            delete values.headImage;
            delete values.politicsType;
            values.workerList = workerList;
            this.setState({
                textValue:JSON.stringify(values)
            })
          }
        });
      }

      checkbbSecret(rule,value,callback){
        if(!isEmpty(value)){
            if (value.length<32) { 
                callback('长度32位');
            }
        }
        callback();
        
      }
      handleIdCardNumber=(k)=>{
        const idCard = this.props.form.getFieldValue(`idCard[${k}]`);
        const idCardSecret = this.props.form.getFieldValue(`idCardSecret[${k}]`);
        if(isEmpty(idCard)){
          message.error("请输入证件号码!");
          return;
        }
        if(isEmpty(idCardSecret)){
          message.error("请输入证件号码密钥!");
          return;
        }
        const { dispatch,form } = this.props;
      
       
        dispatch({
            type: 'createForm/fetchAES',
            payload: {
                secretKey:idCardSecret,
                content:idCard
            },
            callback: (res) => {
              form.setFieldsValue({
                ["idCardNumber["+k+"]"]:res
              })
            }
        });
      }
      handleChangeBase64=(info,k)=>{
        console.log(info);
        console.log(k);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
          }
          if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => {
                const { form } = this.props;
                form.setFieldsValue({
                    ["headImage["+k+"]"]:imageUrl
                })
            });
        }
      }
      getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            console.log("aaaa")
            console.log(reader.result);
            console.log("bbbb")
            callback(reader.result)
        });
        reader.readAsDataURL(img);
    }
  render() {
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
        <Divider/>
            <Row gutter={24}>
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '工人姓名' : `工人姓名${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`workerName[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input placeholder="工人姓名" style={{ width: '80%' }} />
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
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '是否班组长' : `是否班组长${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`isTeamLeader[${k}]`, {
                            initialValue:0,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                          <Select
                            style={{ width: '80%' }}
                            placeholder="请选择"
                            allowClear  
                            showSearch 
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                          >
                            <Option value={1}>是</Option>
                            <Option value={0}>否</Option>
                          </Select>
                        )}
                    </Form.Item>
                </Col> 
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '证件类型' : `证件类型${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`idCardType[${k}]`, {
                            initialValue:"01",
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Select
                          style={{ width: '80%' }}
                          placeholder="请选择"
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
              </Row>
              <Row gutter={24}>
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '工种' : `工种${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`workType[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                          <Select
                          style={{ width: '80%' }}
                          placeholder="请选择"
                          allowClear  
                          showSearch 
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                        >
                          <Option value="010">砌筑工</Option>
                          <Option value="020">钢筋工</Option>
                          <Option value="030">架子工</Option>
                          <Option value="040">混凝土工</Option>
                          <Option value="050">模板工</Option>
                          <Option value="060">机械设备安装工</Option>
                          <Option value="070">通风工</Option>
                          <Option value="080">安装起重工</Option>
                          <Option value="090">安装钳工</Option>
                          <Option value="100">电气设备安装调试工</Option>
                          <Option value="110">管道工</Option>
                          <Option value="120">变电安装工</Option>
                          <Option value="130">建筑电工</Option>
                          <Option value="140">司泵工</Option>
                          <Option value="150">挖掘铲运和桩工机械司机</Option>
                          <Option value="160">桩机操作工</Option>
                          <Option value="170">起重信号工</Option>
                          <Option value="180">建筑起重机械安装拆卸工</Option>
                          <Option value="190">装饰装修工</Option>
                          <Option value="200">室内成套设施安装工</Option>
                          <Option value="210">建筑门窗幕墙安装工</Option>
                          <Option value="220">幕墙制作工</Option>
                          <Option value="230">防水工</Option>
                          <Option value="240">木工</Option>
                          <Option value="250">石工</Option>
                          <Option value="270">电焊工</Option>
                          <Option value="280">爆破工</Option>
                          <Option value="290">除尘工</Option>
                          <Option value="300">测量放线工</Option>
                          <Option value="310">线路架设工</Option>
                          <Option value="320">古建筑传统石工</Option>
                          <Option value="330">古建筑传统瓦工</Option>
                          <Option value="340">古建筑传统彩画工</Option>
                          <Option value="350">古建筑传统木工</Option>
                          <Option value="360">古建筑传统油工</Option>
                          <Option value="380">金属工</Option>
                          <Option value="900">管理人员</Option>
                          <Option value="390">杂工</Option>
                          <Option value="1000">其它</Option>
                        </Select>
                        )}
                    </Form.Item>
                </Col> 
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '工人类型' : `工人类型${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`workRole[${k}]`, {
                            initialValue:20,
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                          <Select
                          style={{ width: '80%' }}
                          placeholder="请选择"
                          allowClear  
                          showSearch 
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                        >
                          <Option value={10}>管理人员</Option>
                          <Option value={20}>建筑工人</Option>
                        </Select>
                        )}
                    </Form.Item>
                </Col> 
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '民族' : `民族${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`nation[${k}]`, {
                            initialValue:"汉",
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input placeholder="民族" style={{ width: '80%'}} />
                        )}
                    </Form.Item>
                </Col> 
              </Row>
          
              <Row gutter={24}>
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '手机号码' : `手机号码${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`cellPhone[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input placeholder="手机号码" style={{ width: '80%' }} />
                        )}
                    </Form.Item>
                </Col> 
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '文化程度' : `文化程度${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`cultureLevelType[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                          <Select
                          style={{ width: '80%' }}
                          placeholder="请选择"
                          allowClear  
                          showSearch 
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                        >
                         <Option value="01">小学</Option>
                          <Option value="02">初中</Option>
                          <Option value="03">高中</Option>
                          <Option value="04">中专</Option>
                          <Option value="05">大专</Option>
                          <Option value="06">本科</Option>
                          <Option value="07">硕士</Option>
                          <Option value="08">博士</Option>
                          <Option value="99">其他</Option>
                        </Select>
                        )}
                    </Form.Item>
                </Col> 
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '发证机关' : `发证机关${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`grantOrg[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input placeholder="发证机关" style={{ width: '80%'}} />
                        )}
                    </Form.Item>
                </Col> 
              </Row>
              <Row gutter={24}>
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '证件号码' : `证件号码${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`idCard[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input placeholder="证件号码" style={{ width: '80%' }} />
                        )}
                    </Form.Item>
                </Col> 
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '证件号码密钥' : `证件号码密钥${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`idCardSecret[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        },{
                            validator:this.checkbbSecret.bind(this)
                        }],
                        })(
                        <Input placeholder="证件号码密钥" style={{ width: '80%' }} />
                        )}
                    </Form.Item>
                </Col> 
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '证件号码AES' : `证件号码AES${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`idCardNumber[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input onClick={()=>this.handleIdCardNumber(`${k}`)} placeholder="证件号码AES" style={{ width: '80%' }} />
                        )}
                    </Form.Item>
                </Col> 
              </Row>
              <Row gutter={24}>
              <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '上传头像' : `上传头像${k}`}
                        required={true}
                        key={index}
                        >
                        <Upload 
                            onChange={(file)=>this.handleChangeBase64(file,k)}
                            action='1'
                        >
                            <Button>
                            <Icon type="upload" /> Click to Upload
                            </Button>
                        </Upload>
                    </Form.Item>
                </Col>
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '住址' : `住址${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`address[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input placeholder="住址" style={{ width: '80%' }} />
                        )}
                    </Form.Item>
                </Col> 
              
                <Col span={8} >  
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '政治面貌' : `政治面貌${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`politicsType[${k}]`, {
                            initialValue:"13",
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                          <Select
                          style={{ width: '80%' }}
                          placeholder="请选择"
                          allowClear  
                          showSearch 
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}                
                        >
                          <Option value="01">中共党员</Option>
                          <Option value="02">中共预备党</Option>
                          <Option value="03">共青团员</Option>
                          <Option value="04">民革党员</Option>
                          <Option value="05">民盟盟员</Option>
                          <Option value="06">民建会员</Option>
                          <Option value="07">民进会员</Option>
                          <Option value="08">农工党党员</Option>
                          <Option value="09">致公党党员</Option>
                          <Option value="10">九三学社社</Option>
                          <Option value="11">台盟盟员</Option>
                          <Option value="12">无党派人士</Option>
                          <Option value="13">群众</Option>
                        </Select>
                        )}
                    </Form.Item>
                </Col> 
                 
              </Row>
              <Row gutter={24}>
                <Col span={24} >  
                    <Form.Item
                        // {...(index === 0 ? formItemLayout : formItemLayout)}
                        label={index === 0 ? '头像Base64' : `头像Base64${k}`}
                        required={true}
                        key={index}
                        >
                        {getFieldDecorator(`headImage[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please input!",
                        }],
                        })(
                        <Input.TextArea placeholder="头像Base64" rows={4} />
                        )}
                    </Form.Item>
                </Col> 
              </Row>
         </div>
    ));
   
    return (
         <Form  onSubmit={this.handleSubmit} >
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="项目编号">
                        {getFieldDecorator('projectCode' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Input placeholder="平台为项目分配的接入编号 "/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业统一社会信用代码">
                        {getFieldDecorator('corpCode' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Input placeholder="所在企业统一社会信用代码，如果无统一社会信用代码，则用组织机构代码"/>
                        )}   
                    </Form.Item>
                </Col>               
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="企业名称">
                        {getFieldDecorator('corpName' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                           <Input placeholder="企业名称 "/>
                        )}   
                    </Form.Item>
                </Col>       
            </Row>
           
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="班组编号 ">
                        {getFieldDecorator('teamSysNo' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                            <Input placeholder="班组编号"/>
                        )}   
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item {...formItemLayout}  label="班组名称">
                        {getFieldDecorator('teamName' ,{
                            rules: [{ required: true, message: 'Please input!' }],
                        })(
                          <Input placeholder="班组名称"/>
                        )}   
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> 添加项目工人信息。
                </Button>
                </Form.Item>
               
            </Row>
            <Row gutter={24}>
                <Input.TextArea value={this.state.textValue} rows={4} />          
            </Row>
            <div style={{textAlign:'center'}} >
                <Button type="primary" htmlType="submit">Submit</Button>
            </div>
        </Form> 
    )
  }
}
