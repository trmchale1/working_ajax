var express = require('express');
var app = express();
var fs = require('fs');
var parse = require('csv-parse');

var parse = function (input, option){
    try
    {   
        // output object
        var data = {},
        // output no columns array
        container = [],
        // output array
        records = [],
        // splits csv data at each new line
        lines =input.split(/\r\n|\r|\n/),
        // creates columns by splitting first line of csv
        columns = lines[0].split(',');
        // creates objects from csv data if column option included
        if (option === true){

            // loop through each line of csv file
            for (var l = 1; l <= lines.length-1; l++)
            {
                // splits each line of csv by comma
                var words = lines[l].split(',');

                // builds object based on column headers
                for (var cell in columns)
                {
                    data[columns[cell]] = words[cell];          
                }
                // pushes object to output array
                records.push(data);
                // resets object in order to add another
                data = {};
            }
        }
        else {
            // creates nested arrays from csv data if column option omitted,false or not true
            for (var l = 0; l <= lines.length-1; l++)
            {
                // splits each line of csv by comma
                var words = lines[l].split(',');
                // creates objects from csv data
                for (var cell in words)
                {
                    container.push(words[cell]);    
                }
                // push array to output array
                records.push(container);
                // reset array in order to add another
                container = [];
            }
        }
        // returns output array
        return records
    }
    catch(err){
        return err
    }
}
// reads our csv an sends to parse then writes it to myjsonfile.json
fs.readFile('files/states.csv', 'utf8', function(err,data){
        if(err){
                return console.log(err);
        }
        var content = data;
        var data = parse(content,true);
	json = JSON.stringify(data);
	fs.writeFile('files/myjsonfile.json', json, 'utf8');
});


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
