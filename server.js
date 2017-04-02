var express = require('express');
var app = express();
var fs = require('fs');


app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/searching', function(req,res){
	fs.readFile('files/myjsonfile.json','utf8', function(err,data){
		  if(err){
                	return console.log(err);
	        	}
		res.send(data);
	});
});

app.listen(8080, function () {
  console.log('Running.');
});
