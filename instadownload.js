async function download(url, filename=null) {
    if (!filename) {
        filename = new URL(url).pathname.split('/').pop();
    }
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function instadownload() {
    const images = document.querySelectorAll("img:not(.instadownload)");
    const blockers = document.querySelectorAll(
        [
            'div._aagw',
            'div._ab8w._ab94._ab97._ab9h._ab9m._ab9p._ab9s._abcf._abcg._abck._abcl._abcm',
            'div._aakh',
            'div._aakl'
        ].join(", ")
    );
    const videos = document.querySelectorAll("video");
    for (const blocker of blockers) {
        blocker.parentNode.removeChild(blocker);
    }
    for (const image of images) {
        image.addEventListener("dblclick", () => {
            download(image.src);
        });
        image.classList.add('instadownload');
    }
    for (const video of videos) {
        video.addEventListener("dblclick", () => {
            download(video.querySelector('source').src);
        });
        video.classList.add('instadownload');
    }
}

instadownload();
setInterval(instadownload, 1000);
