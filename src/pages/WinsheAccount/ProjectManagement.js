import React, { Component } from 'react'
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Form,Select,Input,Button,DatePicker,Row,Col,Modal,Table,Divider,Card}   from 'antd';
import ProjectAssignPermission from './ProjectAssignPermission'
import ProjectAssignPermission2 from './ProjectAssignPermisson2'
import AddProject from '../CorporateAccount/AddProject';
import SelectArea from  '@/components/Platform/SelectArea';
import {connect} from 'dva'
const { Option } = Select;
const { RangePicker} = DatePicker;
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
import { isEmpty } from '@/utils/utils'
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import ProjectRelevance from './ProjectRelevance'

let Authorized = RenderAuthorized(getAuthority());

@Form.create()
@connect(({ account,loading,accountManage}) => ({
  account,
  loading: loading.effects['account/fetchProjectList'],
  accountManage
}))

export default class ProjectManagement extends Component {
  state = { 
      projectvisible:false,
      visible:false,
      visible2:false,
      filterVal:{},
    }

    componentDidMount(){
      this.requestList();
    }

    requestList=(current=1,values=this.state.filterVal)=>{
      const { dispatch } = this.props;
      values.current = current;
      values.size = 10;
      // values.startDate = startDate !==null ?  moment(startDate).format(dateFormat):null;
      dispatch({
        type: 'account/fetchProjectList',
        payload: values
      });
      this.setState({
        filterVal:values
      })
    }
  
    handleCancel = (e) => {
      this.setState({
        projectvisible:false,
        visible:false,
        visible2:false,
        openRelevance:false
      });
    }
    //添加项目
    handleAddProject = () => {
      this.setState({
        projectvisible:true
      });
    };
    //分配权限
    handleDistribution = (record) => {
      console.log(record.jid)
      const {dispatch} = this.props
      const { account } = this.props;
      account.singleproject=record;
      dispatch({
        type:'account/fetchSuperviseList'
      })
      this.setState({
        visible:true
      })
    };
    //分配权限2
    handleDistribution2 = (record) => {
      const {dispatch} = this.props;
      const { account } = this.props;
      account.singleproject=record;
      dispatch({
        type:'account/fetchAllWorkerList'
      })
      this.setState({
        visible2:true
      })
    };
    //关联
    handleRelevance=(record)=>{
      this.setState({
        openRelevance : true,
        gProjectJid:record.jid
      })
    }
    //查看
    handleLookDetail = (record)=>{
      router.push(`/project/projectDetails?projectJid=${record.jid}`);
      console.log(record)
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log(values)
        this.setState({
          filterVal:values
        })
        if (!err) {
          values.area = !isEmpty(values.areaCode) ?  values.areaCode[values.areaCode.length - 1] : null ;
          values.startDateFrom =  !isEmpty(values.workeDate) ? moment(values.workeDate[0]).format(dateFormat) : null ;
          values.startDateUntil = !isEmpty(values.workeDate) ? moment(values.workeDate[1]).format(dateFormat) : null ;
          this.requestList(1,values);
        }
      });
    }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: { 
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      width:'20%',
      render: (text, record) => (
          <a href="javascript:;"  onClick={() => this.handleLookDetail(record)}>{record.name}</a>      
      ),
    }, {
      title: '开工日期',
      dataIndex: 'startDate',
      key: 'startDate',
    }, {
      title: '项目状态',
      dataIndex: 'prjStatusStr',
      key: 'prjStatusStr',
    }, {
      title: '项目地址',
      dataIndex: 'areaCode',
      key: 'areaCode',
      width:'20%',
    }, {
      title: '总承包单位',
      dataIndex: 'contractorCorpName',
      key: 'contractorCorpName',
      width:'20%',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Authorized authority="B_winshe_super">
            <a href="javascript:;"  onClick={() => this.handleDistribution(record)}>分配给</a>  
            <Divider type="vertical" />          
          </Authorized>         
          <span style={{display:account.projectList.result.canView==0?'none':'inline-block'}}>
           <a href="javascript:;"  onClick={() => this.handleLookDetail(record)}>查看</a>
           <Divider type="vertical" />  
          </span>
          <Authorized authority="A_super">
          <Divider type="vertical" />  
            <a href="javascript:;"  onClick={() => this.handleDistribution2(record)}>分配给</a>
          </Authorized>
          <Authorized authority={["A_super",'B_winshe_super','A_worker']}>
          <a href="javascript:;" style={{display:!record.mohurdData?'inline-block':'none'}}  onClick={() => this.handleRelevance(record)}>关联</a>
          </Authorized>
         
        </span>
      ),
    }];    
    const { account,accountManage,loading} = this.props;
    console.log(account.projectList)
    return (
      <div>
         <PageHeaderWrapper title="项目管理">
         <Card bordered={false}>
         <Form onSubmit={this.handleSubmit}>
         <Row>
            <Col span={6}>
              <Form.Item  label="项目名称" {...formItemLayout} >  
              {getFieldDecorator('projectName')(
                  <Input placeholder="请输入项目名称"/>
              )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  label="总承包单位" {...formItemLayout} >  
              {getFieldDecorator('contractorCorpName')(
                  <Input placeholder="请输入总承包单位"/>
              )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  label="项目状态" {...formItemLayout} >  
              {getFieldDecorator('status')(
                <Select placeholder="请选择项目状态" allowClear>
                 <Option value="0">筹备</Option>
                 <Option value="1">在建</Option>
                 <Option value="2">完工</Option>
                 <Option value="3">停工</Option>
                </Select>
              )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  label="开工日期" {...formItemLayout} >  
              {getFieldDecorator('workeDate')(
                <RangePicker />
              )}
              </Form.Item>
            </Col>
            <Col span={6}>
                <SelectArea getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
            </Col>
            {/* <Authorized authority={["A_super","A_worker"]} >  */}
            <Col span={6} style={{display:'none'}}>
              <Form.Item  label="项目来源" {...formItemLayout} >  
              {getFieldDecorator('sourceType')(
                <Select placeholder="请选择项目来源" allowClear>
                 <Option value="1">本企业上传</Option>
                 <Option value="2">系统分配</Option>
                </Select>
              )}
              </Form.Item>
            </Col>
            {/* </Authorized> */}
            <Col span={6} style={{textAlign:'center'}}>
              <Button type="primary" htmlType="submit" style={{margin:'0 20px 0 0'}}>查询</Button>  
              <Authorized authority={["A_super","A_worker","B_winshe_super"]} >
                <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleAddProject}>
                  添加项目
                </Button>
              </Authorized>
            </Col>
          </Row>
         </Form>
         <Table 
          rowKey='jid'
          columns={columns} 
          dataSource={account.projectList.result}
          pagination={{
            current:account.projectList.current,
            pageSize:account.projectList.size,
            total:parseInt(account.projectList.total),
            showTotal:()=>{
              return `${account.projectList.total}条`
            },
            showQuickJumper:true,
            onChange:(current)=>{
              this.setState({
                current:current
              })
              this.requestList(current);
            },
          }}
          loading={loading}
          />
          </Card>
         </PageHeaderWrapper>
         <Modal
          title="添加项目"
          visible={this.state.projectvisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
        <AddProject _this={this}/>
        </Modal>
        <Modal
          title="分配权限(匀视)"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
        <ProjectAssignPermission _this={this}/>
        </Modal>

        <Modal
          title="分配权限(企业)"
          visible={this.state.visible2}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
        <ProjectAssignPermission2 _this={this}/>
        </Modal>
        <Modal
          title="关联项目"
          visible={this.state.openRelevance}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
        <ProjectRelevance _this={this} gProjectJid={this.state.gProjectJid}/>
        </Modal>
        <Modal
          title="添加项目"
          visible={this.state.projectvisible}
          onCancel={()=>{
            this.setState({
              projectvisible:false
            })
          }}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
        <AddProject _this={this}/>
      </Modal>
      </div>
    )
  }
}
