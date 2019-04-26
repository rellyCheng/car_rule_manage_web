import React, { Component } from 'react'
import styles from './Common.less';
import {Skeleton} from 'antd'

export default class ProjectInfo extends Component {
  render() {
    const {data,loading} = this.props;
    const projectDetail = data.projectDetail || {};
    console.log(data)
    return (
      <div>
          <Skeleton loading={loading} active>
          <div className={styles.box}>
              <div>
                  <h5>总承包单位统一社会信用代用码</h5>：<span>{projectDetail.contractorCorpCode}</span>
              </div>
              <div>
                  <h5>总承包单位名称</h5>：<span>{projectDetail.contractorCorpName}</span>
              </div>
              <div>
                  <h5>建设工程规划许可证编号</h5>：<span>{projectDetail.prjPlanNum}</span>
              </div>               
              <div>
                  <h5>建设单位名称</h5>：<span>{projectDetail.buildCorpName}</span>
              </div>
              <div>
                  <h5>建设单位统一社会信用代码</h5>：<span>{projectDetail.buildCorpCode}</span>
              </div>
              <div>
                  <h5>建设用地规划许可证编号</h5>：<span>{projectDetail.buildPlanNum}</span>
              </div>
              
              <div>
                  <h5>总投资(万元)</h5>：<span>{projectDetail.invest}</span>
              </div>
              <div>
                  <h5>总面积(平方米)</h5>：<span>{projectDetail.buildingArea}</span>
              </div>   
              <div>
                  <h5>总长度(米)</h5>：<span>{projectDetail.buildingLength}</span>
              </div>                 
              <div>
                  <h5>开工日期</h5>：<span>{projectDetail.startDate}</span>
              </div>
              <div>
                  <h5>竣工日期</h5>：<span>{projectDetail.completeDate}</span>
              </div>
              <div>
                  <h5>项目地址</h5>：<span>{projectDetail.address}</span>
              </div>
              <div>
                  <h5>联系人姓名</h5>：<span>{projectDetail.linkMan}</span>
              </div>
              <div>
                  <h5>联系人电话</h5>：<span>{projectDetail.linkPhoneSecret}</span>
              </div>
              <div>
                  <h5>建设规模</h5>：<span>{projectDetail.prjSizeStr}</span>
              </div>
              <div>
                  <h5>经度</h5>：<span>{projectDetail.lng}</span>
              </div>
              <div>
                  <h5>纬度</h5>：<span>{projectDetail.lat}</span>
              </div>
              <div>
                  <h5>国籍或地区</h5>：<span>{projectDetail.nationNumStr}</span>
              </div>
              <div>
                  <h5>立项文号</h5>：<span>{projectDetail.approvalNum}</span>
              </div>
              <div>
                  <h5>立项级别</h5>：<span>{projectDetail.approvalLevelNumStr}</span>
              </div>                  
          </div> 
          <div className={styles.box1}>
              <div>
                  <h5>项目简介</h5>：<span>{projectDetail.description}</span>
              </div>                  
          </div>
          </Skeleton>
      </div>         
    )
  }
}
