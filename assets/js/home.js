{
    var url = window.location.href.split("/");
    var id = url[url.length - 1];
    //   console.log(id);
    if (id != undefined) {
      let ele = document.getElementById(id);
      ele.setAttribute("style", "display:block");
      // console.log(ele);
    }
  }

$(document).ready(function () {
  $.ajax({
    url: "/post/home",
    type: "get",
    success: function (response) {
      // Add response in Modal body
      $("#allPosts").html(response);
    },
  });

  $.ajax({
    url: "/friendship/friends",
    type: "get",
    success: function (response) {
      // Add response in Modal body
      $("#friendsList").html(response);
    },
  });

  $.ajax({
    url: "/friendship/" + "more-people",
    get: "get",
    // data: { type: type },
    success: function (response) {
      // Add response in Modal body
    //   $(".col-more_friends .center").append(response);
    $("#morepeople").html(response);
    },
  });
});

function showMorePeopleList(ele, type) {
  // console.log($(ele).attr("data-target"));
  $(".morepeople-icon").removeClass("active");
  $(ele).addClass("active");
  // let s = "#" + id;
//   console.log(type);
  $.ajax({
    url: "/friendship/" + type,
    get: "get",
    // data: { type: type },
    success: function (response) {
      // Add response in Modal body
      $("#morepeople").html(response);
    },
  });
}
