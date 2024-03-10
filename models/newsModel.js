const mongoose = require('mongoose')

const newsSchema = mongoose.Schema(
    {
        source: {
            type: {
                id: {
                    type: String,
                    required: false
                },
                name: {
                    type: String,
                    required: [true, "Please provide source name"]
                }
            },
            required: [true, "Please provide the source"]
        },
        author: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: [true, "Please provide a title"]
        },
        description: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: [true, "Where is news link."]
        },
        urlToImage: {
            type: String,
            required: false,
            default: 'https://thumbs.dreamstime.com/z/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg?ct=jpeg'
        },
        publishedAt: {
            type: String,
            required: [true, "News date??"]
        },
        content: {
            type: String,
            required: false
        },
        likes: {
            type: Number,
            required: true,
            default: 0
        }
    }
);

const TopHeadlines = mongoose.model('TopHeadlines', newsSchema);
const BusinessNews = mongoose.model('Business', newsSchema);
const ScienceNews = mongoose.model('Science', newsSchema);
const PoliticalNews = mongoose.model('Political', newsSchema);
const HealthNews = mongoose.model('Health', newsSchema);
const EducationNews = mongoose.model('Education', newsSchema);
const TechnologyNews = mongoose.model('Technology', newsSchema);
const EntertainmentNews = mongoose.model('Entertainment', newsSchema);
const OpinionNews = mongoose.model('Opinion', newsSchema);
const SportsNews = mongoose.model('Sports', newsSchema);

const modelList = [
    TopHeadlines,
    BusinessNews,
    ScienceNews,
    PoliticalNews,
    HealthNews,
    EducationNews,
    TechnologyNews,
    EntertainmentNews,
    OpinionNews,
    SportsNews
]
module.exports = modelList;