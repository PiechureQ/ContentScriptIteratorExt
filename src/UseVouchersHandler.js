const RemoveCommand = require("./RemoveCommand");
const UseCommand = require("./UseCommand");
const Iterator = require("./Iterator");

class UseVochersHandler {
    constructor(tabId, type) {
        this.tabId = tabId;
        this.type = type;
        this.commands = new Iterator([new RemoveCommand(tabId, type), new UseCommand(tabId, type)]);

        this._activeCommand = this.commands.next();

        this.len = 5;
        this.index = 0;

        this.done = false;
    }

    async start() {
        console.log('start');
        //if refresh
        if (this.type === 'refresh') {
            await this.next();
        }

        //if dynamic
        if (this.type === 'dynamic')
        while (!this.done) {
            await this.next();
        }
    }
    
    async next() {
        if (this.index < this.len) {
            if (this.commands.end()) {
                this.commands.reset();
                this.index++;
            }
            await this._activeCommand.execute();
            this._activeCommand = this.commands.next();
        } else {
            this.end();
        }
    }

    end() {
        console.log('end');
        this.done = true;
    }
}

module.exports = UseVochersHandler;