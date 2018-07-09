var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
    superagent.get('https://cnodejs.org/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }

            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .cell').each(function (idx, cell) {
                var c = $(cell);
                var avatar = c.find('a').children('img').attr('src');
                var element = c.find('div').children('a');
                items.push({
                    avatar : avatar,
                    title: element.attr('title'),
                    href: element.attr('href')
                });
            });

            res.send(items);
        });
});


app.listen(3000, function () {
    console.log('app is listening at port 3000');
});