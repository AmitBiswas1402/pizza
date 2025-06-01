import mongoose from 'mongoose';

const PizzaBaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 100 }, // admin updates this
});

export default mongoose.models.PizzaBase || mongoose.model('PizzaBase', PizzaBaseSchema);
