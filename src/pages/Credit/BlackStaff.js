import React, { Component } from 'react';
import styles from './Common.less';
import {Card,Button,Divider,Tag,Table,DatePicker,Input ,Form,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
export default class BlackStaff extends Component {
    
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
                title:'所属单位',
                dataIndex:'',
                key:''
            },
            {
                title:'失信行为描述',
                dataIndex:'',
                key:''
            },
            {
                title:'认定部门',
                dataIndex:'',
                key:''
            },
            {
                title:'列入黑名单日期',
                dataIndex:'',
                key:''
            },
            {
                title:'移出黑名单日期',
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
                    <BlackStaffFilter/>
                    <Link to="/credit/blackstaffdetails" >
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
class BlackStaffFilter extends React.PureComponent {
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
                        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="人员名称" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerName')(
                                        <Input  placeholder="请输入人员名称" />                                  
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="所属单位" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerPhone')(
                                        <Input  placeholder="请输入单位名称" />                                   
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col xl={9} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="列入黑名单时间" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerstate')(
                                        <RangePicker format={dateFormat}/>                              
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