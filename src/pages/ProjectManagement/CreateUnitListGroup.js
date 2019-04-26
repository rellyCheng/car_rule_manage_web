import React, { Component, Suspense } from 'react';
import {Card,Button,Tabs,Row,Col,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import CreateUnitListGroupInfor from './CreateUnitListGroupInfor';
import CreateUnitListGroupDetails from './CreateUnitListGroupDetails';
import { connect } from 'dva';
import router from 'umi/router';
const TabPane = Tabs.TabPane;
// @connect(({ project,loading }) => ({
//   project,
//   loading: loading.effects['project/fetchLaoWuList'],

// }))
export default class CreateUnitListGroup extends React.Component {
  state ={

  }
  render() {
    // 人员列表
    const columns1 = [{
      title: '工人姓名',
      key: '',
      dataIndex: '',
      width:'17.5%'
    }, {
      title: '是否班组长',
      dataIndex: '',
      key: '',
      width:'17.5%'
    }, {
      title: '工种',
      dataIndex: '',
      key: '',
      width:'17.5%'
    },{
      title: '进场时间',
      dataIndex: '',
      key: '',
      width:'17.5%'
    },{
      title: '退场时间',
      dataIndex: '',
      key: '',
      width:'17.5%'
    },
   {
      title: '操作',
      key: 'action',
      width:'17.5%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleLaoWuDetail(record)}>查看详情</a>
        </span>
      ),
    }];
    //进退场
    const columns2 = [{
      title: '工人名称',
      dataIndex: '',
      key: '',
      width:'15%'
    }, {
      title: '证件类型',
      dataIndex: '',
      key: '',
      width:'15%'
    }, {
      title: '证件号码',
      dataIndex: '',
      key: '',
      width:'25%',
    },{
      title: '进场时间',
      dataIndex: '',
      key: '',
      width:'15%',
    },{
      title: '退场时间',
      dataIndex: '',
      key: '',
      width:'15%',
    },{
      title: '操作',
      key: 'action',
      width:'15%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleViewDetail1(record)}>查看详情</a>
        </span>
      ),
  }];
    //劳动合同
    const columns3 = [{
      title: '合同编号',
      dataIndex: '',
      key: '',
      width:'15%'
    },
    {
      title: '合同期限类型',
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
      width:'15%'
    },
    {
      title: '证件号码',
      dataIndex: '',
      key: '',
      width:'25%'
    },
    {
      title: '操作',
      key: 'action',
      width:'25%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleLaoWuDetail(record)}>查看详情</a>
        </span>
      ),}
  ];
    //考勤
    const columns4 = [{
      title: '考勤时间',
      dataIndex: '',
      key: '',
      width:'20%'
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
      width:'15%'
    },
    {
      title: '证件号码',
      dataIndex: '',
      key: '',
      width:'20%'
    },
    {
      title: '进出方向',
      dataIndex: '',
      key: '',
      width:'15%'
    },
    {
      title: '操作',
      key: 'action',
      width:'15%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleLaoWuDetail(record)}>查看详情</a>
        </span>
      ),
    }];
    //工资单
    const columns5 = [{
      title: '发放工资的年月',
      dataIndex: '',
      key: '',
      width:'15%'
    },
    {
      title: '工资单编号',
      dataIndex: '',
      key: '',
      width:'15%'
    },
    {
      title: '工资单编码',
      dataIndex: '',
      key: '',
      width:'20%'
    },
    {
      title: '工人姓名',
      dataIndex: '',
      key: '',
      width:'15%'
    },
    {
      title: '发放日期',
      dataIndex: '',
      key: '',
      width:'15%'
    },
    {
      title: '附件',
      dataIndex: '',
      key: '',
      width:'15%',
      render: (text, record) => (
        <span>
          <a href="javascript:;">查看详情</a>
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width:'15%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleLaoWuDetail(record)}>查看工资单详情</a>
        </span>
      ),
    }];

    return (          
        <div className={styles.content}>
            <PageHeaderWrapper >
                <CreateUnitListGroupInfor/> 
                <div className={styles.tab}> 
                    <Tabs onTabClick={this.handleOnTab} defaultActiveKey="1" >
                        <TabPane tab="班组信息" key="1">
                            <CreateUnitListGroupDetails />                          
                        </TabPane>
                        <TabPane tab={<span>人员列表()</span>} key="2">
                            <Link to="/project/projectDetails/createunitlistmember" >
                                人员详情
                            </Link> 
                          <Table columns={columns1}/>
                        </TabPane>
                        <TabPane tab={<span>进退场()</span>} key="3">
                            <Link to="/project/projectDetails/createunitlistenter" >
                                进退场详情
                            </Link> 
                            <Table columns={columns2}/>
                        </TabPane>
                        <TabPane tab={<span>劳动合同()</span>} key="4">
                            <Link to="/project/projectDetails/createunitlistcontract" >
                              劳动合同详情
                            </Link> 
                            <Table columns={columns3} />
                        </TabPane>
                        <TabPane tab={<span>考勤()</span>} key="5">
                            <Link to="/project/projectDetails/createunitlistcheck" >
                              考勤详情
                            </Link> 
                          <Table columns={columns4} />
                        </TabPane>
                        <TabPane tab={<span>工资单()</span>} key="6">
                            <Link to="/project/projectDetails/createunitlistwage" >
                              工资详情
                            </Link>
                          <Table columns={columns5} /> 
                          
                        </TabPane>
                    </Tabs>
                </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
