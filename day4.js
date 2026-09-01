//create one promises that will display user name and password
//using resolve and if data will be rejected its display error message 
/*new Promise((resolve,reject)=> {
  setTimeout(()=>{
    let err=true;
    if(!err){
      resolve("user: CSE 21, password: 123");
    }
    else{
      reject("ERROR....data failed");
    }
  })
}).then((result)=>{
  console.log(result);
}).catch((error)=>{
  console.log(error);
})*/



//async/await
console.log("this is async/await");

async function test(){
  console.log("1");
  await console.log("2");
  console.log("3");
}
