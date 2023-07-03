// Import the user data
import users from '../data/users.js';

// Get all users
const getAllUsers = (req, res) => {
  res.json(users);
};

// Get a specific user by ID
const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

// Add a new user
const addUser = (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update a user
const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, password } = req.body;
  const user = users.find(user => user.id === userId);

  if (user) {
    user.name = name;
    user.email = email;
    user.password = password;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

// Delete a user
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

// Export the user controller functions
export { getAllUsers, getUserById, addUser, updateUser, deleteUser };