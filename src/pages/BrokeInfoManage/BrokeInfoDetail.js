import React, { Component } from 'react'
import {
  Row,
  Col,
  Upload
} from "antd";
import {isEmpty} from "@/utils/utils"

export default class BrokeInfoDetail extends Component {
  state={
    fileList :[]
  }
  componentDidMount() {
    const {record} = this.props;
    let imgList = [];
    console.log(record)
    if (!isEmpty(record)) {
      record.imgList.map((item,index)=>{
        let img = {};
        img.url = "http://file.1024sir.com/" + item;
        img.uid = index;
        img.name = "图片";
        img.status = "done";
        imgList.push(img);
      })
      this.setState({
        fileList: imgList
      });
    }
  }
  render() {
    const {record} = this.props;
    const {fileList } = this.state
    console.log(record)
    return (
      <div>
        <Row span={24}>
          <Upload
            listType="picture-card"
            fileList={fileList}
          >
          </Upload>
        </Row>
        <Row span={24} style={{marginTop:'20px'}}>
          <Col span={12}>
            违章地址：{record.address}
          </Col>
          <Col span={12}>
            违章日期：{record.date}
          </Col>
        </Row>
        <Row span={24} style={{marginTop:'20px'}}>
          <Col span={12}>
            违章车牌号：{record.cardNumber}
          </Col>
          <Col span={12}>
            违章罚款金额：{record.money}
          </Col>
        </Row>
        <Row span={24} style={{marginTop:'20px'}}>
            <Col span={12}>
              违章类型：{record.type}
            </Col>
            <Col span={12}>
              违章等级：{record.level}
            </Col>
        </Row>
        <Row span={24} style={{marginTop:'20px'}}>
          <Col span={12}>
            扣除驾照的积分：{record.points}
          </Col>
        </Row>
      </div>
    )
  }
}
