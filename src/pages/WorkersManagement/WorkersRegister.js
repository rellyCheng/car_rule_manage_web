import React, { Component, Suspense } from 'react';
import {Button,Tabs,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import { connect } from 'dva';
@connect(({ worker}) => ({
    worker
}))

export default class BusinessAptitude extends React.Component {
  state ={

  }
  componentDidMount(){
    this.requestRegisterDetails(1);
  }
  requestRegisterDetails=()=>{
    const { dispatch } = this.props;
    const jid = this.props.location.query.jid;
    dispatch({
      type:`worker/fetchRegisterDetails`,
      payload: {
        jid:jid,
      },
    })
  }
  //返回上一页
  handleBack = ()=>{
    window.history.back(-1);
  }
  render() {
    const {worker} = this.props;
    console.log(worker);
    return (          
        <div className={styles.content}>
             <PageHeaderWrapper >    
                <div className={styles.headerbox}>
                    <h3>注册详情</h3>
                    {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                </div>  
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工人姓名：<span>{worker.registerDetails.personName}</span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证件类型：<span>{worker.registerDetails.idCardTypeStr}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书号码：<span>{worker.registerDetails.idCardNumber}</span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>                          
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                       发证单位：<span>{worker.registerDetails.awardDepart}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        发证日期：<span>{worker.registerDetails.awardDate}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        执业印章号：<span>{worker.registerDetails.stampNum}</span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        所在企业行业类型：<span>{worker.registerDetails.callingTypeStr}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        所在企业组织机构代码：<span>{worker.registerDetails.corpCode}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        所在企业名称：<span>{worker.registerDetails.corpName}</span>
                    </Col>                         
                </Row>  
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        所在企业证书编号：<span>{worker.registerDetails.corpCertId}</span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        学历：<span>{worker.registerDetails.eduLevelStr}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        学位：<span>{worker.registerDetails.degreeStr}</span>
                    </Col>                         
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        注册专业1：<span>{worker.registerDetails.regspec1}</span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        注册专业2：<span>{worker.registerDetails.regspec2}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        执业资格状态：<span>{worker.registerDetails.qState}</span>
                    </Col>                      
                </Row>                   
             </PageHeaderWrapper>
                 
        </div>
    );
  }
}
