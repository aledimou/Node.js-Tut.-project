import  express from "express"
import path from 'path'
import shopController from "../controllers/products.js"
import CartController from '../controllers/shop_cart.js'


const router = express.Router();
const __dirname = path.resolve();



router.get('/', shopController.getIndex);
router.get('/products', shopController.getHomeProduct);
router.get('/products/:productID', shopController.getDetailsProduct);
router.get('/cart', CartController.getCart);
router.post('/cart', CartController.postCart);
router.post('/cart-delete-item', CartController.postCartdDeleteItem)
// // router.get('/orders', CartController.getOrders);
// router.get('/create-order', CartController.postOrder);
// // router.get('/checkout',CartController.getCheckout);

export default router
