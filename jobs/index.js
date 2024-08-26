const cron = require("node-cron");
const {
  fetchTopHeadlines,
  fetchDataFromApiCategoryWise,
} = require("./fetchNews.js");
const modelList = require("../models/newsModel.js");

function startCronJobs() {
  cron.schedule(process.env.SCHEDULE, () => {
    modelList.forEach((category) => {
      fetchDataFromApiCategoryWise(category);
    });
    fetchTopHeadlines();
  });
}

module.exports = {
  startCronJobs,
};
