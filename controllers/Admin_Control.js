import mongodb from "mongodb";
import  Product from "../models/product.js";


const getAdminPage = {
    getAdminProducts(req, res, next) {
      Product.find()
      // //get certain properties we want to retrieve from find()
      // .select("title price description - _id")//exclude _id field from the select
      //use populate to get full access to the related user
      // .populate("userId", "name") //explicity include name
      .then(products =>{
        // console.log(products);
        res.render('admin/products',
        {prodsList: products,
         docTitle: 'Admin Products',
         path: '/admin/products',
        });
      })
      .catch(err=>{
        console.log(err);
      })   
    },
    getAddproduct(req, res, next) {
        res.render('admin/edit-product',{
          docTitle: 'Admin Page',
          path: '/admin/add-product',
          editing: false
        });
    },
    getEditProduct(req, res){
      const isEdit = req.query.edit;

      if (!isEdit) {
        return res.redirect('/')
      }
     const prodID = req.params.productId;
     Product.findById(prodID)
      .then(product=>{
        if (!product) {
          return res.redirect('/')
        }
        res.render('admin/edit-product', {
          docTitle: 'Edit Products',
          path: '/admin/edit-product',
          editing: isEdit, 
          product: product   
        });   
      })
      .catch(err=>{
        console.log(err);
      }) 
    
    },  
    postAddProduct(req, res, next){
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        
        const product = new Product(
          {
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl,
            userId: req.user
          }
        );
         //save() method from mongoose
        product.save()
        .then(result => {
          console.log(result);
          res.redirect('/admin/products');
        })
        .catch(err=> console.log(err))
        
    },
    postEditProduct(req, res, next){
      const prodId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedImage = req.body.imageUrl;
      const updatedPrice = req.body.price;
      const updatedDescription = req.body.description;
      
      Product.findById(prodId)
      //returns a mongoose object ,further we can apply mongoose methods to it
      .then(product =>{
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImage;

        product.save()
        .then(product =>{
          console.log(`Succesfully Updated ${product.title}`);
          res.redirect('/admin/products');   
        })
      })
      .catch(err => console.log(err));

     

  },
  postDeleteProduct(req, res){
    const prdctID = req.body.productId;
    Product.deleteOne({_id: prdctID})
    .then(result=>{
      console.log("Succesffully Deleted Product");
      res.redirect('/admin/products');  
    })
    .catch(err=>{
      console.log(err);
    })
  }
 }

export default getAdminPage


