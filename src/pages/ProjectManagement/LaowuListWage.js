import React, { Component, Suspense } from 'react';
import {Card,Button,Divider,Tag,Table,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
export default class LaowuListWage extends React.Component {
  
  state ={

  }

  handleBack = ()=>{
    window.history.back(-1);
  }
  render() {
    const columns = [
    {
      title: '工人姓名',
      dataIndex: '',
      key: '',
      width:'12%'
    }, {
      title: '班组',
      dataIndex: '',
      key: '',
      width:'12%'
    },{
      title: '出勤天数',
      dataIndex: '',
      key: '',
      width:'12%'
    },{
      title: '总工数',
      dataIndex: '',
      key: '',
      width:'12%'
    },{
      title: '发放日期',
      dataIndex: '',
      key: '',
      width:'16%'
    },{
      title: '应发金额(元)',
      dataIndex: '',
      key: '',
      width:'12%'
    },{
      title: '实发金额(元)',
      dataIndex: '',
      key: '',
      width:'12%'
    },
    {
      title: '是否补发',
      dataIndex: '',
      key: '',
      width:'12%'
    }];
    return (          
        <div className={styles.content}>
            <PageHeaderWrapper >
                <div className={styles.content}>
                    <div className={styles.headerbox}>
                        <h3 >宁大花园南侧xxxxxxx土建工程</h3>
                        {/* <Button type='primary'  onClick={()=> this.handleBack()}>返回上一页</Button>  */}
                    </div>                   
                    <Row gutter={24} className={styles.row}>                      
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            发放月份：<span></span>
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            发放日期：<span></span>
                        </Col> 
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            发放状态：<span></span>
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
                            劳务公司：<span></span>
                        </Col>  
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            劳务公司联系人姓名：<span></span>
                        </Col> 
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            联系人联系方式：<span></span>
                        </Col>                         
                    </Row>                    
                </div>          
                <div className={styles.tab}> 
                  <Table columns={columns} 
                  />
                </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
