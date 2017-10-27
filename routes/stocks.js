const express = require('express');
const router = express.Router();

const Stock = require('../server/models/stock');

// get all stocks in the database
router.get('/', (req, res) => {
    Stock.find({}, (err, stocks) => {
        if (err) console.log('Err: ', err);
        res.json(stocks);
    }); 
});

// Post a new stock to be tracked
router.post('/', (req, res) => {
    console.log("Req.body: ", req.body);
  
    const stock = new Stock({
      name: req.body.Name,
      code: req.body.Symbol
    });
    
    console.log('Saving stock: ', stock);

    stock.save((err, stock) => {
      if (err) { 
        console.log('error saving stock: ', err);
      }
      res.status(201).json(stock);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Stock.findOne({'_id':id}, (err, result) => {
        if (err) console.log('Err: ', err);
        return res.send(result);
    });             
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    console.log("Will remove stock with id of: ", id);
    
    Stock.remove({'_id': id}, result =>
      res.json(result)
    );
    
});

module.exports = router;
