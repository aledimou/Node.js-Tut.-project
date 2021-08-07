import Product from "../models/product.js"
import user from "../models/user.js"
import Order from "../models/order.js"



const CartController = {
  getCart(req, res) {
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then((user) => {
        res.render("shop/cart", {
          docTitle: "Cart",
          path: "/cart",
          products: user.cart.items,
          isAuthenticated: req.isLoggedIn
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
    req.user
      .deleteCartItem(prodId)
      .then((result) => {
        console.log("Deleted Suyccesfully");
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // getCheckout(req, res) {
  //   res.render("shop/checkout", {
  //     docTtile: "Checkout",
  //     path: "/checkout",
  //   });
  // },
  getOrders(req, res) {
    Order.find({ "user.userId": req.user._id })
      .then((orders) => {
        // console.log(orders);
        res.render("shop/orders", {
          docTitle: "Orders",
          path: "/orders",
          orders: orders,
          isAuthenticated: req.isLoggedIn
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  postOrder(req, res) {
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then((user) => {
        // console.log(user);
        const products = user.cart.items.map((item) => {
          return {
            quantity: item.quantity,
            product: { ...item.productId._doc },
          };
        });
        const order = new Order({
          user: {
            name: req.user.name,
            userId: req.user._id,
          },
          products: products,
        });
        return order.save();
      })
      .then((result) => {
        // console.log(result);
        return req.user.clearCart();
      })
      .then(() => {
        res.redirect("/orders");
      })
      .catch((err) => console.log(err));
  },
};

export default CartController