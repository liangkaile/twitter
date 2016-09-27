var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var FeedSchema = new mongoose.Schema({
    body: String,
    user: { type : ObjectId, ref: 'User' },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feed', FeedSchema);
