chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {
    fetch(message.url).then(res => {
        return res.text();
    }).then(res => {
        senderResponse(res);
    })
    return true
});