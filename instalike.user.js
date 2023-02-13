// ==UserScript==
// @name         InstaLike
// @version      2.7.0
// @description  Like bot for Instagram
// @author       Steven
// @match        https://www.instagram.com
// @match        https://www.instagram.com/?variant=past_posts
// @require      https://cdn.jsdelivr.net/gh/steventango/instagrambots@latest/steven.bot.js
// ==/UserScript==
const BLACK_LIST = [
  "shop"
];

function getParent(like_element) {
let parent = like_element;
while (parent.nodeName != "ARTICLE") {
  parent = parent.parentElement;
}
return parent;
}

function getUsername(like_element) {
const parent = getParent(like_element);
return parent.querySelector("header div:nth-child(2) a").innerText;
};

function instalike() {
let like_count = 0;
let total_likes = localStorage.getItem("steven.bot.instalike.likes") || 0;
let next_time = Math.random() * 10000 + 2000;
let posts = Array.from(document.querySelectorAll(
    'main > div > section > div > div > div:nth-child(1) > div > div > div > *'
));
let new_posts = [];
for (const post of posts) {
  if (post.nodeName == "UL") continue;
  if (post.nodeName != "ARTICLE") break;
  new_posts.push(post);
}
let like_elements = new_posts
  .map(post => post.querySelector('div section span button svg'))
  .filter(like_element => like_element.getAttribute("aria-label") == "Like")
  .filter(like_element => BLACK_LIST.indexOf(getUsername(like_element)) < 0);

let parent, username;
if (like_elements.length > 0) {
  parent = getParent(like_elements[0]);
  username = getUsername(like_elements[0]);
}
if (parent) {
  parent.scrollIntoView();
  like_elements[0].parentNode.click();

  if (Notification.permission === "granted") {
    const NOTIFY = new Notification("Liked Post: " + username, {
      icon: "https://www.instagram.com/static/images/ico/favicon-192.png/b407fa101800.png",
    });
    setTimeout(NOTIFY.close.bind(NOTIFY), 1500);
    NOTIFY.onclick = function () {
      window.focus();
      this.close();
    };
  }
  total_likes++;
  localStorage.setItem("steven.bot.instalike.likes", total_likes);
  like_count++;
  console.log(`Liking next post in: ${next_time / 1000} s.`);
  setTimeout(instalike, next_time);
} else if (
  (like_count / document.querySelectorAll("article").length) * 100 >
  75
) {
  console.log(`Checking for more posts in: ${next_time / 1000 + 2} s.`);
  window.scrollTo(0, document.body.scrollHeight);
  setTimeout(instalike, next_time + 2000);
} else {
  console.log("No posts to like.");
  console.log("Total like count: " + total_likes);
}
}

steven.bot(
() => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  if (
    Notification.permission !== "denied" ||
    Notification.permission !== "granted"
  ) {
    Notification.requestPermission();
  }
},
instalike,
900000,
{
  name: "InstaLike",
  version: "2.7.0",
  initialDelay: 8000 + 2000 * Math.random(),
  reload: true,
  reload_url: "https://www.instagram.com",
}
);
