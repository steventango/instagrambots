// ==UserScript==
// @name         InstaLike
// @version      2.4.0
// @description  Like bot for Instagram
// @author       Steven
// @match        https://www.instagram.com
// @require      https://steventang.tk/bot/steven.bot.js
// ==/UserScript==
const BLACK_LIST = ["USERNAME"];

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
  let like_elements = Array.from(
    document.querySelectorAll("article div section span button svg")
  ).filter((like_element) => (like_element.getAttribute("aria-label") == "Like" ? 1 : 0));
  like_elements = like_elements.filter(
    (like_element) => BLACK_LIST.indexOf(getUsername(like_element)) === -1
  );
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
    version: "2.4.0",
    reload: true,
    reload_url: "https://www.instagram.com",
  }
);
