import React, { Component } from 'react'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table,Card} from 'antd'
import router from 'umi/router';
import { connect } from 'dva';

@connect(({account,loading }) => ({
    account,
    loading: loading.effects['account/fetchUnuploadeWorker'],
  }))
export default class UnuploadedWorker extends Component {
    componentDidMount(){
        this.fetchUnuploadeWorker();
    }
    handleProjectDetail=(record)=>{
     router.push(`/project/projectDetails?projectJid=${record.projectJid}`)
    }
    fetchUnuploadeWorker=(current=1)=>{
        const {dispatch} = this.props;
        let values={}
        values.current = current,
        values.size = 10
        dispatch({
            type:'account/fetchUnuploadeWorker',
            payload:values
        }) 
    }
    render() {
    const columns = [{
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
        render:(text,record)=>{
           return  <a href="javascript:;" onClick={()=>this.handleProjectDetail(record)}>{text}</a>
        }
    }, {
        title: '未上传工人数量',
        dataIndex: 'workerNum',
        key: 'workerNum',
    }];
    const {loading,account} = this.props
    const unuploadeWorker = account.unuploadeWorker
    console.log(unuploadeWorker)
    return (
      <div>
        <PageHeaderWrapper>
            <Card bordered={false}>
                <Table 
                dataSource = {unuploadeWorker.result} 
                style={{ marginBottom: 24 }}
                columns = {columns} 
                loading = {loading}
                pagination={{
                    total:parseInt(unuploadeWorker.total),
                    pageSize: unuploadeWorker.size,
                    current:unuploadeWorker.current,
                    showTotal:()=>{
                        return `共${unuploadeWorker.total}条`
                    },
                    showQuickJumper:true,
                    onChange:(current)=>{
                        this.setState({
                            current:current
                        })
                        this.fetchUnuploadeWorker(current)
                    }
                }}
                />
            </Card>
        </PageHeaderWrapper>
      </div>
    )
  }
}
