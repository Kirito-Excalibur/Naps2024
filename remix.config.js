/** @type {import('@remix-run/dev').AppConfig} */

const { createRequestHandler } = require('@remix-run/netlify');

module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
  serverModuleFormat: "cjs",
  serverBuildTarget:'netlify'
};
