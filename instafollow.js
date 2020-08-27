// ==UserScript==
// @name         InstaFollow
// @version      2.2.0
// @description  Like bot for Instagram
// @author       Steven
// @match        https://www.instagram.com/username/
// @require      https://steventang.tk/bot/steven.bot.js
// ==/UserScript==
steven.bot(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (Notification.permission !== 'denied' || Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
}, () => {
    const button = document.querySelector('header section button');
    if (button) {
        if (button.textContent === 'Follow') {
            button.click();
            if (Notification.permission === "granted") {
                const notification = new Notification('Followed ' + document.querySelector('header section h1').textContent, {
                    icon: 'https://www.instagram.com/static/images/ico/favicon-192.png/b407fa101800.png',
                });
                setTimeout(notification.close.bind(notification), 3000);
                notification.addEventListener('click', () => {
                    window.focus();
                    this.close();
                });
            }
        }
    }
}, 600000, {
    name: 'InstaFollow',
    version: '2.2.0',
    reload: true,
    reload_url: 'https://instagram.com'
});