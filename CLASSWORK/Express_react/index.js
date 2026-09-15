import express from express;
import cors from cors;
import fs from fs;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/products", (req,res)=> {
  const data = fs.readFile("products.json", "utf-8");
  const product = JSON.parse(data);
  res.json(product);
});

app.post("/products", (req,res)=> {
  const data = fs.readFile("products.json", "utf-8");
  const product = JSON.parse(data);
  const newProduct = {
    id : product.length+1,
    name : req.body.name,
    price : req.body.price
  }
  product.push(newProduct);
  fs.writeFile("products.json", json.stringify(product,null,2))
  res.json(newProduct);
});

app.listen(4000, ()=> {
  console.log("Server is running on port 4000");
})