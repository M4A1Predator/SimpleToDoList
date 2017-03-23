
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    
    // res.render('todoList');
    res.statusCode = 302; 
    res.setHeader("Location", "/items");
    res.end();

})

// Route to to do item list page
router.get('/items', function(req, res){
    
    res.render('todoList');

})

// View single item page
router.get('/items/:itemId', function(req, res){

    var data = {
        itemId : req.params.itemId,
    }

    res.render('todoItem', data);
})

router.get('/test', function(req, res){
    res.send("TEST");
})

module.exports = router;