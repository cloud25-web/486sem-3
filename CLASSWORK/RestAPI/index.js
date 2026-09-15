import express from 'express';
const app = express();
let users = [
  { id: 1, name: 'A', email: 'A@example.com'},
  { id: 2, name: 'B', email: 'B@example.com'}
];
//GET:fetch all users data 
app.get('/users', (req,res) => {
  res.json(users);
});
//POST : create a new user
app.post('/users', (req,res) => {
  let user = {
    id: users.length + 1,
    name: req.body.name,
    email : req.body.email
  };
  users.push(user);
  res.json(user);
});

app.put('/users/:id', (req,res) => {
  let user = users.find(u=> u.id==req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  res.send("User updated successfully");
  res.json(user);
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});