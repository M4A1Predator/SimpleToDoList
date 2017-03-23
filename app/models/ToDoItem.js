
var mongoose = require('mongoose');

var ToDoIteamSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: false,
    },
    status : {
        type: String,
        default: 'pending',
        required: true,
    },
    createDate : {
        type: Date,
        default: Date.now,
        required: true,
    },
    lastModified: {
        type: Date,
        required: false,
    }

})

module.exports = mongoose.model("ToDoIteamSchema", ToDoIteamSchema, "toDoItem");
