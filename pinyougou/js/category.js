$(function () {
  init();

  function init() {
    getCategories();
    clickCategories();
    eventList();
  }
  // 滚动插件
  function loaded() {
    // myScroll1 = new IScroll('#rightScroll');
    $(".right .checked img").on("load", function () {
      // console.log(123);

    });
  }

  function getCategories() {
    // http://api.pyg.ak48.xyz/api/public/v1/categories
    $.get("categories", function (res) {
      // console.log(res);
      var categoriesTemp = template("categoriesTemplate", {
        data: res.data
      });
      // console.log(categoriesTemp);
      $(".left").html(categoriesTemp);
      leftScroll = new IScroll('#leftScroll');
      // var cgContentTemp = template("cgContentTemplate", {data: res.data});
      // console.log(cgContentTemp);
      // $(".right").html(cgContentTemp);
      // loaded();
      Datas = res.data;
      renderRight(0);
    });
  }
  var CategoriesIndex = 0;

  function clickCategories() {
    $(".left").on("tap", "li", function () {
      // console.log($(this).index());
      var CategoriesIndex = $(this).index();
      // console.log(CategoriesIndex);
      $(this).addClass("checked").siblings().removeClass("checked");
      // $(".right>ul>li").eq(CategoriesIndex).addClass("checked").siblings().removeClass("checked");
      // loaded();
      leftScroll.scrollToElement(this);
      renderRight(CategoriesIndex);
    })
  }

  // 根据索引来渲染右侧的数据
  function renderRight(index) {
    // console.log(index);

    var arr = Datas[index].children;
    // console.log(arr);
    var cgContentTemp = template("cgContentTemplate", {
      arr: arr
    });
    // console.log(cgContentTemp); 
    $(".right").html(cgContentTemp);

    var nums = $(".right img").length;
    $(".right img").on("load", function () {
      nums--;
      if (nums == 0) {
        rightScroll = new IScroll('#rightScroll');
      }
    });
  }

  function eventList() {
    $(".right").on("tap", "a", function () {
      // console.log($(this));
      var href = this.href;
      location.href = href;
    })
  }

})