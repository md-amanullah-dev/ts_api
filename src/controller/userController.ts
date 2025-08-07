
import { Request, Response } from "express";
import Role from '../model/roleModel';
import User from '../model/userModel';


 const getAllUsers = async (req:Request, res:Response) => {
  const users = await User.find().populate('role');
  res.json(users);
};

 const getUserById = async (req:Request, res:Response) => {
  const user = await User.findById(req.params.id).populate('role');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

 const createUser = async (req:Request, res:Response) => {
  const { name, email, password, roleId } = req.body;
  const role = await Role.findById(roleId);
  if (!role) return res.status(400).json({ message: 'Invalid role' });

  const newUser = new User({ name, email, password, role: roleId });
  await newUser.save();
  res.status(201).json(newUser);
};

 const updateUser = async (req:Request, res:Response) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'User not found' });
  res.json(updated);
};

 const deleteUser = async (req:Request, res:Response) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
};


export default {getAllUsers,getUserById,createUser,updateUser,deleteUser}
