import express from 'express'
import path from 'path';
import router from "./routes/admin.js";
import shopRoutes  from "./routes/shop.js";
import ErrorPageController from "./controllers/404_Page.js";
// import * as accessDb from "./util/database.js"
import User from "./models/user.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"



dotenv.config();


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const __dirname = path.resolve();


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//incoming user handle after initilization
app.use((req, res, next)=>{
    User.findById(`${process.env.USER_ID}`)
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err=>console.log(err));
});


app.use('/admin', router);
app.use(shopRoutes);
app.use(authRoutes);



app.use(ErrorPageController);



mongoose.connect(`mongodb+srv://alexis:${process.env.CONNECTION_URI}@cluster01.nk0bi.mongodb.net/Cluster01?retryWrites=true&w=majority`,  {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{


    //initialize a new User
    const user = new User({
        name: "Alex",
        email: "alexdm36@gmail.com",
        cart: {
            items: []
        }
    });
        if (!user.name) {
            user.save()
                .then(incomingUser=>{
                    console.log(`New Incoming User ${incomingUser}`);
                })
                .catch(err=>{
            console.log(err);
            })
        } 
    

    app.listen(3000, (err)=>{
        err? console.log(err) : console.log("Server Running");
    })
  
})
.catch(err=> console.log(err))




