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
    const { startDate, endDate, search, category, minPrice, maxPrice } = req.query;
    const filter: any = { restaurantId };

  // Date range filter
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) {
      filter.createdAt.$gte = new Date(startDate as string);
    }
    if (endDate) {
      const end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999); 
      filter.createdAt.$lte = end;
    }
  }

    // Search by name (case-insensitive)
    if (search) {
      filter.name = { $regex: search as string, $options: 'i' };
    }

    // Filter by category
    if (category) {
      filter.category = { $regex: category as string, $options: 'i' };
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const menu = await Menu.find(filter).sort({ createdAt: -1 });
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
