{
  var url = window.location.href.split("/");
  var id = url[url.length - 1];
  //   console.log(id);
  if (id != undefined) {
    let ele = document.getElementById(id);
    ele.setAttribute("style", "display:block");
    // console.log(ele);
  }

  function user_signOut() {
    window.location.href = "/user/sign-out";
  }
}
