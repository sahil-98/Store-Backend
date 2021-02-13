require("dotenv").config(); 

const mongoose = require('mongoose');
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//My Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/payment");


//DB connect
mongoose.connect(process.env.DATABASE, {         // .env file used for security purpose
    useNewUrlParser: true, 
    useUnifiedTopology: true ,
    useCreateIndex: true
}) .then(() => {
        console.log("DB Connected")
})


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//My Routes
app.use("/api", authRoutes);
app.use("/api",userRoutes);
app.use("/api" , categoryRoutes);
app.use("/api" , productRoutes);
app.use("/api" , orderRoutes);
app.use("/api" , paymentBRoutes);






const port = process.env.PORT || 8000;  //DOTenv node 

app.listen(port,() =>{
    console.log(`app is running at ${port}`);
});