import React, { Component } from 'react'
import styles from './Common.less'
import {Row,Col,Button,Table,Divider} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
export default class GoodStaffDetails extends Component {
    handleBack = ()=>{
        window.history.back(-1);
    }
    render() {
        return (
            <PageHeaderWrapper >
                {/* 基本信息 */}
                <div className={styles.content}>
                    <div className={styles.headerbox}>
                        <h3>人员良好行为详情</h3>
                        {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                    </div> 
                    <Divider />
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <h3>张凯伦</h3>
                        </Col>                     
                    </Row>    
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            证件类型：<span></span>
                        </Col>     
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            证件号码：<span></span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            所在企业名称：<span></span>
                        </Col>                      
                    </Row>
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        所在企业统一社会信用代码：<span></span>
                        </Col>     
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            登记部门：<span></span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            登记人姓名：<span></span>
                        </Col>                      
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            登记日期：<span></span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            良好行为发生日期：<span></span>
                        </Col> 
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            良好行为发生地行政区划：<span></span>
                        </Col>                          
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            良好行为描述：<span></span>
                        </Col>                        
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            项目编码：<span></span>
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            奖励部门：<span></span>
                        </Col> 
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            奖励部门级别：<span></span>
                        </Col>                         
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            奖励决定文号：<span></span>
                        </Col>   
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            奖励日期：<span></span>
                        </Col>                        
                    </Row> 
                    <Row gutter={24} className={styles.row}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            奖励决定内容：<span></span>
                        </Col>
                    </Row>     
                </div>               
            </PageHeaderWrapper>
            
        )
    }
}
