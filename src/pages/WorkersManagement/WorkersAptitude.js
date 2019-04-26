import React, { Component, Suspense } from 'react';
import {Button,Tabs,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import { connect } from 'dva';
@connect(({ worker}) => ({
    worker
}))

export default class WorkersAptitude extends React.Component {
  state ={

  }
  componentDidMount(){
    this.requestIntelligenceDetails(1);
  }
  requestIntelligenceDetails=()=>{
    const { dispatch } = this.props;
    const jid = this.props.location.query.jid;
    dispatch({
      type:`worker/fetchIntelligenceDetails`,
      payload: {
        jid:jid,
      },
    })
  }
  //返回上一步
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
                    <h3>资质详情</h3>
                    {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                </div>  
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工人姓名：<span>{worker.intelligenceDetails.name}</span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证件类型：<span>{worker.intelligenceDetails.idCardTypeStr}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证件号码：<span>{worker.intelligenceDetails.idCardNumber}</span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>                          
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书种类：<span>{worker.intelligenceDetails.certificationCategoriesTypeStr}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书类型：<span>{worker.intelligenceDetails.certificationTypeStr}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书类型名称：<span>{worker.intelligenceDetails.certificationTypeName}</span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书等级：<span>{worker.intelligenceDetails.credentialLevelType}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书等级名称：<span>{worker.intelligenceDetails.credentialLevelTypeName}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书名称：<span>{worker.intelligenceDetails.certificationName}</span>
                    </Col>                         
                </Row>  
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书编号：<span>{worker.intelligenceDetails.certificationCode}</span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        认定部门：<span>{worker.intelligenceDetails.confirmOrganization}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        岗位类型：<span>{worker.intelligenceDetails.jobTypeStr}</span>
                    </Col>                         
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        岗位名称：<span>{worker.intelligenceDetails.jobTitle}</span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        第一次发证时间：<span>{worker.intelligenceDetails.firstBeginDate}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书有效时间（起）：<span>{worker.intelligenceDetails.validBeginDate}</span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书有效时间（止）：<span>{worker.intelligenceDetails.validEndDate}</span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        发证机关：<span>{worker.intelligenceDetails.grantOrg}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工作单位：<span>{worker.intelligenceDetails.workCorpName}</span>
                    </Col>                      
                </Row> 
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        资质证书状态：<span>{worker.intelligenceDetails.certificationStatus}</span>
                    </Col>                      
                </Row>                   
             </PageHeaderWrapper>
                 
        </div>
    );
  }
}
