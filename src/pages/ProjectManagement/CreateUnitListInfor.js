import React, { Component, Suspense } from 'react';
import {Card,Button,Tabs,Row,Col,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
export default class CreateUnitListInfor extends React.Component {
    handleBack = ()=>{
        window.history.back(-1);
    }
    render() {
        const corpProjectRecord = this.props.corpProjectDetail || {};
        console.log(corpProjectRecord)
        return (          
            <div className={styles.content}>
                <div>
                    <div className={styles.headerbox}>
                        <h3>中铁八局第三建设有限公司</h3>
                        {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                    </div>     
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            项目编码：<span>{corpProjectRecord.projectJid}</span>
                        </Col>     
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            参建企业统一社会信用代码：<span>{corpProjectRecord.corpCode}</span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            参建企业类型：<span>{corpProjectRecord.corpTypeStr}</span>
                        </Col>                      
                    </Row>
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            项目经理名称：<span>{corpProjectRecord.pmName}</span>
                        </Col>     
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            项目经理证件类型：<span>{corpProjectRecord.pmIdCardTypeStr}</span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            项目经理证件号码：<span>{corpProjectRecord.pmIdCardNumber}</span>
                        </Col>                      
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            项目经理联系电话：<span>{corpProjectRecord.pmPhone}</span>
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            进场时间：<span>{corpProjectRecord.entryTime}</span>
                        </Col> 
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            退场时间：<span>{corpProjectRecord.exitTime}</span>
                        </Col>                         
                    </Row>
                </div>         
            </div>
        );
    }
}
