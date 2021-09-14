import React,{useEffect, useState} from 'react'
import { Result,Badge, Card, Dialog, TextArea, Button, Search } from 'antd-mobile'
import {getAction, putAction} from '../../utils/requests'
import style from './index.module.less'
export default class Fuck extends React.Component{
    state = {
        records:[],
        id:null,

        queryParams:{
            searchValue:''
        }
    }

    componentDidMount(){
        this.LoadData()
    }

    LoadData = ()=>{
        getAction('/open/crons',{
            ...this.state.queryParams
        }).then(res =>{
            console.log(res.data.data);
            this.setState({
                records: res.data.data
            })
        })
    }
    /*
        查看日志
    */
    handleCardClick = (v) =>{
        console.log(v);
        getAction(`/open/crons/${v.id}/log`,{
        }).then(res =>{
            console.log(res.data.data);
            // 显示日志内容
            Dialog.show({
                closeOnMaskClick: true,
                title:v.name,
                content:  (
                    <TextArea
                    style={{ '--font-size': '12px'}}
                    defaultValue={res.data.data}
                    autoSize={{ minRows: 3 }}
                        />
                )
            })
        })
    }
    
    // 运行任务
    runTask = (id)=>{
        putAction('/open/crons/run',[id]).then(res=>{
            console.log(res.data);
        })
    }




    render(){

        const status =  (text) =>  {
            const status ={
                0:      <Badge content="已启用"
                                 style={{
                                    //  marginLeft: 12,
                                     backgroundColor: '#fff',
                                     borderRadius: 2,
                                     color: '#2ce654',
                                     border: '1px solid #2ce654',
                                 }}
                />,
                1:      <Badge content="已禁用"
                                 style={{
                                    //  marginLeft: 12,
                                     backgroundColor: '#fff',
                                     borderRadius: 2,
                                     color: '#ec1010',
                                     border: '1px solid #ec1010',
                                 }}
                />
            }
            return status[text]
        }

       return (<div style={{margin:'0px auto',width:'90%'}}>

                <Search style={{'--background':'#ffffff'}} placeholder='请输入内容' showCancelButton onSearch={v=>this.setState({queryParams:{searchValue:v}},this.LoadData)} />

            { this.state.records.map((v,index) => (
                <div key={index} className={style.card}>
                        <Card onClick={()=>this.handleCardClick({id:v._id,name:v.name})} title={v.name} extra={<div style={{marginLeft:10}}> {status(v.isDisabled)}</div>}>
                                <p>{v.schedule}</p>
                                <p>{v.status==0?'运行中':'空闲'}</p>
                        </Card>
                        <Button  color="primary" disabled={v.status==0} 
                            onClick={ ()=>
                                {
                                Dialog.show({
                                    title: '确认运行么？',
                                    closeOnAction: true,
                                    actions: [
                                      [
                                        {
                                          key: 'cancel',
                                          text: '取消',
                                        },
                                        {
                                          key: 'delete',
                                          text: '确认',
                                          bold: true,
                                          danger: true,
                                          onClick:()=>this.runTask(v._id)
                                        },
                                      ],
                                    ],
                                  })
                                }
                            }
                        >
                            运行
                        </Button>
                </div>
            ))}
        </div>)
    }
}
