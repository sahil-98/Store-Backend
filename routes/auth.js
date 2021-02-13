const { Router } = require("express");
const { check ,validationResult } = require('express-validator');
var express = require('express');
var router  = express.Router();
const {signout , signup , signin, isSignedIn} = require("../controllers/auth")



router.post("/signup", 
 [
    check("name").isLength ({min:  3}).withMessage("Yo"),   
    check("email").isEmail().withMessage("Invalid Email Pal "),                     //Express Validator
    check("password").isLength ({min:  3}),
]  
,signup);



router.post("/signin", 
 [   
    check("email").isEmail().withMessage("Invalid Email Pal "),                     //Express Validator
    check("password").isLength ({min:  1}).withMessage("Paswword is required"),
]  
,signin);



router.get("/signout", signout ); //this signout method is in controllers


/*
router.get("/testroute",  isSignedIn , (req, res ) => {

        res.send("A Protected route"); / res.json(req.auth);
});
*/

module.exports = router;