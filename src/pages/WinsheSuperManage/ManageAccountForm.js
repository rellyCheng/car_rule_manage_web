import React, { Component } from 'react';
import {Table,Divider,Button,Modal} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../ItemManage/Common.less';
import BindingAccountForm from './BindingAccountForm';
import { connect } from 'dva';
@connect(({ supermanage, loading }) => ({
    supermanage,
    loading: loading.effects['supermanage/fetchBuildAccountList'],
}))
export default class ManageAccount extends Component {
    state={
        openBindingAccountForm:false,
        record:''
    }
    componentDidMount(){
        this.requestList();
    }
    requestList=(current=1,values={})=>{
        const { dispatch,record} = this.props;
        console.log(record)
        values.current = current;
        values.size =10;
        values.accountJid = record.jid;
        values.userJid = record.userJid;
        dispatch({
            type: 'supermanage/fetchBuildAccountList',
            payload: values      
        });
    }

    // 去绑定
    handleBind=()=>{
        const {record} = this.props;
        this.setState({
            openBindingAccountForm:true,
            record:record
        })
    }
    // 修改
    handleEdit=(record)=>{
        // this.setState({
        //     openBindingAccountForm:true
        // })
    }
    //删除
    handleDelete=()=>{

    }
    render() {
        const columns=[
            {
                title:'地区',
                dataIndex:'areaCodeStr',
                key:'areaCodeStr'
            },
            {
                title:'对接类型',
                dataIndex:'appType',
                key:'appType'
            },
            {
                title:'账号',
                dataIndex:'appId',
                key:'appId'
            },
            {
                title:'数据提交地址',
                dataIndex:'',
                key:''
            },
            {
                title:'操作',
                key:'',
                render:(text,record)=>(
                    <span>
                        <a href="javascript:;" onClick={()=>this.handleEdit(record)}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm title="确认删除？" okText="确定" cancelText="取消"  onConfirm={() => this.handleDelete(record)}>
                        <a href="javascript:;">删除</a> 
                        </Popconfirm>                   
                    </span>
                ),
            },
        ];
        return (
            <div className={styles.content}>
                    <div style={{overflow:'hidden'}}>
                        <Button style={{float:'right'}} onClick={()=>this.handleBind()}>绑定住建部账号（数据提交）</Button>
                    </div>                  
                    <Modal
                        title="绑定住建部上传账号"
                        visible={this.state.openBindingAccountForm}
                        onOk={this.handleOk}
                        onCancel={()=>{this.setState({openBindingAccountForm:false})}}
                        footer={null}
                        maskClosable={false}
                        >
                        <BindingAccountForm _this={this} record={this.state.record}/>
                    </Modal>
                    <Table 
                        dataSource={this.props.supermanage.buildAccountList}
                        columns={columns}
                    />
            </div>
        )
    }
}
