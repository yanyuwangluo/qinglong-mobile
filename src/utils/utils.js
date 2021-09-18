import { T } from 'react-toast-mobile';

// 提示
export const Alert = (v)=> { T.alert(v)  }
// 没用的toast
export const Toast = (v)=> { T.notify(v)  }