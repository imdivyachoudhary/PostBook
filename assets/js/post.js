$(document).ready(function () {
  let total_posts = parseInt($(".posts").attr("data-count"));
  if (!total_posts) $(".posts p.show-failure-message").show();
});

function openReactions(ele) {
  $("modalReactions.modal-body").html("");
  // $(".modal-body").html();
  var post_id = $(ele).attr("data-id");
  // console.log(post_id);

  $.ajax({
    url: "/reaction/post",
    type: "post",
    data: { post_id: post_id },
    success: function (response) {
      // Add response in Modal body
      $("#modalReactions .modal-body").html(response);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function togglePostReaction(ele, reactionType) {
  let post_id = $(ele).attr("data-id");
  $.ajax({
    url: "/reaction/toggle-reaction",
    type: "post",
    data: {
      type: "Post",
      id: post_id,
      reactionType: reactionType,
    },
    success: function (response) {
      //   console.log(response);
      $(`#reaction-types-${post_id} .reaction-icon`).removeClass("active");

      let reactions_count = parseInt(
        $(`#post-${post_id} .likes .count`).html()
      );
      if (!reactions_count) reactions_count = 0;

      let increaseCount = response.data.increaseCount;
      if (increaseCount == 0) {
        $(ele).addClass("active");
        $(`#post-${post_id} .likes .icon`).html(
          `<i class="fas fa-heart liked"></i>`
        );
      } else if (increaseCount == 1) {
        $(ele).addClass("active");
        reactions_count = reactions_count + 1;
        $(`#post-${post_id} .likes .count`).html(reactions_count);
        $(`#post-${post_id} .likes .icon`).html(
          `<i class="fas fa-heart liked"></i>`
        );
      } else if (increaseCount == -1) {
        reactions_count = reactions_count - 1;
        if (reactions_count)
          $(`#post-${post_id} .likes .count`).html(reactions_count);
        else $(`#post-${post_id} .likes .count`).html("");
        $(`#post-${post_id} .likes .icon`).html(`<i class="far fa-heart"></i>`);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function openComments(ele) {
  $("#modalComments .modal-body").html("");
  var post_id = $(ele).attr("data-id");
  // console.log(post_id);
  // return;
  $("#modalComments #comment-form #form-post-id").attr("value", post_id);

  $.ajax({
    url: "/comment",
    type: "post",
    data: { post_id: post_id },
    success: function (response) {
      // Add response in Modal body
      $("#modalComments .modal-body").html(response);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function deletePost(ele, event) {
  event.preventDefault();
  // console.log($(event.target).attr("data-link"));

  $.ajax({
    url: $(event.target).attr("data-link"),
    type: "delete",
    success: function (response) {
      // console.log(response);
      // console.log(`#post-${response.data.post_id}`);
      $(`#post-${response.data.post_id}`).remove();

      showNotification("success", response.message);

      let total_posts = parseInt($(".posts").attr("data-count")) - 1;
      $(".posts").attr("data-count", total_posts);
      if (!total_posts) $(".posts p.show-failure-message").show();
    },
    error: function (err) {
      console.log(err);
      let status;
      if (err.status == 500) status = "error";
      else status = "warning";
      showNotification(status, err.responseJSON.message);
    },
  });
}

function submitPostForm(ele, event) {
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

      showNotification("success", response.message);

      let total_posts = parseInt($(".posts").attr("data-count")) + 1;
      $(".posts").attr("data-count", total_posts);
      if (total_posts) $(".posts p.show-failure-message").hide();
    },
    error: function (err) {
      $(".modal").modal("hide");
      console.log(err);
      let status;
      if (err.status == 500) status = "error";
      else status = "warning";
      showNotification(status, err.responseJSON.message);
    },
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
  let t = postDate.getHours() + ":" + postDate.getMinutes();
  return (dom = `<div class="post" id="post-${post._id}">
                  <div class="post-header">
                    <div class="display_pic">
                      ${avatar}
                    </div>
                    <div class="display_name_time">
                      <div class="display_name">${user.name}</div>
                      <div class="display_time">
                        <div>${d}, ${t}</div>
                      </div>
                    </div>
                    <div class="delete-post">
                      <i class="fas fa-trash-alt" data-link = "/post/delete/${post._id}" onclick="deletePost(this, event)"></i>
                    </div>
                  </div>
                  <div class="post-body">
                    <div class="post-image">
                      <img src="${post.content}" alt="" />
                    </div>
                  </div>
                  <div class="post-footer">
                    <div class="likes">
                      <div
                        class="icon"
                        data-bs-toggle="collapse"
                        href="#reaction-types-${post._id}"
                        role="button"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample1"
                      >
                        <i class="far fa-heart"></i>
                      </div>
                      <div
                        class="count"
                        data-bs-toggle="modal"
                        data-bs-target="#modalReactions"
                        data-id="${post._id}"
                        onclick="openReactions(this)"
                      >  
                      </div>
                      <div
                        class="collapse multi-collapse reaction-types"
                        id="reaction-types-${post._id}"
                      >
                        
                        <div
                          class="reaction-icon"
                          onclick="togglePostReaction(this,'like')"
                          data-id="${post._id}"
                          data-type="like"
                        >
                        <img src="https://cdn-icons-png.flaticon.com/128/2107/2107845.png" />
                        </div>
                        
                        <div
                          class="reaction-icon"
                          onclick="togglePostReaction(this,'laugh')"
                          data-id="${post._id}"
                          data-type="laugh"
                        >
                        <img src="https://cdn-icons-png.flaticon.com/128/1791/1791352.png" />
                        </div>
                        
                        <div
                          class="reaction-icon"
                          onclick="togglePostReaction(this,'angry')"
                          data-id="${post._id}"
                          data-type="angry"
                        >
                        <img src="https://cdn-icons-png.flaticon.com/128/743/743418.png" />
                        </div>
                        
                        <div
                          class="reaction-icon"
                          onclick="togglePostReaction(this,'thumbs-up')"
                          data-id="${post._id}"
                          data-type="thumbs-up"
                        >
                        <img src="https://cdn-icons-png.flaticon.com/128/889/889221.png" />
                        </div>
                      </div>
                    </div>
                    <div
                      class="comments"
                      data-bs-toggle="modal"
                      data-bs-target="#modalComments"
                      data-id="${post._id}"
                      onclick="openComments(this)"
                    >
                      <div class="icon">
                        <i class="fas fa-comment-dots"></i>
                      </div>
                      <div class="count"></div>
                    </div>
                  </div>
                </div>`);
}
