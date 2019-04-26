import React, { Component, Suspense } from 'react';
import {Card,Button,Tabs,Row,Col,Table,DatePicker} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EmployeeInfo from '@/components/Employee/EmployeeInfo';
import EmployeeAptitudeList from '@/components/Employee/EmployeeAptitudeList'
import EmployeeCareerList from '@/components/Employee/EmployeeCareerList'
import EmployeeRegisterList from '@/components/Employee/EmployeeRegisterList'
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';
import styles from './Common.less';
const TabPane = Tabs.TabPane;
@connect(({employeeAptitude}) => ({
    employeeAptitude,
}))
export default class EmployeeDetail extends React.Component {
  state ={
  }

  componentDidMount(){
    
  }

  fetchAptitudeList=(page = 1)=>{
    const { dispatch } = this.props;
    dispatch({
      type:'employeeAptitude/fetchAptitudeList',
      payload: {
          current:page,
          size:10,
      },
    }); 
  }
  handleOnTab = (val)=>{
   
    if(val==2){
        this.fetchAptitudeList();
    }
    if(val==3){

    }

  }


  render() {
    const {employeeAptitude,data} = this.props
    console.log("aaaaaaa")
    console.log(employeeAptitude)
    console.log("bbbbbbbbb")
    return (          
        <div className={styles.content}>
            <PageHeaderWrapper>
                <EmployeeInfo /> 
                <div className={styles.tab}> 
                    <Tabs onTabClick={this.handleOnTab}  >
                        <TabPane tab="进退场" key={1}>
                            <Link to={``}>
                                <Button>添加工人进退场信息</Button>
                            </Link>
                            <EmployeeCareerList/>
                        </TabPane>
                        <TabPane tab="资质信息" key={2}>
                            <Link to={``}>
                                <Button>添加资质信息</Button>
                            </Link>
                            <EmployeeAptitudeList/>
                        </TabPane>
                        <TabPane tab="教育培训" key={3}>
                            <Link to={``}>
                                <Button>添加教育培训</Button>
                            </Link>
                            <EmployeeRegisterList/>                   
                        </TabPane>
                    </Tabs>
                </div>
            </PageHeaderWrapper>
        </div>
    );
  }
}
