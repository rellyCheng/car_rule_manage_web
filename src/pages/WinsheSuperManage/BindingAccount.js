import React, { Component } from 'react';
import {Table,Divider,Button,Modal} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../ItemManage/Common.less';
import FilterForm from './FilterForm';
import AddPlatFormAccountForm from  '@/components/Platform/AddPlatFormAccountForm'; 
import ManageAccountForm from  './ManageAccountForm';
import router from 'umi/router';
import { connect } from 'dva';
@connect(({ supermanage, loading }) => ({
    supermanage,
    loading: loading.effects['supermanage/fetchAllPlatFormAccountList'],
}))
export default class BindingAccount extends Component {
    state={
        openAddPlatFormAccount:false,
        openBidingPlatFormAccount:false,
        record:"",
        filterVal:{}
    }
    componentDidMount(){
        this.requestList();
    }
    requestList=(current=1,values=this.state.filterVal)=>{
        const { dispatch } = this.props;
        values.current = current;
        values.size =10;
        dispatch({
            type: 'supermanage/fetchAllPlatFormAccountList',
            payload: values      
        });
        this.setState({
            filterVal:values
        })
    }
    // 去绑定
    handleBind=(record)=>{
        this.setState({
            openBidingPlatFormAccount:true,
            record:record
        })
    }
    // 修改
    handleEdit=(record)=>{
        this.setState({
            openAddPlatFormAccount:true,
            record:record
        })
    }

    render() {
        const columns=[
            {
                title:'账号名称',
                dataIndex:'phone',
                key:'phone'
            },
            {
                title:'企业名称',
                dataIndex:'corpName',
                key:'corpName'
            },
            {
                title:'申请时间',
                dataIndex:'createTime',
                key:'createTime'
            },
            {
                title:'住建部登录账号',
                dataIndex:'username',
                key:'username'
            },
            {
                title:'住建部登录密码',
                dataIndex:'password',
                key:'password'
            },
            {
                title:'绑定状态',
                key:'',
                render:(text,record)=>(
                    <span>{record.checkState=="1"?"审核通过":"审核中"}</span>
                ),
            },
            {
                title:'操作',
                key:'',
                render:(text,record)=>(
                    <span>
                        <a href="javascript:;" onClick={()=> this.handleBind(record)}>去绑定</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={()=>this.handleEdit(record)}>编辑</a>
                    </span>
                ),
            },
        ];
        const {supermanage,loading} = this.props;
        console.log(supermanage)
        return (
            <div className={styles.content}>
                <PageHeaderWrapper title="申请绑定住建部账号（数据提交）列表">
                    <FilterForm _this={this}/>             
                    <Table 
                         dataSource={supermanage.allAccountList.result}
                         style={{ marginBottom: 24 }}
                         pagination={{
                           current:supermanage.allAccountList.current,
                           pageSize:supermanage.allAccountList.size,
                           total: parseInt(supermanage.allAccountList.total),
                           showTotal:()=>{
                               return `共${supermanage.allAccountList.total}条`
                           },
                           showQuickJumper:true,
                           onChange:(current)=>{
                             this.setState({
                               current:current
                             })
                             this.requestList(current);
                           },
                         }}
                         loading={loading}
                         rowKey="jid"
                        columns={columns}
                    />
                    <Modal
                        title="绑定账号管理"
                        visible={this.state.openBidingPlatFormAccount}
                        onOk={this.handleOk}
                        onCancel={()=>{this.setState({openBidingPlatFormAccount:false})}}
                        footer={null}
                        destroyOnClose={true}
                        width={1000}
                        maskClosable={false}
                        >
                        <ManageAccountForm _this={this} record={this.state.record}/>
                    </Modal>

                    <Modal
                        title="修改住建部登录账号"
                        visible={this.state.openAddPlatFormAccount}
                        onOk={this.handleOk}
                        onCancel={()=>{this.setState({openAddPlatFormAccount:false})}}
                        footer={null}
                        destroyOnClose={true}
                        maskClosable={false}
                        >
                        <AddPlatFormAccountForm _this={this} record={this.state.record}/>
                    </Modal>
                </PageHeaderWrapper>
            </div>
        )
    }
}
