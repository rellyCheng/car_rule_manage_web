import React, { Component } from 'react'
import {Table} from 'antd';
export default class LabourPackageList extends Component {
  // 专业分包详情跳转
  handleLaoWuDetail=(record)=>{
    router.push(`/project/projectDetails/laowulist?projectJid=${record.jid}`);
  }
  render() {
    // 专业分包
    const columns = [{
      title: '劳务包名称',
      key: 'name',
      dataIndex: 'name',
      width:'18%'
    }, {
      title: '劳务公司',
      dataIndex: 'labourCompanyName',
      key: 'labourCompanyName',
      width:'18%'
    }, {
      title: '发包单位',
      dataIndex: 'proprietorName',
      key: 'proprietorName',
      width:'18%'
    },{
      title: '在岗工人',
      dataIndex: 'currentWorkerNumber',
      key: 'currentWorkerNumber',
      width:'10%'
    },{
      title: '工资异常',
      dataIndex: 'payRollErrorNumber',
      key: 'payRollErrorNumber',
      width:'10%'
    },{
      title: '工人投诉',
      dataIndex: 'workerComplainNumber',
      key: 'workerComplainNumber',
      width:'10%'
    },
    {
      title: '状态',
      dataIndex: 'projectStateStr',
      key: 'projectStateStr',
      width:'6%',
      render:(text,record)=>{
        return(<span>{parseInt(record.projectStateStr) ==0?'未立项'
        :(parseInt(record.projectStateStr)==1)?'查看处理结果'
        :(parseInt(record.projectStateStr)==2)?'已中标'
        :(parseInt(record.projectStateStr)==3)?'已验收'
        :(parseInt(record.projectStateStr)==4)?'已完结'
        :(parseInt(record.projectStateStr)==5)?'已过报':'000'}</span>)
      },
    },{
      title: '操作',
      key: 'action',
      width:'10%',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={()=> this.handleLaoWuDetail(record)}>查看详情</a>
        </span>
      ),
    }];
    const {data,loading } = this.props;
    return (
      <div>
          <Table
              dataSource={data.laoWuList.result}
              style={{ marginBottom: 24 }}
              pagination={{
                current:data.laoWuList.current,
                pageSize:data.laoWuList.size,
                total: parseInt(data.laoWuList.total),
                showTotal:()=>{
                    return `共${data.laoWuList.total}条`
                },
                showQuickJumper:true,
                onChange:(current)=>{
                  this.setState({
                    current:current
                  })
                  this.props.fetchList(current);
                },
              }}
              loading={loading}
              rowKey="labourJid"
              columns={columns} 
              // onRow={(record,rowkey)=>{
              //     return{
              //         onClick : this.handleLaoWuDetail.bind(this,record,rowkey) 
              //     }
              // }
              // }
            />
      </div>
    )
  }
}
