import React, { Component, Suspense } from 'react';
import {Button,Tabs,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';

export default class CreateUnitListWage extends React.Component {
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
                        工资单编码：<span></span>
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
                        出勤天数：<span></span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        总工时：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工人工资卡号：<span></span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工人工资卡银行代码：<span></span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工人工资卡开户行名称：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工资代发银行卡号：<span></span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工资代发银行代码：<span></span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工资代发开户行名称：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        应发金额（元）：<span></span>
                    </Col>                         
                </Row>  
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        实发金额（元）：<span></span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        是否是补发：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        发放日期：<span></span>
                    </Col>                       
                </Row>  
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工资单编号：<span></span>
                    </Col>                       
                </Row>             
             </PageHeaderWrapper>
                 
        </div>
    );
  }
}
