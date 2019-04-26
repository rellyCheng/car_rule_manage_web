import React, { Component, Suspense } from 'react';
import {Button,Tabs,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';

export default class CreateUnitListContract extends React.Component {
  state ={

  }

  handleBack = ()=>{
    window.history.back(-1);
}
  render() {
    
 

    return (          
        <div className={styles.content}>
             <PageHeaderWrapper >    
                <div className={styles.headerbox}>
                    <h3>张伦</h3>
                    {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                </div>  
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工种：<span></span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证件类型：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        证件号码：<span></span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        项目编码：<span></span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        所属企业统一社会信用代码：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        所属企业名称：<span></span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        合同编号：<span></span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        合同期限类型：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        开始日期：<span></span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        结束日期：<span></span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        计量单位：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        计量单价：<span></span>
                    </Col>                         
                </Row>  
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        合同附件：<span></span>
                    </Col>  
                                          
                </Row>               
             </PageHeaderWrapper>
                 
        </div>
    );
  }
}
