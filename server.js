// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');



// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());
app.use(requestLogger);
app.use('/api', authenticate);

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// TODO: Implement the following routes:
// GET /api/products - Get all productsapp
app.get('/api/products',(_,res)=>{
  res.json(products);
});
// GET /api/products/:id - Get a specific product
app.get('/api/products/:id',(req,res)=>{
  const product=products.find(p=>p.id===req.params.id);
  if(!product) return res.status(404).send('product not found');
  res.json(product);
});
// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
    const newProduct = { id: products.length + 1, ...req.body };
    users.push(newProduct);
    res.status(201).json(newProduct);
});
// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
    const product = users.find(p=> p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('product not found');
    Object.assign(product, req.body);
    res.json(product);
});
// DELETE /api/products/:id - Delete a product
// DELETE - Remove a user
app.delete('/products/:id', (req, res) => {
    products = products.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
});
// Example route implementation for GET /api/products


// TODO: Implement custom middleware for:
// - Request logging
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// - Authentication
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader === 'Bearer mysecrettoken') {
    next(); // Authorized
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// - Error handling
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
};


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 