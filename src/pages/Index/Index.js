import React, { Component, Suspense } from 'react';
import { Chart, Tooltip, Axis, Bar, Legend, Pie, Coord, Guide, Interval,registerShape,StackInterval } from 'viser-react';
import { formatMessage, FormattedMessage} from 'umi/locale';
import {WaterWave} from '@/components/Charts';
import {connect} from 'dva';
import {Card,Badge,Table,Divider,Button,Modal,Row,Col,Icon,Menu,Dropdown,Progress,List,Avatar,Cascader} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';
import * as _ from 'lodash';
import BasePie from '@/components/MyChart/BasePie';

const scale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
  },
];


// 工人性别分布
registerShape('interval', 'burstPie', {
  getPoints(cfg) {
    const width = cfg.size;
    const x = cfg.x;
    const min = cfg.y[0];
    const max = cfg.y[1];
    const res = [];
    for (let i = 0; i < max; i += 0.1) {
      if (min > i) {
        continue;
      } else if (min < i && min > i - 0.1) {
        res.push(
          { x: x - width / 2, y: min },
          { x: x - width / 2, y: i - 0.01 },
          { x: x + width / 2, y: i - 0.01 },
          { x: x + width / 2, y: min }
        );
      }
      const start = i;
      const end = parseFloat((i + 0.1) > max ? max : i + 0.09);
      res.push(
        { x: x - width / 2, y: start },
        { x: x - width / 2, y: end },
        { x: x + width / 2, y: end },
        { x: x + width / 2, y: start }
      );
    }
    return res;
  },
  draw(cfg, container) {
    // 将归一化后的数据转换为画布上的坐标
    const points = cfg.origin.points;
    let path = [];
    for (let i = 0; i < cfg.origin.points.length; i += 4) {
      path.push([ 'M', points[i].x, points[i].y ]);
      path.push([ 'L', points[i + 1].x, points[i + 1].y ]);
      path.push([ 'L', points[i + 2].x, points[i + 2].y ]);
      path.push([ 'L', points[i + 3].x, points[i + 3].y ]);
      path.push([ 'L', points[i].x, points[i].y ]);
      path.push([ 'z' ]);
    }
    path = this.parsePath(path, true);
    const shape = container.addShape('path', {
      attrs: {
        fill: cfg.color || '#00D9DF',
        path,
      },
    });
    return shape;
  }
});

const stackInterval1Opts = {
  shape: 'burstPie',
  position: 'percent',
  color: ['key', [ '#1890ff', '#f04864']],
};

@connect(({indexData,global})=>({
  indexData,
  global,
}))
export default class Index extends React.Component {
  componentDidMount(){
    this.fetchIndexData();
    this.fetchbasicData();
  }

  fetchIndexData = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type:'indexData/fetchIndexData',
    })
  }
  
  fetchbasicData=()=>{
    const { dispatch } = this.props;
    dispatch({
        type:'global/fetchbasicData',
    })
   }

  
  state = {
    size: 'large',
    visible:false
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  // 选择地区
  onChange=(value)=> {
  }
  //点击更多
  // handleMore = () =>{
  // }
  handleMoreSort = () =>{
    this.setState({
      visible:true
    })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  // handleClick = () =>{
  //   //必须是iframe加载完成后才可以向子域发送数据
  //   const childFrameObj = document.getElementById('calculation');
  //   childFrameObj.contentWindow.postMessage(1233, '*'); //window.postMessage
  // };
  render() {
    const size = this.state.size;

    const { indexData } = this.props;
    const allData = indexData.saveIndexData || {};
    console.log(allData);
    // 项目类型
    const sourceData_type = [
      { item: '大型', count: 0 },
      { item: '中型', count: 0 },
      { item: '小型', count: 0 },
    ];
    const projectDataDTO = allData.projectDataDTO || {}
    const prjSizeList = projectDataDTO.prjSizeList || []
    const dv_type = new DataSet.View().source(prjSizeList);
    dv_type.transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const data_type = dv_type.rows;
    // 项目状态
    const sourceData_state = [
      { item: '在建', count: 0 },
      { item: '筹备', count: 0 },
      { item: '停工', count: 0 },
      { item: '完工', count: 0 },
    ];
    const prjStatusList = projectDataDTO.prjStatusList || []
    const dv_state = new DataSet.View().source(prjStatusList);
    dv_state.transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const data_state = dv_state.rows;
    // 建筑性质图
    const data_bulid = [
      { year: '新建', sales: 0 },
      { year: '改建', sales: 0 },
      { year: '扩建', sales: 0 },
      { year: '恢复', sales: 0 },
      { year: '拆建', sales: 0 },
      { year: '拆除', sales: 0 },
      { year: '其他', sales: 0 },
    ];
    const property= projectDataDTO.propertyNumList || []
    let propertyNumList = []
    property.map((item,index)=>{
       let obj= {};
       obj.year = item.item;
       obj.sales = item.count;
       propertyNumList.push(obj)
    })
    const scale_nature = [
      {
        dataKey: 'sales',
        tickInterval: 2,
      },
    ];
    // 工人年龄分布
    const sourceData_age = [
      { item: '20岁以内', count: 0},
      { item: '20-30岁', count: 0 },
      { item: '30-40岁', count: 0},
      { item: '40-50岁', count: 0},
      { item: '50岁以上', count: 0},
    ];
    const workerDataDTO = allData.workerDataDTO || {};
    const ageList = workerDataDTO.ageList || []
    const dv_age = new DataSet.View().source(ageList);
    dv_age.transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const data_age = dv_age.rows;

    //工人性别比例
    const genderList = workerDataDTO.genderList || [];
    const dv_gender = new DataSet.View().source(genderList);
    dv_gender.transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const data_gender = dv_gender.rows;
    // 工人实名比例
      const sourceData_name = [
        { item: '已实名', count: 0 }, 
        { item: '未实名', count: 0 }
      ];
      const dv_name = new DataSet.View().source(sourceData_name);
      dv_name.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent',
      });
      const data_name = dv_name.rows;
      //工人工种排名
      const workerTypeList = workerDataDTO.workerTypeList || []
      console.log(workerTypeList)
     
    return (          
      // <div style={{height:'1200px'}}>
      // {/* <Button type="primary" onClick={this.handleClick}>点我</Button> */}
      //   <iframe id='calculation' src="http://192.168.1.44:8020/system/system.html?__hbt=1547518298655"  style={{border:0,width:"100%",height:"100%"}} ></iframe>
      // </div>
     
        <div className={styles.content}>
          <p className={styles.title}>
            <span style={{color:'#999'}}>当前选择：</span>
            <Cascader onChange={this.onChange} options={this.props.global.provinceCity}  placeholder={`请选择`} />
          </p>
          {/* 4个模块 */}
          <Row gutter={24}>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.card1}>
                <p className={styles.text1}>项目总数</p>
                <p className={styles.text2}>{projectDataDTO.countProjectNum}</p>
              </div>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.card2}>
                <p className={styles.text1}>参建单位</p>
                <p className={styles.text2}>{allData.projectCorpNum}</p>
              </div>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.card3}>
                <p className={styles.text1}>在册工人数</p>
                <p className={styles.text2}>{workerDataDTO.jobNum}</p>
              </div>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.card4}>
                <p className={styles.text1}>在岗工人数</p>
                <p className={styles.text2}>{workerDataDTO.registeredNum}</p>
              </div>
            </Col>
          </Row>
          {/*建设规模和立项级别*/}
          <Row gutter={24}>
            <Col className={styles.col} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.cardbox}>
                  <p className={styles.title}>建设规模</p>
                  <BasePie scale = {scale}  data={data_type}/>  
              </div>             
            </Col>
            <Col className={styles.col} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.cardbox}>
                  <p className={styles.title}>项目状态</p>
                  <BasePie scale = {scale} data = {data_state}/>
              </div>
            </Col>
            <Col className={styles.col} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.cardbox}>
                <Suspense fallback={null}>
                  <p className={styles.title}>建设性质</p>
                  <Chart forceFit height={280} data={propertyNumList} scale={scale_nature}>
                    <Tooltip />
                    <Axis />
                    <Bar position="year*sales" />
                  </Chart>
                </Suspense>
              </div>
            </Col>
          </Row>
          {/* 工人情况分布*/}
          <Row gutter={24}>
            <Col className={styles.col} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.cardbox}>
                <p className={styles.title}>工人年龄分布</p>
                <BasePie scale={scale} data = {data_age}/>
              </div>
            </Col>
            <Col className={styles.col} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.cardbox}>
                <Suspense fallback={null}>
                  <p className={styles.title}>工人性别比例</p>
                  {/* <Chart forceFit height={280} data={dv} scale={scale_sex}>
                    <Tooltip showTitle={false} />
                    <Coord type="theta" radius={0.8} innerRadius={0.7} />
                    <Legend padding={20}/>
                    <Axis dataKey="percent" title={{ offset: 40, text: '百分比'}} />
                    <StackInterval {...stackInterval1Opts} />
                  </Chart> */}
                  <BasePie scale = {scale} data = {data_gender}/>
                </Suspense>
              </div>
            </Col>
            <Col className={styles.col} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.cardbox} >
                  <Suspense fallback={null}>
                    <p className={styles.title}>工人实名比例</p>
                      <Chart forceFit height={280} data={data_name} scale={scale}>
                      <Tooltip showTitle={false} />
                      <Axis />
                      <Legend dataKey="item" />
                      <Coord type="theta" radius={0.75} innerRadius={0.6} />
                      <Pie
                        position="percent"
                        color="item"
                        style={{ stroke: '#fff', lineWidth: 1 }}
                        label={[
                          'percent',
                          {
                            formatter: (val, item) => {
                              return val;
                            },
                          },
                        ]}
                      />
                    </Chart>
                    
                  </Suspense>
              </div>
            </Col>
          </Row>
          {/*  */}
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.cardbox}>
                  <p className={styles.title}>工人来源排名(前5)</p>
                  <Row gutter={24}>
                    <div className={styles.div1}>
                      <span>01.四川省</span>
                      <Progress percent={0} />
                    </div>
                    <div className={styles.div1}>
                      <span>02.安徽省</span>
                      <Progress percent={0} />
                    </div>
                    <div className={styles.div1}>
                      <span>03.河南省</span>
                      <Progress percent={0} />
                    </div>
                    <div className={styles.div1}>
                      <span>04.浙江省</span>
                      <Progress percent={0} />
                    </div>
                    <div className={styles.div1}>
                      <span>05.贵州省</span>
                      <Progress percent={0} />
                    </div>                                      
                  </Row>
                  {/* <div className={styles.btnbox}>
                      <Button size={size} className={styles.btn} onClick={()=>this.handleMoreSource( )} >查看更多</Button>
                  </div> */}
              </div>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.cardbox}>
                    <p className={styles.title}>工人工种排名(前5)</p>
                    <Row gutter={24}>
                     {
                       workerTypeList.map((item,index)=>{
                         if(index<5){
                            return <div key ={index} className={styles.div1}>
                            <span>{item.item}</span>
                            <Progress percent={item.count} />
                          </div>
                         }
                       })
                     }
                   
                      {/* <div className={styles.div1}>
                        <span>02.普工</span>
                        <Progress percent={0} />
                      </div>
                      <div className={styles.div1}>
                        <span>03.钢筋工</span>
                        <Progress percent={0} />
                      </div>
                      <div className={styles.div1}>
                        <span>04.其他工种</span>
                        <Progress percent={0} />
                      </div>
                      <div className={styles.div1}>
                        <span>05.架子工</span>
                        <Progress percent={0} />
                      </div> */}
                    </Row>
                    <div className={styles.btnbox}>
                      <Button size={size} className={styles.btn} onClick={this.handleMoreSort}>查看更多</Button>
                    </div>
                </div>
            </Col>
          </Row>
          <div>
          <Modal
              title="全部工种排名"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={null}
              maskClosable={false}
            >
             {
                workerTypeList.map((item,index)=>{
                  return <div key ={index} className={styles.div1}>
                         <span>{item.item}</span>
                         <Progress percent={item.count} />
                         </div>
                      })
            }
            </Modal>
          </div>
        </div>

    );
  }
}
