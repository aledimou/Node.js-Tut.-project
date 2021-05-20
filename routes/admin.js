import  express from "express";
import path from 'path'
import adminController from '../controllers/Admin_Control.js'




const router = express.Router();
const __dirname = path.resolve();


// /admin/add-product => GET
router.get('/add-product', adminController.getAddproduct);

// /admin/products => GET
router.get('/products', adminController.getAdminProducts);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product => POST
router.post('/edit-product', adminController.postEditProduct);

///admin/delete-product =>POST
router.post('/delete-product', adminController.postDeleteProduct);


export default router
