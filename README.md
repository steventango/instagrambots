# InstagramBots
## Usage
- For instalike.user.js, instanotify.user.js, and instafollow.user.js:
    1. Download a userscript manager (for example, [Tampermonkey](https://www.tampermonkey.net/Tampermonkey]))
    2. Click the Install with userscript manager links below.
    3. Configure scripts as necessary in the userscript manager.
- For instacompare.js and instadownload.js:
    1. Open the Instagram website.
    2. Paste the source code into your browser's JavaScript developer console.

## steven.bot.js
This modular script can be used to create any web bot. It is configurable, induces human-like randomness into the interval, accounts for network connection, and tracks bot statistics.

```javascript
steven.bot(init, callback, interval, config);

init = function() {
    // runs only on initalization
}
callback = function() {
    // executes this function every interval
}
interval = Number // number of seconds between executions
config = {
    name: String, // name of bot
    reload: Boolean, // True = reload page; False = only call callback function
    reload_url: String, // use fetch to check network connection with this url
    version: String // version of bot
}
```
## instalike.user.js
This userscript depends upon steven.bot.js and is as an Instagram like bot that automatically likes posts in your feed. It features include a blacklist, notifications, and statistics on the number of posts liked.

Install with userscript manager: [instalike.user.js](https://raw.githubusercontent.com/steventango/instagrambots/master/instalike.user.js)

## instanotify.user.js
This userscript depends upon steven.bot.js and allows one to be notified when a public account posts without requiring you to follow that account.

Install with userscript manager: [instanotify.user.js](https://raw.githubusercontent.com/steventango/instagrambots/master/instanotify.user.js)

## instafollow.user.js
This userscript depends upon stevven.bot.js and will continually attempt to send follow requests to an account on Instagram.

Install with userscript manager: [instafollow.user.js](https://raw.githubusercontent.com/steventango/instagrambots/master/instafollow.user.js)

## instacompare.js
This script is used to automatically determine who is following you back, who isn't, and who you are not following back.

## instadownload.user.js
The script makes it simple to download photos and videos off of Instagram posts. Simply CTRL + click photos and it will download them.
