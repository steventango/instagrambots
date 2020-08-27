function instadownload() {
    var images = document.querySelectorAll("article img");
    var videos = document.querySelectorAll("article video");
    var blockers = document.querySelectorAll('div._9AhH0')
    for (var b = 0; b < blockers.length; b++) {
        blockers[b].parentNode.removeChild(blockers[b]);
    }
    for (var i = 0; i < images.length; i++) {
        images[i].outerHTML = '<a href="' + images[i].src + '"target="_blank" >' + images[i].outerHTML + '</a>';
    }
    for (var v = 0; v < videos.length; v++) {
        var a = document.createElement('a');
        videos[v].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.appendChild(a);
        a.outerHTML = '<a href="' + videos[v].src + '"target="_blank" >' + videos[v].src + '</a>';
    }
}
instadownload();