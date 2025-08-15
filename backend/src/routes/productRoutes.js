import express from "express"
import { createProduct, deleteProduct, editProduct, getAllProducts } from "../controller/productController.js"

const router = express.Router()

router.get("/products", getAllProducts)
router.post("/new-product", createProduct)
router.put("/edit-product/:id", editProduct)
router.delete("/delete-product/:id", deleteProduct)

export default router