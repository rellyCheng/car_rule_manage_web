import React, { Component } from 'react'
import { connect } from 'dva';
import CompanyList  from '@/components/Company/CompanyList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BusinessFilter from '../BusinessManagement/BusinessFilter';
import {Button, Card } from 'antd';
import router from 'umi/router';

@connect(({ companyUpload, loading }) => ({
  companyUpload,
  loading: loading.effects['companyUpload/fetchCompanyUploadlist'],
}))
export default class CompanyUploadList extends Component {
  state={
  }
  componentDidMount(){
    this.fetchCompanyUploadlist();
  }
  fetchCompanyUploadlist=(page=1)=>{
    const { dispatch }= this.props;
    dispatch({
      type:'companyUpload/fetchCompanyUploadlist',
      payload:{
        current:page,
        size:10
      },
    })
  }
  handleAddCompany=()=>{
    router.push(`${window.location.pathname}/companyUploadForm`);
  }
  render() {
    const { companyUpload,loading } = this.props;
    return (
        <PageHeaderWrapper>
          <Card>
            {/* <Button onClick={this.handleBatchAddCompany}>批量上传企业信息</Button> */}
            {/* <BusinessFilter /> */}
            <Button onClick={this.handleAddCompany} style={{marginLeft:'50px'}}>添加企业信息</Button>
          </Card>
          
          <CompanyList requestList = {this.fetchCompanyUploadlist} data = {companyUpload.companyUploadList}/>
        </PageHeaderWrapper>
    )
  }
}
