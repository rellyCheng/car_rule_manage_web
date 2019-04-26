import React, { Component, Suspense } from 'react';
import {Card,Button,Tabs,Row,Col,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import BusinessInfor from './BusinessInfor';
import BusinessDetailsInfor from './BusinessDetailsInfor';
import { connect } from 'dva';
import router from 'umi/router';
const TabPane = Tabs.TabPane;
@connect(({ business,loading}) => ({
  business,
  fetchBusinessListDetailLoading:loading.effects['business/fetchBusinessListDetail'],
  requestZiZhiLoading: loading.effects['business/fetchBusinessZiZhi'],
  requestZhiYuanLoading: loading.effects['business/fetchBusinessZhiYuan'],
}))
export default class BusinessDetails extends React.Component {
  state ={

  }
  componentDidMount(){
    this.fetchBusinessListDetail();
  }
  // 企业信息描述
  fetchBusinessListDetail=()=>{
    const { dispatch } = this.props;
    const corpJid = this.props.location.query.corpJid;
    dispatch({
      type: 'business/fetchBusinessListDetail',
      payload: {
        corpJid:corpJid,
      },
    });
  }
  // 企业资质
  requestZiZhi=(current)=>{
    const { dispatch } = this.props;
    if(current==null){
      current==1
    }
    const corpJid = this.props.location.query.corpJid;
    dispatch({
      type: 'business/fetchBusinessZiZhi',
      payload: {
        corpJid:corpJid,
        current:current,
        size:10
      },
    });
  }
  // 企业职员
  requestZhiYuan=(current)=>{
    const { dispatch } = this.props;
    if(current==null){
      current==1
    }
    const corpJid = this.props.location.query.corpJid;
    dispatch({
      type: 'business/fetchBusinessZhiYuan',
      payload: {
        corpJid:corpJid,
        current:current,
        size:10
      },
    });
  }
  handleOnTab = (val)=>{
    console.log(val);
    const { dispatch,business } = this.props;
    if(val==3){ 
      this.requestZiZhi(1);      
    }
    if(val==4){
      this.requestZhiYuan(1);
    }
    business.tabNum=val;
  }
  // 查看资质详情
  handleZiZhiDetail =(record)=>{
    router.push(`/business/businessdetails/businessaptitude?jid=${record.jid}`);
  }
  // 查看职员详情
  handleZhiYuanDetail =()=>{

  }

  render() {
    //参建企业
    const columns1 = [{
      title: '项目名称',
      key: '',
      dataIndex: '',
      width:'12%'
    }, {
      title: '开工日期',
      dataIndex: '',
      key: '',
      width:'10%'
    }, {
      title: '项目地址',
      dataIndex: '',
      key: '',
      width:'12%'
    },{
      title: '劳务包',
      dataIndex: '',
      key: '',
      width:'10%'
    },{
      title: '在岗工人',
      dataIndex: '',
      key: '',
      width:'10%'
    },{
      title: '业主单位',
      dataIndex: '',
      key: '',
      width:'12%'
    },
    {
      title: '施工单位',
      dataIndex: '',
      key: '',
      width:'12%'
    },
    {
        title: '项目状态',
        dataIndex: '',
        key: '',
        width:'10%'
    },
    {
      title: '操作',
      key: 'action',
      width:'10%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleLaoWuDetail(record)}>查看详情</a>
        </span>
      ),
    }];
    // 企业资质
    const columns2 = [{
      title: '资质资格类型',
      dataIndex: 'certTypeNumStr',
      key: 'certTypeNumStr',
      width:'12%'
    }, {
      title: '专业类别',
      dataIndex: 'tradeBoundNumStr',
      key: 'tradeBoundNumStr',
      width:'14%'
    }, {
      title: '资质资格等级',
      dataIndex: 'titleLevelNumStr',
      key: 'titleLevelNumStr',
      width:'12%'
    },{
      title: '批准资质资格内容',
      dataIndex: 'mark',
      key: 'mark',
      width:'14%'
    },{
      title: '首次批准资质资格日期',
      dataIndex: 'noteDate',
      key: 'noteDate',
      width:'12%'
    },{
      title: '资质资格取得方式',
      dataIndex: 'addTypeNumStr',
      key: 'addTypeNumStr',
      width:'12%'
    },
    {
        title: '资质资格状态',
        dataIndex: 'certTradeStatusNumStr',
        key: 'certTradeStatusNumStr',
        width:'12%'
    },
    {
      title: '操作',
      key: 'action',
      width:'12%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleZiZhiDetail(record)}>查看详情</a>
        </span>
      ),
  }];
    //企业职员
    const columns3 = [{
      title: '员工姓名',
      dataIndex: 'workerName',
      key: 'workerName',
      width:'16%'
    },
    {
      title: '证件类型',
      dataIndex: 'idCardTypeStr',
      key: 'idCardTypeStr',
      width:'16%'
    },
    {
      title: '证件号码',
      dataIndex: 'idCardNumber',
      key: 'idCardNumber',
      width: '20%',
    },
    {
      title: '岗位类型',
      dataIndex: 'jobTypeStr',
      key: 'jobTypeStr',
      width: '16%',
    },
    {
      title: '状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
      width: '16%',
    },
    {
      title: '操作',
      key: 'action',
      width: '16%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleZhiYuanDetail(record)}>查看详情</a>
        </span>
      ),
    }];
    const { business,loading,requestZiZhiLoading, requestZhiYuanLoading,fetchBusinessListDetailLoading} = this.props;
    console.log(business);  
    const corpJid = this.props.location.query.corpJid;
    return (          
        <div className={styles.content}>
            <PageHeaderWrapper >
                <BusinessDetailsInfor corpJid={corpJid} loading={fetchBusinessListDetailLoading}/> 
                <div className={styles.tab}> 
                    <Tabs onTabClick={this.handleOnTab} defaultActiveKey={business.tabNum} >
                        <TabPane tab="企业信息" key="1">
                            <BusinessInfor loading={fetchBusinessListDetailLoading}/>                          
                        </TabPane>
                        <TabPane tab={<span>参建项目()</span>} key="2">
                          <Table columns={columns1} />
                        </TabPane>
                        <TabPane tab={<span>企业资质({business.businessZiZhi.total})</span>} key="3">
                          <Table                                                     
                            dataSource = {business.businessZiZhi.result}
                            style={{marginBottom:24}}
                            Pagination ={{
                              current:business.businessZiZhi.current,
                              pageSize:business.businessZiZhi.size,
                              total: parseInt(business.businessZiZhi.total),
                              showTotal:()=>{
                                return `共${business.businessZiZhi.total}条`
                              },
                              showQuickJumper:true,
                              onChange:(current)=>{
                                this.setState({
                                  current:current
                                })
                                this.requestZiZhi(current);
                              },
                            }}
                            loading={requestZiZhiLoading}
                            rowKey ='jid'
                            columns={columns2} 
                          />

                        </TabPane>
                        <TabPane tab={<span>企业职员({business.businessZhiYuan.total})</span>} key="4">
                           
                          <Table 
                            dataSource = {business.businessZhiYuan.result}
                            style={{marginBottom:24}}
                            Pagination ={{
                              current:business.businessZhiYuan.current,
                              pageSize:business.businessZhiYuan.size,
                              total: parseInt(business.businessZhiYuan.total),
                              showTotal:()=>{
                                return `共${business.businessZhiYuan.total}条`
                              },
                              showQuickJumper:true,
                              onChange:(current)=>{
                                this.setState({
                                  current:current
                                })
                                this.businessZhiYuan(current);
                              },
                            }}
                            loading={requestZhiYuanLoading}
                            rowKey ='corpJid'
                            columns={columns3} />
                        </TabPane>
                    </Tabs>
                </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
