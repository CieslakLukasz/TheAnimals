document.addEventListener("DOMContentLoaded", function () {
  let ShowComments = document.querySelectorAll(".post-show-comment");
  let HideComments = document.querySelectorAll(".post-hide-comment");
  let forms = document.querySelectorAll(".post-submit");
  let likes = document.querySelectorAll(".likes");
  let dislikes = document.querySelectorAll(".dislikes");
  let counts = document.querySelectorAll(".comment-count");
  let arrow = document.querySelector('.rotate');

  arrow.addEventListener('click', function() {
      if(arrow.className === 'rotate') {
          arrow.className = 'rotateBack'
      }else{
          arrow.className = 'rotate'
      }
  });
  
  //   counter of comments
  for (const el of counts) {
    let num = el.parentElement.parentElement.nextElementSibling.querySelectorAll(
      ".comments-single"
    ).length;
    el.textContent = num;
  }
  // adding comments
  for (const el of forms) {
    el.addEventListener("submit", function (e) {
      e.preventDefault();

      let nick = el.querySelector(".post-nickName");
      let comment = el.querySelector(".post-comment");
      let count = this.parentElement.previousElementSibling.querySelector(
        ".comment-count"
      );

      if (nick.value !== "" && comment.value !== "") {
        const post = document.createElement("div");
        post.className = "comments-single p-1 border rounded";
        post.innerHTML = `
            <h6>${nick.value}</h6>
            <p>${comment.value}</p>
            <span class='likes'><img src='./images/like.svg' width="20"><span>0</span></span><span class='dislikes'><img src='./images/dislike.svg' width="20"><span>0</span></span>
            `;
        this.nextElementSibling.prepend(post);
        count.textContent = parseInt(count.textContent) + 1;
        nick.value = "";
        comment.value = "";

        let like = post.querySelector(".likes");
        let dislike = post.querySelector(".dislikes");

        like.addEventListener("mouseover", function () {
          like.style.cursor = "pointer";
        });
        let counter = parseInt(like.children[1].textContent);

        like.addEventListener("click", function () {
          counter++;
          like.children[1].textContent = counter;
        });

        dislike.addEventListener("mouseover", function () {
          dislike.style.cursor = "pointer";
        });
        let discounter = parseInt(dislike.children[1].textContent);

        dislike.addEventListener("click", function () {
          discounter++;
          dislike.children[1].textContent = discounter;
        });

        if (el.previousElementSibling) {
          this.previousElementSibling.remove();
        }
      } else if (el.previousElementSibling) {
        return;
      } else {
        const alert = document.createElement("p");
        alert.className = "text-danger";
        alert.innerText = "Fill whole form!";
        this.parentElement.prepend(alert);
      }
    });
  }
  // show coments
  for (const el of ShowComments) {
    el.addEventListener("mouseover", function () {
      el.style.cursor = "pointer";
    });
    el.addEventListener("click", function () {
      if (this.nextElementSibling.className === "hide") {
        this.nextElementSibling.className = "show";
      } else {
        this.nextElementSibling.className = "hide";
      }
    });
  }
  // hide coments
  for (const el of HideComments) {
    el.addEventListener("mouseover", function () {
      el.style.cursor = "pointer";
    });
    el.addEventListener("click", function () {
      this.parentElement.className = "hide";
    });
  }

  for (const el of likes) {
    el.addEventListener("mouseover", function () {
      el.style.cursor = "pointer";
    });
    let count = parseInt(el.children[1].textContent);

    el.addEventListener("click", function () {
      count++;
      el.children[1].textContent = count;
    });
  }

  for (const el of dislikes) {
    el.addEventListener("mouseover", function () {
      el.style.cursor = "pointer";
    });
    let count = parseInt(el.children[1].textContent);

    el.addEventListener("click", function () {
      count++;
      el.children[1].textContent = count;
    });
  }
});
