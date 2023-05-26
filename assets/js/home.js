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

  $(".people-list").hide();
  $(`#morePeople`).show();

  $.ajax({
    url: "/friendship/more-people",
    get: "get",
    // data: { type: type },
    success: function (response) {
    $("#morePeople").html(response);
    },
    error: function (err) {
      console.log(err);
    },
  });

  $.ajax({
    url: "/friendship/received-requests",
    get: "get",
    // data: { type: type },
    success: function (response) {
    $("#receivedRequests").html(response);
    },
    error: function (err) {
      console.log(err);
    },
  });

  $.ajax({
    url: "/friendship/sent-requests",
    get: "get",
    // data: { type: type },
    success: function (response) {
    $("#sentRequests").html(response);
    },
    error: function (err) {
      console.log(err);
    },
  });

  $.ajax({
    url: "/post/home",
    type: "get",
    success: function (response) {
      // Add response in Modal body
      $("#allPosts").html(response);
    },
    error: function (err) {
      console.log(err);
    },
  });

  $.ajax({
    url: "/friendship/friends",
    type: "get",
    success: function (response) {
      // Add response in Modal body
      $("#friendsList").html(response);
    },
    error: function (err) {
      console.log(err);
    },
  });

});

function showMorePeopleList(ele, targetElementId) {

  $(".people-list").hide();
  $(`#${targetElementId}`).show();
  
  $(".morepeople-icon").removeClass("active");
  $(ele).addClass("active");

  $
  
}
