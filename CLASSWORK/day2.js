//synchronous & asynchronous programming 
//synchronous
/*console.log("javascript");
function hello(){
  console.log("hello");
}
hello();
console.log("This is synchronous programming");

const hello = () => {
  setTimeout(() => {
    console.log("Hello world");
},2000);
}
hello();
console.log("This is asynchronous programming");*/

//callback, promises, async/await
function add(n1, n2, callback){
  console.log(n1+n2);
  callback();
}
let a=10;
let b=20;
add(a,b, sayHI);
add(a,b, hello);

function sayHI(){
  console.log("HI, This is a callback function");
}
function hello(){
  console.log("hello world");
}

//create a function display(callback) that prints "welcome to ABES " then call callback which prints "learning fsd in cse 21"

function display(callback){
  console.log("Welcome to ABES");
  callback();
}
display(learn);
function learn(){
  console.log("learning FSD in cse-21");
}