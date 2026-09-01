//Promises : object
const promiseOne = new Promise((resolve,reject)=>{
  console.log("Promise done");
  resolve("operation successful");
})
promiseOne.then((result)=>{
  console.log(result);
}).catch((error)=>{
  console.log(error);
})
