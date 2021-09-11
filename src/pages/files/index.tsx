import React,{useEffect, useState} from 'react'
import { Result,Badge, Card, Dialog, TextArea, Divider, List } from 'antd-mobile'
import {getAction} from '../../utils/requests'
import style from './index.module.less'

export default class Fuck extends React.Component{
    state = {
        records:[],
        id:null,
    }

    componentDidMount(){
        getAction('/open/scripts/files',{
            searchValue:''
        }).then(res =>{
            console.log(res.data.data);
            this.setState({
                records: res.data.data
            })
        })
    }

    handleCardClick = title =>{
        console.log(title);
        getAction(`/open/scripts/${title}`,{
        }).then(res =>{
            console.log(res.data.data);
            // 显示文件内容
            Dialog.confirm({
                title: title,
                content:  (
                    <TextArea
                    style={{width:'100%'}}
                    defaultValue={res.data.data}
                    autoSize={{ minRows: 3 }}
                        />
                )
              })
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

       return (<div style={{margin:'0px auto'}}>
            <List>
            { this.state.records.map((v,index) => (
                    <List.Item key={index} onClick={()=>this.handleCardClick(v.title)}>
                        {v.title}
                    </List.Item>  
            ))}
            </List>
        </div>)
    }
}
