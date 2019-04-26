import React, { Component } from 'react'
import { Table } from 'antd';

export default class EmployeeAptitudeList extends Component {
  render() {
    const columns = [{
      title: '证书种类',
      dataIndex: 'certificationCategoriesType',
      key: 'certificationCategoriesType',
    }, {
      title: '证书名称',
      dataIndex: 'certificationName',
      key: 'certificationName',
    }, {
      title: '证书有效时间(起)',
      dataIndex: 'validBeginDate',
      key: 'validBeginDate',
    },  {
      title: '证书有效时间(止)',
      dataIndex: 'validEndDate',
      key: 'validEndDate',
    }, {
      title: '发证机关',
      dataIndex: 'grantOrg',
      key: 'grantOrg',
    }, {
      title: '资质证书状态',
      dataIndex: 'certificationStatus',
      key: 'certificationStatus',
    }, {
      title: '证书详情',
      key:'detail',
      render: (text, record) => (
        <span>
          <a href="javascript:;">查看</a>
      </span>
      ),
    },{
      title: '同步状态',
      dataIndex: '',
      key: '',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">查看失败原因</a>
          <Divider type="vertical" />
          <a href="javascript:;">重新上传</a>
        </span>
      ),
    }];
    return (
      <div>
        <Table 
        columns={columns} />
      </div>
    )
  }
}
