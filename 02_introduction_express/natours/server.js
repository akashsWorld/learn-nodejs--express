const app = require('./app');

const port = 8000;
app.listen(port,()=>{
    console.log(`App started listening on port ${port}`);
})

module.exports = app;