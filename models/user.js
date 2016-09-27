var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    actived: { type: Boolean, default: true }, // false indicates that the user has left the company
    followIds: [{ type : ObjectId, ref: 'User' }],
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
