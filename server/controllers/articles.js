const Parser = require('rss-parser');
const parser = new Parser();

module.exports = {
    getArticles: async (req, res) => {
        let feed = await parser.parseURL('http://www.vegetablegardener.com//feeds/rss/go-organic.xml');
        let limitedFeed = feed.items.splice(15);
        if (limitedFeed.length) {
            return res.status(200).send(feed)
        } else {
            return res.status(400).send("Unable to fetch articles")
        }
    },

}