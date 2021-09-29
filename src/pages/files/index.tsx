import React,{useEffect, useState} from 'react'
import { Result,Badge, Card, Dialog, TextArea, Divider, List, FloatingPanel, Button, Search } from 'antd-mobile'
import {getAction,putAction} from '../../utils/requests'
import {Alert} from '../../utils/utils'
import style from './index.module.less'
// code editor
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';


const anchors = [100, window.innerHeight * 0.4, window.innerHeight * 0.8]
type FloatingPanelRef = {
    setHeight: (
      height: number,
      options?: {
        immediate?: boolean // 是否跳过动画
      }
    ) => void
  }
export default class Fuck extends React.Component{
    state = {
        records:[],
        id:null,
        // editor
        editorValue:"//代码区域",
        filename:'',
        codeHeight:'600px',

        queryParams:{searchValue:''}
    }

    componentDidMount(){
        this.LoadData()
    }

    LoadData = ()=>{
        getAction('/open/scripts/files',{
            ...this.state.queryParams
        }).then(res =>{
            console.log(res.data.data);
            this.setState({
                records: res.data.data.filter( item=> item.title.indexOf(this.state.queryParams.searchValue)>-1 )
            })
        })
    }
    // 点击查看文件内容
    handleCardClick = title =>{
        console.log(title);
        getAction(`/open/scripts/${title}`,{
        }).then(res =>{
            console.log(res.data.data);
            this.setState({
                filename:title,
                editorValue:res.data.data
            })
            // 悬浮窗显示文件内容
            // Dialog.confirm({
            //     title: title,
            //     content:  (
            //         <TextArea
            //         style={{width:'100%'}}
            //         defaultValue={res.data.data}
            //         autoSize={{ minRows: 3 }}
            //             />
            //     )
            //   })
        })
    }
    // 点击保存文件
    handleFileSaving = ()=>{
        console.log('进来否？');
        
        const {filename, editorValue} = this.state
        if(filename ===''){
            Alert('狗球文件都没有选，保存锤子')
            return
        }
        putAction('/open/scripts',{
            filename:filename,
            content:editorValue
        }).then(res=>{
            if(res.data.code ===200){
                Alert('保存正常')
            }
        })
    }




    render(){
       return (<div style={{margin:'0px auto'}}>

                <Button  color="primary" 
                            onClick={ ()=>
                                {
                                Dialog.show({
                                    title: '确认保存么？',
                                    closeOnAction: true,
                                    actions: [
                                      [
                                        {
                                          key: 'cancel',
                                          text: '取消',
                                        },
                                        {
                                          key: 'confirm',
                                          text: '确认',
                                          bold: true,
                                          danger: true,
                                          onClick:this.handleFileSaving
                                        },
                                      ],
                                    ],
                                  })
                                }
                            }
                        >
                            保存
                </Button>

                <Button  color="primary" 
                        onClick={()=>{
                            this.setState({
                                codeHeight:this.state.codeHeight == '600px'?'300px':'600px' 
                            })
                        }}
                        >
                            调整代码区域
                </Button>

                <CodeMirror
                    value={this.state.editorValue}
                    height={this.state.codeHeight}
                    style={{fontSize:'13px'}}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdate) => {
                        this.state.editorValue = value // 不触发更新视图，不然卡死
                        // console.log('value:', value);
                        // this.setState({
                        //     editorValue:value
                        // })
                    }}
                />

  
                <FloatingPanel anchors={anchors}>
                <Search placeholder='请输入内容' showCancelButton onSearch={v=>this.setState({queryParams:{searchValue:v}},this.LoadData)} />
                    <List>
                    { this.state.records.map((v,index) => (
                            <List.Item key={index} onClick={()=>this.handleCardClick(v.title)}>
                                {v.title}
                            </List.Item>  
                    ))}
                    </List>
                </FloatingPanel>
        </div>)
    }
}
