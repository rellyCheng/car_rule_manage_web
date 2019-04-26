import React, { Component } from 'react'
import {Table} from 'antd';
export default class ProjectBuilderLicenseList extends Component {
  render() {
    // 项目施工许可证
    const columns2 = [{
      title: '工程名称',
      dataIndex: 'projectName',
      key: 'projectName',
    }, {
      title: '施工许可证号',
      dataIndex: 'builderLicenseNum',
      key: 'builderLicenseNum',
    }];
    return (
      <div>
        
        <Table
            // dataSource={project.builderLicenseList}
            // style={{ marginBottom: 24 }}
            // pagination={false}
            // loading={loading2}
            // rowKey="builderLicenseNum"
            columns={columns2} 
          />
      </div>
    )
  }
}
