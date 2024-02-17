const express = require('express');

const app = express();


app.get('/',(req,res)=>{
    res.send('Hello World from express.');  
})



const port = 8000;
app.listen(port,()=>{
    console.log(`Server listening on port ${port} ...`);
});