import React, { Component } from 'react'
import {Row,Col,Upload ,Icon} from 'antd'
import {isEmpty} from "@/utils/utils"

export default class CarDetailInfo extends Component {
    state={
        fileList :[]
      }
      componentDidMount() {
        const {record} = this.props;
        let imgList = [];
        console.log(record)
        // if (!isEmpty(record)) {
        //   record.imgList.map((item,index)=>{
        //     let img = {};
        //     img.url = "http://file.1024sir.com/" + item;
        //     img.uid = index;
        //     img.name = "图片";
        //     img.status = "done";
        //     imgList.push(img);
        //   })
        //   this.setState({
        //     fileList: imgList
        //   });
        // }
      }
  render() {
      const {record} = this.props
      console.log(record)
      const {fileList} = this.state
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
            品牌：{record.sign}
          </Col>
          <Col span={12}>
            颜色：{record.color}
          </Col>
        </Row>
        <Row span={24} style={{marginTop:'20px'}}>
          <Col span={12}>
            荷载人数：{record.seatNum}
          </Col>
          <Col span={12}>
            购买日期：{record.buyDate}
          </Col>
        </Row>
        <Row span={24} style={{marginTop:'20px'}}>
            <Col span={12}>
              车辆类型：{record.carType}
            </Col>
            <Col span={12}>
              车牌号：{record.cardNumber}
            </Col>
        </Row>
      </div>
    )
  }
}
