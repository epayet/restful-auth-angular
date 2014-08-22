var restify = require("restify");
var cors = require("cors");
var bodyParser = require("body-parser");
var jwt = require("jwt-simple");
var moment = require("moment");
var config = require("./config");

var app = restify.createServer({port: 3000});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/user', ensureAuthenticated, function(req, res) {
    res.send(req.user);
});

app.post('/auth/login', function(req, res) {
    if(req.body.email == "mail" && req.body.password == "pass") {
        var user = {
            email: req.body.email,
            role: "test"
        };
        var token = createJwtToken(user);
        res.send({ token: token });
    } else
        return res.send(401, { message: 'Wrong email and/or password' });
});

app.listen(3000, function () {
    console.log("server starting");
});


function ensureAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        return res.send(401);
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if (payload.exp <= Date.now()) {
        return res.send(401, { message: 'Token has expired' });
    }

    req.user = payload.user;
    next();
}

function createJwtToken(user) {
    var payload = {
        user: user,
        iat: moment().valueOf(),
        exp: moment().add(7, 'days').valueOf()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}