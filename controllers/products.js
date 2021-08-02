import  Product from "../models/product.js";
// import Cart from "../models/cart.js";

const HomeproductController = {
    getHomeProduct(req, res, next) {
      //give all products
      Product.find()
      .then(products=>{
        res.render('shop/product-page',
         {prodsList: products,
          docTitle: 'All Products',
          path: '/products',
        });  
      })
      .catch(err=>{
        console.log(err);
      })
    },

    getDetailsProduct(req, res, next) {
      const prodctId = req.params.productID
      Product.findById(prodctId)
      .then(product =>{
        res.render('shop/product-detail',
        {product: product,
        docTitle: 'Details',
        path: '/products',
        });
      })
      .catch(err=>{
        console.log(err);
      })
 },

    getIndex(req, res){
      Product.find()
      .then(products =>{
        res.render('shop/index',
       {prodsList: products,
        docTitle: 'My Shop',
        path: '/',        
    });
      }).catch(err=>{
        console.log(err);
      })
  }



}
export default HomeproductController