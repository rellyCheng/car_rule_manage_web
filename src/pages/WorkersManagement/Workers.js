import React, { Component, Suspense } from 'react';
import {Card,Button,Divider,Tag,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import WorkersFilter from './WorkersFilter';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ worker, loading }) => ({
  worker,
loading: loading.effects['worker/fetchWorkerList'],
}))
export default class Workers extends React.Component {
  // 控制屏幕分辨率
  // constructor() {
  //   super();
  //   if(document.body.scrollWidth<1400){
  //     this.state = {xValue: "120%"};
  //   }
    
  // }
  state={
    filterVal:{}
  }
  componentDidMount(){
    this.requestList(1,{});
  }
  requestList=(pageCurrent=1,values=this.state.filterVal)=>{
    const { dispatch } = this.props;
    values.current = pageCurrent;
    values.size =10;
    dispatch({
      type: 'worker/fetchWorkerList',
      payload: values      
    });
    this.setState({
      filterVal:values
    })
  }
  handleViewDetail=(record)=>{
    router.push(`/gongren/workersDetails?workerJid=${record.workerJid}`);
  }
  render() {
    const columns = [{
      title: '工人姓名',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
    },{
      title: '人员类型',
      dataIndex: 'workerTypeStr',
      key: 'workerTypeStr',
      width: '10%',
    },{
      title: '当前项目',
      dataIndex: 'currentPrjName',
      key: 'currentPrjName',
      width: '20%',
    },{
      title: '当前聘用企业',
      dataIndex: 'workCorpName',
      key: 'workCorpName',
      width: '20%',
    },{
      title: '手机号码',
      dataIndex: 'cellPhone',
      key: 'cellPhone',
      width: '15%',
    },{
      title: '实名认证',
      dataIndex: 'certificateStatusStr',
      key: 'certificateStatusStr',
      width: '10%',
      render(certificateStatusStr){
          return certificateStatusStr == 0?'未实名认证':'已实名认证'
      }
    },{
      title: '操作',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleViewDetail(record)}>查看详情</a>
        </span>
      ),
    }];
    const { worker,loading } = this.props;
    console.log(worker)
    return (          
        <div className={styles.content}>
            <PageHeaderWrapper >
                <Card> 
                    <WorkersFilter _this={this}/>
                </Card>        
                <div className={styles.tab}> 
                <Table
                  dataSource={worker.workerList}
                  style={{ marginBottom: 24 }}
                  // scroll={{ x: this.state.xValue, y: 400 }}
                  pagination={{
                    current:worker.current,
                    pageSize:worker.size,
                    total: parseInt(worker.total),
                    showTotal:()=>{
                        return `共${worker.total}条`
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
                  rowKey="workerJid"
                  columns={columns} 
                />
                </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
