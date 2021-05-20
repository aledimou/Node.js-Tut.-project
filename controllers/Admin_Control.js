import mongodb from "mongodb";
import  Product from "../models/product.js";


const getAdminPage = {
    getAdminProducts(req, res, next) {
      Product.fetchAll()
      .then(products =>{
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
     Product.findProduct(prodID)
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
        
        const product = new Product(title, price, description, imageUrl)
         
        product.save()
        .then(res => {
          console.log(res);
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
      
      const updatedPorduct = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImage, new mongodb.ObjectId(prodId))

      updatedPorduct.save()
      .then(result =>{
        console.log("SuccesfuLly Updated");
        res.redirect('/admin/products');   
      })
      .catch(err=>{
        console.log(err);
      })
  },
  // postDeleteProduct(req, res){
  //   const prdctID = req.body.productId;
  //   Product.destroy({
  //     where: {
  //       id: prdctID
  //     }
  //   })
  //   .then(result=>{
  //     console.log("Succesffully Deleted Product");
  //     res.redirect('/admin/products');  
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  // }
 }

export default getAdminPage


