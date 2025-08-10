import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
}, { timestamps: true });

const Menu =  mongoose.model('Menu', menuSchema);

export default Menu;
