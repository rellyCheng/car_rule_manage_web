import React, { Component } from 'react'
import { Row, Col,DatePicker,Button } from 'antd';
import styles from './index.less';
import {connect} from 'dva'
const { MonthPicker, RangePicker, WeekPicker} = DatePicker;

@connect(({project})=>({
  project
}))
export default class AttendanceNumber extends Component {
  render() {
    const {project} = this.props
    console.log(project.attendanceListCount)
    return (
        <div className={styles.box}>
            <Row gutter={24}>
                <Col span={4}>已进场:{project.attendanceListCount.workerNumber}人</Col>
                <Col span={5}>管理人员:{project.attendanceListCount.managerNumber}人</Col>
                <Col span={5}>建筑工人:{project.attendanceListCount.builderNumber}人</Col>
                <Col span={5}>已参建单位{project.attendanceListCount.corpNumber}人</Col>
                <Col span={5}>已参建班组:{project.attendanceListCount.teamNumber}人</Col>
            </Row>
        </div>
    )
  }
}
