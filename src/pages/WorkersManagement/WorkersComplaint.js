import React, { Component, Suspense } from 'react';
import {Card,Button,Divider,Tag,Table,Row,Col,Timeline} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
export default class WorkersComplaint extends React.Component {
  
  state ={

  }
  // 返回上一页
  handleBack = ()=>{
    window.history.back(-1);
  }
  render() {
   

    return (          
        <div className={styles.content}>
            <PageHeaderWrapper >
                <div>
                  <div className={styles.headerbox}>
                      <h3 >宁大花园南侧xxxxxxx土建工程</h3>
                      {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                  </div>     
                  <Row gutter={24} className={styles.row}>                      
                      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                          投诉编号：<span></span>
                      </Col>     
                      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                          投诉人：<span></span>
                      </Col>
                      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                          投诉类型：<span></span>
                      </Col>                      
                  </Row>
                  <Row gutter={24} className={styles.row}>                      
                      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                          投诉发起时间：<span></span>
                      </Col>     
                      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                          投诉内容：<span></span>
                      </Col>
                      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                          处理状态：<span></span>
                      </Col>                      
                  </Row>
                  <Row gutter={24} className={styles.row}>
                      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                          所属项目：<span><span className={styles.span}></span>/</span>
                      </Col>  
                      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                          所属劳务包：<span></span>
                      </Col> 
                      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                          劳务公司：<span></span>
                      </Col>                         
                  </Row>
              </div>                         
              <div className={styles.complaint}> 
                <Timeline>
                  <Timeline.Item color='red'>
                    <p>工人第一次投诉 2018/09/02</p>
                    <p>投诉内容</p>
                  </Timeline.Item>
                  <Timeline.Item color='green'>
                    <p>劳务公司处理 2018/09/02</p>
                    <p>投诉内容</p>
                  </Timeline.Item>
                </Timeline>               
              </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
