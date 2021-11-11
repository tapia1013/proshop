import mongoose from 'mongoose';


// Since we only use the reviews in here we created this reviewSchema so we wont have to import a new file
const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // individual rating
  rating: {
    type: Number,
    required: true,
  },
  cmment: {
    type: String,
    required: true
  },
}, { timeStamps: true })


const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    },
  }, {
  timeStamps: true
})


const Product = mongoose.model('Product', productSchema)


export default Product;