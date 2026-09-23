import product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try { 
        const product = await product.create(req.body);
        res.json({
            message: "Product created successfully",
            product
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//Get all products

export const getProducts = async (req, res) => {
    try {
        const products = await product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//update product

export const updateProduct = async (req, res) => {
    try { 
        const product = await findByIdAndUpdate()
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//Delete product

export const deleteProduct = async (req, res) => {
    try { 
        const product = await findByIdAndDelete()
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};