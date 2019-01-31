import express from 'express';
import path from 'path';

const server  = express();
const webpack = require('webpack');
const config = require('../../config/webpack.dev.js');
const compiler = webpack(config);
const webpackHotMiddleware = require('webpack-hot-middleware')(
    compiler
)
const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
)
const expressMiddleware =  express.static("dist")

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware)
server.use(expressMiddleware);

server.listen({
    port: 8000
}, () => {
    console.log("server is listing")
})