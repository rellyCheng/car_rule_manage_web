import React, { Component, Suspense } from 'react';
import {Card} from 'antd';
import styles from './Common.less';
// import DescriptionList from '@/components/DescriptionList';
import { connect } from 'dva';
// const { Description } = DescriptionList;
@connect(({ project }) => ({
    project
}))
export default class information extends React.Component {
    state={

    }
    render() {
        const { project } = this.props;
        // console.log(project)
        return (
            // <Card bordered={false}>
            //     <DescriptionList size="small" title="" style={{marginBottom:10}}>
            //         <Description term="总承包单位统一社会信用代用码">{project.projectDetail.contractorCorpCode}</Description>
            //         <Description term="总承包单位名称">{project.projectDetail.contractorCorpName}</Description>
            //         <Description term="建设工程规划许可证编号">{project.projectDetail.prjPlanNum}</Description>
            //         <Description term="建设单位名称">{project.projectDetail.buildCorpName}</Description>
            //         <Description term="建设单位统一社会信用代码">{project.projectDetail.buildCorpCode}</Description>
            //         <Description term="建设用地规划许可证编号">{project.projectDetail.buildPlanNum}</Description>
            //         <Description term="总投资(万元)">{project.projectDetail.invest}</Description>
            //         <Description term="总面积(平方米)">{project.projectDetail.buildingArea}</Description>
            //         <Description term="总长度(米)">{project.projectDetail.buildingLength}</Description>
            //         <Description term="开工日期">{project.projectDetail.startDate}</Description>
            //         <Description term="竣工日期">{project.projectDetail.completeDate}</Description>
            //         <Description term="项目地址">{project.projectDetail.address}</Description>
            //         <Description term="联系人姓名">{project.projectDetail.linkMan}</Description>
            //         <Description term="联系人电话">{project.projectDetail.linkPhoneSecret}</Description>
            //         <Description term="建设规模">{project.projectDetail.prjSizeStr}</Description>
            //         <Description term="经度">{project.projectDetail.lng}</Description>
            //         <Description term="纬度">{project.projectDetail.lat}</Description>
            //         <Description term="国籍或地区">{project.projectDetail.nationNumStr}</Description>
            //         <Description term="立项文号">{project.projectDetail.approvalNum}</Description>
            //         <Description term="立项级别">{project.projectDetail.approvalLevelNumStr}</Description>
            //     </DescriptionList>
            //     <DescriptionList size="small" title="" col="1">
            //         <Description term="项目简介">{project.projectDetail.description}</Description>
            //     </DescriptionList>
            // </Card>
            <div>
                <div className={styles.box}>
                    <div>
                        <h5>总承包单位统一社会信用代用码</h5>：<span>{project.projectDetail.contractorCorpCode}</span>
                    </div>
                    <div>
                        <h5>总承包单位名称</h5>：<span>{project.projectDetail.contractorCorpName}</span>
                    </div>
                    <div>
                        <h5>建设工程规划许可证编号</h5>：<span>{project.projectDetail.prjPlanNum}</span>
                    </div>               
                    <div>
                        <h5>建设单位名称</h5>：<span>{project.projectDetail.buildCorpName}</span>
                    </div>
                    <div>
                        <h5>建设单位统一社会信用代码</h5>：<span>{project.projectDetail.buildCorpCode}</span>
                    </div>
                    <div>
                        <h5>建设用地规划许可证编号</h5>：<span>{project.projectDetail.buildPlanNum}</span>
                    </div>
                    
                    <div>
                        <h5>总投资(万元)</h5>：<span>{project.projectDetail.invest}</span>
                    </div>
                    <div>
                        <h5>总面积(平方米)</h5>：<span>{project.projectDetail.buildingArea}</span>
                    </div>   
                    <div>
                        <h5>总长度(米)</h5>：<span>{project.projectDetail.buildingLength}</span>
                    </div>                 
                    <div>
                        <h5>开工日期</h5>：<span>{project.projectDetail.startDate}</span>
                    </div>
                    <div>
                        <h5>竣工日期</h5>：<span>{project.projectDetail.completeDate}</span>
                    </div>
                    <div>
                        <h5>项目地址</h5>：<span>{project.projectDetail.address}</span>
                    </div>
                    <div>
                        <h5>联系人姓名</h5>：<span>{project.projectDetail.linkMan}</span>
                    </div>
                    <div>
                        <h5>联系人电话</h5>：<span>{project.projectDetail.linkPhoneSecret}</span>
                    </div>
                    <div>
                        <h5>建设规模</h5>：<span>{project.projectDetail.prjSizeStr}</span>
                    </div>
                    <div>
                        <h5>经度</h5>：<span>{project.projectDetail.lng}</span>
                    </div>
                    <div>
                        <h5>纬度</h5>：<span>{project.projectDetail.lat}</span>
                    </div>
                    <div>
                        <h5>国籍或地区</h5>：<span>{project.projectDetail.nationNumStr}</span>
                    </div>
                    <div>
                        <h5>立项文号</h5>：<span>{project.projectDetail.approvalNum}</span>
                    </div>
                    <div>
                        <h5>立项级别</h5>：<span>{project.projectDetail.approvalLevelNumStr}</span>
                    </div>                  
                </div> 
                <div className={styles.box1}>
                    <div>
                        <h5>项目简介</h5>：<span>{project.projectDetail.description}</span>
                    </div>                  
                </div>
            </div>         
        );
    }
}