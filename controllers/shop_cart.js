import Product from "../models/product.js"


const getTransaction ={  

    getCart(req, res){
        req.user.getCart()
        .then(cart =>{
            //relation
            return cart
            .getProducts()
            .then(products =>{
                res.render('shop/cart',{
                    docTitle: 'Cart',
                    path: '/cart',
                    products: products
                });               
            })
            .catch(er=>{
                console.log(err);
            })
        })
        .catch(err=>{
            console.log(err);
        });
    },

    postCart(req, res){
        const prodId = req.body.productId;
        let fetchedCart;
        let newQuantity = 1;
        req.user.getCart()
        .then(cart=>{
            fetchedCart = cart;
            return cart.getProducts({where: {id: prodId}})
        })
        .then(products=>{
           let product;
           if (products.length > 0) {
               product = products[0];
           }

           if (product) {
               const oldQuantity = product.cartItem.quantity;
               newQuantity = oldQuantity + 1;   
               return product;       
            }
           return Product.findByPk(prodId)       
        })
        .then(product=>{
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity}
            });
        })
        .then(()=>{
            res.redirect('/cart')
        })
        .catch(err=>{
            console.log(err);
        })
    },
    postCartdDeleteItem(req, res){
        const prodId = req.body.productId;
        req.user.getCart()
        .then(cart =>{
            return cart.getProducts({where: {id: prodId}})
        })
        .then(products =>{
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result=>{
            
            res.redirect('/')
        })
        .catch(err=>{
            console.log(err);
        })
    },
    getCheckout(req, res){
        res.render('shop/checkout',{
            docTtile: 'Checkout',
            path: '/checkout'
        });
    },
    getOrders(req, res){
        req.user.getOrders()
        .then(orders=>{
            res.render('shop/orders',{
                docTitle: 'Orders',
                path: '/orders',
                orders: orders
            });
        })
        .catch(err=>{
            console.log(err);
        })
    },
    postOrder(req, res){
        let fetchedCart;
        req.user.getCart()
        .then(cart=>{
            fetchedCart = cart;
            return cart.getProducts()
        })
        .then(products=>{
            return req.user.createOrder()
            .then(order =>{
                return order.addProducts(products.map(product=>{
                    product.orderItem = {quantity: product.cartItem.quantity}
                    
                }))
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .then(result =>{
            return fetchedCart.setProducts(null)
          
        })
        .then(result =>{
            res.redirect('/orders');
        })
        .catch(err=>{
            console.log(err);
        })     
    }
}

export default getTransaction