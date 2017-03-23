
var express = require('express');
var router = express.Router();

var ToDoItem = require('../models/ToDoItem');

// Items routes
router.route("/items")

    // Get all items
    .get(function(req, res, next){
        
        // Get items
        var query = ToDoItem.find().lean();
        query.exec(function(err, toDoItems){
            // Handle error
            if(err){
                console.error(err);
                next({msg: "Something went wrong!"});
                return;
            }

            // Response
            res.json(toDoItems);
        })
    })

    // Create item
    .post(function(req, res, next){

        // Get data
        var body = req.body;

        var title = body.title;
        var detail = body.detail;

        // Trim title
        if(title){
            title = title.trim();
        }
        
        // Create item
        var toDoItem = new ToDoItem();
        
        // Set attributes
        toDoItem.title = title;
        toDoItem.detail = detail;

        // Save to DB
        toDoItem.save(function(err, savedToDoItem){
            // Handle error
            if(err){
                console.log(err)
                let errMsg = {
                    msg : "Cannot add to do item"
                }
                next(errMsg);
                return;
            }

            // Response
            var data = {
                msg: "Item created"
            }
            res.json(data);
        })
    })

// Items/itemId routes
router.route("/items/:itemId")

    // Get item by ID
    .get(function(req, res, next){

        // Get item's ID
        var itemId = req.params.itemId;

        // Find item
        var filter = {
            _id : itemId,
        }
        var query = ToDoItem.findOne(filter).lean();
        query.exec(filter, function(err, toDoItem){
            // Handle error
            if(err){
                console.error(err);
                next({msg: "Something went wrong!"});
                return;
            }

            // Response
            res.json(toDoItem);
        })

    })

    // Update item's data
    .put(function(req, res, next){
        
        // Get item's ID
        var itemId = req.params.itemId;

        // Get data
        var body = req.body;

        var title = body.title;
        var detail = body.detail;
        var status = body.status;

        // Find item
        var filter = {
            _id : itemId,
        }

        // Find item
        ToDoItem.findOne(filter, function(err, toDoItem){
            // Handle error
            if(err){
                next(err)
                return;
            }

            // If not found item then raise the error
            if(!toDoItem){
                var err = {
                    err : "Item not found"
                }
                next(err);
                return;
            }

            // Filter data
            if(title != null){
                title = title.trim();
                toDoItem.title = title;
            }

            if(detail != null){
                toDoItem.detail = detail;
            }

            if(status && (status == 'pending' || status == 'done') ){
                toDoItem.status = status;
            }

            // Update item
            toDoItem.save(function(err, updatedToDoItem){
                // Handle error
                if(err){
                    console.log(err)
                    let errMsg = {
                        msg : "Cannot update to do item"
                    }
                    next(errMsg);
                    return;
                }

                // Response
                var data = {
                    msg : "Item updated",
                }
                res.json(data);
            })

        })

    })

    // Delete item
    .delete(function(req, res, next){
        
        // Get item's ID
        var itemId = req.params.itemId;

        // Remove item
        var filter = {
            _id: itemId,
        }
        ToDoItem.remove(filter, function(err){
            // Handle error
            if(err){
                console.error(err);
                next({msg: "Something went wrong!"});
                return;
            }

            // Response
            var data = {
                msg: "Item deleted"
            }
            res.json(data);
        })

    })


// Error
router.use(function(err, req, res, next){
    console.log("API Broke!");
    console.error(err);
    res.status(500).send(err);
})

module.exports = router;
