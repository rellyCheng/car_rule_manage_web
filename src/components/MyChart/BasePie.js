import React, { Component, Suspense } from 'react';
import {Card,Badge,Table,Divider,Button,Modal,Row,Col,Icon,Menu,Dropdown,Progress,List,Avatar,Cascader} from 'antd';
import { Chart, Tooltip, Axis, Bar, Legend, Pie, Coord, Guide, Interval,registerShape,StackInterval } from 'viser-react';
export default class App extends React.Component {
    state={

    }
    render() {
        return (  
            <Chart forceFit height={280} data={this.props.data} scale={this.props.scale}>
                {/* 是否显示提示信息的标题 */}
                <Tooltip showTitle={false} /> 
                {/* 坐标系 */}
                <Coord type="theta" />
                {/* 图例，根据设置图形属性生成不同的图例  */}
                <Legend dataKey="item"/>
                <Pie
                    position="percent"
                    color="item"
                    label={[
                    'percent',
                    {
                        formatter: (val, item) => {
                        return  val;
                        },
                    },
                    ]}
                />
            </Chart>
        );
    }
}
