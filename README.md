# 介绍
基于whyour/qinglong 的2.9.1 openapi做一个青龙手机版前端，当然是闲的蛋疼的时候再写

# 功能
- 登录存token
- 查看定时任务及日志，变量， 脚本
- 运行任务

![image](https://user-images.githubusercontent.com/18437170/132957393-3505f744-0fd9-447e-9b74-0ec538be1ae8.png)
![image](https://user-images.githubusercontent.com/18437170/132981332-62e55258-49f5-4bdf-99d9-d7125752d5fe.png)



# 预览（chrome不行，https域名不让请求http接口 ， 用手机自带浏览器）
- https://qinglong.vercel.app/

# 尝试框架 
vite2 + react17 + and-desgin@5
- 数据流管理:
- 路由管理：

- 代码编辑器: `yarn add @uiw/react-codemirror@4`

# others
- index.js :配置tarbar切换（不进行路由变换)
- axios添加请求响应拦截器，全局配置请求加载动画：https://blog.csdn.net/qq_28500793/article/details/88784317


# 手机端支持环境·
- 安卓>5.0
- ios: 未知


# refer
- vite2官方文档： https://cn.vitejs.dev/guide/build.html#browser-compatibility
- 在线制作设计稿和原型图 ： js.design
- 阿里视觉设计规范： https://design.alipay.com/
