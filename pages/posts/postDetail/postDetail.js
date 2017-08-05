var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad:function(option){
    // 获取全局变量值
    var globalData = app.globalData;
    // 获取到列表页传过来id
    var postId = option.id;
    
    // 通过id拿到 详情页面数据
    this.data.currentPostId = postId;
    console.log(postId);
    console.log(postsData);
    // 从数组中获取数据 (前提postid对应第几个)
    var postData = postsData.postList[postId];
    console.log(postData);

    // this.data.postData = postData;  直接赋值
   
    this.setData({
      postData: postData
    })

    // 通过缓存设置值 (不主动清除一直存在)
    wx.setStorageSync('key','风暴英雄2');
    wx.setStorageSync('key2',{
      game:'风暴英雄',
      developer:'暴雪'
    })
    wx.removeStorageSync('key');  // 删除指定缓存
    // wx.clearStorageSync();            // 删除所有缓存
    
    // 读取所有收藏状态
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      // 拿到当前文章是否被收藏状态
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    }
    else {
      // 缓存中不存在postsCollected
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

    // 监听音乐播放 如果全局变量设为真，那么播放音乐
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId
      === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
   
  },


  // 文章收藏与未收藏间转换
  onColletionTap: function (event) {
    // console.log(wx.getStorageSync("key"));  输出localstorage
    this.getPostsCollectedSyc();  // 同步
    // this.getPostsCollectedAsy();  //异步
  },

  onShareTap:function(event){
    wx.removeStorageSync("key");  // 同步  wx.clearStorageSync(); 清理所有缓存
  },

  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        // that.showToast(postsCollected, postCollected);
        that.showModal(postsCollected, postCollected);
      }
    })
  },

  getPostsCollectedSyc: function () {
    var postsCollected = wx.getStorageSync('posts_collected');
    // 1.可以借助data 传递变量id
    var postCollected = postsCollected[this.data.currentPostId];
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },

  // 模态框确认收藏文章
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  // 弹出提示是否收藏
  showToast: function (postsCollected, postCollected) {
    // 更新文章是否 缓存
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  // 分享
  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: "用户 " + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
        })
      }
    })
  },
  // 音乐播放
  
  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      // app.globalData.g_currentMusicPostId = null;
      app.globalData.g_isPlayingMusic = false;
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
      app.globalData.g_isPlayingMusic = true;
    }
  },

  setMusicMonitor: function () {
    //点击播放图标和总控开关都会触发这个函数
    var that = this;
    wx.onBackgroundAudioPlay(function (event) {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.currentPostId === that.data.currentPostId) {
        // 打开多个post-detail页面后，每个页面不会关闭，只会隐藏。通过页面栈拿到到
        // 当前页面的postid，只处理当前页面的音乐播放。
        if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
          // 播放当前页面音乐才改变图标
          that.setData({
            isPlayingMusic: true
          })
        }
        // if(app.globalData.g_currentMusicPostId == that.data.currentPostId )
        // app.globalData.g_currentMusicPostId = that.data.currentPostId;
      }
      // 监听到音乐播放，将其变为true
      app.globalData.g_isPlayingMusic = true;

    });
    wx.onBackgroundAudioPause(function () {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.currentPostId === that.data.currentPostId) {
        if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
          that.setData({
            isPlayingMusic: false
          })
        }
      }
      // 音乐暂停，把全局变量设为false
      app.globalData.g_isPlayingMusic = false;
      // app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      // app.globalData.g_currentMusicPostId = null;
    });
  },
  

 
})