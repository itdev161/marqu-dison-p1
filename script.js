const express = require('express');      // Import Express
const Joi = require ('joi');            // Import Joi- Object Schema Validation
const app = express();                 // Create Express App on the app variable

app.use(express.json());             // used with json file
const preOrders = [
    {title: 'ProductX' , id: 1},
    {title: 'ProductY' , id: 2},
    {title: 'ProductC' , id: 3},
    {title: 'ProductG' , id: 4},
    {title: 'ProductZ', id: 5}
]
// Server Message
app.get('/' , (req, res) => {res.send('Demo Orders - REST API / CRUDE DEMO')});

// Display the List of Orders
app.get('/api/preOrders',  (req,res) => {res.send(preOrders);} );

// Display the information of specific order(s) when id is called
app.get('/api/preOrders/:id', (req, res) => {const order = preOrders.find(c => c.id === parseInt(req.params.id));
    if(!preOrders) res.status(404).send();
    res.send(order)});

// POST Add New Order BUG
app.post('/api/preOrders', (req, res) => 
{
    const {error} = validateOrder(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    // Increment id
    const order = {
        id: preOrders.length +1, 
        title: req.body.title
    };
    preOrders.push(order);
    res.send(order);
});

// UPDATE Request Handler  BUG
app.put('/api/preOrders/:id', (req, res) => {
    const order = preOrders.find(c => c.id === parseInt(req.params.id));
    if(!order) res.status(404).send();

   // const {error} = validateOrder(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    order.title= req.body.title;
    res.send(order);
});

// DELETE 
app.delete('/api/preOrders/:id', (req, res) => {

    const order = preOrders.find(c => c.id === parseInt(req.params.id));
    if(!order) res.status(404).send();

    const index = preOrders.indexOf(order);
    preOrders.splice(index, 1);

    res.send(order);
});

//Validate 
function validateOrder(order){
    const schema = 
    {
        title: Joi.string().min(3).required()
    };  
    return Joi.validate(order, schema);
}

// Port Environment Variable
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

// Run script w/ node script.js command 