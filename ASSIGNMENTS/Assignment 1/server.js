
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    // Home page
    if (req.url === '/') {

        res.writeHead(200, {'Content-Type': 'text/html'});

        res.end(`
            <h1>Welcome to Student Record System</h1>

            <form action="/add" method="POST">

                Name: <input type="text" name="name"><br><br>

                Roll Number: <input type="text" name="roll"><br><br>

                Course: <input type="text" name="course"><br><br>

                Email: <input type="email" name="email"><br><br>

                <button type="submit">Add Student</button>

            </form>

            <br>
            <a href="/students">View Students</a>
        `);
    }

    // Add student
    else if (req.url === '/add' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            const data = new URLSearchParams(body);

            const student = {
                name: data.get('name'),
                roll: data.get('roll'),
                course: data.get('course'),
                email: data.get('email')
            };

            fs.readFile('students.json', 'utf8', (err, fileData) => {

                let students = [];

                if (!err) {
                    students = JSON.parse(fileData);
                }

                students.push(student);

                fs.writeFile('students.json', JSON.stringify(students), (err) => {

                    if (err) {
                        res.end('Error saving student');
                    } else {
                        res.end('Student Added Successfully! <a href="/students">View Students</a>');
                    }

                });
            });
        });
    }

    // Display students
    else if (req.url === '/students') {

        fs.readFile('students.json', 'utf8', (err, data) => {

            if (err) {
                res.end('Error reading file');
                return;
            }

            const students = JSON.parse(data);

            let output = '<h1>Student Records</h1>';

            students.forEach(student => {
                output += `
                    <p>Name: ${student.name}</p>
                    <p>Roll: ${student.roll}</p>
                    <p>Course: ${student.course}</p>
                    <p>Email: ${student.email}</p>
                    <hr>
                `;
            });

            res.end(output);
        });
    }

    else {
        res.end('Page Not Found');
    }

});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
