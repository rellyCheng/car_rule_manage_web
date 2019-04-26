import React, { Component } from 'react'
import styles from './Common.less'
import {Row,Col,Button,Table,Divider} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
export default class BlackCompanyDetails extends Component {
    handleBack = ()=>{
        window.history.back(-1);
    }
    render() {
        return (
            <PageHeaderWrapper >
                {/* 基本信息 */}
                <div className={styles.content}>
                    <div className={styles.headerbox}>
                        <h3>企业黑名单详情</h3>
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
                            登记日期：<span></span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            市场主体类别：<span></span>
                        </Col>                      
                    </Row>
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            认定部门：<span></span>
                        </Col>     
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            列入黑名单日期：<span></span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            移出黑名单日期：<span></span>
                        </Col>                      
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            失信行为描述：<span></span>
                        </Col>                          
                    </Row>
                       
                </div>               
            </PageHeaderWrapper>
            
        )
    }
}
