var textArray = (nodes) => Array.from(nodes).map((node) => node.innerText);
var sleep_50 = async(ms) => new Promise(resolve => setTimeout(resolve, ms - 25 + Math.random() * 50));

var followers, following, followingback, notfollowingback, followsyoubutyoudontfollowback;
var links = document.querySelectorAll('ul li a');
var followersCount = Number(textArray(links)[0].replace(/ followers|,/g, '').trim());
var followingCount = Number(textArray(links)[1].replace(/ following|,/g, '').trim());

async function extract(count) {
    var usernames = document.querySelectorAll('div[role=dialog] li div div div div span a');
    var same_length = 0;
    var previous_length = 0;
    while (usernames.length < count && same_length < 4) {
        usernames[usernames.length - 1].scrollIntoView();
        await sleep_50(1000);
        usernames = document.querySelectorAll('div[role=dialog] li div div div div span a');
        same_length = usernames.length == previous_length ? (same_length + 1) : 0;
        previous_length = usernames.length;
    }
    if (same_length > 3) {
        console.warn('Stopping extraction, no new usernames after four tries.');
    }
    usernames = textArray(usernames);
    return usernames;
}

(async() => {
    document.querySelectorAll('ul li a')[0].click();
    await sleep_50(1000);

    followers = await extract(followersCount);
    console.log('Followers: ');
    console.log(followers);
    console.log('Blocked by: ' + (followersCount - followers.length));

    document.querySelector('div[role="dialog"] > div > div > div > div > button').click();
    await sleep_50(500);

    document.querySelectorAll('ul li a')[1].click();
    await sleep_50(1000);

    following = await extract(followingCount);
    console.log('Following: ');
    console.log(following);
    console.log('Blocked by: ' + (followingCount - following.length));

    document.querySelector('div[role="dialog"] > div > div > div > div > button').click();

    followingback = following.filter(username => followers.indexOf(username) > -1);
    notfollowingback = following.filter(username => followers.indexOf(username) < 0);
    followsyoubutyoudontfollowback = followers.filter(username => following.indexOf(username) < 0);

    console.log(`Following Back: `);
    console.log(followingback);
    console.log(`Follows You But You Don't Follow Back: `);
    console.log(followsyoubutyoudontfollowback);
    console.log(`Not following Back: `);
    console.log(notfollowingback);
})();