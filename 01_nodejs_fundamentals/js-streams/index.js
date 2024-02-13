const server = require('http').createServer();
const fs = require('fs');

// This is an approach to get data but its not send the in chunks, 
// so for big files the whole content of the file is stored in the data variable 
// then it send.
// The total data first stored in ram its a bad approach to do this.


server.on('request',(req,res)=>{
    if(req.url==='/getData'){
        fs.readFile('./files/data.txt','utf-8',(err,data)=>{
            if(err){
                res.end('<h1>Data not found</h1>');
            }else{
                res.end(data);
            }
        });
    }else{
        res.end('<h1>Hi from the backend.</h1>');
    }
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('Server start listening on port 8000');
})

// ////////////////////////////////////////////

// Use of streams.



