import React, { Component } from 'react'
import { Form, Button,DatePicker,Select } from 'antd'
import moment from 'moment'
const Option = Select.Option;

@Form.create()
export default class AttendanceFilter extends Component {
   state={

   }
    handleSelectCorp = e =>{
      const {platformTeamMasterList} = this.props
     if(e){
      console.log(e)
        this.props.form.setFieldsValue({
            attendanceTeam:undefined
          });
      let list = platformTeamMasterList.filter(item=>
        item.corpJid === e.key?item:undefined
      )
      this.setState({
        platformTeamMasterList:list
      })
     }else{
        this.setState({
          platformTeamMasterList
        })
     }
    }
    handleSelectTeam = e => {
      console.log(e)
       if(e){
        const {platformTeamMasterList} = this.props
        let obj = {};
        platformTeamMasterList.map((item, index) => {
          if (e.key == item.jid) {
            obj.corpJid = item.corpJid;
            obj.corpName = item.corpName;
          }
        });
        this.props.form.setFieldsValue({
          corp: { key: obj.corpJid, label: obj.corpName },
        });
       }
      };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          // values.corpJid = values.corp.key
          let value={}
          if(values.corp){
            value.corpJid=values.corp.key
          }
          if(values.attendanceTeam){
            value.teamJid = values.attendanceTeam.key
          }
          if (!err) {
            if(values.attendanceDate){
              value.attendanceDate = moment(values.attendanceDate).format('YYYY-MM-DD')
            }
           this.props.fetchList(1,value)
          }
        });
      }
  render() {
    const {
        getFieldDecorator
      } = this.props.form;
      const {corpList} = this.props
      let platformTeamMasterList = this.state.platformTeamMasterList?this.state.platformTeamMasterList:this.props.platformTeamMasterList 
      
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit} style={{margin:'20px'}}>
            <Form.Item label="考勤日期">
            {getFieldDecorator('attendanceDate')(
                <DatePicker/>
            )}
            
            </Form.Item>
            <Form.Item label="所属参建单位">
            {getFieldDecorator('corp')(
                 <Select 
                    allowClear
                    style={{width:'280px'}} 
                    placeholder="请选择"
                    labelInValue={true}
                    onChange={this.handleSelectCorp}>
                    {corpList.map((item, index) => {
                        return (
                          <Option key={index} value={item.corpJid}>
                            {item.corpName}
                          </Option>
                        );
                    })}
                 </Select>
            )}
            </Form.Item>
            <Form.Item label="所属班组">
            {getFieldDecorator('attendanceTeam')(
                <Select style={{width:'200px'}} 
                    allowClear
                    placeholder="请选择"  
                    labelInValue={true}
                    onChange={this.handleSelectTeam}>
                    {platformTeamMasterList.map((item, index) => {
                        return (
                          <Option key={index} value={item.jid}>
                            {item.teamName}
                          </Option>
                        );
                    })}
                </Select>
            )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">查询</Button>
            </Form.Item>
        </Form>
      </div>
    )
  }
}
