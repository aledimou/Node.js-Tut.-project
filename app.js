import express from 'express'
import path from 'path';
import  router from "./routes/admin.js";
import shopRoutes  from "./routes/shop.js";
import ErrorPageController from "./controllers/404_Page.js";
// import * as accessDb from "./util/database.js"
// import User from "./models/user.js"
import mongoose from "mongoose"


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//incoming user
// app.use((req, res, next)=>{
//     User.findById('60a8006db2d80dcb26b0cce4')
//     .then(user=>{
        
//         if (!user.cart) {
//             console.log("No cart.");
//             user.cart = { items: [] };
//           }
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();
//     })
//     .catch(err=>console.log(err));
// });


app.use('/admin', router);
app.use(shopRoutes);


app.use(ErrorPageController);

mongoose.connect('mongodb+srv://alexis:RWDHuOJXLtyHSXEt@cluster01.nk0bi.mongodb.net/Cluster01?retryWrites=true&w=majority',  {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{

    app.listen(3000, (err)=>{
        err? console.log(err) : console.log("Server Running");
    })
})
.catch(err=> console.log(err))




