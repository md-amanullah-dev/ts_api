
import { Request, Response } from "express";
import Restaurant from '../model/resturantModel';
import User from '../model/userModel';

// Create
const createRestaurant = async (req:Request, res:Response) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: "Insernal server error" });
  }
};

// Read all
const getAllRestaurants = async (req:Request, res:Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Insernal server error" });
  }
};

// Update
const updateRestaurant = async (req:Request, res:Response) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Insernal server error" });
  }
};

// Delete
const deleteRestaurant = async (req:Request, res:Response) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted' });
  } catch (error) {
    res.status(500).json({ message: "Insernal server error" });
  }
};

// Assign Manager
const assignManager = async (req:Request, res:Response) => {
  try {
    const { managerId } = req.body;

    const manager = await User.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { manager: managerId },
      { new: true }
    ).populate('manager', 'name email');

    res.json({ message: 'Manager assigned', restaurant });
  } catch (error) {
    res.status(400).json({ message: "Insernal server error" });
  }
};



export default {createRestaurant,getAllRestaurants,updateRestaurant,deleteRestaurant,assignManager}
