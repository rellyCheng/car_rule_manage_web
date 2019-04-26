import React, { Component } from 'react'
import styles from './index.less';
import { Table } from 'antd';
import { connect } from 'dva';
export default class ProjectCorpDetail extends Component {
  render() {
    const {data,global} = this.props;
    console.log(data);
    return (
     <div>
        <div className={styles.digbox}>
            <div>
                <h5>企业名称：</h5><span>{data.corpName}</span>
            </div>
            <div>
                <h5>参建企业统一社会信用代码：</h5><span>{data.corpCode}</span>
            </div>
            <div>
                <h5>参建企业类型：</h5>
                <span>
                  {
                    data.corpType=="001"?'专业分包':(data.corpType=="002")?"设备分包"
                    :(data.corpType=="003")?"材料分包":(data.corpType=="004")?"后勤服务"
                    :(data.corpType=="005")?"特殊设备":(data.corpType=="006")?"劳务分包"
                    :(data.corpType=="007")?"监理":(data.corpType=="008")?"建设单位"
                    :(data.corpType=="009")?"总承包单位":(data.corpType=="010")?"勘察"
                    :(data.corpType=="011")?"设计单位":(data.corpType=="010")?'其它':''
                  }
                </span>
            </div>               
            <div>
                <h5>项目经理名称：</h5><span>{data.pmName}</span>
            </div>
            {/* <div>
                <h5>项目经理证件类型：</h5><span>{data.pmIdCardTypeStr}</span>
            </div> */}
            {/* <div className={styles.fullDiv}> */}
            {/* <div>
                <h5>项目经理证件号码：</h5><span>{data.pmIdCardNumber}</span>
            </div> */}
            <div>
                <h5>项目经理联系电话：</h5><span>{data.pmPhone}</span>
            </div>
            <div>
                <h5>进场时间：</h5><span>{data.entryTime}</span>
            </div>
            <div>
                <h5>退场时间：</h5><span>{data.exitTime}</span>
            </div>     
        </div>  
    </div>       
    )
  }
}
