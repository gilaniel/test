const express = require('express');
const browserSync = require('browser-sync');
const app = express();
const path    = require("path");

const redis = require('redis');
const client = redis.createClient();

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');

const mysql      = require('mysql');
const config = require('./config');
const uid = require('uuid');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'gilaniel',
  password : config.mysql.password,
  database : 'gentoo'
});

db.connect();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    store: new RedisStore({
        host: '127.0.0.1',
        port: '6379'
    }),
    secret: config.redis.secret,
    resave: false,
    saveUninitialized: true
}))

app.listen(8000, function(){});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/auth/', function (req, res) {
    res.sendFile(path.join(__dirname+'/auth/index.html'));
});

app.post('/registrate', function (req, res) {
    db.query(`SELECT login FROM users WHERE login = '${res.req.body.login}'`, function (error, results, fields) {
        if (error) throw error;
        if(results[0]){
            res.status(401).json({body: 'user_exist'});
        }else{
            let id = uid();
            db.query(`INSERT INTO users (id,login,password) VALUES ('${id}','${res.req.body.login}','${res.req.body.password}')`, function (error, results, fields) {
                if (error) throw error;
                req.session.uid = id;
                req.session.authorized = false;
                req.session.save();
                res.status(200).json({body: 'ok'});
            });
        }
    });

});

app.post('/login', function (req, res) {
    db.query(`SELECT * FROM users WHERE login = '${res.req.body.login}' AND password = '${res.req.body.password}'`, function (error, results, fields) {
        let val = results[0];
        if(val){
            req.session.uid = val.id;
            req.session.authorized = true;
            req.session.save();
            res.status(200).json({body: 'ok'});
        }else{
            res.status(401).json({body: 'pswd_login_error'});
        }
    });
    
});

app.get('/logout', function (req, res) {
    req.session.authorized = false;
    req.session.save();
    res.status(200).json({logout: true});
});

app.get('/user_status', function (req, res) {
    res.status(200).json({body: {authorized: req.session.authorized}});
});
