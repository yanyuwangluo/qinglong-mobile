import React,{useEffect, useState} from 'react'
import { Collapse, Result } from 'antd-mobile'
import {getAction} from '../../utils/requests'
import style from './index.module.less'

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
                    <p>{v.value}</p>
                </Collapse.Panel>
                // <div key={index} className={style.card}>
                //    <h3> {v.name} </h3>
                //    <p>{v.remarks}</p>
                //   </div>
            ))}

        </Collapse>

        </div>)
    }
}
