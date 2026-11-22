
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let products = [];

for (let i = 1; i <= 100; i++) {
    products.push({
        id: i,
        name: "Product " + i,
        price: i * 100,
        category: "General"
    });
}

// GET all products
app.get('/products', (req, res) => {
    res.json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (product) {
        res.json(product);
    } else {
        res.send("Product not found");
    }
});

// POST new product
app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };

    products.push(newProduct);

    res.send("Product added successfully");
});

// PUT update product
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.category = req.body.category;

        res.send("Product updated successfully");
    } else {
        res.send("Product not found");
    }
});

// DELETE product
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products.splice(index, 1);
        res.send("Product deleted successfully");
    } else {
        res.send("Product not found");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
