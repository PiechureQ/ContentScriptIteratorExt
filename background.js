/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Command {
    execute() {
        console.log('execute');
    }
}

module.exports = Command;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = sleep;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const RemoveCommand = __webpack_require__(4);
const UseCommand = __webpack_require__(5);
const Iterator = __webpack_require__(3);

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Iterator {
    constructor(array) {
        this.data = array;
        this.value = array[0];
        this.index = 0;
        this.size = array.length;
    }

    hasNext() {
        if (this.index < this.size) {
            return true;
        } else {
            return false;
        }
    }

    next() {
        if (this.hasNext()) {
            let ret = this.value;
            this.index++;
            this.value = this.data[this.index];
            return ret;
        } else {
            return this.value;
        }
    }

    end() {
        if (!this.hasNext()) {
            return true;
        } else {
            return false;
        }
    }

    reset() {
        this.index = 0;
        this.value = this.data[this.index];
    }
}

module.exports = Iterator;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Command = __webpack_require__(0);
const sleep = __webpack_require__(1);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Command = __webpack_require__(0);
const sleep = __webpack_require__(1);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const UseVochersHandler = __webpack_require__(2);

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


/***/ })
/******/ ]);