$(document).ready(function () {
  $(".likes").click(function () {
    $(".modal-body").html("");
    // $(".modal-body").html();
    var postid = $(this).attr("data-id");
    // console.log(postid);
    // $(".modal-header h1").html("Reactions");

    $.ajax({
      url: "/post/reactions",
      type: "post",
      data: { postid: postid },
      success: function (response) {
        // Add response in Modal body
        $("#modalReactions .modal-body").html(response);
      },
    });
  });

  $(".comments").click(function () {
    $(".modal-body").html("");
    var postid = $(this).attr("data-id");
    // console.log(postid);
    // $(".modal-header h1").html("Comments");

    $.ajax({
      url: "/post/comments",
      type: "post",
      data: { postid: postid },
      success: function (response) {
        // Add response in Modal body
        $("#modalComments .modal-body").html(response);
      },
    });
  });
});

function submitForm(ele, event) {
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
      // console.log(response);
      let postDom = createPostDom(response.data.post, response.data.user);
      $(".posts").prepend(postDom);

      // $(responseElementId).html(response);
    },
    error: function (err) {
      // $("#modalUpdateAvatar").modal("hide");
      console.log(err);
    },
  });
}

// 
function deletePost (ele, event) {
  event.preventDefault();
  // console.log($(event.target).attr("data-link"));

  $.ajax({
    url: $(event.target).attr("data-link"),
    type: "delete",
    success: function(response){
      // console.log(response);
      // console.log(`#post-${response.data.post_id}`);
      $(`#post-${response.data.post_id}`).remove();
    },
    error: function(err){
      console.log(err);
    }
  });
}

function createPostDom(post, user) {
  // let avatarSrc = "/images/default_user.jpeg";
  let avatar = `<i class="fas fa-user-circle"></i>`;
  if (user.avatar) {
    let avatarSrc = user.avatar;
    avatar = `<img src="${avatarSrc}" alt="" />`;
  }
  let postDate = new Date(post.createdAt);
  let d = postDate.toLocaleDateString();
  return (dom = `<div class="post" id="post-${post._id}">
              <div class="post-header">
                <div class="display_pic">
                  ${avatar}
                </div>
                <div class="display_name_time">
                  <div class="display_name">${user.name}</div>
                  <div class="display_time">
                    <div>${d}</div>
                    <!-- <div>21:30</div> -->
                  </div>
                </div>
                <div class="delete-post">
                  <i class="fa-solid fa-trash-can" data-link = "/post/delete/${post._id}" onclick="deletePost(this, event)"></i>
                </div>
              </div>
              <div class="post-body">
                <!-- <div class="post-item">
                  <div class="content">Hello world!</div>
                  <div class="read-more">...Read more</div>
                </div> -->
                <div class="post-image">
                  <img src="${post.content}" alt="" />
                </div>
              </div>
              <div class="post-footer">
                <div class="likes">
                  <div class="icon">
                    <i class="far fa-heart"></i>
                    <!-- <i class="fas fa-heart liked"></i> -->
                  </div>
                  <div
                    class="count"
                    data-bs-toggle="modal"
                    data-bs-target="#modalReactions"
                    data-id="<%= i %>"
                  >
                    
                  </div>
                </div>
                <div
                  class="comments"
                  data-bs-toggle="modal"
                  data-bs-target="#modalComments"
                  data-id="<%= i %>"
                >
                  <div class="icon">
                    <i class="fas fa-comment-dots"></i>
                  </div>
                  <div class="count"></div>
                </div>
              </div>
            </div>`);
}
