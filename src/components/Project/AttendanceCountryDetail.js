import React, { Component } from 'react'
import { Col,Row} from 'antd';
import styles from './Common.less';
export default class AttendanceCountryDetail extends Component {
    render() {
        const {record} = this.props;
        console.log(record);
        return (
            <div>
               <Row span={24} style={{lineHeight:'40px'}}>
                    <Col span={4}>考勤时间：</Col>
                    <Col span={8}>{record.date}</Col>
                    <Col span={4}>证件类型：</Col>
                    <Col span={8}>身份证</Col>
               </Row>
               <Row span={24} style={{lineHeight:'40px'}}>
                    <Col span={4}>证件号码：</Col>
                    <Col span={8}>{record.idCardNumber}</Col>
                    <Col span={4}>进出方向：</Col>
                    <Col span={8}>{record.direction=='01'?'入场':'出场'}</Col>
               </Row>
               <Row span={24} style={{lineHeight:'40px'}}>
                    <Col span={4}>班组编号：</Col>
                    <Col span={8}>{record.teamSysNo}</Col>
               </Row>
            </div>
        )
    }
}
