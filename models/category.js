const mongoose = require("mongoose");

const Schema = mongoose.Schema ;

const categorySchema = new Schema ({

    name: {
        type: String , 
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
    
},  
    {timestamps: true}
);  //timestamp will record the time and store it to the database

module.exports = mongoose.model("Category",categorySchema );
 