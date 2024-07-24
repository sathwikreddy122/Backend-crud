const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')

const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}));

//connecting to DataBase.
mongoose.connect("mongodb+srv://venkatasathwik12604:XyBLlgiEqUuF8RBJ@clustercrud.6ip7o1m.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCRUD")
.then(() => {
    console.log("Conntect to the database");
    app.listen(3000, () => {
        console.log("server is running on port 3000");
    });
})
.catch(() => {
    console.log("Connection failed to datdbase");
})

function additionNumbers (a, b){
    return a + b
}

//responding to the default page, just a demo Responce.
app.get('/', (req, res) => {
    let addition = additionNumbers(5 , 5);
    addition = addition +  10;
    res.send("hello from node API, The sum of a & b is " + addition);
});

//responding to the clint with all the products.
app.get('/api/products', async (req, res) => {
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message : errormessage});
    }
});

//responding to the clint with the product based on its ID.
app.get('/api/product/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message : errormessage});
    }
});

//Responding to the server to create the data and add to the Database.
app.post('/api/products', async (req, res) => {
    try{
       const product =  await Product.create(req.body);
       res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message : errormessage});
    }
});

//updating the Product in the DataBase.
app.put('/api/product/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        
        if(!product){
            return res.status(500).json({message : "Product not found in the database"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message : errormessage});
    }
});

//Delete a product form DataBase
app.delete('/api/product/:id', async (req, res) => {
    try{
        const{ id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message : "Product not found"})
        }
        res.status(200).josn({message : "Product deleted successfully"});
    }
    catch(error){
        res.status(500).json({message : errormessage})
    }
});