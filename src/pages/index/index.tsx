import React, { useState } from 'react'
import styles from './index.module.less'
import { Steps, Card, Button, Toast, TabBar} from 'antd-mobile'
import { 
  AntDesignOutlined, 
  RightOutlined ,   
  HomeOutlined,
  MessageOutlined,
  UnorderedListOutlined,
  UserOutlined,} from '@ant-design/icons'
const { Step } = Steps

interface props{
  value:string;
}

export default function Home(props:any){
  return(
    <div>
    <Card
      title={
        <div style={{ fontWeight: 'normal' }}>
          <AntDesignOutlined
            style={{ marginRight: '4px', color: '#1677ff' }}
          />
          {props.value|| '无'}
        </div>
      }
      extra={<RightOutlined />}
      // onBodyClick={()=>{}}
      // onHeaderClick={onHeaderClick}
      style={{ borderRadius: '16px' }}
    >
      <div className={styles.content}>卡片内容</div>
      <div className={styles.footer} onClick={e => e.stopPropagation()}>
        <Button
          color='primary'
          onClick={() => Toast.show('点击了底部按钮')}
        >
          底部按钮
        </Button>
      </div>
    </Card>

    <Steps current={1}>
          <Step title='标题1' description='描述' />
          <Step title='标题2' description='描述' />
          <Step title='标题3' description='描述' />
        </Steps>
</div>
  )
}



