const express = require('express');
const {saveTours,getTours ,deleteTours} = require('./../handlers/tour-handler');


// This router is a middleware so while use it give the router in app.use() method.
// So the app now route the request to this router now it can for diifferent url varriations like this.
const router = express.Router();


//Create custom middleware for the specific request method handler.
const requestBodyCheckForPost = (req,res,next)=>{
    console.log(req.body);
    if(req.body.startLocation.description===null){
        res.send({
            status:'failed',
            message:'Bad request body'
        })
    }
    return;
}

// In this way we can chain routs in this fashion which are same url but different methods.

// Apply the middleware for the specific request handler.
router.route('/').post(requestBodyCheckForPost,saveTours);

router.route('/:id?').get(getTours).delete(deleteTours);

module.exports = router;