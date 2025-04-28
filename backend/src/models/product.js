const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    category: {
        type: String,
        enum: ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'Power Supply', 'Case', 'Monitor', 'Peripherals', 'Others',"LAPTOP"],
        required: [true, "Category is required"]
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
    stock: {
        type: Number,
        required: [true, "Stock quantity is required"],
        min: [0, "Stock must be a non-negative number"]
    },
    // specifications: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Specification",
    //     required: [true, "Specifications are required"]
    // },
    description: {
        type: String,
        trim: true
    },
    imageUrl: [{
        type: String,
        trim: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});




module.exports = mongoose.model('Product', productSchema);
