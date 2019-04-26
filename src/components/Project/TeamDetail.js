import React, { Component } from 'react'
import styles from './index.less';
import { declareExportDeclaration } from '@babel/types';
import { Upload} from 'antd';
import {isEmpty} from '@/utils/utils';
import { connect } from 'dva';
@connect(({globalProject}) => ({
    globalProject
  }))
export default class TeamDetail extends Component {
    state={
        fileList1:[],
        fileList2:[],
      }
    componentDidMount(){
        const {data} = this.props;
        const teamJid = data.jid
        this.fetchTeamMasterInfo(teamJid)
       }
       fetchTeamMasterInfo=(teamJid)=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'globalProject/fetchTeamMasterInfo',
            payload:teamJid,
            callback:res=>{
              let fileList1 = [];
              if(res.data.entryAttachments.length){
                 res.data.entryAttachments.map((item,index)=>{
                  let file1 ={};
                  file1.url = SERVER_IP.FTP_IP+item.url
                  file1.name = `进场附件${index+1}`;
                  fileList1.push(file1);
                 })
              }
              let fileList2 = [];
              if(res.data.exitAttachments.length){
                res.data.exitAttachments.map((item,index)=>{
                 let file2 ={};
                 file2.url = SERVER_IP.FTP_IP+item.url;
                 file2.name = `退场附件${index+1}`;
                 fileList2.push(file2);
                })
             }
            this.setState({
                fileList1:fileList1,
                fileList2:fileList2
            })
            }
        });
      }
  render() {
    const {data} = this.props;
    console.log(data)
    console.log(this.state.fileList1)
    // let entryAttachUrl = data.entryAttachUrl;
    // if(!isEmpty(data.entryAttachUrl)){
    //     item.uid=index
    //     return item
    // }
    // let exitAttachUrl = data.exitAttachUrl;
    // if(!isEmpty(data.exitAttachUrl)){
    //     item.uid=index
    //     return item
    // }
    return (
      <div>
        <div className={styles.digbox}>
        <div>
            <h5>班组名称：</h5><span>{data.teamName}</span>
        </div>
        <div>
            <h5>班组编号：</h5><span>{data.jid}</span>
        </div>
        <div>
            <h5>企业统一社会信用代码：</h5><span>{data.corpCode}</span>
        </div>               
        <div>
            <h5>企业名称：</h5><span>{data.corpName}</span>
        </div>
        <div>
            <h5>班组长姓名：</h5><span>{data.teamLeaderName}</span>
        </div>
        <div>
            <h5>班组长联系电话：</h5><span>{data.teamLeaderPhone}</span>
        </div>
        <div>
            <h5>班组长证件类型：</h5><span>{data.teamLeaderIDCardType}</span>
        </div>
        <div>
            <h5>班组长证件号码：</h5><span>{data.teamLeaderIDNumber}</span>
        </div>
        <div>
            <h5>责任人姓名：</h5><span>{data.responsiblePersonName}</span>
        </div>
        <div>
            <h5>责任人联系电话：</h5><span>{data.responsiblePersonPhone}</span>
        </div>
        <div>
            <h5>责任人证件类型：</h5><span>{data.responsiblePersonIDCardType}</span>
        </div>
        <div>
            <h5>责任人证件号码：</h5><span>{data.responsiblePersonIDNumber}</span>
        </div>
        <div>
            <h5>进场日期：</h5><span>{data.entryTime}</span>
        </div>
        <div>
            <h5>退场日期：</h5><span>{data.exitTime}</span>
        </div>
        <div>
            <h5>进场附件：</h5><span>
             {
                 this.state.fileList1.map((item,index)=>{
                   return <a  href={item.url} key={index}>{item.name}<span>&nbsp;&nbsp;&nbsp;</span></a>
                 })
             }
            </span>
        </div>
        <div>
            <h5>退场附件：</h5><span>
            {
                 this.state.fileList2.map((item,index)=>{
                    return <a  href={item.url} key={index}>{item.name}<span>&nbsp;&nbsp;&nbsp;</span></a>
                 })
             }
            </span>
        </div>
        <div>
            <h5>备注：</h5><span>{data.remark}</span>
        </div>
      </div>
    </div>
    )
  }
}
