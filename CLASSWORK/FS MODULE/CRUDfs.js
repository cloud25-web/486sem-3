//Perform CRUD operations on files using fs module
import fs from 'fs';
const fileName = "student2.txt";
async function createFile(){
  try{
  await fs.writeFile(fileName, "Name: Drishti\n Email: abc@gmail.com", "utf8");
  console.log("file created...")
  }
  catch(err){
    console.log("error:", err.message);
  }
}

//Read a file
async function readfile(){
  try{
    await fs.readFile(fileName, "utf8");
    console.log("File content: \n" + data);
  }
  catch(err){
    console.log("error", err.message);
  }
}

//update a file 
async function updateFile() {
  try {
    await fs.appendFile(fileName, "\nCourse: Computer Science", "utf8");
    console.log("3. File updated...");
  } catch (err) {
    console.log("Error updating file:", err.message);
  }
}

//Delete a file 
async function deleteFile(){
  try{
    await fs.unlink(fileName);
    console.log("File deleted successfully");
  }
  catch(err){
    console.log("error", err.message);
  }
}

async function run(){
  await createFile();
  await readFile();
  await updateFile();
  await deleteFile();
}

