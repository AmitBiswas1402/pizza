import User from '@/models/User.model'; // Your Mongoose model
import { connectToDB } from '../db/connectDB';
import { clerkClient } from '@clerk/nextjs/server';

export async function getUserRoleFromDB(clerkId: string): Promise<'user' | 'admin'> {
  try {
    await connectToDB();

    let user = await User.findOne({ clerkId });

    if (!user) {
      // If user not found in DB, fetch from Clerk
      const clerkUser = await clerkClient.users.getUser(clerkId);   
      const email = clerkUser.emailAddresses[0]?.emailAddress || 'unknown@noemail.com';

      // Create new user with default role
      user = await User.create({
        clerkId,
        email,
        role: 'user',
      });
    }

    return user.role;
  } catch (error) {
    console.error('❌ Error fetching user role:', error);
    return 'user'; // fallback role
  }
}
