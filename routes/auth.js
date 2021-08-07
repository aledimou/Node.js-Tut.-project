import  express from "express";
import path from 'path'
import authController from "../controllers/authController.js"



const router = express.Router();
const __dirname = path.resolve();


router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);


export default router;