import {
  getAllUsers,
  login,
  register,
  deleteUser,
  updateUserActiveStatus,
  loginRateLimiter,
  getLogs,
} from '../controllers/authController.js';

import express from 'express';

const router = express.Router();

router.post('/login', loginRateLimiter, login);
router.get('/logs', getLogs);
router.post('/register', register);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUserActiveStatus);

export default router;
