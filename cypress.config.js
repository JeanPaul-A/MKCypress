const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // baseUrl: "http://localhost:4200"
    baseUrl: "https://metronic-fe.onrender.com",
    "viewportWidth": 1920,
    "viewportHeight": 1080
  },
});
