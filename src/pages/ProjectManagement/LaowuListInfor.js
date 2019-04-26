import React, { Component, Suspense } from 'react';
import {Card,Button,Tabs,Row,Col,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';

export default class LaowuListInfor extends React.Component {
  state ={

  }

  handleBack = ()=>{
    window.history.back(-1);
}
  render() {
    
 

    return (          
        <div className={styles.content}>
                <div className={styles.headerbox}>
                    <h3 >宁大花园南侧xxxxxxx土建工程</h3>
                    {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                </div>     
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        劳务编码：<span></span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        劳务包状态：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        所属项目：<span></span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        发包单位：<span></span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        发包单位联系人姓名：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        联系人联系方式：<span></span>
                    </Col>                      
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        劳务公司：<span><span className={styles.span}></span>/</span>
                    </Col>  
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        劳务公司联系人姓名：<span></span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        联系人联系方式：<span></span>
                    </Col>                         
                </Row>       
        </div>
    );
  }
}
