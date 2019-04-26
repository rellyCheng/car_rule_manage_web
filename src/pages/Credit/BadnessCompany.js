import React, { Component } from 'react';
import styles from './Common.less';
import {Card,Button,Divider,Tag,Table,DatePicker,Input ,Form,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';
const dateFormat = 'YYYY/MM/DD';
import { connect } from 'dva';
import router from 'umi/router';
const { RangePicker } = DatePicker;
@connect(({ credit, loading }) => ({
    credit,
    loading: loading.effects['credit/fetchBadCredit'],
  }))
export default class BadnessCompany extends Component {
    state ={

    }
    componentDidMount(){
        this.requestBadCredit(1);
    }
    requestBadCredit=(current)=>{
        const { dispatch } = this.props;
        if(current==null){
            current==1
        }
        dispatch({
            type: 'credit/fetchBadCredit',
            payload: {
                current:current,
                size:10
            },
        });
    }
    // 查看详情
    handleDetail =(record)=>{
        router.push(`/credit/badnesscompanydetails?corpJid=${record.jid}`); 
    }
    render() {
        const columns = [
            {
                title:'企业名称',
                dataIndex:'corpName',
                key:'corpName'
            },
            {
                title:'登记日期',
                dataIndex:'createDate',
                key:'createDate'
            },
            {
                title:'不良行为描述',
                dataIndex:'creditCode',
                key:'creditCode'
            },
            {
                title:'不良行为发生日期',
                dataIndex:'happenDate',
                key:'happenDate'
            },
            {
                title:'操作',
                dataIndex:'',
                key:'action',
                render:(text,record)=>{
                    <a href="javascript:;" onClick={()=>this.handleDetail(record)}>查看详情</a>
                }
            },
        ];
        const { credit,loading } = this.props;
        console.log(credit);
        return (
            <div className={styles.content}>
                <PageHeaderWrapper>                   
                    <BadnessCompanyFilter/>                                                    
                    <div className={styles.tab}>                   
                        <Table
                            dataSource={credit.badCredit.result}
                            style={{ marginBottom: 24 }}
                            pagination={{
                              current:credit.badCredit.current,
                              pageSize:credit.badCredit.size,
                              total: parseInt(credit.badCredit.total),
                              showTotal:()=>{
                                  return `共${credit.badCredit.total}条`
                              },
                              showQuickJumper:true,
                              onChange:(current)=>{
                                this.setState({
                                  current:current
                                })
                                this.requestBadCredit(current);
                              },
                            }}
                            loading={loading}
                            rowKey=""
                            columns={columns}
                        />
                    </div>
                </PageHeaderWrapper>
            </div>
        )
    }
}


@Form.create()
class BadnessCompanyFilter extends React.PureComponent {
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
                        <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="企业名称" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerName')(
                                        <Input  placeholder="请输入企业名称" />                                  
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="不良行为发生日期" allowClear {...formItemLayout}>
                                {
                                    getFieldDecorator('workerPhone')(
                                        <RangePicker format={dateFormat}/>                                  
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item label="处罚日期" allowClear {...formItemLayout}>
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