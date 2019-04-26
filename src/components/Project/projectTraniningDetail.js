import React, { Component } from 'react';
import styles from './index.less';
import { Table,Upload} from 'antd';
import { constants } from 'crypto';


export default class projectTraniningDetail extends Component {
  
  render() {
    const {data} = this.props; 
    const workers = JSON.parse(data.workers)
    const columns = [{
      title: '证件号码',
      dataIndex: 'idCardNumber',
      key: 'idCardNumber',
      },{
        title: '证件类型',
        dataIndex: 'idCardType',
        key: 'idCardType',
      },{
        title: '是否合格',
        dataIndex: 'isPass',
        key: 'isPass',
        },{
        title: '培训得分',
        dataIndex: 'trainingScore',
        key: 'trainingScore',
      }]

      let fileList = data.attachments.map((item,index)=>{
         item.uid = index;
         return item;
      })
    return (
      <div className={styles.dig}>
        <div className={styles.digbox}>
        <div>
            <h5>培训日期：</h5><span>{data.trainingDate}</span>
        </div>
        <div>
            <h5>培训名称：</h5><span>{data.trainingName}</span>
        </div>
        <div>
            <h5>培训时长：</h5><span>{data.trainingDuration}</span>
        </div>
        <div>
            <h5>培训类型：</h5><span>{data.trainingTypeCode}</span>
        </div>
        <div>
            <h5>培训人：</h5><span>{data.trainer}</span>
        </div>
        <div>
            <h5>培训机构：</h5><span>{data.trainingOrg}</span>
        </div>
        <div>
            <h5>培训地址：</h5><span>{data.trainingAddress}</span>
        </div>
        <div>
            <h5>培训简述：</h5><span>{data.description}</span>
        </div>
 
        <div className={styles.fullDiv}>
            <h5 style={{float:"left"}}>附件：</h5><span>
            <Upload defaultFileList={fileList}/>
            </span>
        </div>
       </div>

       <Table columns={columns} 
        dataSource={workers}
        pagination={false}
       />
    </div>
    )
  }
}
