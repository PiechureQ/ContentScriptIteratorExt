const Command = require("./Command");
const sleep = require("./sleep");

class UseCommand extends Command {
    constructor(tabId, type) {
        super();
        this.tabId = tabId;
        this.type = type;
    }

    execute() {
        return new Promise((resolve) => {
            chrome.tabs.sendMessage(this.tabId, {action: "use"}, (response) => {
                console.log(response)
                sleep(1000).then(() => 
                    resolve(response)
                )
            })
        })
    }
}

module.exports = UseCommand;