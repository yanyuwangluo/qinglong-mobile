import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
} from 'antd-mobile'
import axios from 'axios'
import {setLocationStorage } from '../../utils/function'


export default ()=>{
  const onFinish = (values: any) => {
    const {backend, id, secret} = values
    axios(
      {url:`http://${backend}/open/auth/token?client_id=${id}&client_secret=${secret}`
    })
    .then(res=>{
      if(res.data.data.token){
        Dialog.alert({
          content:'已本地保存token' + res.data.data.token
        })
        setLocationStorage('host', `http://${backend}`)
        setLocationStorage('token', res.data.data.token)

      }else{
        Dialog.alert({
          content: '获取token失败，请检查配置项',
        })
      }
    })
  }

  return(
    <div style={{width:'100%',height:'100vh',margin:"0px auto",display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Form style={{width:'90%',height:'70%'}}
      onFinish={onFinish}
      footer={
        <Button block type='submit' color='primary'>
          提交
        </Button>
      }
    >
        <Form.Item
          name='backend'
          label='青龙后端'
          rules={[{ required: true, message: '青龙后端不能为空' }]}
        >
          <Input placeholder='请输入青龙后端（ip:port）' />
        </Form.Item>

        <Form.Item name='id' label='CLIENT ID'>
              <Input placeholder='请输入clientid' />
        </Form.Item>

        <Form.Item name='secret' label='Client Secret'>
              <Input placeholder='请输入Client Secret' />
        </Form.Item>
      </Form>
    </div>
  )

}