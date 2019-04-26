import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import {Card,Button,Tabs,Row,Col,Skeleton } from 'antd';
import CompanyDetailInfo from '@/components/Company/CompanyDetailInfo';
import CompanyInfo from '@/components/Company/CompanyInfo';
import CompanyProject from '@/components/Company/CompanyProject';
import CompanyAptitude from '@/components/Company/CompanyAptitude';
import CompanyEmployee from '@/components/Company/CompanyEmployee';
import { connect } from 'dva';
const TabPane = Tabs.TabPane;

@connect(({ companyUpload,loading }) => ({
  companyUpload,
  loadingDetail:loading.effects['companyUpload/fetchCompanyDetail'],
}))
export default class CompanyUploadDetail extends Component {
  state={}
  componentDidMount(){
    this.handleCompanyDetailInfo();
  }
  handleOnTab=(val)=>{
    if(val=='1'){
      if(val!=this.state.tabKey){
        this.setState({
          tabKey:val
        })
        this.handleCompanyDetailInfo();
      }
      
    }
  }
  handleCompanyDetailInfo = ()=>{
    const { dispatch } = this.props;
    const corpJid = this.props.location.query.corpJid;
    dispatch({
      type:'companyUpload/fetchCompanyDetail',
      payload:{
        corpJid:corpJid
      }
    })
  }
  render() {
    const { companyUpload,loadingDetail } = this.props;
    const companyUploadDetail = companyUpload.companyUploadDetail ||{};
    //企业上传的详情
    return (
      <div className={styles.content}>
      <PageHeaderWrapper >
      <Skeleton loading={loadingDetail} active >
      <CompanyDetailInfo data={companyUploadDetail}/> 
      </Skeleton>
        <div className={styles.tab}> 
        <Tabs onTabClick={this.handleOnTab}  >
            <TabPane tab="企业信息" key="1">
              <Skeleton loading={loadingDetail} active >
                <CompanyInfo data = {companyUploadDetail} />     
              </Skeleton>           
            </TabPane>
            <TabPane tab={<span>工程项目()</span>} key="2">
            <CompanyProject />
            </TabPane>
            <TabPane tab={<span>企业资质()</span>} key="3">
            <CompanyAptitude />
            </TabPane>
            <TabPane tab={<span>人员信息()</span>} key="4">
            <CompanyEmployee/>
            </TabPane>
        </Tabs>
        </div>
      </PageHeaderWrapper>
      </div>
    )
  }
}
