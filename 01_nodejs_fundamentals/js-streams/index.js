const server = require('http').createServer();
const fs = require('fs');

// Increase the size of the threadpool.
process.env.UV_THREADPOOL_SIZE = 4 ;
// Maximum 128
// Default 4

// This is an approach to get data but its not send the in chunks, 
// so for big files the whole content of the file is stored in the data variable 
// then it send.
// The total data first stored in ram its a bad approach to do this.


/*server.on('request',(req,res)=>{
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
*/

// ////////////////////////////////////////////

// Use of streams.


// The data send in chunks so this is more optimized.

/*
server.on('request',(req,res)=>{

    if(req.url==='/getData'){
        // This createReadStream is create stream of data.
        const readableStream = fs.createReadStream('./files/data.txt');
        
        //  .on function is take two arguments 
        //          1. Event (Name of the event.)
        //          2. callback (Where the data is send in chunk as an argument.)
        readableStream.on('data',(chunk)=>{
            res.write(chunk);
        })

        readableStream.on('end',()=>{
            res.end();
        })
    }else{
        res.end('<h1>Hi from the backend.</h1>');
    }

})

*/

// ////////////////////////////////////////////////////

// The previous method is good, but the more optimised method is.

server.on('request',(req,res)=>{

    if(req.url==='/getData'){
        // This createReadStream is create stream of data.
        const readableStream = fs.createReadStream('./files/data.txt');
        
        readableStream.pipe(res);

        // This is more optimized way to do that.
        //      sourceStream.pipe(writeableDestination)
    }else{
        res.end('<h1>Hi from the backend.</h1>');
    }

})


server.listen(8000,'127.0.0.1',()=>{
    console.log('Server start listening on port 8000');
})



