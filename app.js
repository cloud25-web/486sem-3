//function in js: block of code
//syntax:
//function fname(){
//};
//fname();

/*function add (num1,num2) {
  console.log(num1 + num2);
  return num1 + num2;
}
add(2,1);

function add (num1,num2) {
  return num1 + num2;
}
add(2,1);
//arrow function
//() => {}
const add = ()=>{
  console.log("arrow function")
}
add();

const add = (num1, num2)=>{
  return num1+num2;
}
console.log(add(2,1));*/

function addNum(){
  console.log(arguments);
}
addNum(2,1,2,4,3,4);

//node.js