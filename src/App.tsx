import React, { useEffect, useState } from 'react'
import Vconsole from 'vconsole'
import styles from './App.module.less'
import { Steps, Card, Button, TabBar} from 'antd-mobile'
import { 
  HomeOutlined,
  MessageOutlined,
  UnorderedListOutlined,
  UserOutlined,} from '@ant-design/icons'

import Mine from './pages/mine/mine' 
import {getLocationStorage} from './utils/function'
import {Toast} from './utils/utils'


const { Step } = Steps

function App() {
  const tabs = [
    {
      key: 'scripts',
      title: '我的脚本',
      icon: <UnorderedListOutlined />,
      badge: '5',
    },
    {
      key: 'envs',
      title: '我的变量',
      icon: <MessageOutlined />,
      badge: '99+',
    },
    {
      key: 'file',
      title: '我的文件',
      icon: <HomeOutlined />,
      badge: '',
    },
    {
      key: 'auth',
      title: '后端配置',
      icon: <UserOutlined />,
    },
  ]

  const [activeKey, setActiveKey] = useState('scripts')

  // useEffect( ()=>{
  //   const vconsole = new Vconsole()
  // },[] )

  // 渲染主要视图
  const content = (index:string)=>{
    const Foo = React.lazy(() => import('./pages/auth/auth'));
    const Bar = React.lazy(() => import('./pages/scripts/index'));
    const Zar = React.lazy(() => import('./pages/envs/index'));
    const Har = React.lazy(() => import('./pages/files/index'));

    if(!getLocationStorage('token')){
      // Toast.show('没登录就乖乖登录')
      Toast('没登录就乖乖登录')
      return (
        <React.Suspense fallback={<div>loading...</div>}>
              <Foo/>
          </React.Suspense>
      );
    }

    switch(index){
      case 'auth': return (
        <React.Suspense fallback={<div>loading...</div>}>
              <Foo/>
          </React.Suspense>
      );break;

      case 'scripts': return (
        <React.Suspense fallback={<div>loading...</div>}>
              <Bar/>
          </React.Suspense>
      );break;

      case 'envs': return (
        <React.Suspense fallback={<div>loading...</div>}>
              <Zar/>
          </React.Suspense>
      );break;

      case 'file': return (
        <React.Suspense fallback={<div>loading...</div>}>
              <Har/>
          </React.Suspense>
      );break;

      // case 'todo': return <Home value={index}></Home>; break;
      // case 'mine': return <Result></Result>; break;
      default : return <Mine value={'其他'}></Mine>; break;
    }
  }

  return (
    <div className={styles.app}>
        <div style={{width:'100%',overflow: 'auto', maxHeight:'90vh',  background:'#f0f0f0'}}>
          {/* <Scripts/> */}
          {content(activeKey)}
        </div>

        <div className={styles.tarbar}>
          <TabBar onChange={setActiveKey} defaultActiveKey={tabs[0].key}>
            {tabs.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}  />
            ))}
          </TabBar>
        </div>
    </div>
  )
}

export default App
