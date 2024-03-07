import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db.js';
import { logAction } from './logger.js';

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, role, createdBy } = req.body;

    // Validate request body

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }
    // Check if user already exists
    const userExists = await new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.length > 0);
          }
        }
      );
    });

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
      is_active: true,
      created_at: new Date(),
    };

    await new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', newUser, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });

    // Generate JWT token
    if (newUser) {
      await logAction(createdBy, 'User registered');
    }

    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Rate limiter middleware for login attempts
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message:
    'Too many login attempts from this IP, please try again after 15 minutes',
});

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const user = await new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is activated (if applicable)
    if (!user.is_active) {
      return res.status(403).json({ message: 'Account is not activated' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      'jwtSecret',
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { login, loginRateLimiter };

export const getAllUsers = async (req, res) => {
  try {
    const users = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    await logAction(8, 'User deleted');

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUserActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET is_active = ? WHERE id = ?',
        [is_active, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// In your controller file
export const getLogs = async (req, res) => {
  try {
    const logs = await new Promise((resolve, reject) => {
      db.query(
        'SELECT users.name, users.role, logs.action, logs.timestamp FROM logs INNER JOIN users ON logs.user_id = users.id ORDER BY logs.timestamp DESC',
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json(logs);
  } catch (error) {
    console.error('Get Logs Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
