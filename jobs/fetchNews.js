const axios = require('axios');
const modelList = require('../models/newsModel')

async function fetchTopHeadlines() {
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=Top%20Headlines&sortBy=publishedAt&apiKey=${process.env.API_KEY}`)
        const newsArticles = response.data.articles

        const TopHeadlines = modelList[0]
        for (const article in newsArticles) {
            const existingArticle = await TopHeadlines.findOne({ url: newsArticles[article].url }, { url: 1 });
            if (!existingArticle) {
                const newNews = new TopHeadlines(newsArticles[article])
                await newNews.save()
            }
            else {
                console.log('Skipping duplicate news article:', article);
            }
        }
    } catch (error) {
        console.log(`error ${error.message} occurred`)
    }
}
async function fetchDataFromApiCategoryWise(category) {
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${category.modelName}&sortBy=publishedAt&apiKey=${process.env.API_KEY}`)
        const newsArticles = response.data.articles

        for (const article in newsArticles) {
            const existingArticle = await category.findOne({ url: newsArticles[article].url }, { url: 1 });
            if (!existingArticle) {
                const newNews = new category(newsArticles[article])
                await newNews.save()
            }
            else {
                console.log('Skipping duplicate ',category,' news article:', article);
            }
        }
    } catch (error) {
        console.log(`error ${error.message} occurred`)
    }
}

module.exports = {
    fetchTopHeadlines,
    fetchDataFromApiCategoryWise
}
