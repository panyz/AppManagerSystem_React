# AppManagerSystem_React（App管理平台系统）
## 简介
> 基于create-react-app手脚架创建的项目，使用React.js进行开发的App管理平台系统Web前端工程。

做了2年的Android开发，第一次使用react去折腾一个前端项目，如有做得不好的地方，还望纠正。

为什么做一个App管理平台系统?因为每次发布App的时候都是用公司N年前开发的一个发布系统，界面难看且落后。所以抽时间想自己也搞一个出来，折腾新的技术也是挺有趣的。

为什么选择React?因为之前我用过纯React Native和干货集中营开放的API开发过一个App应用[GankAndPanyz](https://github.com/panyz/GankAndPanyz)，所以还算是熟悉React的语法。

第一次跨岗去尝试前后端分离，嗯！服务端代码也是自己来搞（使用的是Spring+SpringMVC+MyBatis）和MySQL数据库，虽然对一些原理还不是很深入，但是能把系统做了出来，收获还是挺大的。从移动端->前端->后端->全栈工程师，挺进！

[项目源码Github地址](https://github.com/panyz/AppManagerSystem_React)

## 功能
1. **登录功能**
2. **数据统计功能**：App登录统计、App下载统计
3. **项目管理功能**：项目的添加、编辑、删除、整合了Android、iOS下载二维码
4. **App管理功能（Android、iOS）**：根据场景App分为正式环境和测试环境进行展示每个App的本地链接下载和二维码下载
5. **版本发布功能**：根据对应的手机系统上传安装包和相应的信息进行版本发布

## 使用到的第三方框架
- ant design of react：UI框架
- React-Router：路由框架
- fetch: 网络请求框架
- moment：日期处理框架
- rechart：图表框架
- qrcode.react 二维码框架
- crypto-js：加密解密框架

## 截图
![login](https://upload-images.jianshu.io/upload_images/2355123-de190f26d93b8217.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![datastatistics1](https://upload-images.jianshu.io/upload_images/2355123-aff1a91cb3da2dfe.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![datastatistics2](https://upload-images.jianshu.io/upload_images/2355123-a78ec17af295b6e6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![projectlist](https://upload-images.jianshu.io/upload_images/2355123-3f67216176c47a8c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![appmanager](https://upload-images.jianshu.io/upload_images/2355123-cf3ea9351db97b45.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![version](https://upload-images.jianshu.io/upload_images/2355123-54d434aa04cc5cfe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)