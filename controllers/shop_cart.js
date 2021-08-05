import Product from "../models/product.js"
import User from "../models/user.js"


const getTransaction = {
  getCart(req, res) {
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then((user) => {
        res.render("shop/cart", {
          docTitle: "Cart",
          path: "/cart",
          products: user.cart.items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  postCart(req, res) {
    const prodId = req.body.productId;
    Product.findById(prodId)
      .then((product) => {
        return req.user.addToCard(product);
      })
      .then((cart_result) => {
          console.log("Product Added Succesfully to Cart");
        res.redirect("/cart");
      })
      .catch((err) => console.log(err));
  },
  postCartdDeleteItem(req, res) {
    const prodId = req.body.productId;
    req.user.deleteCartItem(prodId)
      .then((result) => {
          console.log("Deleted Suyccesfully");
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCheckout(req, res) {
    res.render("shop/checkout", {
      docTtile: "Checkout",
      path: "/checkout",
    });
  },
  getOrders(req, res) {
    req.user
      .getOrders()
      .then((orders) => {
        res.render("shop/orders", {
          docTitle: "Orders",
          path: "/orders",
          orders: orders,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  postOrder(req, res) {
    let fetchedCart;
    req.user
      .addOrder()
      .then((result) => {
        console.log(result);
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default getTransaction