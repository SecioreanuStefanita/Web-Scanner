var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/login', function (req, res) {
   // Prepare output in JSON format
   pool.query(`SELECT * FROM users
   WHERE name =  '${req.body.username}' AND password = ''${req.body.password}';`, (error, results) => {
    if (error) {
        console.log(error);
        return res.end('NOK')
    }
    console.log(results)
    if(results.rows.length > 0) {
        res.end('OK')
    } else {
        res.end('NOK')
    }
});
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})