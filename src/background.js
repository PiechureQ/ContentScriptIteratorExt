const UseVochersHandler = require("./UseVouchersHandler");

let TAB_ID = -1;

chrome.tabs.onActivated.addListener((activeTabInfo) => {
    TAB_ID = activeTabInfo.tabId;
});


let useVouchersHandler;

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log('refresh')
    if (useVouchersHandler.type === "refresh") {
        await useVouchersHandler.next();
    }
});

//start process
chrome.browserAction.onClicked.addListener(() => {
    useVouchersHandler = new UseVochersHandler(TAB_ID, "dynamic");

    chrome.tabs.sendMessage(TAB_ID, {action: "start"}, async (response) => {
        console.log(response);
        if (response.action === "start" && response.return === "ready") {
            await useVouchersHandler.start();
        }
    })
});
