// ==UserScript==
// @name         InstaDownload
// @version      0.0.1
// @description  Download tool for Instagram
// @author       Steven
// @match        https://www.instagram.com/*
// @require      https://cdn.jsdelivr.net/gh/steventango/instagrambots@latest/steven.bot.js
// ==/UserScript==


async function download(url, filename=null) {
    filename = filename || new URL(url).pathname.split('/').pop();
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}


function instadownload() {
    const blockers = document.querySelectorAll(
        [
            'div._aagw',
            'div._ab8w._ab94._ab97._ab9h._ab9m._ab9p._ab9s._abcf._abcg._abck._abcl._abcm',
            'div._aakh',
            'div._aakl'
        ].join(", ")
    );
    for (const blocker of blockers) {
        blocker.parentNode.removeChild(blocker);
    }

    const images = document.querySelectorAll("img:not(.instadownload)");
    for (const image of images) {
        image.addEventListener("click", (event) => {
            if (!event.ctrlKey) return;
            if (image.classList.contains("instadownloaded")) return;
            image.classList.add("instadownloaded");
            download(image.src);
        });
        image.classList.add('instadownload');
    }

    const videos = document.querySelectorAll("video");
    for (const video of videos) {
        video.addEventListener("click", (event) => {
            if (!event.ctrlKey) return;
            if (video.classList.contains("instadownloaded")) return;
            video.classList.add("instadownloaded");
            download(video.querySelector('source').src);
        });
        video.classList.add('instadownload');
    }
}

instadownload();
window.setInterval(instadownload, 1000);
