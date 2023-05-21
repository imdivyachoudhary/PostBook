{
  function user_signOut() {
    window.location.href = "/user/sign-out";
  }

  function submitForm(ele, event, responseElementId) {
    event.preventDefault();
    let form = $(ele);
    let formData = form.serialize();
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
        // console.log(response);
        responseElementId = "#" + responseElementId;
        // let responseEle = document.getElementById(responseElementId)
        // console.log($(responseElementId));
        // console.log(responseElementId);
        $(responseElementId).html(response);
        // responseEle.innerHTML = response;
      },
      error: function (err) {
        // $("#modalUpdateAvatar").modal("hide");
        console.log(err);
      },
    });
  }
}
