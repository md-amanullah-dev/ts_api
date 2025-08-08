const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  cuisine: { type: String, required: true },
  address: {
    city: String,
    state: String,
    country: String
  },
  phone: String,
  email: String,
  rating: Number,
  deliveryTime: String,
  image: String
}, { timestamps: true });



const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default  Restaurant;

