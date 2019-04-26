import React, { Component } from 'react'
import { Select, Button, message } from 'antd';
import {connect} from 'dva'


@connect(({ account,loading}) => ({
  account,
  loading: loading.effects['account/fetchdropDownProjectList'],
}))
export default class ProjectRelevance extends Component {
    componentDidMount(){
        this.fetchdropDownCorpList(''); 
    }
    handleChange = (value) => {
        this.fetchdropDownCorpList(value);
    };
       //获取项目列表
    fetchdropDownCorpList=(value)=>{
        console.log(value)
        const {dispatch} = this.props;
        dispatch({
            type:'account/fetchdropDownProjectList',
            payload:value
        })
    }
    handleRelevance=()=>{
        const {dispatch} = this.props;
        dispatch({
            type:'account/fetchRelevanceProject',
            payload:{
                mProjectJid:this.state.mProjectJid,
                gProjectJid:this.props.gProjectJid
            },
            callback:res=>{
                console.log(res)
                if(res.state==1){
                    message.success("关联成功");
                    this.props._this.setState({
                        openRelevance:false
                    });
                    this.props._this.requestList();
                }
            }

        })
    }
    handleSelect=(e)=>{
       console.log(e)
       this.setState({
        mProjectJid:e.key
       })
    }
  render() {
        const { account } = this.props;
        const dropDownProjectList = account.dropDownProjectList || [];
    return (
        <div>
            <p style={{color:'red'}}>温馨提示：若未找到对应的项目，请先到项目上传管理界面上传相应的项目</p>
             <Select
                style={{width:300}}
                placeholder="请选择项目"
                labelInValue
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleChange}
                notFoundContent={null}
                // defaultOpen={true}
                onSelect={this.handleSelect}
             >
              {
                  dropDownProjectList.map(list => <Select.Option key={list.jid}>{list.name}</Select.Option>)
              }
            </Select>
                 <Button style={{float:'right'}} onClick={this.handleRelevance}>确认关联</Button>
             
            <br/>
            <br/>
            <br/>
            <br/> <br/>
            <br/>
            <br/>
            <br/>
            <br/> <br/>
            <br/> <br/>
        </div>
         
    )
  }
}
