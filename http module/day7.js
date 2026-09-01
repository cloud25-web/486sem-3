//create your own server using HTTP MODULE 
import http from "http";
const server = http.createServer((req,res)=> {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<h1> Welcome to my server</h1>")
})
server.listen(8000, ()=>{
  console.log("server is running on port 8000");
})