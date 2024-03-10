const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const modelList = require('./models/newsModel');
const app = express();
const port = 3000
require('dotenv').config();
app.use(express.json())

app.get('/news/:category', async (req, res) => {
    const { category } = req.params
    const { page = 1, limit = 10 } = req.query

    let newsModel
    switch (category) {
        case 'top_headlines':
            newsModel = modelList[0]
            break;
        case 'business':
            newsModel = modelList[1]
            break;
        case 'science':
            newsModel = modelList[2]
            break;
        case 'politics':
            newsModel = modelList[3]
            break;
        case 'health':
            newsModel = modelList[4]
            break;
        case 'education':
            newsModel = modelList[5]
            break;
        case 'technology':
            newsModel = modelList[6]
            break;
        case 'entertainment':
            newsModel = modelList[7]
            break;
        case 'opinion':
            newsModel = modelList[8]
            break;
        case 'sports':
            newsModel = modelList[9]
            break;
        default:
            newsModel = modelList[0]
            break;
    }
    try {
        const totalResults = await newsModel.countDocuments();
        const totalPages = Math.ceil(totalResults / limit)
        const news = await newsModel.find({}, {'source._id': 0, __v: 0 })
            .sort({ publishedAt: -1 })
            .limit(limit * 1)
            .skip((page-1) * limit);
        res.status(200).json({
            currentPage: parseInt(page),
            totalPages: totalPages,
            totalResults: totalResults,
            articles: news
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

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
                console.log('Skipping duplicate news article:', article);
            }
        }
    } catch (error) {
        console.log(`error ${error.message} occurred`)
    }
}


app.post('/news', async (req, res) => {
    try {
        const news = await News.create(req.body)
        res.status(200).json(news)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb+srv://admin:aditya51643@trendingtimesapi.l72ul6k.mongodb.net/News-API?retryWrites=true&w=majority&appName=TrendingTimesAPI')
    .then(() => {
        console.log('connected to mongodb')
        app.listen(port, () => {
            console.log(`Example app is listening on port ${port}`)
        })
    }).catch((error) => {
        console.log(error)
    }
)

const cron = require('node-cron')

const schedule = '0 * * * *'

cron.schedule(schedule, () => {
    modelList.forEach(category => {
        fetchDataFromApiCategoryWise(category)
    });
    fetchTopHeadlines();
})
