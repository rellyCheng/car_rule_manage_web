import React, { Component } from 'react'
import styles from './Common.less'
import {Row,Col,Button,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
export default class componentName extends Component {
    componentDidMount(){
        this.fetchProjectTrainingDetail();
    }
    fetchProjectTrainingDetail=()=>{
        const trainingSysNo = this.props.location.query.trainingSysNo;

    }
    handleBack = ()=>{
        window.history.back(-1);
    }
    render() {
        const columns= [
            {
                title: '序号',
                dataIndex: '',
                key: '',
                width:'15%'
            },
            {
                title: '工人姓名',
                dataIndex: '',
                key: '',
                width:'15%'
            },
            {
                title: '证件类型',
                dataIndex: '',
                key: '',
                width:'20%'
            },
            {
                title: '证件号码',
                dataIndex: '',
                key: '',
                width:'20%'
            },
            {
                title: '是否合格',
                dataIndex: '',
                key: '',
                width:'15%'
            },
            {
                title: '培训得分',
                dataIndex: '',
                key: '',
                width:'15%'
            },
        ];
        return (
            <PageHeaderWrapper >
                {/* 基本信息 */}
                <div className={styles.content}>
                    <div className={styles.headerbox}>
                        <h3 >工地安全</h3>
                        {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                    </div>     
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        培训编号：<span></span>
                        </Col>     
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            培训日期：<span></span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            培训时长：<span></span>
                        </Col>                      
                    </Row>
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            培训类型：<span></span>
                        </Col>     
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            培训人：<span></span>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            培训机构：<span></span>
                        </Col>                      
                    </Row>
                    <Row gutter={24} className={styles.row}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            培训地址：<span></span>
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            培训附件：<span></span>
                        </Col> 
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            项目编码：<span></span>
                        </Col>                         
                    </Row>  
                    <Row gutter={24} className={styles.row}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            项目简述：<span></span>
                        </Col>                          
                    </Row>     
                </div>
                <div className={styles.tab}>
                <Table columns={columns} />  
                </div>
            </PageHeaderWrapper>
            
        )
    }
}
