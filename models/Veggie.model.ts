import mongoose from 'mongoose';

const VeggieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 100 },
});

export default mongoose.models.Veggie || mongoose.model('Veggie', VeggieSchema);
