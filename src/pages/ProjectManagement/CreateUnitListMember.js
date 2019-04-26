import React, { Component, Suspense } from 'react';
import {Button,Tabs,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';


export default class CreateUnitListMember extends React.Component {
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
                        企业统一社会信用代码：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        企业名称：<span></span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        班组编号：<span></span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        班组名称：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        是否是班组长：<span></span>
                    </Col>                         
                </Row>  
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        进场时间：<span></span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        退场时间：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        制卡时间：<span></span>
                    </Col>                         
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工人类型：<span></span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        进场确认附件：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        退场确认附件：<span></span>
                    </Col>                         
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        制卡采集照片：<span></span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        考勤卡号：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        发放工资银行卡号：<span></span>
                    </Col>                         
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工资卡银行联号：<span></span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        发放工资银行名称：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        发放工资总行名称：<span></span>
                    </Col>                         
                </Row> 
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        有无购买工伤或意外伤害保险：<span></span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        工资卡银行代码：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        是否有劳动合同：<span></span>
                    </Col>                         
                </Row>  
             </PageHeaderWrapper>
                 
        </div>
    );
  }
}
