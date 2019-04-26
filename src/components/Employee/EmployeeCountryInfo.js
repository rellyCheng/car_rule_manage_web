import React, { Component } from 'react';
import {Divider,Row,Col,Button} from 'antd';
import styles from './Common.less';
import worker from '@/assets/worker.jpg';
export default class EmployeeContractInfo extends Component {
  render() {
    const record = this.props;
    console.log(record);
    // let ftpIp=''
    // if(process.env.API_ENV=='test'){
    //   ftpIp = 'http://47.97.45.6:8006/';
    //   }else if(process.env.API_ENV=='prod'){
    //   ftpIp = 'http://91diyancha.com:8006/';
    //   }else{
    //   ftpIp = 'http://47.97.45.6:8006/';
    // }
    // const img = ftpIp+record.headImageUrl;
    // console.log(img)
    return (
      <div>
        <Row gutter={24}>
        <Col span={6} className={styles.imgbox}>
            <img src={worker} />
          </Col>
          <Col span={16}>
              <div className={styles.textbox}>
                  <span style={{fontSize:'18px',fontWeight:'bold'}}>{record.workerName}</span>
                  <span>{record.workType=='10'?'管理工人':'建筑工人'}</span>
                  <span>班组：{record.teamName}</span>
                  <Divider dashed='false'/>
              </div>
              <Row gutter={24}>
                <Col span={8}>
                    <p>是否是班组长：{record.isTeamLeader==true?'是':'否'}</p>                      
                    <p>是否有劳动合同：{record.hasContract==true?'是':'否'}</p>
                    <p>是否购买工伤或意外伤害保险：{record.hasBuyInsurance==true?'是':'否'}</p>
                    <p>岗位类型：{
                      record.jobType=='1'?'施工员':
                      (record.jobType=='2')?'质量员':
                      (record.jobType=='3')?'安全员':
                      (record.jobType=='4')?'标准员':
                      (record.jobType=='5')?'材料员':
                      (record.jobType=='6')?'机械员':
                      (record.jobType=='7')?'劳务员':'资料员'
                    }</p>
                </Col>
                <Col span={8}>
                    <p>证件类型：{record.idCardType=='01'?'身份证':''}</p>
                    <p>进场时间：{record.entryTime}</p>
                    <p>退场时间：{record.exitTime}</p>
                </Col>
                <Col span={8}>
                    <p>证件号码：{record.idCardNumber}</p>
                    <p>当前聘用企业：{record.corpName}</p>
                    <p>发卡时间：{record.issueCardDate}</p>
                    <p>考勤卡号：{record.cardNumber}</p>
                </Col>
              </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
