var express = require("express");
var app = express();

var ml = require("ml-sentiment")();
var redditComments = require("./yelpreviews.json");

redditComments.forEach(function(comment) {
  comment.sentiment = ml.classify(comment.review);
  if (comment.sentiment >= 5) {
    comment.sentimentRating = 5;
  } else if (comment.sentiment > 2) {
    comment.sentimentRating = 4;
  } else if (comment.sentiment > 0) {
    comment.sentimentRating = 3;
  } else if (comment.sentiment == 0) {
    comment.sentimentRating = 2;
  } else {
    comment.sentimentRating = 1;
  }
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/data", function(req, res) {
  res.json(redditComments);
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});