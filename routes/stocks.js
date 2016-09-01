var express = require('express');
var router = express.Router();

var Stock = require('../server/models/stock');

// get all stocks in the database
router.get('/', function(req, res) {
    Stock.find({}, function (err, stocks) {
        if(err) console.log('Err: ', err);
        res.json(stocks);
    }); 
});

// Post a new stock to be tracked
router.post('/', function(req, res) {
    console.log("Req.body: ", req.body);
  
    var stock = new Stock({
      name: req.body.Name,
      code: req.body.Symbol
    });
    
    console.log('Saving stock: ', stock);

    stock.save(function (err, stock) {
      if (err) { 
        console.log('error saving stock: ', err);
      }
      res.status(201).json(stock);
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Stock.findOne({'_id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result);
    });             
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    
    console.log("Will remove stock with id of: ", id);
    
    Stock.remove({'_id': id},function(result) {
      res.json(result);       
    });    
    
});

module.exports = router;