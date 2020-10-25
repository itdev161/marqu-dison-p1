const errors = require('restify-errors'); // Used to test error codes / Ignore
const Subscriber = require('../models/Subscriber');

module.exports = server => {
  // ROUTE ADD 
  server.post('/subscribers', async (req, res, next) => {
    // Checking for JSON 
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Please use 'application/json'"));
    }

    const {name, email} = req.body;
    // Passing in new Customer object
    const subscriber = new Subscriber({
      name: name,
      email: email
    });

    try {
      const newSubscriber = await subscriber.save();
      res.send(201);
      next();
    } catch(err) {
    }
  });
  // ROUTE GET ALL
  server.get('/subscribers', async (req, res, next) => {
    try{
      const subscribers = await Subscriber.find({});
      res.send(subscribers);
      next();
    } catch(err) {
    }
  });
  // ROUTE GET SINGLE 
  server.get('/subscribers/:id', async (req, res, next) => {
    try{
      const subscriber = await Subscriber.findById(req.params.id);
      res.send(subscriber);
      next();
    } catch(err) {
    }
  });
  // ROUTE UPDATE
  server.put('/subscribers/:id', async (req, res, next) => {
    // Check for JSON (Will trigger error if not of req.content type)
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Please use 'application/json'"));
    }

    try {
      const subscriber = await Subscriber.findOneAndUpdate({_id: req.params.id }, req.body);
      res.send(200);
      next();
    } catch(err) {
    }
  });
    // ROUTE DELETE
    server.del('/subscribers/:id', async (req, res, next) => {
      try{
        const subscriber = await Subscriber.findOneAndRemove({_id: req.params.id });
        res.send(204);
        next();
      } catch(err) {    
      }
    })
};