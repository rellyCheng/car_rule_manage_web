import React, { Component, Suspense } from 'react';
import {Card,Button,Divider,Tag,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Common.less';
import Link from 'umi/link';
import BusinessFilter from './BusinessFilter';
import { connect } from 'dva';
import router from 'umi/router';


@connect(({ business, loading }) => ({
  business,
  loading: loading.effects['business/fetchBusinessList'],
}))
export default class Business extends React.Component {
  state = {
    filterVal:{}
  }
  componentDidMount(){
    this.requestList(1);
  }
  requestList=(current=1,values={})=>{
    const { dispatch } = this.props;
    values.current = current
    values.size = 10
    dispatch({
      type: 'business/fetchBusinessList',
      payload: values
    });
  }
  // 查看详情
  handleDetail =(record)=>{
    router.push(`/business/businessdetails?corpJid=${record.jid}`); 
  }
  //编辑企业
  handleEdit=(record)=>{
    router.push(`/business/addcompany?corpJid=${record.jid}`); 
  }
  render() {
    const columns = [{
      title: '企业名称',
      key: 'corpName',
      width:'15%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleDetail(record)}>{record.corpName}</a>
        </span>
      ),
    }, {
      title: '企业登记注册类型',
      dataIndex: 'corpTypeStr',
      key: 'corpTypeStr',
      width:'15%'
    },{
      title: '注册所在地',
      dataIndex: 'areaCodeStr',
      key: 'areaCodeStr',
      width:'10%'
    },{
      title: '参建项目',
      dataIndex: 'joinProjectNumber',
      key: 'joinProjectNumber',
      width:'10%'
    },{
      title: '联系人姓名',
      dataIndex: 'linkMan',
      key: 'linkMan',
      width:'10%'
    },{
      title: '联系人电话',
      dataIndex: 'linkPhone',
      key: 'linkPhone',
      width:'10%'
    },
    {
      title: '操作',
      key: 'action',
      width:'10%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleEdit(record)}>编辑</a>
        </span>
      ),
  }
  ];
    const { business,loading } = this.props;
    console.log(business);
    return (          
        <div className={styles.content}>
            <PageHeaderWrapper >
            <Card> 
                <BusinessFilter  _this={this}/>
            </Card>        
            <div className={styles.tab}> 
            <Table
                dataSource={business.businessList}
                style={{ marginBottom: 24 }}
                pagination={{
                  current:business.current,
                  pageSize:business.size,
                  total: parseInt(business.total),
                  showTotal:()=>{
                      return `共${business.total}条`
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
              //   onRow={(record,rowkey)=>{
              //       return{
              //           onClick : this.handleDetail.bind(this,record,rowkey) 
              //       }
              //   }
              // }
              />
            </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
 