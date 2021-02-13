const mongoose = require("mongoose") ; 
const crypto = require("crypto");
const uuidv1 = require('uuid/v1');


const { Schema } = mongoose;

  const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true //Trim White Spaces
    } ,
    lastname: {
        type: String, 
        required: false,
        maxlength: 32,
        trim: true
    },
    email: {
        type:String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type:String,
        trim:true

    },
    encry_password: {
        type:String, 
        required: true
    },
    salt: String,   /*In cryptography, a salt is random data that is used as an additional input to a one-way function that hashes data, 
                     a password or passphrase. Salts are used to safeguard passwords in storage */

    role: {
        type: Number,   //Number with 0 would be user and Highest number would be Admin
        default: 0
    },
    purchases : {
        type: Array ,
        default: []
    } 
  } ,
  {timestamps: true}
  );   //timestamp will record the time and store it to the database


  userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password
    })



  userSchema.methods = {

        authenticate: function (plainpassword) {
            return  this.securePassword(plainpassword) === this.encry_password
        },



      securePassword: function (plainpassword)  {
          if(!plainpassword) return ""
          try {
            return crypto.createHmac('sha256', this.salt)   //sha256 is a hash function
            .update(plainpassword)
            .digest('hex');
              
          } catch (err) {
              return "";
              
          }
      }
  }


  module.exports = mongoose.model("User" , userSchema)  //We are reffering/Naming UserSchema -> User 