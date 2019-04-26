import React, { Component, Suspense } from 'react';
import {Card} from 'antd';
import styles from './Common.less';
import Link from 'umi/link';
import { connect } from 'dva';
@connect(({ business}) => ({
    business,
}))
export default class BusinessInfor extends React.Component {
    state={

    }
    render() {
        const{business,loading}=this.props;
        console.log(business);
        return (
            <Card loading={loading}>
                <div className={styles.box}>
                    <div>
                        <h5>工商营业执照注册号</h5>：<span>{business.businessListDetail.licenseNum}</span>
                    </div>               
                    <div>
                        <h5>注册地区编码</h5>：<span>{business.businessListDetail.areaCodeStr}</span>
                    </div>
                    <div>
                        <h5>企业营业地址</h5>：<span>{business.businessListDetail.address}</span>
                    </div>
                    <div>
                        <h5>邮政编码</h5>：<span>{business.businessListDetail.zipCode}</span>
                    </div>
                    
                    <div>
                        <h5>法定代表人姓名</h5>：<span>{business.businessListDetail.legalMan}</span>
                    </div>
                    <div>
                        <h5>法定代表人证件号码</h5>：<span>{business.businessListDetail.legalManIdCardNumber}</span>
                    </div>   
                    <div>
                        <h5>注册资本（万元）</h5>：<span>{business.businessListDetail.regCapital}</span>
                    </div>                 
                    <div>
                        <h5>实收资本（万元）</h5>：<span>{business.businessListDetail.factRegCapital}</span>
                    </div>
                    <div>
                        <h5>资本币种</h5>：<span>{business.businessListDetail.capitalCurrencyTypeStr}</span>
                    </div>
                    <div>
                        <h5>注册日期</h5>：<span>{business.businessListDetail.registerDate}</span>
                    </div>
                    <div>
                        <h5>成立日期</h5>：<span>{business.businessListDetail.establishDate}</span>
                    </div>
                    <div>
                        <h5>办公电话</h5>：<span>{business.businessListDetail.officePhone}</span>
                    </div>
                    <div>
                        <h5>传真号码</h5>：<span>{business.businessListDetail.officePhone}</span>
                    </div>
                    <div>
                        <h5>企业邮箱</h5>：<span style={{color:'#40a9ff'}}>{business.businessListDetail.email}</span>
                    </div>
                    <div>
                        <h5>企业网址</h5>：<span style={{color:'#40a9ff'}}><a href={business.businessListDetail.webSite}>{business.businessListDetail.webSite}</a></span>
                    </div>                                 
                </div>                
            </Card>         
        );
    }
}