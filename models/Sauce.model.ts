import mongoose from 'mongoose';

const SauceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 100 }, // Admin will update this
});

export default mongoose.models.Sauce || mongoose.model('Sauce', SauceSchema);
