const fs = require("fs");

// CREATE - Create a file
fs.writeFileSync("student.txt", "Name: Rahul\nRoll No: 101");
console.log("File created successfully");

// READ - Read the file
let data = fs.readFileSync("student.txt", "utf8");
console.log("\nFile Content:");
console.log(data);

// UPDATE - Add new data to the file
fs.appendFileSync("student.txt", "\nCourse: B.Tech CSE");
console.log("\nFile updated successfully");