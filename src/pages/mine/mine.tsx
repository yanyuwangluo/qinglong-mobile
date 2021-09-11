import React, { useEffect, useState } from 'react'
import { FloatingPanel, List, Switch } from 'antd-mobile'

const data = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
]

const anchors = [100, window.innerHeight * 0.4, window.innerHeight * 0.8]

export default (props:any)=> {
  return( <div>
            <Switch/>
         </div>
  )
}

