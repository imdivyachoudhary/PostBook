$(document).ready(function () {
  $.ajax({
    url: "/post",
    type: "get",
    success: function (response) {
      // Add response in Modal body
      $("#allPosts").html(response);
    },
  });
});

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
