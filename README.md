# InstagramBots
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
## instalike.js
This userscript depends upon steven.bot.js and is as an Instagram like bot that automatically likes posts in your feed. It features include a blacklist, notifications, and statistics on the number of posts liked. 

## instanotify.js
This userscript depends upon steven.bot.js and allows one to be notified when a public account posts without requiring you to follow that account.  

## instafollow.js
This userscript depends upon stevven.bot.js and will continually attempt to send follow requests to an account on Instagram.

## instacompare.js
This script is used to automatically determine who is following you back, who isn't, and who you are not following back.

## instadownload.js
The script makes it simple to download photos and videos off of Instagram posts. Simply click photos and it will open in a new tab.
```javascript
var blockers = document.querySelectorAll('div._9AhH0') // use inspect element's element picker (CTRL + SHIFT + C) on the photos to find the classname.
```