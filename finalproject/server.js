var express = require("express");
var app = express();

app.get('/', function(req, res){
    res.send('Welcome to your future');
});

app.listen(5000, function(err){
    if (!err)
        console.log("site is live");
    else console.log(err);

});
