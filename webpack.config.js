const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = (env,argv) => {
    const entryPath =
    argv.mode === "development" ? "./src/script_dev.js" : "./src/script.js";
    return {
        entry: {
            main: path.resolve(__dirname, entryPath),
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "build"),
        },
        devServer: {
            static: "./build",
            open: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "FindYourBook",
                template: path.resolve(__dirname, "./src/index.html",),
                favicon: "./img/books-icon.png"
            }),
            new Dotenv(),
        ],
    };
};