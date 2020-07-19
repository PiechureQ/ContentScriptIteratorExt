const Command = require("./Command");
const sleep = require("./sleep");

class RemoveCommand extends Command {
    constructor(tabId, type) {
        super();
        this.tabId = tabId;
        this.type = type;
    }

    execute() {
        return new Promise((resolve) => {
            chrome.tabs.sendMessage(this.tabId, {action: "remove"}, (response) => {
                console.log(response)
                sleep(2000).then(() => 
                    resolve(response)
                )
            })
        })
    }
}

module.exports = RemoveCommand;