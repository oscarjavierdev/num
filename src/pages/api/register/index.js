import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect from '@/lib/db';

export default async function handleRegister (req, res) {
  await dbConnect();
  const { email, password } = req.body;
  console.log (email, password);

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({error: "User already exists"})
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: '1h' });

  return res.status(201).json({ message: 'User registered successfully', token})

}