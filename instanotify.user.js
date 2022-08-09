// ==UserScript==
// @name         InstaNotify
// @namespace    https://github.com/steventango/instagrambots
// @version      1.1.0
// @description  Notifications without following bot for Instagram
// @author       Steven
// @match        https://www.instagram.com/username/
// @require      https://cdn.jsdelivr.net/gh/steventango/instagrambots@latest/steven.bot.js
// ==/UserScript==

function instanotify() {
    var old_posts = localStorage.getItem('steven.bot.instanotify.posts') || 0;
    var current_posts = Number.parseInt(document.querySelector('main header section ul span span').textContent);
    if (old_posts != current_posts) {
        var notify;
        if (Notification.permission === 'granted') {
            notify = new Notification(`@${document.querySelector('header section h2').textContent} posted!`, {
                icon: 'https://www.instagram.com/static/images/ico/favicon-192.png/b407fa101800.png',
            });
            notify.onclick = function() {
                window.focus();
                this.close();
            };
        }
        localStorage.setItem('steven.bot.instanotify.posts', current_posts);
    }
}
steven.bot(() => {
    if (Notification.permission !== 'denied' || Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
}, instanotify, 600000, {
    name: 'InstaNotify',
    version: '1.1.0',
    reload: true,
    reload_url: 'https://www.instagram.com/'
});
