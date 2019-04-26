import React, { Component } from 'react'
import styles from './Common.less'
import {Row,Col,Button,Table,Divider} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
export default class BadnessCompanyDetails extends Component {
    handleBack = ()=>{
        window.history.back(-1);
    }
    render() {
        return (
            <PageHeaderWrapper >
                {/* 基本信息 */}
                <div className={styles.content}>
                    <div className={styles.headerbox}>
                        <h3>企业不良行为详情</h3>
                        {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                    </div> 
                    <Divider />
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <h3>中建八局第三建设有限公司</h3>
                        </Col>                     
                    </Row>    
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            统一社会信用代码：<span></span>
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
                            不良行为类别：<span></span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            不良行为代码：<span></span>
                        </Col>                      
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            不良行为发生时间：<span></span>
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            不良行为发生地行政区划：<span></span>
                        </Col> 
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            项目编码：<span></span>
                        </Col>                         
                    </Row> 
                    <Row gutter={24} className={styles.row}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            不良行为描述：<span></span>
                        </Col>                          
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            处罚部门：<span></span>
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            处罚部门级别：<span></span>
                        </Col> 
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            处罚决定文号：<span></span>
                        </Col>                         
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            处罚依据：<span></span>
                        </Col>                          
                    </Row>  
                    <Row gutter={24} className={styles.row}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            处罚内容：<span></span>
                        </Col>                          
                    </Row> 
                    <Row gutter={24} className={styles.row}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            处罚日期：<span></span>
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            处罚截止日期：<span></span>
                        </Col> 
                        {/* <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            处罚决定文号：<span></span>
                        </Col>                          */}
                    </Row>     
                </div>               
            </PageHeaderWrapper>
            
        )
    }
}
