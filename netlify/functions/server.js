
const { createRequestHandler } = require('@remix-run/netlify');

// Correctly reference the build/server.js file
const build = require("build")

exports.handler = createRequestHandler({
    build,
    mode: process.env.NODE_ENV || 'development',
});
