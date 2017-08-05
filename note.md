1.小程序特点
    业务逻辑简单，跨平台
    低频性
    性能要求不高
    template思想
    es6
    没有dom
2.
    b2c(京东 淘宝)
    p2p（微信）
    c2p（小程序 人与服务）
3. 单步 f10 f8
4. 小程序文件类型与目录结构
5. 注册小程序页面 VIew Image Text
6.Flex弹性盒
7.移动端分辨率 RPX
8.js json wxml wxss
9.移动设备分辨率
  ip6 分辨率375pt    给750设计图    750px
  pt:逻辑分辨率(和视觉相关，长度单位 大小和屏幕尺寸相关) 
     一个pt可以有1，2，3px构成
  px:物理分辨率
10.小程序里面px指的逻辑分辨率,是长度单位   ip6 width:"350px" 250px 也就是设计图(物理像素)/2
                              750rpx  500rpx
    ip6设计话 rpx和设计图是一比一   1px = 1rpx                         
11.在不同分辨率下做自适应
  ip6 750*1334设计稿 在小程序中一rpx做分辨率
  ip6下 1px = 1rpx= 0.5pt
  使用rpx，小程序会自动在不同分辨率下转换
  文字，标题不太适合用rpx
12. 新闻阅读列表 (f1  快捷键)
    1.swiper组件
    2.app.json 导航栏，标题配置
    3.page页面和程序生命周期
    4.数据绑定(核心)
    5.数据绑定运算与逻辑
    6.AppData区域
    7.事件与事件对象
    8.缓存
    9.列表渲染(核心)
    10.Template模板（核心）
13.  #b3d4db  #405f80 深色
      post.js  Page({})
14.   onload->onshow->onready   
15. 控制标签元素显示隐藏 wx:if="{{false}}"
16.点击事件 导航api
    bindTap
    catchtap : 阻止冒泡
17.alt+shift+f  格式化代码 
   样式和模板复用(样式记得引用)
   require方法引用数据文件
   require方法引用模板文件

   去掉模板里面 item <template is="postItem" data="{{...item}}" />
   ...将数据展开

   appData记载所有页面数据绑定
   webview 
   
18. 
 // 同步设置缓存
  wx.setStorageSync('key', {
        game:"DOTA2",
        developer:"vendor"
    });   

19.onload 添加音乐监听  
  音乐播放问题：
    主程序和页面音乐播放同步
    退出页面在进入要记录播放状态,
      解决： 记录播放状态(全局变量g_isPlayingMusic)  f10 走到下一步断点
    播放后退出再到其他页面，播放显示状态错误
      (g_currentMusicPostId)
20.
  wx.clearStorage  真机上清空所有缓存   
  template 图片使用绝对路径 
21.
  swiper组件跳转

22.
  把页面放到list下面才会出现tabbar
  电影
    moviegrid
    movielist
    movie
    star
23.豆瓣API
    1.http://api.douban.com/v2/movie/subject/26683290   
    2,写完模板样式要引用 
    3.获取到数据通过data传到template里面去
  
