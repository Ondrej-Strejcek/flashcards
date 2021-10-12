const mongoose = require('mongoose');

const FlashCard = new mongoose.Schema({
    question: {
        type: String,
        required: true,
      },
    answer: {
        type: String,
        required: true,
    },
})

const Result = new mongoose.Schema({
    correct: {
        type: Number,
        required: true
    },
    tested: {
        type: Number,
        required: true
    },
    wrongAnswered:{
        type: [String],
        required: false,
    },
    testedAt: {
        type: Date,
        default: Date.now,
    }
})

const CollectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
    }, 
    slug: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    sharedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'User'
    },
    flashcards: {
        type: [FlashCard],
        required: false,
    },
    results:{
        type: [Result],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Collection', CollectionSchema);