import React,{useEffect, useState} from 'react'
import { Collapse, Result } from 'antd-mobile'
import {getAction} from '../../utils/requests'
import style from './index.module.less'
import { wrap } from 'module'

export default class Fuck extends React.Component{
    state = {
        records:[]
    }

    componentDidMount(){
        getAction('/open/envs',{
            searchValue:''
        }).then(res =>{
            console.log(res.data.data);
            this.setState({
                records: res.data.data
            })
        })
    }


    render(){
       return (<div>
        <Collapse>
        { this.state.records.map((v,index) => (
                <Collapse.Panel key={index.toString()} title={v.name + ' : '+ v.remarks}>
                    <textarea style={{overflow:'wrap',width:'100%'}}>{v.value}</textarea>
                </Collapse.Panel>
            ))}

        </Collapse>
        </div>)
    }
}
