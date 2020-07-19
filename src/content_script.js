chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    switch (message.action) {
        case "start":
            // Select the node that will be observed for mutations
            const targetNode = document.querySelector('body');

            // Options for the observer (which mutations to observe)
            const config = { attributes: true, childList: true, subtree: true };

            // Callback function to execute when mutations are observed
            const callback = function(mutationsList, observer) {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        console.log('A child node has been added or removed.');
                    }
                    else if (mutation.type === 'attributes') {
                        console.log('The ' + mutation.attributeName + ' attribute was modified.');
                    }
                }
            };

            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(callback);

            // Start observing the target node for configured mutations
            observer.observe(targetNode, config);

            sendResponse({action: message.action, return: 'ready'});
            break;
        case "remove":

            location.reload();
            sendResponse({action: message.action, return: 'ready'});

            break;
        case "use":
            location.reload();
            sendResponse({action: message.action, return: 'ready'});
            break;
        case "check":
            location.reload();
            sendResponse({action: message.action, return: 'ready'});
            break;
        case "end":
            location.reload();
            sendResponse({action: message.action, return: 'ready'});

            // Later, you can stop observing
            observer.disconnect();
            break;
        default: 
            console.log('fail')
    }
    return true;
})



