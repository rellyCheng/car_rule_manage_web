import React, { Component } from 'react'
import {Card,Button,Tabs,Row,Col,Table, Input,Select,Form} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import LaowuListInfor from './LaowuListInfor';
import { connect } from 'dva';
import Link from 'umi/link';
const Option = Select.Option;
const TabPane = Tabs.TabPane;
export default class Laowulist extends Component {
    // 工人列表查询
    handleWorkerList =(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    // 按照工资状态查询
    handleWage =(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    //按照班组名称查询
    handleComplaintSearch =(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    render() {
    //工人列表
    const columns = [{
      title: '工人姓名',
      dataIndex: '',
      key: '',
      width:'15%'
    }, {
      title: '性别',
      dataIndex: '',
      key: '',
      width:'10%'
    }, {
      title: '工种',
      dataIndex: '',
      key: '',
      width:'10%'
    },{
      title: '班组',
      dataIndex: '',
      key: '',
      width:'10%'
    },{
      title: '是否班组长',
      dataIndex: '',
      key: '',
      width:'15%'
    },{
      title: '工作状态',
      dataIndex: '',
      key: '',
      width:'15%'
    },{
      title: '实名认证',
      dataIndex: '',
      key: '',
      width:'15%'
    },
    {
      title: '操作',
      key: 'action',
      width:'10%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleViewDetail(record)}>查看详情</a>
        </span>
      ),
    }];
    //工资发放情况
    const columns1 = [
    {
      title: '发放月份',
      dataIndex: '',
      key: '',
      width:'17%'
    }, {
      title: '发放日期',
      dataIndex: '',
      key: '',
      width:'17%'
    },
    {
      title: '工人数量',
      dataIndex: '',
      key: '',
      width:'17%'
    },
    {
        title: '工资总额',
        dataIndex: '',
        key: '',
        width:'17%'
    },
    {
        title: '状态',
        dataIndex: '',
        key: '',
        width:'16%'
    },
    {
      title: '操作',
      key: 'action',
      width:'16%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleViewDetail1(record)}>查看详情</a>
        </span>
      ),
    }
    ];
    //投诉记录
    const columns2 = [
    {
      title: '投诉编号',
      dataIndex: '',
      key: '',
      width:'12%'
    }, {
      title: '投诉人',
      dataIndex: '',
      key: '',
      width:'12%'
    },
    {
        title: '投诉类型',
        dataIndex: '',
        key: '',
        width:'12%'
    },{
        title: '投诉发起时间',
        dataIndex: '',
        key: '',
        width:'20%'
    },
    {
        title: '投诉内容',
        dataIndex: '',
        key: '',
        width:'20%'
    },{
        title: '处理状态',
        dataIndex: '',
        key: '',
        width:'20%'
    },
    {
        title: '操作',
        key: 'action',
        width:'20%',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={()=> this.handleViewDetail1(record)}>查看详情</a>
          </span>
        ),
      }
    ];
    const total = 1;
        return (
            <div className={styles.content}>
            <PageHeaderWrapper >
                <LaowuListInfor/>      
                <div className={styles.tab}> 
                    <Tabs onTabClick={this.handleOnTab} defaultActiveKey="1" >
                        <TabPane tab="工人列表" key="1">                           
                            <LaowuListFilter />
                            <Table columns={columns} />
                        </TabPane>
                        <TabPane tab={<span>工资发放情况()</span>} key="2">                            
                            <WageAbnormalFilter/>
                            <Link to="/project/projectDetails/LaowuListwage" >
                                工资详情
                            </Link>                                                                           
                            <Table columns={columns1} />
                        </TabPane>
                        <TabPane tab={<span>投诉记录()</span>} key="3">
                            < ComplaintFilter/>
                            <Link to="/project/projectDetails/LaowuListComplaint" >
                                 投诉详情
                            </Link> 
                            <Table columns={columns2} />
                        </TabPane>
                    </Tabs>
                </div>
            </PageHeaderWrapper>
        </div>
        )
    }
}

@Form.create()
class LaowuListFilter extends React.PureComponent {
    state ={
    }
 
    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        return (
            <Card bordered={false}>
                <Form  layout="inline" style={{float:'left'}} onSubmit={this.handleWage}>
                    <Form.Item label="工人姓名" allowClear>
                        {
                            getFieldDecorator('workerName')(
                                <Input  placeholder="输入工人姓名" />                                  
                            )
                        }
                    </Form.Item>
                    <Form.Item label="手机号" allowClear>
                        {
                            getFieldDecorator('workerPhone')(
                                <Input  placeholder="请输入手机号" />                                  
                            )
                        }
                    </Form.Item>
                    <Form.Item label="工作状态" allowClear>
                        {
                            getFieldDecorator('workerstate')(
                                <Select  
                                style={{ width: 200 }}
                                placeholder="请选择"
                                >
                                    <Option value='1'>1</Option>
                                    <Option value='2'>2</Option>
                                </Select>                               
                            )
                        }
                    </Form.Item>
                    <Button htmlType="submit" type="primary">查询</Button>
                </Form>
            </Card>
        );
    }
}

@Form.create()
class WageAbnormalFilter extends React.PureComponent {
    state ={
    }
 
    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        return (
            <Card bordered={false}>
                <Form  layout="inline" style={{float:'left'}} onSubmit={this.handleWage}>
                    <Form.Item label="工资异常情况" allowClear>
                        {
                            getFieldDecorator('wagestate')(
                                <Select  
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                >
                                    <Option value='已发放'>已发放</Option>
                                    <Option value='逾期未发'>逾期未发</Option>
                                </Select>                               
                            )
                        }
                    </Form.Item>
                    <Button htmlType="submit" type="primary">查询</Button>
                </Form>
            </Card>
        );
    }
}



@Form.create()
class ComplaintFilter extends React.PureComponent {
    state ={
    }
 
    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        return (
            <Card bordered={false}>
                <Form  layout="inline" style={{float:'left'}} onSubmit={this.handleComplaintSearch}>
                    <Form.Item label="班组名称" allowClear>
                        {
                            getFieldDecorator('Team')(
                                <Input  placeholder="输入班组名称" />                                  
                            )
                        }
                    </Form.Item>
                    <Form.Item label="只看未处理的投诉" allowClear>
                        {
                            getFieldDecorator('wagestate')(
                                <Select  
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                >
                                    <Option value='已处理'>已发放</Option>
                                    <Option value='未处理'>逾期未发</Option>
                                </Select>                               
                            )
                        }
                    </Form.Item>
                    <Button htmlType="submit" type="primary">查询</Button>
                </Form>
            </Card>
        );
    }
}
