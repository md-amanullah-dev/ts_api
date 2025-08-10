import { Request, Response } from 'express';
import Menu from '../model/menuModel';

 const addMenuItem = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const menuItem = await Menu.create({ ...req.body, restaurantId });
    res.status(201).json({ message: 'Menu item added', data: menuItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add menu item', error });
  }
};

 const getMenuByRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const menu = await Menu.find({ restaurantId });
    res.json({ data: menu });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu', error });
  }
};

 const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { menuId } = req.params;
    const updated = await Menu.findByIdAndUpdate(menuId, req.body, { new: true });
    res.json({ message: 'Menu item updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update menu item', error });
  }
};

 const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { menuId } = req.params;
    await Menu.findByIdAndDelete(menuId);
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete menu item', error });
  }
};

export default {addMenuItem,getMenuByRestaurant,updateMenuItem,deleteMenuItem}
