let steven = {
    bot(init = () => {}, callback = () => {}, interval = 600000, config = {}) {
        let refreshCount = localStorage.getItem('steven.bot.' + config.name.toLowerCase() + '.refreshes') || 0;
        let delay = Math.random() * 5000 + interval;
        const refresh = () => {
            callback();
            setTimeout(() => {
                refreshCount++;
                localStorage.setItem('steven.bot.' + config.name.toLowerCase() + '.refreshes', refreshCount);
                if (config.reload) {
                    fetch(config.reload_url || 'https://dns.google.com/resolve?name=8.8.8.8').then(() => {
                        window.location.reload();
                    }).catch(() => {
                        console.info("No Internet Connection Detected. Reconnecting when internet connection is established.");
                        window.addEventListener('online', refresh);
                        refresh();
                    });
                } else {
                    refresh();
                }
            }, delay);
        };
        let initialDelay = Math.random() * 5000;
        setTimeout(refresh, config.initialDelay || initialDelay);
        console.log(config.name + ' ' + config.version);
        console.log('Executing in: ' + (config.initialDelay || initialDelay) + 'ms');
        console.log('Last Refreshed: ' + (new Date()).toString());
        console.log("Refresh Count: " + refreshCount);
        console.log('Next Refresh At: ' + (new Date((new Date()).getTime() + delay)).toString());
        init();
    }
};