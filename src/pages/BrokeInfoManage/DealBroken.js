import React, { Component } from 'react'
import {Select,Button,Spin, message} from 'antd'
import {connect} from 'dva'

const Option = Select.Option;
@connect(({brokeManage})=>({
    brokeManage
}))

export default class DealBroken extends Component {
    state={
        value: [],
        fetching: false,
    }
    fetchUser=(value)=>{
        console.log(value)
        const {dispatch} = this.props
        setTimeout(function(){
            dispatch({
                type:'brokeManage/fetchBrokeUser',
                payload:value
            })
        },2000)
        this.setState({
            fetching: true,
        })
    }
    handleChange=(value)=>{
        console.log(value)
        this.setState({
            userId:value.key
        })
    }
    handleDealBroken=()=>{
       if(this.state.userId){
           const {dispatch,record} = this.props
           console.log(record.id)
           let values = {}
           values.userId = this.state.userId
           values.brokeInfoId = record.id
           dispatch({
               type:'brokeManage/fetchDeal',
               payload:values,
               callback:res=>{
                if(res.state=="OK"){
                    message.success('处理成功')
                    this.props._this.setState({
                        openDealBroke:false
                    })
                  }else{
                    message.error(res.message)
                  }
               }
           })
       }else{
           message.error("请搜索要处理的违章者的姓名!")
       }
    }
    render() {
        const {brokeManage} = this.props
        let brokeUser = brokeManage.brokeUser || []
        console.log(brokeUser)
        return (
        <div>
            <Select
              showSearch
                // value={value}
                labelInValue
                placeholder="请搜索用户"
                notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchUser}
                onChange={this.handleChange}
                style={{ width: '100%' }}
            >
                {brokeUser.map(item => <Option key={item.id}>{item.name}</Option>)}
            </Select>
            <div style={{textAlign:'right'}}>
                <Button type="primary" style={{marginTop:'60px'}} onClick={this.handleDealBroken}>处理</Button>
            </div>
            
        </div>
        )
    }
}
