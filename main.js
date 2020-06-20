#!/usr/bin/env nodejs

var formidable = require('formidable'); 
var http = require('http');
var fs = require('fs');

console.log("Listening on 42069");

http.createServer((req, res) => {
    if (req.url == '/fileupload') {
        console.log('fileupload')
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log("Nieuwe troep binnengekomen: " + files.filetoupload.name);
            var newPath = 'C:/Users/Niels/Desktop/' + files.filetoupload.name;
            fs.rename(files.filetoupload.path, newPath, err => {
                if (err) throw err;
                res.write('Je troep is jammer genoeg geupload');
                res.end();
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(42069);