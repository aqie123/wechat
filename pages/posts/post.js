// 这里只能使用相对路径
var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 这里获取的就是下面绑定数据
    // 小程序总是会读取data对象来做数据绑定
    // 这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
    color:"redred"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 这里是 删除掉模拟数据(从服务器请求数据放在这里 )

    // 直接赋值 这里不起作用
    // this.data.postList = postsData.postList
  
    this.setData({
      postList: postsData.postList
    }); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onhide");
  },

  
  // 点击新闻跳转到详情页
  onPostTap:function(event){
    console.log("aqie");
    // 拿到当前点击postid 并传递到详情页
    var postId = event.currentTarget.dataset.postid;
    
    wx.navigateTo({
      url:"postDetail/postDetail?id="+postId
    })
    
  },

  //swiper跳转到详情页面
  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "postDetail/postDetail?id=" + postId
    })
  }
})