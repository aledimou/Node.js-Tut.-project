import express from 'express'
import path from 'path';
import  router from "./routes/admin.js";
import shopRoutes  from "./routes/shop.js";
import ErrorPageController from "./controllers/404_Page.js";
import * as accessDb from "./util/database.js"


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//incoming user
app.use((req, res, next)=>{
    // User.findByPk(1)
    // .then(user=>{
    //     req.user = user;
    //     next();
    // })
    // .catch(err=>console.log(err));
    next();
});




app.use('/admin', router);
app.use(shopRoutes);


app.use(ErrorPageController);

accessDb.connectDB();

app.listen(3000, (err)=>{
    err? console.log(err) : console.log("Server Running");
})


