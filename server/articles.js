const Parser = require('rss-parser');
const parser = new Parser();

module.exports = {
    getArticles: async (req, res) => {
        let feed = await parser.parseURL('https://www.google.com/alerts/feeds/03179040965956919726/9273699372511330713');
        let limitedFeed = feed.items.splice(15);
        if (limitedFeed.length) {
            return res.status(200).send(feed)
        } else {
            return res.status(400).send("Unable to fetch articles")
        }
    },

}