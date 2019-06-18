const express = require('express');
const linecounter = require('./src/index');
const program = require('commander');

var port = 8088;
var app = express();

app.listen(port, ()=>{
    console.log('Server Listening on %d ...', port);
})

app.use(express.static('./public'));
app.get('/count', (req, response)=>{
    var srcName = req.query.dirname;
    console.log(srcName);

    program
        .version("3.3.1")
        .option("-d, --directory <directory>", "specify directory")
        .option("-i, --ignore <filename1, filename2... filenameN>", "ignore specific files", function list(val) {return val.split(',');})
        .option("-f, --file <filename>", "count only one file")
        .option("-l, --list", "list out not ignored (counting files)")
        .option("-e, --errors", "list out errors to linecounter.error.log")
        .option("-t, --table", "display results in a table")
        .parse(process.argv);

    var options = {
        directory: srcName,
        ignore: program.ignore,
        file: program.file,
        list: program.list,
        errors: program.errors
    }
    linecounter((res) => {
        response.send(res);
    }, options);
})
