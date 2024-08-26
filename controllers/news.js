const modelList = require('../models/newsModel')

const insertNews = async (req, res, next) => {
    const { source, author, title, description, url, urlToImage, publishedAt, content, likes } = req.body;

    const newNews = new newsSchema({
        source: {
            name: source.name
        },
        author: author,
        title: title,
        description: description,
        url: url,
        urlToI
    }
    )
}

exports.getNews = async (req, res) => {
    const { category } = req.params
    const { page = 1, limit = 10 } = req.query

    let newsModel
    switch (category) {
        case 'top-headlines':
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
        const news = await newsModel.find({}, { 'source._id': 0, __v: 0 })
            .sort({ publishedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.status(200).json({
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalResults / limit),
            totalResults: totalResults,
            articles: news
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.searchNews = async (req, res) => {
    const { page = 1, limit = 10, keyword } = req.query
    console.log('Keyword is ', keyword)
    try {

        const searchPromises = modelList.map(async Model => {
            return Model.find({ title: { $regex: new RegExp(keyword, 'i') } }, { 'source._id': 0, __v: 0 })
                .sort({ publishedAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
        });

        const results = await Promise.all(searchPromises);
        const flattenedResults = results.flat();

        res.status(200).json({
            articles: flattenedResults
        });
    }
    catch (error) {
        console.log(`error ${error} occurred`)
        res.status(500).json({ message: "Internal server error." })
    }
};