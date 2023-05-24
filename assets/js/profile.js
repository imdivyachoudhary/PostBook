function user_signOut() {
  window.location.href = "/user/sign-out";
}

function submitProfileForm(ele, event) {
  event.preventDefault();
  let form = $(ele);
  let formData = form.serialize();
  // let formData = new FormData(ele);
  // console.log(formData);
  // return;
  $.ajax({
    url: form.attr("action"),
    type: form.attr("method"),
    data: formData,
    // processData: false,
    // contentType: false,
    success: function (response) {
      $(".modal").modal("hide");
      $("#profileBox").html(response);
    },
    error: function (err) {
      $(".modal").modal("hide");
      console.log(err);
    },
  });
}

function submitAvatarForm(ele, event) {
  event.preventDefault();
  let form = $(ele);
  // let formData = form.serialize();
  let formData = new FormData(ele);
  // console.log(formData);
  // return;
  $.ajax({
    url: form.attr("action"),
    type: form.attr("method"),
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $(".modal").modal("hide");
      $("#profileBox").html(response);
    },
    error: function (err) {
      $(".modal").modal("hide");
      console.log(err);
    },
  });
}
