import React, { Component, Suspense } from 'react';
import {Card,Modal} from 'antd';
import styles from './Common.less';
import { connect } from 'dva';

@connect(({ worker }) => ({
    worker
}))
export default class information extends React.Component {
    state={
        openImg1:false,
        openImg2:false
    }
    handleShow = (num)=>{  
        if(num == 1){
            this.setState({
                openImg1:true,
            })
        }else{
            this.setState({
                openImg2:true,
            })
        }
    }
    render() {
        const { worker,loading} = this.props;
        console.log(worker);
        let ftpIp = "";
        if(process.env.API_ENV=='test'){
        ftpIp = 'http://47.97.45.6:8006/';
        }else if(process.env.API_ENV=='prod'){
        ftpIp = 'http://91diyancha.com:8006/';
        }else{
        ftpIp = 'http://47.97.45.6:8006/';
        }
        return (
            <div>
                <Card loading={loading} bordered={false}>
                <div className={styles.box}>
                    <div>
                        <h5>民族</h5>：<span>{worker.workerDetail.nation}</span>
                    </div>
                    <div>
                        <h5>学历</h5>：<span>{worker.workerDetail.cultureLevelTypeStr}</span>
                    </div>
                    <div>
                        <h5>学位</h5>：<span>{worker.workerDetail.degreeStr}</span>
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        <h5>籍贯</h5>：<span>{worker.workerDetail.birthPlaceCode}</span>
                    </div>
                    <div>
                        <h5>类别</h5>：<span>{worker.workerDetail.workerTypeStr}</span>
                    </div>
                    <div>
                        <h5>出生日期</h5>：<span>{worker.workerDetail.birthday}</span>
                    </div>
                </div>
                
                <div className={styles.box}>
                    <div>
                        <h5>政治面貌</h5>：<span>{worker.workerDetail.politicsTypeStr}</span>
                    </div>
                    <div>
                        <h5>是否加入工会</h5>：<span>{worker.workerDetail.joined=true?'是':'否'}</span>
                    </div>
                    <div>
                        <h5>加入工会时间</h5>：<span>{worker.workerDetail.joinedTime}</span>
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        <h5>手机号码</h5>：<span>{worker.workerDetail.cellPhoneSecretStr}</span>
                    </div>
                    <div>
                        <h5>文化程度</h5>：<span>{worker.workerDetail.cultureLevelTypeStr}</span>
                    </div>
                    <div>
                        <h5>特长</h5>：<span>{worker.workerDetail.specialty}</span>
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        <h5>是否有重大疾病史</h5>：<span>{worker.workerDetail.hasBadMedicalHistory==true?'是':'否'}</span>
                    </div>
                    <div>
                        <h5>紧急联系人姓名</h5>：<span>{worker.workerDetail.urgentLinkMan}</span>
                    </div>
                    <div>
                        <h5>紧急联系电话</h5>：<span>{worker.workerDetail.urgentLinkManPhoneSecretStr}</span>
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        <h5>当前工种</h5>：<span>{worker.workerDetail.workTypeCodeStr}</span>
                    </div>
                    <div>
                        <h5>当前聘用企业</h5>：<span>{worker.workerDetail.workCorpName}</span>
                    </div>
                    <div>
                        <h5>开始工作日期</h5>：<span>{worker.workerDetail.workDate}</span>
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        <h5>婚姻状况</h5>：<span>{worker.workerDetail.maritalStatusStr}</span>
                    </div>
                    <div>
                        <h5>发证机关</h5>：<span>{worker.workerDetail.grantOrg}</span>
                    </div>
                    <div>
                        <h5>正面照URL</h5>：<span style={{display:worker.workerDetail.positiveIdCardImageUrl==""||undefined?'none':'inline-block'}}><a href="javascript:;" onClick={()=>this.handleShow('1')}>点击查看</a></span>
                        {/* <h5>正面照URL</h5>：<span>{worker.workerDetail.positiveIdCardImageUrl}</span> */}
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        {/* <h5>反面照URL</h5>：<span>{worker.workerDetail.negativeIdCardImageUrl}</span> */}
                        <h5>反面照URL</h5>：<span style={{display:worker.workerDetail.negativeIdCardImageUrl==""||undefined?'none':'inline-block'}}><a href="javascript:;" onClick={()=>this.handleShow('2')}>点击查看</a></span>
                    </div>
                    <div>
                        <h5>有效开始日期</h5>：<span>{worker.workerDetail.startDate}</span>
                    </div>
                    <div>
                        <h5>有效结束日期</h5>：<span>{worker.workerDetail.expiryDate}</span>
                    </div>
                </div>
                <div className={styles.box}> 
                    <div>
                        <h5>住址</h5>：<span>{worker.workerDetail.address}</span>
                    </div>
                </div>
                </Card>
                <Modal
                    title="正面照"
                    visible={this.state.openImg1}
                    onCancel={()=>{this.setState({openImg1:false})}}
                    footer={null}
                    maskClosable={false}
                >
                <img src={ftpIp+worker.workerDetail.positiveIdCardImageUrl}/>
                </Modal>
                <Modal
                    title="反面照"
                    visible={this.state.openImg2}
                    onCancel={()=>{this.setState({openImg2:false})}}
                    footer={null}
                    maskClosable={false}
                >
                <img src={ftpIp+worker.workerDetail.negativeIdCardImageUrl}/>
                </Modal>
            </div>            
        );
    }
}