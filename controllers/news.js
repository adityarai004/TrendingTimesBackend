const newsSchema = require('../models/newsModel')

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