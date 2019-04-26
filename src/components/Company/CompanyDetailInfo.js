import React, { Component } from 'react';
import styles from './Common.less';
import {Button,Row,Col} from 'antd';

export default class CompanyDetailInfo extends Component {
    handleBack = ()=>{
        window.history.back(-1);
    }
  render() {
    //企业详情
    const { data } =this.props;
    return (
      <div className={styles.content}>
        <div className={styles.headerbox}>                     
            <h3>{data.corpName}</h3>
            {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
        </div> 
        <Row gutter={24} className={styles.row}>                      
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <span className={styles.span1}>社会信用代码：</span><span>{data.corpCode}</span>
            </Col>     
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <span className={styles.span1}>联系人：</span><span>{data.linkMan||data.linkman}</span>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <span className={styles.span1}>联系人电话：</span><span>{data.linkPhone||data.linkTel}</span>
            </Col>                                     
        </Row> 
        <Row gutter={24} className={styles.row}>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <span className={styles.span1}>企业登记注册类型：</span><span>{data.corpTypeStr}</span>
            </Col>     
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <span className={styles.span1}>认证情况：</span><span>{data.certificateStatusStr}</span>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <span className={styles.span1}>工资专户：</span><span>{data.payRollAccountStatusStr}</span>
            </Col>    
        </Row>      
      </div>
    )
  }
}
