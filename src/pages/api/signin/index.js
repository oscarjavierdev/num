import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import dbConnect from '@/lib/db';

export default async function handleLogin (req, res) {
  await dbConnect();
  const { email, password } = await req;

  if (!email || !password) {
    return res.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.json({ message: 'Login successful', token }, { status: 200 });
}