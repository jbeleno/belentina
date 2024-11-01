import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users = [
  { email: 'belentina@drogueria.com', password: bcrypt.hashSync('belentina123', 10) },
];

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.json({ token });
};