import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    pizzaBase: String,
    sauce: String,
    cheese: String,
    veggies: [String],
    status: {
      type: String,
      enum: ['Order Received', 'In Kitchen', 'Sent to Delivery'],
      default: 'Order Received',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
