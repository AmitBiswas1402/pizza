import mongoose from 'mongoose';

const CheeseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 100 },
});

export default mongoose.models.Cheese || mongoose.model('Cheese', CheeseSchema);
