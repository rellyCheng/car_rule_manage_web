import React, { Component, Suspense } from 'react';
import {Card,Row,Col,Button} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';

export default class CreateUnitListGroupInfor extends React.Component {
  state ={

  }
  handleBack = ()=>{
    window.history.back(-1);
}

  render() {
    

    return (          
        <div className={styles.content}>
            <div>
                <div className={styles.headerbox}>                     
                    <h3>木工组</h3>
                    {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                </div> 
                <Row gutter={24} className={styles.row}>                      
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        班组编号：<span></span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        责任人姓名：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        责任人联系电话：<span></span>
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
                        企业名称：<span></span>
                    </Col>                      
                </Row>
            </div>         
        </div>
    );
  }
}
