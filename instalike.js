// ==UserScript==
// @name         InstaLike
// @namespace    https://github.com/steventango/InstagramBots
// @version      2.2.7
// @description  Like bot for Instagram
// @author       Steven Tang
// @match        https://www.instagram.com
// @require      https://steventang.tk/bot/steven.bot.js
// ==/UserScript==

function instalike() {
    var likeCount = 0;
    var blackList = [
        'USERNAME'
    ];
    var tLikes = localStorage.getItem('steven.bot.instalike.likes') || 0;
    var nextTime = Math.random() * 10000 + 2000;
    var likeElements = Array.from(document.querySelectorAll('article div section span button svg')).filter(e => e.getAttribute('aria-label') == 'Like' ? 1 : 0);
    likeElements = likeElements.filter(v => blackList.indexOf(v.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText) === -1);
    var notify, parent;
    if (likeElements.length > 0) {
        parent = likeElements[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        var username = parent.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText;
    }
    if (parent) {
        parent.scrollIntoView();
        likeElements[0].parentNode.click();

        if (Notification.permission === 'granted') {
            notify = new Notification('Liked Post: ' + username, {
                icon: 'https://www.instagram.com/static/images/ico/favicon-192.png/b407fa101800.png',
            });
            setTimeout(notify.close.bind(notify), 1500);
            notify.onclick = function() {
                window.focus();
                this.close();
            };
        }
        tLikes++;
        localStorage.setItem('steven.bot.instalike.likes', tLikes);
        likeCount++;
        console.log('Liking Next Post in: ' + (nextTime / 1000) + ' seconds.');
        setTimeout(instalike, nextTime);
    } else if ((likeCount / document.querySelectorAll('article').length) * 100 > 75) {
        console.log('Checking For More Posts in: ' + (nextTime / 1000) + ' seconds.');
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(instalike, nextTime + 2000);
    } else {
        console.log('No Photos to like.');
        console.log('Total Like Count: ' + tLikes);
    }
}
steven.bot(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (Notification.permission !== 'denied' || Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
}, instalike, 600000, {
    name: 'InstaLike',
    version: '2.2.7',
    reload: true,
    reload_url: 'https://www.instagram.com'
});
