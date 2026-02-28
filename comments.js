// Create webserver
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Comment schema and model
var commentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    timestamp: { type: Date, default: Date.now }
});

var Comment = mongoose.model('Comment', commentSchema);

// Get all comments
app.get('/comments', function (req, res) {
    Comment.find({}, function (err, comments) {
        if (err) return res.status(500).send(err);
        res.json(comments);
    });
});

// Add a new comment
app.post('/comments', function (req, res) {
    var newComment = new Comment(req.body);
    newComment.save(function (err, comment) {
        if (err) return res.status(500).send(err);
        res.json(comment);
    });
});

// Start the server
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});