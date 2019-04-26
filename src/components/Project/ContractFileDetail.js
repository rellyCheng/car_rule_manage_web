import React, { Component } from 'react'
import style from './Common.less';
export default class ContractFileDetail extends Component {
    render() {
        const {record} = this.props;
        console.log(record);
        return (
            <div>
                {
                    record.attachments.map((item,index)=>{
                        return <div key={index} className={style.link}>
                             <p>链接名称：<a className={style.url} target='_bank' href={item.url}>{item.name}</a></p>
                             <p>链接地址：<a  className={style.url} target='_bank' href={item.url}>{item.url}</a></p>
                        </div>
                    })
                }
            </div>
        )
    }
}
