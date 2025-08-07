import { Request, Response } from "express";

import Role from '../model/roleModel';

 const getAllRoles = async (req:Request, res:Response) => {
  const roles = await Role.find();
  res.json(roles);
};

 const getRoleById = async (req:Request, res:Response) => {
  const role = await Role.findById(req.params.id);
  if (!role) return res.status(404).json({ message: 'Role not found' });
  res.json(role);
};

 const createRole = async (req:Request, res:Response) => {
  const { name } = req.body;
  const newRole = new Role({ name });
  await newRole.save();
  res.status(201).json(newRole);
};

 const updateRole = async (req:Request, res:Response) => {
  const updated = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Role not found' });
  res.json(updated);
};

 const deleteRole = async (req:Request, res:Response) => {
  const deleted = await Role.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Role not found' });
  res.json({ message: 'Role deleted' });
};

export default {getAllRoles,getRoleById,createRole,updateRole,deleteRole}
