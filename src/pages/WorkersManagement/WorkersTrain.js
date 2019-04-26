import React, { Component, Suspense } from 'react';
import {Button,Row,Col,Divider} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import { connect } from 'dva';

@connect(({ worker}) => ({
    worker
}))

export default class WorkersTrain extends React.Component {
  state ={

  }

  componentDidMount(){
    this.fetchPeiXunDetails();
  }
  // 培训详情
  fetchPeiXunDetails=()=>{
    const { dispatch } = this.props;
    const jid = this.props.location.query.jid;
    dispatch({
        type: 'worker/fetchPeiXunDetails',
        payload: {
            jid:jid,
        },
    });
  }

  //返回上一步
  handleBack = ()=>{
    window.history.back(-1);
  }
  render() {
    
 
    const{worker} = this.props;
    console.log(worker);
    return (          
        <div className={styles.content}>
             <PageHeaderWrapper >    
                <div className={styles.headerbox}>
                    <h3>培训详情</h3>
                    {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                </div>  
                {/* <Divider/> */}
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        课程名称：<span>{worker.peixundetails.trainingName}</span>
                    </Col>                       
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        培训编号：<span>{worker.peixundetails.sysNo}</span>
                    </Col>     
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        培训日期：<span>{worker.peixundetails.trainingDate}</span>
                    </Col>
                                         
                </Row>
                <Row gutter={24} className={styles.row}> 
                     <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        培训时长：<span>{worker.peixundetails.trainingDuration}小时</span>
                    </Col>                          
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                       培训类型：<span>{worker.peixundetails.trainingTypeCodeStr}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        培训人：<span>{worker.peixundetails.trainer}</span>
                    </Col> 
                                         
                </Row>
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                       培训机构：<span>{worker.peixundetails.trainingOrg}</span>
                    </Col> 
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        培训地址：<span>{worker.peixundetails.trainingAddress}</span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        培训附件：<span>{worker.peixundetails.attachUrl}</span>
                    </Col>                                            
                </Row>  
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        项目编码：<span>{worker.peixundetails.prjCode }</span>
                    </Col>                       
                </Row>  
                <Row gutter={24} className={styles.row}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        培训简述：<span>{worker.peixundetails.description }</span>
                    </Col>                                             
                </Row> 
                <Divider dashed />
                <Row gutter={24} className={styles.row}>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        被培训人：<span>{worker.peixundetails.trainer }</span>
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
                        是否合格：<span></span>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        培训得分：<span></span>
                    </Col>                         
                </Row> 
                         
             </PageHeaderWrapper>
                 
        </div>
    );
  }
}
