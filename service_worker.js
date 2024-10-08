chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {
    fetch(message.url).then(res => {
        return res.text();
    }).then(res => {
        senderResponse(res);
    }).catch(error => {
        senderResponse(false);
        return false
    })
    return true
});