import express from 'express';
import path from 'path';
const server  = express();


const isProd = process.env.NODE_ENV === "production"
if (!isProd) {
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

    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddleware)
}
const expressMiddleware =  express.static("dist")
server.use(expressMiddleware);

const port = process.env.PORT || 8000;
server.listen({
    port: port
}, () => {
    console.log(`server is listing on http:///localhot:${port}`)
})