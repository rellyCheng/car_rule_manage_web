import React, { Component } from 'react';
import {Card } from 'antd';
import styles from './Common.less';

export default class CompanyInfo extends Component {
  render() {
    const {data} = this.props;
    return (
      <div>
        <Card>
                <div className={styles.box}>
                    <div>
                        <h5>工商营业执照注册号</h5>：<span>{data.licenseNum}</span>
                    </div>               
                    <div>
                        <h5>注册地区编码</h5>：<span>{data.areaCodeStr}</span>
                    </div>
                    <div>
                        <h5>企业营业地址</h5>：<span>{data.address}</span>
                    </div>
                    <div>
                        <h5>邮政编码</h5>：<span>{data.zipCode}</span>
                    </div>
                    
                    <div>
                        <h5>法定代表人姓名</h5>：<span>{data.legalMan}</span>
                    </div>
                    <div>
                        <h5>法定代表人证件号码</h5>：<span>{data.legalManIDCardNumber}</span>
                    </div>   
                    <div>
                        <h5>注册资本（万元）</h5>：<span>{data.regCapital}</span>
                    </div>                 
                    <div>
                        <h5>实收资本（万元）</h5>：<span>{data.factRegCapital}</span>
                    </div>
                    <div>
                        <h5>资本币种</h5>：<span>{data.capitalCurrencyTypeStr}</span>
                    </div>
                    <div>
                        <h5>注册日期</h5>：<span>{data.registerDate}</span>
                    </div>
                    <div>
                        <h5>成立日期</h5>：<span>{data.establishDate}</span>
                    </div>
                    <div>
                        <h5>办公电话</h5>：<span>{data.officePhone}</span>
                    </div>
                    <div>
                        <h5>传真号码</h5>：<span>{data.officePhone}</span>
                    </div>
                    <div>
                        <h5>企业邮箱</h5>：<span style={{color:'#40a9ff'}}>{data.email}</span>
                    </div>
                    <div>
                        <h5>企业网址</h5>：<span style={{color:'#40a9ff'}}><a href={data.website}>{data.website}</a></span>
                    </div>                                 
                </div>                
            </Card>     
      </div>
    )
  }
}
