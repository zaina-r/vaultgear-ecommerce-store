import Product from "../model/product.js"

export async function getAllProducts(_, res) { //the _ in the req section is used since we dont use the req parameter in the function
   try {
      const products = await Product.find()
      res.status(200).json(products)
   } catch (e) {
      console.error(`Error in fetching products: ${e}`)
      res.status(500).json({ message: "Internal Server Error" })
   }
}

export async function getProductById(req, res) {
   try {
      const { id } = req.params
      const product = await Product.findById(id)
      if(!product) return res.status(404).json({message: "Product not found!"})
      res.status(200).json(product)
   } catch (e) {
      console.error(`Error in fetching product: ${e}`)
      res.status(500).json({ message: "Internal Server Error" })
   }
}

export async function createProduct(req, res) {
   try {
      const {
         title,
         description,
         images,
         specifications // contains model, batteryLife, weight, extra
      } = req.body;

      // Create a new product
      const newProduct = new Product({
         title,
         description,
         images,
         specifications
      });
      await newProduct.save()
      res.status(201).json({ message: "Product created successfully", Product: newProduct })

   } catch (e) {
      console.error(`Error creating product: ${e}`)
      res.status(500).json({ message: "Internal Server Error" })
   }
}

export async function editProduct(req, res) {
   try {
      const {
         title,
         description,
         images,
         specifications // contains model, batteryLife, weight, extra
      } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
         req.params.id,
         {title,
         description,
         images,
            specifications
         },
         {
            new:true
         }
      )

      if (!updatedProduct) return res.status(404).json({message: "Product not found"})
         
      res.status(200).json({ message: "Product updated successfully", Product: updatedProduct })

   } catch (e) {
      console.error(`Error updating product: ${e}`)
      res.status(500).json({ message: "Internal Server Error" })
   }
}

export async function deleteProduct(req, res) {
   try {

      const deletedProduct = await Product.findByIdAndDelete(req.params.id)

      if (!deletedProduct) return res.status(404).json({message: "Product not found"})
         
      res.status(200).json({ message: "Product deleted successfully" })

   } catch (e) {
      console.error(`Error deleting product: ${e}`)
      res.status(500).json({ message: "Internal Server Error" })
   }
}