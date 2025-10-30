const connect = require('connect');
const app = connect();

function helloWorld(req, res, next) {
   res.setHeader('Content-Type', 'text/plain');
   res.end('Hello World');
};

function GoodbyeWorld(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Cood World');
 };

app.use(helloWorld);
app.listen(3000);
console.log('Server running at http://localhost:3000/');
