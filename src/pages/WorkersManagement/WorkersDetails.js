import React, { Component, Suspense } from 'react';
import {Card,Button,Tabs,Row,Col,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import KaoQinListFilter from './KaoQinListFilter';
import ComplaintFilter from './ComplaintFilter';
import TrainFilter from './TrainFilter';
import GongZiFilter from './GongZiFilter';
import WorkersInfor from './WorkersInfor';
import logo from '@/assets/img.png';
import router from 'umi/router';
import { connect } from 'dva';
const TabPane = Tabs.TabPane;

@connect(({ worker, loading }) => ({
worker,
loading: loading.effects['worker/fetchWorkerList'],
fetchWorkerDetailLoading:loading.effects['worker/fetchWorkerDetail'],
}))
export default class ProjectDetails extends React.Component {
  state = {
    filterVal:{}
  }
  componentDidMount(){
    this.requestList(1,{});
  }
  requestList=(current)=>{
    if(current==null){
      current=1
    }
    const { dispatch } = this.props;
    const workerJid = this.props.location.query.workerJid;
    dispatch({
      type:`worker/fetchWorkerDetail`,
      payload:workerJid
    })
  }
  handleOnTab=(val)=>{
    const { dispatch,worker} = this.props;
    if(val==2){
      this.requestIntelligence(1);
    }
    if(val==3){
      this.requestRegister(1);
    }
    if(val==4){
      this.requestRegisterChange(1);
    }
    if(val==5){
      this.requestRegisterProfession(1);
    }
    if(val==6){
      this.requestKaoQin(1);
    }
    if(val==7){    
      this.requestGongZi(1);
    }
    if(val==9){
      this.requestPeiXun(1);
    }
    worker.tabNum=val;
  }
  // 考勤列表
  requestKaoQin=(current=1,values={})=>{
    // if(current==null){
    //   current=1
    // }
    const { dispatch } = this.props;
    const workerJid = this.props.location.query.workerJid;
    values.current = current;
    values.size = 10;
    values.workerJid = workerJid
    dispatch({
      type: 'worker/fetchKaoQin',
      payload: values
    });
  }
  //工资列表
  requestGongZi=(current=1,values={})=>{
    // if(current==null){
    //   current=1
    // }
    console.log(values);
    const { dispatch } = this.props;
    const workerJid = this.props.location.query.workerJid;
    values.current =current;
    values.size = 10;
    values.workerJid = workerJid;
    console.log(values)
    // dispatch({
    //   type: 'worker/fetchGongZi',
    //   payload:values 
    // });
  }
  // 培训记录列表
  requestPeiXun=(current=1,values={})=>{
    // if(current==null){
    //   current=1
    // }
    const { dispatch } = this.props;
    const workerJid = this.props.location.query.workerJid;
    values.current = current;
    values.size = 10;
    values.workerJid = workerJid;
    dispatch({
      type: 'worker/fetchPeiXun',
      payload:values
    });
  }
  // 培训记录详情跳转
  handleTrain=(record)=>{
    router.push(`/gongren/workersdetails/workerstrain?jid=${record.jid}`);
  }
  //资质列表
  requestIntelligence=(current)=>{
    if(current==null){
      current=1
    }
    const { dispatch } = this.props;
    const workerJid = this.props.location.query.workerJid;
    dispatch({
      type: 'worker/fetchIntelligence',
      payload:{
        workerJid:workerJid, 
        current:current,
        size:10
      }
    });
  }
  //资质列表详情跳转
  handleIntelligence=(record)=>{
    router.push(`/gongren/workersdetails/workersaptitude?jid=${record.jid}`);
  }
  //注册列表
  requestRegister=(current)=>{
    if(current==null){
      current=1
    }
    const { dispatch } = this.props;
    const workerJid = this.props.location.query.workerJid;
    dispatch({
      type: 'worker/fetchRegister',
      payload:{
        workerJid:workerJid, 
        current:current,
        size:10
      }
    });
  }
  // 注册列表详情跳转
  handleRegister=(record)=>{
    router.push(`/gongren/workersdetails/workersregister?jid=${record.jid}`);
  }
  // 注册变更记录列表
  requestRegisterChange=(current)=>{
    if(current==null){
      current=1
    }
    const { dispatch } = this.props;
    const workerJid = this.props.location.query.workerJid;
    dispatch({
      type: 'worker/fetchRegisterChange',
      payload:{
        workerJid:workerJid, 
        current:current,
        size:10
      }
    });
  }
  // 注册专业列表
  requestRegisterProfession=(current)=>{
    if(current==null){
      current=1
    }
    const { dispatch } = this.props;
    const workerJid = this.props.location.query.workerJid;
    dispatch({
      type: 'worker/fetchRegisterProfession',
      payload:{
        workerJid:workerJid, 
        current:current,
        size:10
      }
    });
  }
  render() {   
    // 资质信息
    const columns1 = [{
      title: '证书种类',
      dataIndex: 'certificationCategoriesTypeStr',
      key: 'certificationCategoriesTypeStr',
      width:'10%'
    }, {
      title: '证书类型名称',
      dataIndex: 'certificationTypeName',
      key: 'certificationTypeName',
      width:'10%'
    }, {
      title: '证书名称',
      dataIndex: 'certificationName',
      key: 'certificationName',
      width:'15%'
    },{
      title: '证书有效时间（起）',
      dataIndex: 'validBeginDate',
      key: 'validBeginDate',
      width:'15%'
    },{
      title: '证书有效时间（止）',
      dataIndex: 'validEndDate',
      key: 'validEndDate',
      width:'15%'
    },{
      title: '发证机关',
      dataIndex: 'grantOrg',
      key: 'grantOrg',
      width:'15%'
    },{
      title: '资质证书状态',
      dataIndex: 'certificationStatus',
      key: 'certificationStatus',
      width:'10%'
    },{
      title: '操作',
      key: 'action',
      width:'10%',
      render:(record,text)=>(
        <span>
           <a href="javascript:;" onClick={()=> this.handleIntelligence(record)}>查看详情</a>
        </span>
      )
    }];
    // 注册信息
    const columns2 = [{
      title: '注册类型及等级',
      dataIndex: 'registerType',
      key: 'registerType',
      width:'15%'
    }, {
      title: '注册有效期',
      dataIndex: 'effectDate',
      key: 'effectDate',
      width:'15%'
    }, {
      title: '发证单位',
      dataIndex: 'awardDepart',
      key: 'awardDepart',
      width:'15%'
    },{
      title: '发证日期',
      dataIndex: 'awardDate',
      key: 'awardDate',
      width:'15%'
    },{
      title: '所在企业名称',
      dataIndex: 'corpName',
      key: 'corpName',
      width:'20%'
    },{
      title: '执业资格状态',
      dataIndex: 'qState',
      key: 'qState',
      width:'15%'
    },{
      title: '操作',
      // dataIndex: '',
      key: 'action',
      width:'15%',
      render:(record,text)=>(
          <span>
             <a href="javascript:;" onClick={()=> this.handleRegister(record)}>查看详情</a>
          </span>
      )
    }];
    // 变更记录
    const columns3 = [{
      title: '变更时间',
      dataIndex: 'changeDate',
      key: 'changeDate',
      width:'12%'
    }, {
      title: '原所在企业统一社信用代码',
      dataIndex: 'oldCorpCode',
      key: 'oldCorpCode',
      width:'12%'
    }, {
      title: '原所在企业名称',
      dataIndex: 'oldCorpName',
      key: 'oldCorpName',
      width:'20%'
    },{
      title: '原执业印章号',
      dataIndex: 'oldStampNum',
      key: 'oldStampNum',
      width:'12%'
    },{
      title: '现所在企业统一社会信用代码',
      dataIndex: 'corpCode',
      key: 'corpCode',
      width:'20%'
    },{
      title: '现所在企业名称',
      dataIndex: 'corpName',
      key: 'corpName',
      width:'12%'
    },{
      title: '现执业印章号',
      dataIndex: '',
      key: '',
      width:'12%'
    }];
    // 注册专业
    const columns4 = [{
      title: '注册专业编号',
      dataIndex: 'professionId',
      key: 'professionId',
    }, {
      title: '注册类型及等级',
      dataIndex: 'registerType',
      key: 'registerType',
    }, {
      title: '专业名称',
      dataIndex: 'professionName',
      key: 'professionName',
    },{
      title: '开始时间',
      dataIndex: 'beginDate',
      key: 'beginDate',
    },{
      title: '截止时间',
      dataIndex: 'endDate',
      key: 'endDate',
    }];
    // 考勤记录
    const columns5 = [{
      title: '考勤日期',
      dataIndex: 'attendanceDate',
      key: 'attendanceDate',
      width:'12%'
    }, {
      title: '考勤项目',
      dataIndex: 'prjName',
      key: 'prjName',
      width:'12%'
    }, {
      title: '考勤时段',
      dataIndex: 'workTimeStart',
      key: 'workTimeStart',
      width:'12%',
      render: (text, record) => (
        <span>
        {record.workTimeStart+'-'+record.workTimeEnd}
        </span>
      ),
    },{
      title: '签入签出',
      dataIndex: 'attendanceRecords',
      key: 'attendanceRecords',
      width:'12%'
    },{
      title: '记功（工）',
      dataIndex: 'workDay',
      key: 'workDay',
      width:'10%'
    },{
      title: '考勤（工）',
      dataIndex: 'attendanceWorkDay',
      key: 'attendanceWorkDay',
      width:'10%'
    },{
      title: '加班（工）',
      dataIndex: 'overWorkDay',
      key: 'overWorkDay',
      width:'10%'
    },{
      title: '补工（工）',
      dataIndex: 'supplementWorkDay',
      key: 'supplementWorkDay',
      width:'10%'
    },{
      title: '轨迹异常（次）',
      dataIndex: 'locationExceptionTimes',
      key: 'locationExceptionTimes',
      width:'12%'
    }];
    // 工资发放记录
    const columns6 = [{
      title: '工资月份',
      dataIndex: 'payMonth',
      key: 'payMonth',
      width:'11%'
    }, {
      title: '发放日期',
      dataIndex: 'balanceDate',
      key: 'balanceDate',
      width:'11%'
    }, {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width:'15%'
    },{
      title: '发包单位',
      dataIndex: 'proprietorCorpName',
      key: 'proprietorCorpName',
      width:'15%'
    },{
      title: '劳务公司',
      dataIndex: 'labourCorpName',
      key: 'labourCorpName',
      width:'15%'
    },{
      title: '工数',
      dataIndex: 'workHours',
      key: 'workHours',
      width:'11%'
    },{
      title: '状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
      width:'11%',
      render (statusStr){
        return statusStr==0?'全部':(statusStr==1)?'待结算':(statusStr==2)?'逾期未发':(statusStr==3)?'已发（有扣减）':(statusStr==4)?'待发':'足额已发';
      }
    },{
      title: '备注',
      dataIndex: 'note',
      key: 'note',
      width:'11%'
    }];
    //投诉记录
    const columns7 = [{
      title: '投诉编号',
      dataIndex: '',
      key: '',
      width:'12%'
    }, {
      title: '项目名称',
      dataIndex: '',
      key: '',
      width:'20%'
    }, {
      title: '投诉类型',
      dataIndex: '',
      key: '',
      width:'12%'
    },{
      title: '投诉发起时间',
      dataIndex: '',
      key: '',
      width:'12%'
    },{
      title: '投诉内容',
      dataIndex: '',
      key: '',
      width:'20%'
    },{
      title: '处理状态',
      dataIndex: '',
      key: '',
      width:'12%'
    },{
      title: '操作',
      dataIndex: '',
      key: '',
      width:'12%',
      render:()=>{
        <span>
          <a href="javascript:;">查看详情</a>
        </span>
      }     
    }];
    // 培训记录
    const columns8 = [{
      title: '培训日期',
      dataIndex: 'trainingDate',
      key: 'trainingDate',
    },{
      title: '培训时长',
      dataIndex: 'trainingDuration',
      key: 'trainingDuration',
    },{
      title: '课程名称',
      dataIndex: 'trainingName',
      key: 'trainingName',
    },{
      title: '培训类型',
      dataIndex: 'trainingTypeCodeStr',
      key: 'trainingTypeCodeStr',
    },{
      title: '培训人',
      dataIndex: 'trainer',
      key: 'trainer',
    },{
      title: '培训机构',
      dataIndex: 'trainingOrg',
      key: 'trainingOrg',
    },{
      title: '操作',
      key: 'action',
      render:(text, record)=>(
        <span>
          <a href="javascript:;" onClick={()=> this.handleTrain(record)}>查看详情</a>
        </span>
      )
    }
    ];
    const { worker,loading,fetchWorkerDetailLoading} = this.props;
    console.log(worker)
    const genderStr = worker.workerDetail.genderStr;
    const certificateStatusStr = worker.workerDetail.certificateStatusStr;
    const idCardTypeStr = worker.workerDetail.idCardTypeStr || '--'
    const idCardNumber = worker.workerDetail.idCardNumber || '--'
    let ftpIp =""
    if(process.env.API_ENV=='test'){
      ftpIp = 'http://47.97.45.6:8006/';
      }else if(process.env.API_ENV=='prod'){
      ftpIp = 'http://91diyancha.com:8006/';
      }else{
      ftpIp = 'http://47.97.45.6:8006/';
    }
    const img = ftpIp+worker.workerDetail.headImageUrl;
    console.log(img)
    return (          
        <div className={styles.content}>
             <PageHeaderWrapper >
                <Card loading={fetchWorkerDetailLoading}>     
                    <span><img alt="logo" className={styles.img} src={worker.workerDetail.headImageUrl==''||undefined?logo:img} /></span>   
                    <span className={styles.span}>{worker.workerDetail.name}</span>
                    <span className={styles.span}>
                      {
                        certificateStatusStr==0?<span className={styles.spanBtn1}>未实名认证</span>:<span className={styles.spanBtn2}>已实名认证</span>
                      }
                      
                    </span>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            工人性别：<span>{genderStr}</span>
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            证件类型：<span>{idCardTypeStr}</span>  
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            证件号码：<span>{idCardNumber}</span>  
                        </Col>                        
                    </Row>                  
                </Card>         
                <div className={styles.tab}> 
                    <Tabs onTabClick={this.handleOnTab} defaultActiveKey={worker.tabNum} >
                        <TabPane tab="实名信息" key="1">
                            <WorkersInfor loading={fetchWorkerDetailLoading}/>                          
                        </TabPane>
                        {/* <TabPane tab="资质信息"  key="2">
                            <Table  
                              dataSource={worker.intelligenceList.result}
                              style={{ marginBottom: 24 }}
                              pagination={{
                                current:worker.intelligenceList.current,
                                pageSize:worker.intelligenceList.size,
                                total: parseInt(worker.intelligenceList.total),
                                showTotal:()=>{
                                    return `共${worker.intelligenceList.total}条`
                                },
                                showQuickJumper:true,
                                onChange:(current)=>{
                                  this.setState({
                                    current:current
                                  })
                                  this.requestIntelligence(current);
                                },
                              }}
                              loading={loading}
                              rowKey="jid"
                              columns={columns1}
                             />
                        </TabPane> */}
                        
                        {/* <TabPane tab="注册信息"  key="3">
                            <Table  
                              dataSource={worker.register.result}
                              style={{ marginBottom: 24 }}
                              pagination={{
                                current:worker.register.current,
                                pageSize:worker.register.size,
                                total: parseInt(worker.register.total),
                                showTotal:()=>{
                                    return `共${worker.register.total}条`
                                },
                                showQuickJumper:true,
                                onChange:(current)=>{
                                  this.setState({
                                    current:current
                                  })
                                  this.requestRegister(current);
                                },
                              }}
                              loading={loading}
                              rowKey="jid"
                              columns={columns2} 
                            />
                        </TabPane> */}
                        {/* <TabPane tab="变更记录"  key="4">                       
                            <Table  
                              dataSource={worker.registerChange.result}
                              style={{ marginBottom: 24 }}
                              pagination={{
                                current:worker.registerChange.current,
                                pageSize:worker.registerChange.size,
                                total: parseInt(worker.registerChange.total),
                                showTotal:()=>{
                                    return `共${worker.registerChange.total}条`
                                },
                                showQuickJumper:true,
                                onChange:(current)=>{
                                  this.setState({
                                    current:current
                                  })
                                  this.requestRegisterChange(current);
                                },
                              }}
                              loading={loading}
                              rowKey="workerJid"
                              columns={columns3} 
                            />
                        </TabPane> */}
                        {/* <TabPane tab="注册专业"  key="5">
                            <Table  
                              dataSource={worker.registerProfession.result}
                              style={{ marginBottom: 24 }}
                              pagination={{
                                current:worker.registerProfession.current,
                                pageSize:worker.registerProfession.size,
                                total: parseInt(worker.registerProfession.total),
                                showTotal:()=>{
                                    return `共${worker.registerProfession.total}条`
                                },
                                showQuickJumper:true,
                                onChange:(current)=>{
                                  this.setState({
                                    current:current
                                  })
                                  this.requestRegisterProfession(current);
                                },
                              }}
                              loading={loading}
                              rowKey="workerJid"
                              columns={columns4} 
                            />
                        </TabPane> */}
                        {/* <TabPane tab="考勤记录" key="6">
                            <KaoQinListFilter _this={this}/>                           
                            <Table
                              dataSource={worker.kaoqinList.result}
                              style={{ marginBottom: 24 }}
                              pagination={{
                                current:worker.kaoqinList.current,
                                pageSize:worker.kaoqinList.size,
                                total: parseInt(worker.kaoqinList.total),
                                showTotal:()=>{
                                    return `共${worker.kaoqinList.total}条`
                                },
                                showQuickJumper:true,
                                onChange:(current)=>{
                                  this.setState({
                                    current:current
                                  })
                                  this.requestKaoQin(current);
                                },
                              }}
                              loading={loading}
                              rowKey="workDay"
                              columns={columns5} 
                            />
                        </TabPane> */}
                        {/* <TabPane tab="工资发放记录" key="7">
                            <GongZiFilter _this={this}/>                          
                            <Table
                              dataSource={worker.gongziList.result}
                              style={{ marginBottom: 24 }}
                              pagination={{
                                current:worker.gongziList.current,
                                pageSize:worker.gongziList.size,
                                total: parseInt(worker.gongziList.total),
                                showTotal:()=>{
                                    return `共${worker.gongziList.total}条`
                                },
                                showQuickJumper:true,
                                onChange:(current)=>{
                                  this.setState({
                                    current:current
                                  })
                                  this.requestGongZi(current);
                                },
                              }}
                              loading={loading}
                              rowKey="status"
                              columns={columns6} 
                            />
                        </TabPane> */}
                        {/* <TabPane tab="投诉记录"  key="8">
                            <ComplaintFilter _this={this}/>   
                            <Link to="/gongren/workersdetails/workerscomplaint" >
                                    详情
                            </Link>  
                            <Table  columns={columns7} />
                        </TabPane> */}
                        {/* <TabPane tab="培训记录" key="9">
                            <TrainFilter _this={this}/>                              
                            <Table
                              dataSource={worker.peixunList.result}
                              style={{ marginBottom: 24 }}
                              pagination={{
                                current:worker.peixunList.current,
                                pageSize:worker.peixunList.size,
                                total: parseInt(worker.peixunList.total),
                                showTotal:()=>{
                                    return `共${worker.peixunList.total}条`
                                },
                                showQuickJumper:true,
                                onChange:(current)=>{
                                  this.setState({
                                    current:current
                                  })
                                  this.requestPeiXun(current);
                                },
                              }}
                              loading={loading}
                              rowKey="jid"
                              columns={columns8} 
                            />
                        </TabPane> */}
                    </Tabs>
                </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
