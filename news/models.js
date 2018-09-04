'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const newsItemSchema = mongoose.Schema({
    title: { type: String, required: true },
    //   if possible put default at 00/00/00 - need to see format
    date: { type: Date },
    source: { type: String },
    summary: { type: String },
    created: { type: Date, default: Date.now }
});

newsItemSchema.methods.serialize = function() {
    return {
        id: this._id,
        title: this.title,
        date: this.date,
        source: this.source,
        summary: this.type,
        created: this.created
      };
};


const NewsItem = mongoose.model('NewsItem', newsItemSchema);

module.exports = { NewsItem };
