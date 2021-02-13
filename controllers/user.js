const User = require("../models/user");
const Order = require("../models/order");



exports.getUserById = (req , res, next ,id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return  res.status(400).json({
                error: "No user was foud in DB"
            })
        }
        console.log("SAHIL the kapoor");
        req.profile = user ; 
        next();

    });
};


exports.getUser =(req,res) => {
    req.profile.salt =undefined ;
    req.profile.encry_password =undefined ; 
    req.profile.createdAt =undefined ;
    req.profile.updatedAt =undefined ;  
    return res.json(req.profile)
}


exports.updateUser = (req , res) => {

    User.findByIdAndUpdate ( {
        _id : req.profile._id
    } ,
    {
        $set : req.body
    },
    {
        new: true , useFindAndModify : false
    },
    (err, user)  => {
        if(err ) {
            return res.status(400).json ({
                error: "ERrroR"
            })
        }
        user.salt =undefined ;
        user.encry_password =undefined ; 
        user.createdAt =undefined ;
        user.updatedAt =undefined ;
        res.json(user)
    }
    ) 

}

exports.userPurchaseList = (req,res) => {

        Order.find({user: req.profile._id})   // We can find this user in the order model , where user is reference
        .populate("user" , "_id name")
        .exec((err , order) => {
            if(err) {
                return res.status(400).json ( {
                    error : "No order"
                })
            }
            return res.json(order);
        })
}

exports.pushOrderInPurchaseList = (req, res ,next) => {                 //Middleware

    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push ( {
            _id: product.id,
            name : product.name, 
            description : product.description , 
            category : product.category , 
            quantity : product.quantity , 
            amount : req.body.order . amount ,
            transaction_id : req.body.order.transaction_id
        })
    });


    //store this in DB
    User.findOneAndUpdate ( 
        {_id : req.profile._id},
    {$push : {purchases: purchases}} ,
    {new : true}, // send the updated object from the database
    (err , purchases) => {
        if(err) {
            return res.status(400).json ( {
                error: "Unabale to save purchase list"
            })
        }
        next();
    }
    

);
}