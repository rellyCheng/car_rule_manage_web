import React, { Component, Suspense } from 'react';
import { Card, Button, Row, Col,Skeleton } from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import { connect } from 'dva';
@connect(({ business }) => ({
  business,
}))
export default class BusinessDetails extends React.Component {
  state = {};
  //编辑企业
  handleEdit = () => {
    const { corpJid } = this.props;
    router.push(`/business/addcompany?corpJid=${corpJid}`);
  };
  //返回上一页
  handleBack = () => {
    window.history.back(-1);
  };

  render() {
    const { business,loading} = this.props;
    // console.log(business);
    return (
      <div className={styles.content}>
       <Skeleton loading={loading} active>
        <div className={styles.headerbox}>
          <h3>{business.businessListDetail.corpName}</h3>
          <span>
            {/* <Button type="primary" onClick={() => this.handleBack()} style={{ marginRight: 20 }}>
              返回上一页
            </Button> */}
            {/* <Button type='primary' onClick={this.handleEdit} style={{display:business.businessListDetail.canEdit?'inline-block':'none'}}>编辑</Button> */}
          </span>
        </div>
        {/* <div style={{float:"left",marginLeft:'20px'}}>
            </div> */}
        <Row gutter={24} className={styles.row}>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <span className={styles.span1}>社会信用代码：</span>
            <span>{business.businessListDetail.corpCode}</span>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <span className={styles.span1}>联系人：</span>
            <span>{business.businessListDetail.linkMan}</span>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <span className={styles.span1}>联系人电话：</span>
            <span>{business.businessListDetail.linkPhone}</span>
          </Col>
        </Row>
        <Row gutter={24} className={styles.row}>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <span className={styles.span1}>企业登记注册类型：</span>
            <span>{business.businessListDetail.corpTypeStr}</span>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <span className={styles.span1}>认证情况：</span>
            <span>{business.businessListDetail.certificateStatusStr}</span>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <span className={styles.span1}>工资专户：</span>
            <span>{business.businessListDetail.payRollAccountStatusStr}</span>
          </Col>
        </Row>
        </Skeleton>
      </div>
    );
  }
}
