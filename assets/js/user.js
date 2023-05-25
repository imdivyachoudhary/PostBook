{
  showProfile();
  showPosts();
  showFriends();

  var url = window.location.href.split("/");
  var id = url[url.length - 1];
  // console.log(id);
  if (id == "profile") {
    let ele = document.getElementById("profile");
    ele.setAttribute("style", "display:block");
  } else if (id == "posts") {
    let ele = document.getElementById(id);
    ele.setAttribute("style", "display:block");
  } else if (id == "friends") {
    let ele = document.getElementById(id);
    ele.setAttribute("style", "display:block");
  }
}

function showProfile() {
  $.ajax({
    url: "/user/get-profile",
    type: "get",
    success: function (response) {
      // Add response in Modal body
      $("#profileBox").html(response);
    },
  });
}

function showPosts() {
  $.ajax({
    url: "/post/user",
    type: "get",
    success: function (response) {
      // Add response in Modal body
      $("#allPosts").html(response);
    },
  });
}

function showFriends() {
  $.ajax({
    url: "/friendship/friends",
    type: "get",
    success: function (response) {
      // Add response in Modal body
      $("#friendsList").html(response);
    },
  });
}