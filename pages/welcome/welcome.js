Page({
  onTap:function(){
    console.log("onTap"); //执行hide
    
    // 父级跳转到子级
    /*
    wx.navigateTo({
      url: '../posts/post',
    });
    */
    
    // 执行 unload
   /*
    wx.redirectTo({
      url: '../posts/post',
    })
    */
    wx.switchTab({
      url: "../posts/post"
    });

    
    // console.log("ontap");
  },
  onTextTap:function(event){
    console.log("onTextTap");
  },
  onUnload:function(){
    console.log("page unload");
  },
  onHide:function(){
    console.log("page onhide");
  }
})