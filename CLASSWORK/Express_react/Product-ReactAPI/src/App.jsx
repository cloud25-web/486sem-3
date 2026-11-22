import {useState, useEffect} from 'react'

const App = () => {
  const[products, setProducts] = useState([]);
  const[name, setName] = useState('');
  const[price, setPrice] = useState('');
  const[category, setCategory] = useState('');
  //get products
  const getProducts = async() => {
    const response = await fetch('http://localhost:4000/api/products');
    const data = await response.json();
    setProducts(data);
  }
  //add product
  const addProduct = async(e) => {
    e.preventDefault();
    const product = {
      name : name,
      price : price,
      category : category
    };
    await fetch('http://localhost:4000/api/products'),
    {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : json-stringify(product)
    }
  }
  return (
    <div>
      <table border="1" cellPadding={10}>
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
        </thead>
        <tbody>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
