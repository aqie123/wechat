
var app = getApp();
Page({
  //resutful API
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
  },

  onLoad: function (event) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";

    // this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    // this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");

  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({  // 异步方法
      url: url,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/xml'
      },
      success: function (res) {
        console.log(res);
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail: function () {
        console.log('failed');
      },
      complete: function () {

      }
    })
  },

  /**
   * moviesDouban 从豆瓣取回数据
   */
  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      console.log(title);
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    //动态属性
    readyData[settedKey] = movies;
    this.setData(readyData);
  }

})