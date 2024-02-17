const express = require('express');
const {saveTours,getTours ,deleteTours} = require('./../handlers/tour-handler');


// This router is a middleware so while use it give the router in app.use() method.
// So the app now route the request to this router now it can for diifferent url varriations like this.
const router = express.Router();


// In this way we can chain routs in this fashion which are same url but different methods.
router.route('/').post(saveTours);

router.route('/:id?').get(getTours).delete(deleteTours);

module.exports = router;