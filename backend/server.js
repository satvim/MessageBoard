/**
 * Created by Sathish on 21/08/17.
 */
var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var jwt = require ('jsonwebtoken');

var messages = [{name: 'Francis', text: 'Welcome to Message Board!'},{name:'Diane', text:'Wonderful day!!!'},{name:'Francis', text:'Use this for official purpose. Thanks!'}];
var users = [{firstName:'a', email:'a', password: 'a', id: 0}];

app.use(bodyParser.json());

app.use(function (req,res,next) {
    res.header ("Access-Control-Allow-Origin","*");
    res.header ("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

var api = express.Router();
var auth = express.Router();

api.get('/messages', function (req,res) {
    res.json(messages);
})

api.get('/messages/:user', function (req,res) {
    var user = req.params.user;
    var result = messages.filter(message => message.name == user);
    res.json(result);
})

api.get('/users/me', checkAuthenticated, function (req,res) {
    res.json(users[req.user]);
})

api.post('/users/me', checkAuthenticated, function (req,res) {
    var user = users[req.user];

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    res.json(user);
})

api.post('/messages', function (req,res) {
    messages.push(req.body);
    res.json(req.body);
})

auth.post('/login', function (req,res) {
    var user = users.find(user => user.email == req.body.email);

    if (!user) {
        sendAuthError(res)
    }

    if (user.password == req.body.password) {
        sendToken(user,res);
    } else {
        sendAuthError(res);
    }
})

auth.post('/register', function (req,res) {
    var index = users.push(req.body) - 1;
    var user = users[index];
    user.id = index;
    sendToken(user,res);
})

function sendToken (user,res) {
    var token = jwt.sign(user.id,'123')
    res.json({firstName: user.firstName, token});
}

function sendAuthError (res) {
    return res.json({success: 'false', message: 'Email or Password incorrect'});
}

function checkAuthenticated (req,res,next) {
    if (!req.header('authorization'))
        return res.status(401).send({message: 'Unauthorized request. Missing Authentication Header'});

    var token = req.header('authorization').split(' ')[1];
    var payload = jwt.decode(token, '123');

    if (!payload)
        return res.status(401).send({message: 'Unauthorized request. Authentication header invalid'});

    req.user = payload;

    next();
}

app.use('/api',api);
app.use('/auth',auth);

app.listen(2000,function () {
    console.log('Connected to port 2000');
});
