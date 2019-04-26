import React, { Component } from 'react';
import {Divider,Row,Col,Button,Modal} from 'antd';
import styles from './Common.less';
import worker from '@/assets/worker.jpg';
export default class EmployeeCountryInfo extends Component {
  render() {
    const{data}=this.props;
    console.log(data);
    let ftpIp=''
    if(process.env.API_ENV=='test'){
      ftpIp = 'http://47.97.45.6:8006/';
      }else if(process.env.API_ENV=='prod'){
      ftpIp = 'http://91diyancha.com:8006/';
      }else{
      ftpIp = 'http://47.97.45.6:8006/';
    }
    const img = ftpIp+data.WorkerInfoWorkerDetail.headImageUrl;
    console.log(img)
    return (
      <div>
        <Row gutter={24}>
          <Col span={6} className={styles.imgbox}>
            <img src={data.WorkerInfoWorkerDetail.headImageUrl==''||undefined?worker:img} />
          </Col>
          <Col span={18}>
              <div className={styles.textbox}>
                  <span style={{fontSize:'18px',fontWeight:'bold'}}>{data.WorkerInfoWorkerDetail.name}</span>
                  <span className={styles.s1}>工种：{data.WorkerInfoWorkerDetail.workerTypeStr}</span>
                  <span>性别：{data.WorkerInfoWorkerDetail.genderStr}</span>
                  <span>{data.WorkerInfoWorkerDetail.cultureLevelTypeStr}</span>
                  <span>民族：{data.WorkerInfoWorkerDetail.nation}</span>
                  <Divider dashed='false'/>
              </div>
              <Row gutter={24}>
                <Col span={8}>
                    <p>证件类型：{data.WorkerInfoWorkerDetail.idCardTypeStr}</p>
                    <p>手机号码：{data.WorkerInfoWorkerDetail.cellPhone}</p>
                    <p>工人类型：{data.projectWorkerDetail.workerRoleStr}</p>
                    <p>住址：{data.WorkerInfoWorkerDetail.address}</p>
                </Col>
                <Col span={8}>
                    <p>证件号码：{data.WorkerInfoWorkerDetail.idCardNumber}</p>
                    <p>班组名称：{data.projectWorkerDetail.teamName}</p>
                    <p>政治面貌：{data.WorkerInfoWorkerDetail.politicsTypeStr}</p>
                </Col>
                <Col span={8}>
                    <p>发证机关：{data.WorkerInfoWorkerDetail.grantOrg}</p>
                    <p>是否是班组长：{data.projectWorkerDetail.teamLeader=='false'?'是':'否'}</p>
                    <p>所在企业名称：{data.projectWorkerDetail.corpName}</p>
                </Col>
              </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
