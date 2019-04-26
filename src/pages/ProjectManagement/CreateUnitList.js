import React, { Component } from 'react'
import {Card,Button,Tabs,Row,Col,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import CreateUnitListInfor from './CreateUnitListInfor';
import { connect } from 'dva';
import Link from 'umi/link';
const TabPane = Tabs.TabPane;
@connect(({ project,loading }) => ({
    project,
    loading: loading.effects['project/fetchTeamMasterList'],
  
}))
export default class CreateUnitList extends Component {
    constructor(props){
        super(props);
        const projectJid = this.props.location.query.projectJid;
        this.state={
            projectJid:projectJid
        }
    }
    componentDidMount(){
        this.fetchCropProjectDetail();
        this.fetchTeamMasterList();
    }
    //获取项目参建单位详情
    fetchCropProjectDetail=()=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'project/fetchCropProjectDetail',
            payload: {
                jid:this.state.projectJid
            },
        });
    }
    handleOnTab=(val)=>{
        if(val==1){
            this.fetchTeamMasterList();
        }else{
            this.fetchBankCardInfoList();
        }
    }
    fetchTeamMasterList=(pageCurrent=1)=>{
        const { dispatch } = this.props;
        const projectJid = this.state.projectJid;
        dispatch({
            type: 'project/fetchTeamMasterList',
            payload: {
              projectJid:projectJid,
              current:pageCurrent,
              size:20
            },
        });
    }
    fetchBankCardInfoList=(pageCurrent=1)=>{
        const { dispatch } = this.props;
        const projectJid = this.state.projectJid;
        dispatch({
            type: 'project/fetchBankCardInfoList',
            payload: {
              projectJid:projectJid,
              current:pageCurrent,
              size:20
            },
        });
    }

    render() {
        //班组列表
        const columns = [{
        title: '班组名称',
        dataIndex: 'teamName',
        key: 'teamName',
        width:'10%'
        }, {
        title: '班组人员',
        dataIndex: '',
        key: '',
        width:'10%'
        }, {
        title: '责任人联系方式',
        dataIndex: 'responsiblePersonPhone',
        key: 'responsiblePersonPhone',
        width:'20%'
        },{
        title: '进场日期',
        dataIndex: 'entryTime',
        key: 'entryTime',
        width:'20%'
        },{
        title: '退场日期',
        dataIndex: 'exitTime',
        key: 'exitTime',
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
        //银行卡信息
        const columns1 = [
        {
            title: '业务类型',
            dataIndex: 'businessType',
            key: 'businessType',
            width:'20%'
        }, {
            title: '业务编号',
            dataIndex: 'businessSysNo',
            key: 'businessSysNo',
            width:'20%'
        },
        {
            title: '银行支行名称',
            dataIndex: 'bankName',
            key: 'bankName',
            width:'20%'
        },
        {
            title: '银行账户',
            dataIndex: 'bankNumber',
            key: 'bankNumber',
            width:'20%'
        },
        {
            title: '银行联号',
            dataIndex: 'bankLinkNumber',
            key: 'bankLinkNumber',
            width:'20%'
        },
        ];
        const { project,loading } = this.props;
        const cropProjectDetail = project.cropProjectDetail;
        return (
            <div className={styles.content}>
                <PageHeaderWrapper title='项目参建单位详情'>
                    <CreateUnitListInfor cropProjectDetail = {cropProjectDetail}/>     
                    <div className={styles.tab}> 
                        <Tabs onTabClick={this.handleOnTab} defaultActiveKey="1" >
                            <TabPane tab={<span>班组()</span>} key="1">                            
                                <Link to="/project/projectDetails/CreateUnitListGroup" >
                                    详情
                                </Link>                                                                           
                                <Table
                                    dataSource={project.teamMasterList.result}
                                    style={{ marginBottom: 24 }}
                                    pagination={{
                                    current:project.teamMasterList.current,
                                    pageSize:project.teamMasterList.size,
                                    total: parseInt(project.teamMasterList.total),
                                    showTotal:()=>{
                                        return `共${project.teamMasterList.total}条`
                                    },
                                    showQuickJumper:true,
                                    onChange:(current)=>{
                                        this.setState({
                                            current:current
                                        })
                                        this.fetchTeamMasterList(current);
                                    },
                                    }}
                                    loading={loading}
                                    rowKey="jid"
                                    columns={columns} 
                                   
                                />
                            </TabPane>
                            <TabPane tab={<span>银行卡信息</span>} key="2">
                                <Table
                                    dataSource={project.bankCardInfoList.result}
                                    style={{ marginBottom: 24 }}
                                    pagination={{
                                    current:project.bankCardInfoList.current,
                                    pageSize:project.bankCardInfoList.size,
                                    total: parseInt(project.bankCardInfoList.total),
                                    showTotal:()=>{
                                        return `共${project.bankCardInfoList.total}条`
                                    },
                                    showQuickJumper:true,
                                    onChange:(current)=>{
                                        this.setState({
                                            current:current
                                        })
                                        this.fetchBankCardInfoList(current);
                                    },
                                    }}
                                    rowKey="projectCorpJid"
                                    columns={columns} 
                                   
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </PageHeaderWrapper>
            </div>
        )
    }
}

