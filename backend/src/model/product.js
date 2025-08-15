import mongoose from "mongoose"

//1 - create a schema
//2 - model based off the schema

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        validate: {
            validator: arr => arr.length > 0,
            message: 'At least one product image is required.'
        },
        required: true
    },
    specifications: {
        model: { type: String, required: true },
        batteryLife: { type: String },
        weight: { type: String },
        extra: { type: Map, of: String } // any extra specs
    }
},
    { timestamps: true }
)

const Product = mongoose.model("Product", productSchema)

export default Product