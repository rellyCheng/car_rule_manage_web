import React, { Component } from 'react'
import { Col,Row} from 'antd';
import styles from './Common.less';
export default class AttendanceDetail extends Component {
    render() {
        const {record} = this.props;
        console.log(record);
        return (
            <div>
               <Row span={24}>
                    <Col span={6}>考勤时间</Col>
                    <Col span={6}>123</Col>
                    <Col span={6}>证件类型</Col>
                    <Col span={6}>123</Col>
                    <Col span={6}>证件号码</Col>
                    <Col span={6}>123</Col>
                    <Col span={6}>进出方向</Col>
                    <Col span={6}>123</Col>
                    <Col span={6}>班组编号</Col>
                    <Col span={6}>123</Col>
                    <Col span={6}>通道</Col>
                    <Col span={6}>123</Col>
                    <Col span={6}>通行方式</Col>
                    <Col span={6}>123</Col>
                    <Col span={6}>经度</Col>
                    <Col span={6}>123</Col>
                    <Col span={6}>纬度</Col>
                    <Col span={6}>123</Col>
               </Row>
            </div>
        )
    }
}
