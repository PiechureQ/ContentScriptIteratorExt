const path = require("path");

module.exports = {
    entry: {
        background: "./src/background.js",
        content_script: "./src/content_script.js"
    },
    output: {
        filename: "[name].js"
    }
};
