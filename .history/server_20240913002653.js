const connect = require('connect');
const app = connect();

function logger(req, res, next) {
    console.log(req.method, req);
 };

function helloWorld(req, res, next) {
   res.setHeader('Content-Type', 'text/plain');
   res.end('Hello World');
};

function GoodbyeWorld(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Goodbye World');
 };

app.use(helloWorld);
app.listen(3000);
console.log('Server running at http://localhost:3000/');
