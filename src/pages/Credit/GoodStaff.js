import React, { Component } from 'react';
import styles from './Common.less';
import {Card,Button,Divider,Tag,Table,DatePicker,Input ,Form,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
export default class GoodStaff extends Component {
    
    render() {
        const columns = [
            {
                title:'人员名称',
                dataIndex:'',
                key:''
            },
            {
                title:'登记日期',
                dataIndex:'',
                key:''
            },
            {
                title:'良好行为描述',
                dataIndex:'',
                key:''
            },
            {
                title:'良好行为发生日期',
                dataIndex:'',
                key:''
            },
            {
                title:'操作',
                dataIndex:'',
                key:'action',
                render:(text,record)=>{
                    <a href="javascript:;">查看详情</a>
                }
            },
        ]
        return (
            <div className={styles.content}>
                <PageHeaderWrapper>                   
                    <GoodStaffFilter/>
                    <Link to="/credit/goodstaffdetails" >
                        查看详情
                    </Link>                                                     
                    <div className={styles.tab}>                   
                        <Table
                            columns={columns}
                        />
                    </div>
                </PageHeaderWrapper>
            </div>
        )
    }
}


@Form.create()
class GoodStaffFilter extends React.PureComponent {
    state ={

    }
    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 10},
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 14},
            },
        };
        return (
            <Card bordered={false}>
                <Form  layout="inline" style={{float:'left'}}>
                    <Row gutter={24} >
                        <Col xl={5} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="人员姓名" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerName')(
                                        <Input  placeholder="请输入人员姓名" />                                  
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col xl={5} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="所在企业名称" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerstate')(
                                        <Input  placeholder="请输入企业名称" />                              
                                    )
                                }
                            </Form.Item>  
                        </Col>
                        
                        <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="奖励日期" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerName')(
                                        <RangePicker format={dateFormat}/>                                   
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="良好行为发生日期" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerName')(
                                        <RangePicker format={dateFormat}/>                                   
                                    )
                                }
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={24} >
                        <Col xl={5} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="项目编码" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerName')(
                                        <Input  placeholder="请输入项目编码" />                                  
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col xl={3} lg={24} md={24} sm={24} xs={24}>
                            <Button htmlType="submit" type="primary">查询</Button> 
                        </Col>
                        </Row>
                </Form>
            </Card>
        );
    }
}