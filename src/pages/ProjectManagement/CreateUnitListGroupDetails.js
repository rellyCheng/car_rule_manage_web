import React, { Component, Suspense } from 'react';
import {} from 'antd';
import styles from './Common.less';
import { connect } from 'dva';
export default class CreateUnitListGroupDetails extends React.Component {
    state={

    }
    render() {
        // const { project } = this.props;
        // console.log(project)
        return (
            <div>
                <div className={styles.box}>
                    <div>
                        <h5>班组长姓名</h5>：<span></span>
                    </div>
                    <div>
                        <h5>班组长联系电话</h5>：<span></span>
                    </div>
                    <div>
                        <h5>班组长证件类型</h5>：<span></span>
                    </div>               
                    <div>
                        <h5>班组长证件号码</h5>：<span></span>
                    </div>
                    <div>
                        <h5>责任人证件类型</h5>：<span></span>
                    </div>
                    <div>
                        <h5>责任人证件号码</h5>：<span></span>
                    </div>
                    
                    <div>
                        <h5>进场日期</h5>：<span></span>
                    </div>
                    <div>
                        <h5>进场附件</h5>：<span></span>
                    </div>
                    <div>
                        <h5>出厂日期</h5>：<span></span>
                    </div>
                    <div>
                        <h5>出厂附件</h5>：<span></span>
                    </div>                                   
                </div> 
                <div className={styles.box1}>
                    <div>
                        <h5>备注</h5>：<span></span>
                    </div>                  
                </div>
            </div>         
        );
    }
}