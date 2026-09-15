/*import http from "http";
const server = http.createServer((req,res) => {
  res.writeHead(200, {
    'Content-type' : 'text/plain'
  });
  res.end('Hello world');
});
server.listen(8000);*/

//Practical 3
import http from 'http';
const server = http.createServer((req,res) => {
  res.writeHead(200, {
    'content-type' : 'text/html'
  });
  res.write('<h1>Hello world...</h1>');
  res.writeHead(403, {
    'content-type ' : 'text/html'
  });
  res.end("<h2>403...forbidden error</h2>");
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
})