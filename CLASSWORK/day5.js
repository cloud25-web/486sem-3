//understand the concept of fetch in console 
async function test(){
  console.log("this is asynchronous function and we want to fetch");
  const response = await fetch("./student.json");
  console.log(response.status);
  const student = await response.json();
  console.log(student);
  console.log("final data fetch")
}
test().then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});