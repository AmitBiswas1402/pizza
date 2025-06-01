import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  name: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

const User = (mongoose.models && mongoose.models.User) || mongoose.model('User', UserSchema);

export default User;