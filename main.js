#!/usr/bin/env nodejs

var formidable = require('formidable'); 
var http = require('http');
var mv = require('mv');

console.log("Listening on 42069");

const path = '/home/pi/HDD/discord/Niebot/music/';

http.createServer((req, res) => {
    if (req.url == '/fileupload') {
        console.log('fileupload')
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.write('Nee');
                res.end();
            }
            console.log("Nieuwe troep binnengekomen: " + files.filetoupload.name);
            if ((files.filetoupload.name).split('.').pop() != 'mp3') {
                res.write('Nee');
                res.end();
            } else {
                var newPath = path + files.filetoupload.name;
                mv(files.filetoupload.path, newPath, err => {
                    if (err) {
                        res.write('nee');
                        res.end();
                    }
                    res.write('Je troep is jammer genoeg geupload');
                    res.end();
                });
            }
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