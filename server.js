const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/ShortUrl');
const app = express();

const mongoDB = 'process.env.ENV_MONGO_URI';

mongoose.connect(mongoDB, {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find({}).sort({ _id: -1});
    res.render('index.ejs', { shortUrls: shortUrls });
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
})

app.listen(process.env.PORT || 8001);

