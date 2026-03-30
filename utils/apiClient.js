const { request } = require('@playwright/test');

async function getAPIContext() {
  return await request.newContext();
}

module.exports = { getAPIContext };