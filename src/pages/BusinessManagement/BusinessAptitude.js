import React, { Component, Suspense } from 'react';
import {Button,Tabs,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import { connect } from 'dva';
@connect(({ business}) => ({
  business,
}))

export default class BusinessAptitude extends React.Component {
    state ={

    }
    componentDidMount(){
        this.fetchBusinessZiZhiDetails();
    }
    // 企业资质详情
    fetchBusinessZiZhiDetails=()=>{
        const { dispatch } = this.props;
        const jid = this.props.location.query.jid;
        dispatch({
            type: 'business/fetchBusinessZiZhiDetails',
            payload: {
            jid:jid,
            },
        });
    }
    // 返回上一页
    handleBack = ()=>{
    window.history.back(-1);
    }

  render() {
    
    const {business} = this.props;
    console.log(business);   
    return (          
        <div className={styles.content}>
             <PageHeaderWrapper >    
                <div className={styles.headerbox}>
                    <h3>{business.businessZiZhiDetails.corpName}</h3>
                    {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                </div>  
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        统一社会信用代码：<span>{business.businessZiZhiDetails.corpCode}</span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        资质资格类型：<span>{business.businessZiZhiDetails.certTypeNumStr}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证书编号：<span>{business.businessZiZhiDetails.certId}</span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        专业类别：<span>{business.businessZiZhiDetails.tradeBoundNumStr}</span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        专业子项：<span>{business.businessZiZhiDetails.tradeTypeBoundChildMark}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        资质资格等级：<span>{business.businessZiZhiDetails.titleLevelNumStr}</span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        资质资格取得方式：<span>{business.businessZiZhiDetails.addTypeNumStr}</span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        首次批准资质资格文号：<span>{business.businessZiZhiDetails.noteNumber}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        首次批准资质资格日期：<span>{business.businessZiZhiDetails.noteDate}</span>
                    </Col>                         
                </Row>  
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        资质资格状态变更原因：<span>{business.businessZiZhiDetails.certTradeModifyMark}</span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        资质资格状态：<span>{business.businessZiZhiDetails.certTradeStatusNumStr}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        资质资格状态变更时间：<span>{business.businessZiZhiDetails.certTradeModifyDate}</span>
                    </Col>                         
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        资质资格限定内容：<span>{business.businessZiZhiDetails.limitContent}</span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        批准资质资格内容：<span>{business.businessZiZhiDetails.mark}</span>
                    </Col>                      
                </Row>               
             </PageHeaderWrapper>
                 
        </div>
    );
  }
}
